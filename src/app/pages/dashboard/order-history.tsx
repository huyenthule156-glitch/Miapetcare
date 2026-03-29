import { DashboardLayout } from "../../components/dashboard-layout";
import { useAuth } from "../../contexts/auth-context";
import { getAllOrders, getOrderItems, updateOrderStatus } from "../../lib/orders-storage";
import { increaseStock } from "../../lib/products-storage";
import { Package, Calendar, DollarSign, ShoppingBag, X, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function DashboardOrderHistory() {
  const { user, isAuthenticated } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  // Get all orders for current user (only if authenticated)
  const userOrders = isAuthenticated 
    ? getAllOrders()
        .filter((order) => order.userId === user?.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  // Filter orders by status
  const filteredOrders = selectedFilter === "all" 
    ? userOrders 
    : userOrders.filter((order) => order.status === selectedFilter);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: 'Chờ xử lý', className: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'Đang xử lý', className: 'bg-blue-100 text-blue-800' },
      shipping: { label: 'Đang giao', className: 'bg-purple-100 text-purple-800' },
      completed: { label: 'Hoàn thành', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Đã hủy', className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const filterOptions = [
    { value: 'all', label: 'Tất cả', count: userOrders.length },
    { value: 'pending', label: 'Chờ xử lý', count: userOrders.filter(o => o.status === 'pending').length },
    { value: 'processing', label: 'Đang xử lý', count: userOrders.filter(o => o.status === 'processing').length },
    { value: 'shipping', label: 'Đang giao', count: userOrders.filter(o => o.status === 'shipping').length },
    { value: 'completed', label: 'Hoàn thành', count: userOrders.filter(o => o.status === 'completed').length },
    { value: 'cancelled', label: 'Đã hủy', count: userOrders.filter(o => o.status === 'cancelled').length },
  ];

  const handleCancelOrder = (orderId: string) => {
    setCancelOrderId(orderId);
  };

  const confirmCancelOrder = () => {
    if (cancelOrderId) {
      // Return stock to inventory
      const orderItems = getOrderItems(cancelOrderId);
      orderItems.forEach(item => {
        increaseStock(item.productId, item.quantity);
      });
      
      // Update order status to cancelled
      updateOrderStatus(cancelOrderId, 'cancelled');
      setCancelOrderId(null);
    }
  };

  const cancelOrderModal = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-3">Xác nhận hủy đơn hàng</h3>
        <p className="text-gray-500 mb-6">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCancelOrderId(null)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Hủy bỏ
          </button>
          <button
            onClick={confirmCancelOrder}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Lịch sử đơn hàng">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lịch sử đơn hàng</h2>
        <p className="text-gray-500 mt-1">
          Theo dõi và quản lý tất cả đơn hàng của bạn
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === option.value
                  ? 'bg-[#FF7B7B] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[#FF7B7B]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Chưa có đơn hàng
            </h3>
            <p className="text-gray-500 mb-6">
              Bạn chưa có đơn hàng nào {selectedFilter !== 'all' ? `ở trạng thái "${filterOptions.find(f => f.value === selectedFilter)?.label}"` : ''}.
            </p>
            <a
              href="/products"
              className="bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2 font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Mua sắm ngay</span>
            </a>
          </div>
        </div>
      )}

      {/* Orders List */}
      {filteredOrders.length > 0 && (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const orderItems = getOrderItems(order.id);
            const firstItem = orderItems[0];
            const moreItemsCount = orderItems.length - 1;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        Mã đơn: #{order.orderNumber}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span>{orderItems.length} sản phẩm</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                    <p className="text-2xl font-bold text-[#FF7B7B]">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {firstItem && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7B7B]"></div>
                        <span className="text-gray-900 font-medium">{firstItem.itemName}</span>
                        <span className="text-gray-500">x{firstItem.quantity}</span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {formatPrice(firstItem.subtotal)}
                      </span>
                    </div>
                  )}
                  
                  {moreItemsCount > 0 && (
                    <div className="text-sm text-gray-500">
                      + {moreItemsCount} sản phẩm khác
                    </div>
                  )}
                </div>

                {/* Payment Info */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      Thanh toán: 
                      <span className="font-medium ml-1">
                        {order.paymentMethod === 'cash' ? 'Tiền mặt' :
                         order.paymentMethod === 'card' ? 'Thẻ ngân hàng' :
                         order.paymentMethod === 'bank_transfer' ? 'Chuyển khoản' :
                         order.paymentMethod === 'momo' ? 'MoMo' :
                         order.paymentMethod === 'zalopay' ? 'ZaloPay' : 'Khác'}
                      </span>
                      {' - '}
                      <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                        {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 
                         order.paymentStatus === 'refunded' ? 'Đã hoàn tiền' : 'Chưa thanh toán'}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Hủy đơn
                      </button>
                    )}
                    {order.status !== 'cancelled' && order.status !== 'completed' && (
                      <button className="text-sm text-[#FF7B7B] hover:text-[#ff6565] font-medium">
                        Chi tiết →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Order Modal */}
      {cancelOrderId && cancelOrderModal}
    </DashboardLayout>
  );
}