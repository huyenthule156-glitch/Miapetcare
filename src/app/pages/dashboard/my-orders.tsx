import { useCart } from "../../context/cart-context";
import { useNavigate, Link } from "react-router";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  PackageCheck,
  CreditCard,
  Truck
} from "lucide-react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export function DashboardMyOrders() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleCheckout = () => {
    navigate('/dashboard/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Giỏ hàng</h2>
            <p className="text-gray-500 mt-2">
              {cartItems.length === 0 
                ? "Giỏ hàng của bạn đang trống" 
                : `Bạn có ${cartItems.length} sản phẩm trong giỏ hàng`
              }
            </p>
          </div>

          {/* Empty State */}
          {cartItems.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-[#FF7B7B]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Giỏ hàng trống
                </h3>
                <p className="text-gray-500 mb-6">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!
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

          {/* Cart Items */}
          {cartItems.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Product Image - Clickable */}
                      <Link to={`/products/${item.id}`} className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link to={`/products/${item.id}`}>
                              <h3 className="font-semibold text-gray-900 mb-1 hover:text-[#FF7B7B] transition-colors">{item.name}</h3>
                            </Link>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-[#FF7B7B] hover:bg-[#ff6565] flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#FF7B7B]">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500">
                                {formatPrice(item.price)} x {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính:</span>
                      <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển:</span>
                      <span className="text-[#FF7B7B] font-semibold">Miễn phí</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Tổng cộng:</span>
                        <span className="text-[#FF7B7B]">{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Thanh toán</span>
                  </button>

                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="w-5 h-5 text-[#FF7B7B]" />
                      <span>Giao hàng miễn phí toàn quốc</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <PackageCheck className="w-5 h-5 text-[#FF7B7B]" />
                      <span>Đổi trả trong 7 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}