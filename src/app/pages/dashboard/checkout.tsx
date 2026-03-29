import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/cart-context";
import { useAuth } from "../../contexts/auth-context";
import emailjs from '@emailjs/browser';
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  Smartphone,
  Wallet,
  QrCode,
  Check,
  Copy,
  Home,
} from "lucide-react";
import { createOrder, createOrderItems } from "../../lib/orders-storage";
import { reduceStock } from "../../lib/products-storage";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

// Type definitions
type PaymentMethod = "vietqr" | "cod" | null;
type TabType = "shipping" | "payment";

// EmailJS Configuration
// Đăng ký tài khoản miễn phí tại https://www.emailjs.com/
// Sau khi đăng ký, làm theo các bước:
// 1. Tạo Email Service (Gmail recommended)
// 2. Tạo Email Template với các biến: to_email, customer_name, order_number, order_items, total_amount, payment_method, shipping_address
// 3. Copy Service ID, Template ID, và Public Key vào đây:
const EMAILJS_SERVICE_ID = "service_autosend";
const EMAILJS_TEMPLATE_ID = "template_043orjo";
const EMAILJS_PUBLIC_KEY = "btNPncXF2uPrXEuGb";

// Check if EmailJS is configured
const isEmailConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

// Vietnamese provinces
const provinces = [
  "Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Bình Dương",
  "Đồng Nai",
  "Khánh Hòa",
  "Hải Phòng",
  "Long An",
  "Quảng Nam",
  "Bà Rịa - Vũng Tàu",
  "Đắk Lắk",
  "Cần Thơ",
  "Bình Thuận",
  "Lâm Đồng",
  "Thừa Thiên Huế",
  "Kiên Giang",
  "Bạc Liêu",
  "Nghệ An",
  "Thanh Hóa",
  "Gia Lai",
];

export function DashboardCheckout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: "/dashboard/checkout" } });
    }
  }, [isAuthenticated, navigate]);

  const [activeTab, setActiveTab] = useState<TabType>("shipping");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds = 1 minute
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: ""
  });
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: ""
  });

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
        fullName: user.full_name || "",
        phone: user.phone || "",
      }));
    }
  }, [isAuthenticated, user]);

  // Timer for showing complete button after 2 minutes
  useEffect(() => {
    if (showQRModal) {
      setShowCompleteButton(false);
      setCountdown(60);
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Show button after 2 minutes
      const timer = setTimeout(() => {
        setShowCompleteButton(true);
      }, 60000); // 60000ms = 1 minute

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [showQRModal]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.address || !formData.email) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    // If payment is bank transfer, show QR modal
    if (selectedPayment === "vietqr") {
      setShowQRModal(true);
      return;
    }

    // For COD, save order and redirect
    saveOrderAndRedirect(false); // false = not confirmed bank transfer
  };

  // Function to send order confirmation email
  const sendOrderConfirmationEmail = async (orderNumber: string) => {
    if (!isEmailConfigured) {
      // EmailJS cha được cấu hình - bỏ qua việc gửi email
      return;
    }

    try {
      // Prepare order items list for email (as formatted string)
      const orderItemsList = cartItems.map(item => 
        `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      ).join('\n');

      const totalPrice = getTotalPrice();

      const templateParams = {
        email: formData.email, // To Email
        order_number: orderNumber, // Mã đơn hàng
        order_items: orderItemsList, // Chi tiết sản phẩm (text)
        total_amount: formatPrice(totalPrice), // Tổng tiền
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        shipping_address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`,
        payment_method: selectedPayment === 'vietqr' ? 'Chuyển khoản ngân hàng' : 'Thanh toán khi nhận hàng (COD)',
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email xác nhận đơn hàng đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
      // Don't block order creation if email fails
    }
  };

  const saveOrderAndRedirect = (isConfirmedBankTransfer: boolean = false) => {
    // Determine payment status based on payment method
    // If bank transfer and confirmed via QR modal -> considered as paid
    // If COD -> unpaid until delivery
    const paymentStatus = isConfirmedBankTransfer ? 'paid' : 'unpaid';
    
    // Prepare full shipping address
    const fullAddress = `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`.trim();
    
    // Save order to localStorage with status "pending"
    const orderId = createOrder({
      userId: user?.id || "guest",
      userName: user?.fullName || formData.fullName,
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email || undefined,
      shippingAddress: fullAddress,
      shippingCity: formData.province,
      shippingDistrict: formData.district,
      orderType: 'product' as const,
      totalAmount: getTotalPrice(),
      status: 'pending' as const,
      paymentMethod: (selectedPayment === 'vietqr' ? 'bank_transfer' : 'cod') as 'cod' | 'bank_transfer',
      paymentStatus: paymentStatus as 'paid' | 'unpaid',
      notes: formData.note || undefined,
    });

    // Save order items
    const orderItems = cartItems.map(item => ({
      orderId: orderId,
      productId: item.id,
      itemName: item.name,
      itemPrice: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));
    
    createOrderItems(orderItems);

    // Reduce stock for each item in the cart
    cartItems.forEach(item => {
      reduceStock(item.id, item.quantity);
    });

    setOrderPlaced(true);
    
    // Send order confirmation email
    sendOrderConfirmationEmail(orderId);

    setTimeout(() => {
      clearCart();
      navigate("/dashboard/order-history");
    }, 3000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-12 h-12 text-[#FF7B7B]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Giỏ hàng trống
                </h3>
                <p className="text-gray-500 mb-6">
                  Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2 font-semibold"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Quay lại mua sắm</span>
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-green-100 to-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Đặt hàng thành công!
                </h3>
                <p className="text-gray-500 mb-2">
                  Cảm ơn bạn đã mua hàng tại MiaPET
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  {selectedPayment === "cod" 
                    ? "Đơn hàng sẽ được giao trong 2-3 ngày. Vui lòng chuẩn bị tiền mặt khi nhận hàng."
                    : "Chúng tôi sẽ xử lý đơn hàng sau khi xác nhận thanh toán. Đơn hàng sẽ được giao trong 2-3 ngày."}
                </p>
                <div className="inline-block animate-bounce">
                  <span className="text-4xl">🎉</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-6">
            <button
              onClick={() => navigate("/dashboard/my-orders")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#FF7B7B] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại giỏ hàng</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Delivery Info & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-[#FF7B7B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Thông tin giao hàng</h3>
                    <p className="text-sm text-gray-500">Nhập địa chỉ nhận hàng của bạn</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0901234567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Home className="w-4 h-4 inline mr-1" />
                      Địa chỉ *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Số nhà, tên đường"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tỉnh/Thành phố
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quận/Huyện
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Quận 1"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phường/Xã
                      </label>
                      <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        placeholder="Phường 1"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Ghi chú thêm cho đơn hàng (tuỳ chọn)"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 p-3 rounded-xl">
                    <CreditCard className="w-6 h-6 text-[#FF7B7B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Phương thức thanh toán</h3>
                    <p className="text-sm text-gray-500">Chọn cách thức thanh toán phù hợp</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Online Banking */}
                  <button
                    onClick={() => setSelectedPayment("vietqr")}
                    className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                      selectedPayment === "vietqr"
                        ? "border-[#FF7B7B] bg-[#FF7B7B]/5"
                        : "border-gray-200 hover:border-[#FF7B7B]/50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === "vietqr" ? "border-[#FF7B7B]" : "border-gray-300"
                    }`}>
                      {selectedPayment === "vietqr" && (
                        <div className="w-3 h-3 rounded-full bg-[#FF7B7B]" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-5 h-5 text-[#FF7B7B]" />
                        <span className="font-semibold text-gray-900">Chuyển khoản ngân hàng</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Thanh toán qua Internet Banking, Mobile Banking
                      </p>
                    </div>
                  </button>

                  {/* COD */}
                  <button
                    onClick={() => setSelectedPayment("cod")}
                    className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                      selectedPayment === "cod"
                        ? "border-[#FF7B7B] bg-[#FF7B7B]/5"
                        : "border-gray-200 hover:border-[#FF7B7B]/50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === "cod" ? "border-[#FF7B7B]" : "border-gray-300"
                    }`}>
                      {selectedPayment === "cod" && (
                        <div className="w-3 h-3 rounded-full bg-[#FF7B7B]" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <Wallet className="w-5 h-5 text-[#FF7B7B]" />
                        <span className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Đơn hàng của bạn</h3>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                        <p className="text-sm font-semibold text-[#FF7B7B] mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="text-[#FF7B7B] font-semibold">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Tổng cộng:</span>
                      <span className="text-[#FF7B7B]">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!selectedPayment}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                    selectedPayment
                      ? "bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Xác nhận đặt hàng
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Bằng việc đặt hàng, bạn đồng ý với{" "}
                  <a href="/terms" className="text-[#FF7B7B] hover:underline">
                    Điều khoản sử dụng
                  </a>{" "}
                  của MiaPET
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-[#FF7B7B]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quét mã QR để thanh toán</h3>
                <p className="text-sm text-gray-500">Sử dụng ứng dụng ngân hàng để quét mã QR</p>
              </div>

              {/* QR Code Image */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                <div className="bg-white rounded-lg flex items-center justify-center">
                  <img 
                    src={`https://img.vietqr.io/image/VCB-1031487316-compact2.jpg?amount=${getTotalPrice()}&addInfo=MIAPET ${formData.phone}&accountName=MIAPET PETSHOP`}
                    alt="QR Code thanh toán"
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
              </div>

              {/* Bank Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Thông tin chuyển khoản</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngân hàng</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Vietcombank</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Số tài khoản</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">1031487316</span>
                      <button
                        onClick={() => copyToClipboard("1031487316", "account")}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        {copiedField === "account" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Chủ tài khoản</span>
                    <span className="font-semibold text-gray-900">MIAPET PETSHOP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Số tiền</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#FF7B7B]">{formatPrice(getTotalPrice())}</span>
                      <button
                        onClick={() => copyToClipboard(getTotalPrice().toString(), "amount")}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        {copiedField === "amount" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Nội dung</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">MIAPET {formData.phone}</span>
                      <button
                        onClick={() => copyToClipboard(`MIAPET ${formData.phone}`, "content")}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        {copiedField === "content" ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Button or Countdown */}
              {showCompleteButton ? (
                <button
                  onClick={() => saveOrderAndRedirect(true)}
                  className="w-full mt-6 bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Hoàn tất
                </button>
              ) : (
                <div className="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4 text-center">
                  <p className="text-sm text-orange-800 mb-2">
                    <span className="font-semibold">Đang xử lý giao dịch...</span>
                  </p>
                  <p className="text-xs text-orange-600">
                    Vui lòng chờ {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} để hoàn tất
                  </p>
                  <div className="mt-3 w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((60 - countdown) / 60) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}