import { StaffLayout } from "../../components/staff-layout";
import { ShoppingCart, Package, CheckCircle, Clock } from "lucide-react";
import { getAllOrders } from "../../lib/orders-storage";
import { getAllProducts } from "../../lib/products-storage";
import { useEffect, useState } from "react";

export function StaffOverview() {
  const [stats, setStats] = useState({
    pendingOrders: 0,
    processingOrders: 0,
    completedOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const orders = getAllOrders();
    const products = getAllProducts();

    setStats({
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      processingOrders: orders.filter(o => o.status === 'processing' || o.status === 'shipping').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      totalProducts: products.length,
    });
  }, []);

  const statCards = [
    {
      title: "Đơn chờ xử lý",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Đơn đang xử lý",
      value: stats.processingOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Đơn hoàn thành",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <StaffLayout title="Tổng quan">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#FF7B7B] to-[#ff9999] rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Chào mừng đến với MiaPET Staff</h2>
        <p className="text-white/90">Quản lý đơn hàng, sản phẩm và dịch vụ một cách chuyên nghiệp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} ${stat.textColor} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/staff/orders"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-[#FF7B7B]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quản lý đơn hàng</h3>
              <p className="text-sm text-gray-500">Xử lý đơn hàng chờ xác nhận</p>
            </div>
          </div>
        </a>

        <a
          href="/staff/products"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-[#FF7B7B]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#FF7B7B]/20 p-3 rounded-lg">
              <Package className="w-6 h-6 text-[#FF7B7B]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quản lý sản phẩm</h3>
              <p className="text-sm text-gray-500">Xem và cập nhật kho hàng</p>
            </div>
          </div>
        </a>

        <a
          href="/staff/services"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-[#FF7B7B]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quản lý dịch vụ</h3>
              <p className="text-sm text-gray-500">Xem danh sách dịch vụ</p>
            </div>
          </div>
        </a>
      </div>
    </StaffLayout>
  );
}