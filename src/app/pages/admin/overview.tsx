import { AdminLayout } from "../../components/admin-layout";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Package,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { getAllUsers } from "../../../lib/user-storage";
import {
  getThisMonthOrders,
  getLastMonthOrders,
  getThisMonthRevenue,
  getLastMonthRevenue,
  getTopSellingProducts,
  getAllOrders,
  getOrderItems,
} from "../../lib/orders-storage";

export function AdminOverview() {
  // Real data from storage
  const allUsers = getAllUsers();
  const thisMonthOrders = getThisMonthOrders();
  const lastMonthOrders = getLastMonthOrders();
  const thisMonthRevenue = getThisMonthRevenue();
  const lastMonthRevenue = getLastMonthRevenue();
  const topProducts = getTopSellingProducts(4);
  const recentOrdersList = getAllOrders()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Calculate percentage changes
  const calculatePercentChange = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? '+100%' : '+0%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  // For demonstration: assume last month had fewer users
  const lastMonthUsers = Math.floor(allUsers.length * 0.9); // 10% growth
  const userGrowth = calculatePercentChange(allUsers.length, lastMonthUsers);

  // Revenue growth
  const revenueGrowth = calculatePercentChange(thisMonthRevenue, lastMonthRevenue);

  const stats = [
    {
      title: "Tổng người dùng",
      value: allUsers.length.toLocaleString('vi-VN'),
      change: userGrowth,
      trending: parseFloat(userGrowth) >= 0 ? "up" : "down",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Doanh thu tháng này",
      value: `₫${(thisMonthRevenue / 1000000).toFixed(1)}M`,
      change: revenueGrowth,
      trending: parseFloat(revenueGrowth) >= 0 ? "up" : "down",
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  // Convert recent orders data
  const recentOrders = recentOrdersList.map((order) => {
    const statusMap: Record<string, string> = {
      'pending': 'Chờ xử lý',
      'processing': 'Đang xử lý',
      'shipping': 'Đang giao',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy',
    };

    // Get first order item name using orderId
    const orderItems = getOrderItems(order.id);
    const productName = orderItems.length > 0 ? orderItems[0].itemName : 'Sản phẩm';

    return {
      id: `#${order.orderNumber}`,
      customer: order.userName,
      product: productName,
      amount: `${order.totalAmount.toLocaleString('vi-VN')}₫`,
      status: statusMap[order.status] || order.status,
    };
  });

  return (
    <AdminLayout title="Tổng quan">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-3xl text-gray-900 mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1">
                    {stat.trending === "up" ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trending === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs tháng trước</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg text-gray-900 font-semibold">Doanh thu theo tháng</h3>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[#FF7B7B]/5 to-[#FF7B7B]/10 rounded-lg">
            <div className="text-center">
              <Activity className="w-12 h-12 text-[#FF7B7B] mx-auto mb-3" />
              <p className="text-gray-500">Biểu đồ doanh thu</p>
              <p className="text-sm text-gray-400 mt-1">Dữ liệu sẽ được hiển thị tại đây</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg text-gray-900 font-semibold mb-4">Sản phẩm bán chạy</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{product.itemName}</p>
                  <p className="text-xs text-gray-500">{product.totalSold} đã bán</p>
                </div>
                <span className="text-sm font-semibold text-[#FF7B7B]">
                  ₫{(product.totalRevenue / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-gray-900 font-semibold">Đơn hàng gần đây</h3>
            <button className="text-sm text-[#FF7B7B] hover:text-[#ff6565] font-medium">
              Xem tất cả →
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Hoàn thành"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Đang giao"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Đang xử lý"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Chờ xử lý"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Đã hủy"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}