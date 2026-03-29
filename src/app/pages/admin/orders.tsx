import { AdminLayout } from "../../components/admin-layout";
import { useState, useEffect } from "react";
import { getAllOrders, getOrderItems, updateOrderStatus, Order } from "../../lib/orders-storage";
import { getAllUsers } from "../../../lib/user-storage";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Search,
  Eye,
  Send
} from "lucide-react";

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter, orders]);

  const loadOrders = () => {
    const allOrders = getAllOrders();
    // Sắp xếp: pending trước, sau đó theo thời gian mới nhất
    const sorted = allOrders.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setOrders(sorted);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleConfirmShipping = (orderId: string) => {
    if (confirm('Xác nhận gửi hàng cho đơn này?')) {
      updateOrderStatus(orderId, 'shipping');
      loadOrders();
      alert('✅ Đã xác nhận gửi hàng! Khách hàng không thể hủy đơn nữa.');
    }
  };

  const handleCompleteOrder = (orderId: string) => {
    if (confirm('Xác nhận đơn hàng đã hoàn thành?')) {
      updateOrderStatus(orderId, 'completed');
      loadOrders();
      alert('✅ Đơn hàng đã hoàn thành!');
    }
  };

  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string; icon: any }> = {
      pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Clock },
      processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800 border-blue-300", icon: Package },
      shipping: { label: "Đang giao", color: "bg-indigo-100 text-indigo-800 border-indigo-300", icon: Truck },
      completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800 border-green-300", icon: CheckCircle },
      cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodLabels: Record<string, string> = {
      'cod': 'COD (Tiền mặt)',
      'cash': 'Tiền mặt',
      'bank_transfer': 'Chuyển khoản',
      'card': 'Thẻ tín dụng',
      'momo': 'MoMo',
      'zalopay': 'ZaloPay',
    };
    return methodLabels[method] || method;
  };

  return (
    <AdminLayout title="Quản lý đơn hàng">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipping">Đang giao</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">Chờ xử lý</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Đang xử lý</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {orders.filter(o => o.status === 'processing').length}
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-800">Đang giao</span>
          </div>
          <p className="text-2xl font-bold text-indigo-900">
            {orders.filter(o => o.status === 'shipping').length}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Hoàn thành</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {orders.filter(o => o.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Mã đơn</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ngày đặt</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tổng tiền</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Thanh toán</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Không có đơn hàng nào
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customerName || order.userName || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {order.totalAmount.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewOrderDetail(order)}
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleConfirmShipping(order.id)}
                            className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                            title="Xác nhận gửi hàng"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}

                        {order.status === 'shipping' && (
                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="p-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            title="Hoàn thành đơn"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Chi tiết đơn hàng #{selectedOrder.id}</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Thông tin khách hàng</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium">Tên:</span> {selectedOrder.customerName || selectedOrder.userName}</p>
                  <p className="text-sm"><span className="font-medium">SĐT:</span> {selectedOrder.customerPhone || 'N/A'}</p>
                  <p className="text-sm"><span className="font-medium">Địa chỉ:</span> {selectedOrder.shippingAddress || 'N/A'}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sản phẩm</h4>
                <div className="space-y-2">
                  {getOrderItems(selectedOrder.id).map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.itemName}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {(item.itemPrice * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium">{getPaymentMethodLabel(selectedOrder.paymentMethod)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Trạng thái:</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="flex items-center justify-between text-lg font-bold border-t border-gray-200 pt-4">
                  <span>Tổng cộng:</span>
                  <span className="text-[#FF7B7B]">{selectedOrder.totalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleConfirmShipping(selectedOrder.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Xác nhận gửi hàng
                  </button>
                )}

                {selectedOrder.status === 'shipping' && (
                  <button
                    onClick={() => {
                      handleCompleteOrder(selectedOrder.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Hoàn thành đơn
                  </button>
                )}

                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}