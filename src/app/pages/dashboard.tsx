import { DashboardLayout } from "../components/dashboard-layout";
import { useDashboard } from "../context/dashboard-context";
import { useCart } from "../context/cart-context";
import { 
  PawPrint, 
  Calendar, 
  FileText,
  TrendingUp,
  ShoppingCart
} from "lucide-react";

export function Dashboard() {
  const { 
    getTotalPets, 
    getUpcomingAppointments, 
    getActiveRequests
  } = useDashboard();
  
  const { cartItems } = useCart();

  return (
    <DashboardLayout title="Trang chủ">
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
            <p className="text-white/90 text-lg">
              Quản lý thú cưng và dịch vụ của bạn tại đây
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">🐶</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Pets */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-xl">
              <PawPrint className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-gray-500 text-sm mb-1">Tổng số thú cưng</div>
          <div className="text-3xl font-bold text-gray-900">{getTotalPets()}</div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-gray-500 text-sm mb-1">Lịch hẹn sắp tới</div>
          <div className="text-3xl font-bold text-gray-900">{getUpcomingAppointments()}</div>
        </div>
        
        {/* Active Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            {getActiveRequests() > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {getActiveRequests()}
              </span>
            )}
          </div>
          <div className="text-gray-500 text-sm mb-1">Yêu cầu đang xử lý</div>
          <div className="text-3xl font-bold text-gray-900">{getActiveRequests()}</div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shopping Cart Summary */}
        <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/5 rounded-2xl p-6 border border-[#FF7B7B]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <ShoppingCart className="w-6 h-6 text-[#FF7B7B]" />
            </div>
            <h3 className="font-bold text-gray-900">Giỏ hàng</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Số sản phẩm:</span>
              <span className="font-bold text-2xl text-[#FF7B7B]">{cartItems.length}</span>
            </div>
            {cartItems.length > 0 && (
              <a
                href="/dashboard/my-orders"
                className="block w-full bg-white text-[#FF7B7B] text-center py-2 rounded-lg hover:bg-[#FF7B7B] hover:text-white transition-colors font-semibold text-sm mt-3"
              >
                Xem giỏ hàng →
              </a>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-bold text-gray-900">Mẹo hữu ích</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Đừng quên kiểm tra lịch tiêm phòng định kỳ cho thú cưng của bạn!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}