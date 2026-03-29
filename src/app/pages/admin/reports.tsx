import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  Calendar,
  Download,
  Eye,
  X,
  ShoppingBag,
  FileSpreadsheet,
  BarChart3,
} from "lucide-react";
import { getAllOrders, getOrderItems } from "../../lib/orders-storage";
import { products } from "../../data/products-data-new";
import { getAllUsers } from "../../../lib/user-storage";
import * as XLSX from 'xlsx';

export function AdminReports() {
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("revenue");

  // Get real data from storage
  const allOrders = getAllOrders();
  const allUsers = getAllUsers();

  // Calculate date range
  const getDateRange = () => {
    const now = new Date();
    const ranges: Record<string, Date> = {
      week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      month: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      quarter: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
      year: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
    };
    return ranges[timeRange] || ranges.month;
  };

  // Filter orders by time range
  const filteredOrders = useMemo(() => {
    const startDate = getDateRange();
    return allOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate;
    });
  }, [timeRange]);

  // Calculate statistics based on reportType
  const stats = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Calculate total products sold
    const totalProducts = filteredOrders.reduce((sum, order) => {
      const items = getOrderItems(order.id);
      return sum + items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);

    // Calculate growth (compare to previous period)
    const previousStartDate = new Date(getDateRange().getTime() - (new Date().getTime() - getDateRange().getTime()));
    const previousOrders = allOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= previousStartDate && orderDate < getDateRange();
    });
    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue * 100) : 0;

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      totalProducts,
      revenueGrowth,
      ordersGrowth: previousOrders.length > 0 ? ((totalOrders - previousOrders.length) / previousOrders.length * 100) : 0,
    };
  }, [filteredOrders, timeRange]);

  // Monthly revenue data (last 12 months)
  const monthlyRevenue = useMemo(() => {
    const months: Record<string, { revenue: number; orders: number }> = {};
    
    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = `T${date.getMonth() + 1}`;
      months[key] = { revenue: 0, orders: 0 };
    }

    // Aggregate orders by month
    allOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const key = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      if (months[key]) {
        months[key].revenue += order.totalAmount;
        months[key].orders += 1;
      }
    });

    return Object.entries(months).map(([key, data]) => {
      const [year, month] = key.split('-');
      return {
        month: `T${parseInt(month)}`,
        revenue: data.revenue,
        orders: data.orders,
      };
    });
  }, []);

  // Category revenue (based on product categories)
  const categoryRevenue = useMemo(() => {
    const categories: Record<string, { revenue: number; orders: Set<string> }> = {};

    filteredOrders.forEach(order => {
      const items = getOrderItems(order.id);
      items.forEach(item => {
        if (item.productId) {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            if (!categories[product.category]) {
              categories[product.category] = { revenue: 0, orders: new Set() };
            }
            categories[product.category].revenue += item.subtotal;
            categories[product.category].orders.add(order.id);
          }
        }
      });
    });

    const totalRevenue = Object.values(categories).reduce((sum, cat) => sum + cat.revenue, 0);

    return Object.entries(categories)
      .map(([category, data]) => ({
        category,
        revenue: data.revenue,
        percentage: totalRevenue > 0 ? Math.round((data.revenue / totalRevenue) * 100) : 0,
        orders: data.orders.size,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredOrders]);

  // Top customers by revenue
  const topCustomers = useMemo(() => {
    const customerStats: Record<string, { name: string; orders: number; revenue: number; joinDate: string }> = {};

    filteredOrders.forEach(order => {
      if (!customerStats[order.userId]) {
        const user = allUsers.find(u => u.id === order.userId);
        let joinDate = 'N/A';
        if (user && user.created_at) {
          try {
            const date = new Date(user.created_at);
            if (!isNaN(date.getTime())) {
              joinDate = date.toISOString().split('T')[0];
            }
          } catch (e) {
            joinDate = 'N/A';
          }
        }
        customerStats[order.userId] = {
          name: order.userName,
          orders: 0,
          revenue: 0,
          joinDate,
        };
      }
      customerStats[order.userId].orders += 1;
      customerStats[order.userId].revenue += order.totalAmount;
    });

    return Object.values(customerStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredOrders, allUsers]);

  // Top selling products
  const topProducts = useMemo(() => {
    const productStats: Record<number, { name: string; quantity: number; revenue: number }> = {};

    filteredOrders.forEach(order => {
      const items = getOrderItems(order.id);
      items.forEach(item => {
        if (item.productId) {
          if (!productStats[item.productId]) {
            productStats[item.productId] = {
              name: item.itemName,
              quantity: 0,
              revenue: 0,
            };
          }
          productStats[item.productId].quantity += item.quantity;
          productStats[item.productId].revenue += item.subtotal;
        }
      });
    });

    return Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredOrders]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + '₫';
  };

  const formatCurrencyShort = (amount: number) => {
    if (amount >= 1000000) {
      return "₫" + (amount / 1000000).toFixed(1) + "M";
    }
    return "₫" + (amount / 1000).toFixed(0) + "K";
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws_data = [
      ['BÁO CÁO DOANH THU - MIAPET'],
      [`Thời gian: ${timeRange === 'week' ? '7 ngày qua' : timeRange === 'month' ? '30 ngày qua' : timeRange === 'quarter' ? '3 tháng qua' : '12 tháng qua'}`],
      [`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`],
      [],
      ['TỔNG QUAN'],
      ['Tổng doanh thu', formatCurrency(stats.totalRevenue)],
      ['Tổng đơn hàng', stats.totalOrders],
      ['Giá trị TB/đơn', formatCurrency(stats.avgOrderValue)],
      ['Sản phẩm bán ra', stats.totalProducts],
      [],
      ['DOANH THU THEO THÁNG'],
      ['Tháng', 'Doanh thu', 'Số đơn hàng'],
      ...monthlyRevenue.map(m => [m.month, m.revenue, m.orders]),
      [],
      ['DOANH THU THEO DANH MỤC'],
      ['Danh mục', 'Doanh thu', 'Tỷ lệ %', 'Số đơn'],
      ...categoryRevenue.map(c => [c.category, c.revenue, c.percentage + '%', c.orders]),
      [],
      ['KHÁCH HÀNG VIP'],
      ['Khách hàng', 'Số đơn', 'Tổng chi tiêu', 'Ngày tham gia'],
      ...topCustomers.map(c => [c.name, c.orders, formatCurrency(c.revenue), c.joinDate]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Báo cáo');
    
    // Auto-size columns
    const max_width = ws_data.reduce((w, r) => Math.max(w, r.length), 10);
    ws['!cols'] = Array(max_width).fill({ wch: 20 });

    XLSX.writeFile(wb, `BaoCao_MiaPET_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Render different report types
  const renderReportContent = () => {
    switch (reportType) {
      case 'revenue':
        return (
          <>
            {/* Monthly Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo tháng</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {monthlyRevenue.slice(-6).map((item, index) => {
                  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue), 1);
                  const percentage = (item.revenue / maxRevenue) * 100;
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500">{item.orders} đơn</span>
                          <span className="font-semibold text-gray-900">{formatCurrencyShort(item.revenue)}</span>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Revenue */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Doanh thu theo danh mục</h3>
              <div className="space-y-4">
                {categoryRevenue.length > 0 ? categoryRevenue.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <span className="text-sm font-semibold text-gray-900">{formatCurrencyShort(item.revenue)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FF7B7B] rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">{item.percentage}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.orders} đơn hàng</p>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500 text-center py-4">Chưa có dữ liệu</p>
                )}
              </div>
            </div>
          </>
        );

      case 'products':
        return (
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sản phẩm bán chạy nhất</h3>
            <div className="space-y-4">
              {topProducts.length > 0 ? topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-200 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">Đã bán: {product.quantity} sản phẩm</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#FF7B7B]">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-8">Chưa có dữ liệu sản phẩm</p>
              )}
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top khách hàng</h3>
            <div className="space-y-4">
              {topCustomers.length > 0 ? topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-200 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.orders} đơn hàng • Tham gia: {customer.joinDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#FF7B7B]">{formatCurrency(customer.revenue)}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-8">Chưa có dữ liệu khách hàng</p>
              )}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Danh sách đơn hàng</h3>
            <div className="space-y-3">
              {filteredOrders.length > 0 ? filteredOrders.slice(0, 10).map((order) => {
                const items = getOrderItems(order.id);
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{order.userName} • {items.length} sản phẩm</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#FF7B7B]">{formatCurrency(order.totalAmount)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipping' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'completed' ? 'Hoàn thành' :
                         order.status === 'shipping' ? 'Đang giao' :
                         order.status === 'processing' ? 'Đang xử lý' : 'Chờ xử lý'}
                      </span>
                    </div>
                  </div>
                );
              }) : (
                <p className="text-sm text-gray-500 text-center py-8">Chưa có đơn hàng</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Báo cáo & Thống kê">
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="quarter">3 tháng qua</option>
            <option value="year">12 tháng qua</option>
          </select>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
          >
            <option value="revenue">Doanh thu</option>
            <option value="orders">Đơn hàng</option>
            <option value="products">Sản phẩm</option>
            <option value="customers">Khách hàng</option>
          </select>
        </div>

        <button 
          onClick={exportToExcel}
          className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg hover:bg-[#ff6565] transition-colors flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className={`text-sm font-medium ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.revenueGrowth >= 0 ? '+' : ''}{stats.revenueGrowth.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`text-sm font-medium ${stats.ordersGrowth >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {stats.ordersGrowth >= 0 ? '+' : ''}{stats.ordersGrowth.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Tổng đơn hàng</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#FF7B7B]/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#FF7B7B]" />
            </div>
            <span className="text-sm font-medium text-[#FF7B7B]">TB</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Giá trị TB/đơn</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgOrderValue)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">SP</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Sản phẩm bán ra</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {renderReportContent()}
      </div>

      {/* Export Options */}
      <div className="mt-6 bg-gradient-to-r from-[#FF7B7B]/5 to-[#FF7B7B]/10 rounded-xl p-6 border border-[#FF7B7B]/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Xuất báo cáo chi tiết</h3>
            <p className="text-sm text-gray-600">
              Tải xuống báo cáo đầy đủ dưới dạng Excel hoặc PDF
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={exportToExcel}
              className="px-6 py-3 bg-white border-2 border-[#FF7B7B] text-[#FF7B7B] rounded-lg hover:bg-[#FF7B7B] hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Xuất Excel
            </button>
            <button 
              onClick={exportToExcel}
              className="px-6 py-3 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors font-medium flex items-center gap-2 opacity-50 cursor-not-allowed"
              disabled
              title="PDF export đang phát triển"
            >
              <FileText className="w-5 h-5" />
              Xuất PDF
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}