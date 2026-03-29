import { DashboardLayout } from "../../components/dashboard-layout";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDashboard } from "../../context/dashboard-context";
import { 
  MapPin, 
  Home, 
  Calendar, 
  Clock, 
  CreditCard, 
  Wallet,
  CheckCircle2,
  ArrowLeft,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfToday, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

interface ServiceBookingData {
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  serviceWeight?: string;
  serviceType?: string; // For dye services: "regular" | "premium"
  serviceCategory?: string; // "main" | "dye" | "vip"
}

export function DashboardServiceBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addRequest, addActivity } = useDashboard();
  
  // Get service data from navigation state or sessionStorage
  let serviceData = location.state as ServiceBookingData | undefined;
  
  // Fallback to sessionStorage if state is not available
  if (!serviceData) {
    const saved = sessionStorage.getItem('miapet_service_booking');
    if (saved) {
      try {
        serviceData = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse service booking data:", e);
      }
    }
  }
  
  const [locationType, setLocationType] = useState<"store" | "home">("store");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod" | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  // Redirect if no service data
  if (!serviceData) {
    return (
      <DashboardLayout title="Đặt dịch vụ">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy thông tin dịch vụ</p>
          <button
            onClick={() => navigate("/dashboard/services")}
            className="bg-[#FF7B7B] text-white px-6 py-2 rounded-full hover:bg-[#ff6565] transition-colors"
          >
            Quay lại danh sách dịch vụ
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleConfirmBooking = () => {
    // Validate form
    if (!selectedDate || !selectedTime || !paymentMethod) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (locationType === "home" && !address) {
      alert("Vui lòng nhập địa chỉ nhận dịch vụ tại nhà!");
      return;
    }

    // Add to requests
    const newRequest = {
      id: Date.now(),
      service: `${serviceData.serviceName}${serviceData.serviceWeight ? ` (${serviceData.serviceWeight})` : ''}${serviceData.serviceType ? ` - ${serviceData.serviceType === 'regular' ? 'Nhuộm thường' : 'Cao cấp'}` : ''}`,
      status: 'pending' as const,
      date: new Date().toISOString(),
      locationType,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      address: locationType === "home" ? address : "Tại cửa hàng MiaPET",
      paymentMethod,
      price: serviceData.servicePrice,
      note
    };

    addRequest(newRequest);
    
    // Add activity
    addActivity({
      id: Date.now(),
      title: 'Đặt dịch vụ mới',
      description: `${serviceData.serviceName} - ${selectedDate} lúc ${selectedTime}`,
      timestamp: new Date().toISOString(),
      type: 'order'
    });

    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <DashboardLayout title="Đặt dịch vụ thành công">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt dịch vụ thành công!</h2>
            <p className="text-gray-600 mb-8">
              Yêu cầu của bạn đang được xử lý. Chúng tôi sẽ liên hệ sớm nhất!
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Thông tin đặt dịch vụ</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dịch vụ:</span>
                  <span className="font-medium text-gray-900">{serviceData.serviceName}</span>
                </div>
                {serviceData.serviceWeight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cân nặng:</span>
                    <span className="font-medium text-gray-900">{serviceData.serviceWeight}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm:</span>
                  <span className="font-medium text-gray-900">
                    {locationType === "store" ? "Tại cửa hàng" : "Tận nhà"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium text-gray-900">{selectedDate} - {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thanh toán:</span>
                  <span className="font-medium text-gray-900">
                    {paymentMethod === "bank" ? "Chuyển khoản" : "Thanh toán khi nhận dịch vụ"}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-900 font-semibold">Tổng tiền:</span>
                  <span className="text-[#FF7B7B] font-bold text-xl">
                    {formatPrice(serviceData.servicePrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/dashboard/requests")}
                className="flex-1 bg-[#FF7B7B] text-white py-3 rounded-full hover:bg-[#ff6565] transition-colors font-semibold"
              >
                Xem yêu cầu của tôi
              </button>
              <button
                onClick={() => navigate("/dashboard/services")}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full hover:bg-gray-200 transition-colors font-semibold"
              >
                Tiếp tục đặt dịch vụ
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Đặt dịch vụ">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/services")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Info */}
            <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/5 rounded-2xl p-6 border border-[#FF7B7B]/20">
              <h3 className="font-bold text-gray-900 mb-3">Dịch vụ đã chọn</h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">{serviceData.serviceName}</p>
                {serviceData.serviceWeight && (
                  <p className="text-sm text-gray-600">Cân nặng: {serviceData.serviceWeight}</p>
                )}
                {serviceData.serviceType && (
                  <p className="text-sm text-gray-600">
                    Loại: {serviceData.serviceType === 'regular' ? 'Nhuộm thường' : 'Cao cấp'}
                  </p>
                )}
                <p className="text-2xl font-bold text-[#FF7B7B]">
                  {formatPrice(serviceData.servicePrice)}
                </p>
              </div>
            </div>

            {/* Location Type */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF7B7B]" />
                Chọn địa điểm dịch vụ
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setLocationType("store")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    locationType === "store"
                      ? 'border-[#FF7B7B] bg-[#FF7B7B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building2 className={`w-8 h-8 mx-auto mb-3 ${
                    locationType === "store" ? 'text-[#FF7B7B]' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-gray-900 mb-1">Tại cửa hàng</p>
                  <p className="text-xs text-gray-600">Mang thú cưng đến MiaPET</p>
                </button>

                <button
                  onClick={() => setLocationType("home")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    locationType === "home"
                      ? 'border-[#FF7B7B] bg-[#FF7B7B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Home className={`w-8 h-8 mx-auto mb-3 ${
                    locationType === "home" ? 'text-[#FF7B7B]' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-gray-900 mb-1">Tận nhà</p>
                  <p className="text-xs text-gray-600">Nhân viên đến tận nơi</p>
                </button>
              </div>

              {locationType === "home" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ nhận dịch vụ *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ chi tiết..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent outline-none"
                  />
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FF7B7B]" />
                Chọn ngày và giờ
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày hẹn *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent outline-none text-left flex items-center justify-between"
                  >
                    <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
                      {selectedDate || "Chọn ngày"}
                    </span>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </button>

                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div
                      ref={calendarRef}
                      className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 w-80"
                    >
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h3 className="font-semibold text-gray-900">
                          {format(currentMonth, "MMMM yyyy", { locale: vi })}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-1">
                        {(() => {
                          const monthStart = startOfMonth(currentMonth);
                          const monthEnd = endOfMonth(currentMonth);
                          const startDate = new Date(monthStart);
                          startDate.setDate(startDate.getDate() - monthStart.getDay());
                          
                          const endDate = new Date(monthEnd);
                          endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
                          
                          const days = eachDayOfInterval({ start: startDate, end: endDate });
                          const today = startOfToday();

                          return days.map((day) => {
                            const dateStr = format(day, "yyyy-MM-dd");
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isSelected = dateStr === selectedDate;
                            const isTodayDate = isToday(day);
                            const isPast = isBefore(day, today);

                            return (
                              <button
                                key={dateStr}
                                type="button"
                                onClick={() => {
                                  if (!isPast) {
                                    setSelectedDate(dateStr);
                                    setShowCalendar(false);
                                  }
                                }}
                                disabled={isPast}
                                className={`
                                  aspect-square p-2 rounded-lg text-sm font-medium transition-all
                                  ${!isCurrentMonth ? "text-gray-300" : ""}
                                  ${isSelected ? "bg-[#FF7B7B] text-white" : ""}
                                  ${!isSelected && isTodayDate ? "bg-[#FF7B7B]/10 text-[#FF7B7B]" : ""}
                                  ${!isSelected && !isTodayDate && isCurrentMonth && !isPast ? "hover:bg-gray-100 text-gray-700" : ""}
                                  ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                                `}
                              >
                                {format(day, "d")}
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ hẹn *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent outline-none"
                  >
                    <option value="">Chọn giờ</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Ghi chú (Tùy chọn)</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Thêm ghi chú cho nhân viên (ví dụ: thú cưng hay sợ nước, cần xử lý nhẹ nhàng...)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#FF7B7B]" />
                Phương thức thanh toán
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === "bank"
                      ? 'border-[#FF7B7B] bg-[#FF7B7B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "bank" ? 'border-[#FF7B7B]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === "bank" && (
                      <div className="w-3 h-3 rounded-full bg-[#FF7B7B]" />
                    )}
                  </div>
                  <CreditCard className={`w-6 h-6 ${
                    paymentMethod === "bank" ? 'text-[#FF7B7B]' : 'text-gray-400'
                  }`} />
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">Chuyển khoản ngân hàng</p>
                    <p className="text-sm text-gray-600">Thanh toán trước qua chuyển khoản</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === "cod"
                      ? 'border-[#FF7B7B] bg-[#FF7B7B]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "cod" ? 'border-[#FF7B7B]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === "cod" && (
                      <div className="w-3 h-3 rounded-full bg-[#FF7B7B]" />
                    )}
                  </div>
                  <Wallet className={`w-6 h-6 ${
                    paymentMethod === "cod" ? 'text-[#FF7B7B]' : 'text-gray-400'
                  }`} />
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-900">Thanh toán khi nhận dịch vụ</p>
                    <p className="text-sm text-gray-600">Thanh toán trực tiếp bằng tiền mặt</p>
                  </div>
                </button>
              </div>

              {paymentMethod === "bank" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Thông tin chuyển khoản:</p>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>Ngân hàng: <strong>MB Bank</strong></p>
                    <p>Số tài khon: <strong>0123456789</strong></p>
                    <p>Chủ tài khoản: <strong>MIAPET PET CARE</strong></p>
                    <p className="text-xs text-blue-600 mt-2">
                      * Vui lòng chuyển khoản và giữ lại biên lai
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Tóm tắt đặt dịch vụ</h3>
              
              <div className="space-y-3 mb-6">
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Dịch vụ</p>
                  <p className="font-semibold text-gray-900">{serviceData.serviceName}</p>
                  {serviceData.serviceWeight && (
                    <p className="text-xs text-gray-500 mt-1">Cân nặng: {serviceData.serviceWeight}</p>
                  )}
                </div>

                <div className="pb-3 border-b border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Địa điểm</p>
                  <p className="font-medium text-gray-900">
                    {locationType === "store" ? "🏪 Tại cửa hàng" : "🏠 Tận nhà"}
                  </p>
                </div>

                {selectedDate && selectedTime && (
                  <div className="pb-3 border-b border-gray-100">
                    <p className="text-sm text-gray-600 mb-1">Thời gian</p>
                    <p className="font-medium text-gray-900">{selectedDate}</p>
                    <p className="text-sm text-gray-600">{selectedTime}</p>
                  </div>
                )}

                {paymentMethod && (
                  <div className="pb-3 border-b border-gray-100">
                    <p className="text-sm text-gray-600 mb-1">Thanh toán</p>
                    <p className="font-medium text-gray-900">
                      {paymentMethod === "bank" ? "💳 Chuyển khoản" : "💵 Tiền mặt"}
                    </p>
                  </div>
                )}

                <div className="pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Giá dịch vụ</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(serviceData.servicePrice)}
                    </span>
                  </div>
                  {locationType === "home" && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Phí tận nhà</span>
                      <span className="font-medium text-gray-900">30,000₫</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
                    <span className="font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-2xl font-bold text-[#FF7B7B]">
                      {formatPrice(serviceData.servicePrice + (locationType === "home" ? 30000 : 0))}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full bg-[#FF7B7B] text-white py-3 rounded-full hover:bg-[#ff6565] transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                Xác nhận đặt dịch vụ
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Bằng việc đặt dịch vụ, bạn đồng ý với điều khoản sử dụng của MiaPET
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}