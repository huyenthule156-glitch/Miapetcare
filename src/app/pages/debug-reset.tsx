import { useState } from "react";
import { Link } from "react-router";
import { RefreshCw, Database, Users, Package, ShoppingCart, Trash2, CheckCircle2 } from "lucide-react";
import { resetUsersToInitial } from "../../lib/user-storage";

export function DebugReset() {
  const [resetStatus, setResetStatus] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleResetUsers = () => {
    resetUsersToInitial();
    setResetStatus("✅ Users reset thành công! 9 accounts đã được restore.");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleResetAll = () => {
    // Reset all localStorage keys
    localStorage.removeItem('miapet_users');
    localStorage.removeItem('miapet_pets');
    localStorage.removeItem('miapet_products');
    localStorage.removeItem('miapet_orders');
    localStorage.removeItem('miapet_order_items');
    localStorage.removeItem('miapet_appointments');
    
    setResetStatus("✅ Đã xóa toàn bộ database! Reload trang để khởi tạo lại.");
    setShowSuccess(true);
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleClearCurrentUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    setResetStatus("✅ Đã logout user hiện tại!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const currentUser = localStorage.getItem('user');
  const usersData = localStorage.getItem('miapet_users');
  const productsData = localStorage.getItem('miapet_products');
  const ordersData = localStorage.getItem('miapet_orders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] p-3 rounded-xl">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Debug & Reset Tool</h1>
                <p className="text-gray-500">MiaPET Database Management</p>
              </div>
            </div>
            <Link
              to="/"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              ← Trang chủ
            </Link>
          </div>

          {showSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-700">{resetStatus}</span>
            </div>
          )}
        </div>

        {/* Current Status */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#FF7B7B]" />
            Database Status
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700">Users</span>
              </div>
              <span className="text-gray-900 font-mono text-sm">
                {usersData ? `${JSON.parse(usersData).length} accounts` : 'Not initialized'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-gray-700">Products</span>
              </div>
              <span className="text-gray-900 font-mono text-sm">
                {productsData ? `${JSON.parse(productsData).length} items` : 'Not initialized'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-700">Orders</span>
              </div>
              <span className="text-gray-900 font-mono text-sm">
                {ordersData ? `${JSON.parse(ordersData).length} orders` : 'Not initialized'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Current User</span>
              </div>
              <span className="text-gray-900 font-mono text-sm">
                {currentUser ? JSON.parse(currentUser).username : 'Not logged in'}
              </span>
            </div>
          </div>
        </div>

        {/* Reset Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#FF7B7B]" />
            Reset Actions
          </h2>

          <div className="space-y-4">
            {/* Reset Users */}
            <div className="p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Reset Users to Demo Data
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Khôi phục 9 tài khoản mẫu (1 admin, 2 staff, 3 vets, 3 users)
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>• admin / admin123</div>
                    <div>• nhanvien1 / 123456</div>
                    <div>• bsty1 / 123456</div>
                    <div>• nguyenvana / user123</div>
                  </div>
                </div>
                <button
                  onClick={handleResetUsers}
                  className="ml-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Users
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="p-6 border-2 border-yellow-200 rounded-xl bg-yellow-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-yellow-600" />
                    Clear Current Session
                  </h3>
                  <p className="text-sm text-gray-600">
                    Logout user hiện tại (không xóa database)
                  </p>
                </div>
                <button
                  onClick={handleClearCurrentUser}
                  className="ml-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Reset All */}
            <div className="p-6 border-2 border-red-200 rounded-xl bg-red-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-red-600" />
                    Reset All Database
                  </h3>
                  <p className="text-sm text-gray-600">
                    ⚠️ Xóa toàn bộ database và reload trang (khởi tạo lại từ đầu)
                  </p>
                </div>
                <button
                  onClick={handleResetAll}
                  className="ml-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Login Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Login Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/sign-in"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF7B7B] transition-colors text-center"
            >
              <div className="font-bold text-gray-900">Admin</div>
              <div className="text-sm text-gray-500">admin / admin123</div>
            </Link>
            <Link
              to="/sign-in"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF7B7B] transition-colors text-center"
            >
              <div className="font-bold text-gray-900">Nhân viên</div>
              <div className="text-sm text-gray-500">nhanvien1 / 123456</div>
            </Link>
            <Link
              to="/sign-in"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF7B7B] transition-colors text-center"
            >
              <div className="font-bold text-gray-900">Bác sĩ</div>
              <div className="text-sm text-gray-500">bsty1 / 123456</div>
            </Link>
            <Link
              to="/sign-in"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FF7B7B] transition-colors text-center"
            >
              <div className="font-bold text-gray-900">Khách hàng</div>
              <div className="text-sm text-gray-500">nguyenvana / user123</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
