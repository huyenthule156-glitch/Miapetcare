import { StaffLayout } from "../../components/staff-layout";
import { useState } from "react";
import { Syringe, Scissors, Droplet, Home, Calendar, User, Phone, CheckCircle2, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { getTimeSlotBookingCount, createBooking, MAX_BOOKINGS_PER_SLOT } from "../../services/booking-service";

type ServiceCategory = "vaccination" | "grooming" | "bath" | "hotel";

export function StaffServices() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    petName: "",
    petType: "dog" as "dog" | "cat",
    appointmentDate: "",
    appointmentTime: "",
    endDate: "", // For hotel services
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentEndMonth, setCurrentEndMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [isHotelService, setIsHotelService] = useState(false);

  // Vaccination Services
  const vaccinationServices = [
    { name: "6 bệnh (Chó)", price: "200.000đ", priceValue: 200000, description: "Phòng bệnh Carré, Parvo, Corona..." },
    { name: "7 bệnh (Chó)", price: "250.000đ", priceValue: 250000, description: "Phòng 6 bệnh + Viêm gan" },
    { name: "Dại (Chó/Mèo)", price: "100.000đ", priceValue: 100000, description: "Vaccine phòng bệnh dại" },
    { name: "3 bệnh (Mèo)", price: "180.000đ", priceValue: 180000, description: "Phòng Calici, Rhino, Panleukopenia" },
    { name: "4 bệnh (Mèo)", price: "220.000đ", priceValue: 220000, description: "Phòng 3 bệnh + Chlamydia" }
  ];

  // Grooming Services
  const groomingServices = [
    { name: "Tắm + Cắt tỉa (Chó <5kg)", price: "150.000đ - 200.000đ", priceValue: 150000, description: "Tắm gội, cắt tỉa lông cơ bản" },
    { name: "Tắm + Cắt tỉa (Chó 5-10kg)", price: "200.000đ - 250.000đ", priceValue: 200000, description: "Tắm gội, cắt tỉa lông cơ bản" },
    { name: "Tắm + Cắt tỉa (Chó 10-15kg)", price: "250.000đ - 300.000đ", priceValue: 250000, description: "Tắm gội, cắt tỉa lông cơ bản" },
    { name: "Nhuộm tai", price: "30.000đ - 50.000đ", priceValue: 30000, description: "Nhuộm tai an toàn cho thú cưng" },
    { name: "Nhuộm chân", price: "50.000đ - 100.000đ", priceValue: 50000, description: "Nhuộm 4 chân" },
    { name: "Nhuộm toàn thân", price: "150.000đ - 500.000đ", priceValue: 150000, description: "Nhuộm toàn bộ lông" }
  ];

  // Bath Services
  const bathServices = [
    { name: "Tắm cơ bản (Chó <3kg)", price: "70.000đ", priceValue: 70000, description: "Tắm gội, sấy khô" },
    { name: "Tắm cơ bản (Chó 3-5kg)", price: "80.000đ", priceValue: 80000, description: "Tắm gội, sấy khô" },
    { name: "Tắm cơ bản (Chó 5-10kg)", price: "100.000đ", priceValue: 100000, description: "Tắm gội, sấy khô" },
    { name: "Tắm cơ bản (Chó 10-15kg)", price: "120.000đ", priceValue: 120000, description: "Tắm gội, sấy khô" },
    { name: "Tắm cao cấp (Chó <3kg)", price: "100.000đ", priceValue: 100000, description: "Tắm spa, massage, dưỡng lông" },
    { name: "Tắm cao cấp (Chó 3-5kg)", price: "120.000đ", priceValue: 120000, description: "Tắm spa, massage, dưỡng lông" },
    { name: "Tắm (Mèo <3kg)", price: "150.000đ", priceValue: 150000, description: "Tắm gội chuyên dụng cho mèo" },
    { name: "Tắm (Mèo 3-6kg)", price: "180.000đ", priceValue: 180000, description: "Tắm gội chuyên dụng cho mèo" },
    { name: "Vệ sinh tai, mắt, móng", price: "30.000đ", priceValue: 30000, description: "Vệ sinh toàn diện" }
  ];

  // Hotel Services (price per day)
  const hotelServices = [
    { name: "Phòng tiêu chuẩn (Ngày)", price: "100.000đ/ngày", priceValue: 100000, description: "Phòng 1-2 bé, có điều hòa", isDaily: true },
    { name: "Phòng tiêu chuẩn (Tuần)", price: "630.000đ", priceValue: 630000, description: "7 ngày, giảm 10%", isDaily: false },
    { name: "Phòng tiêu chuẩn (Tháng)", price: "2.400.000đ", priceValue: 2400000, description: "30 ngày, giảm 20%", isDaily: false },
    { name: "Phòng VIP (Ngày)", price: "150.000đ/ngày", priceValue: 150000, description: "Phòng riêng, camera, đồ chơi", isDaily: true },
    { name: "Phòng VIP (Tuần)", price: "945.000đ", priceValue: 945000, description: "7 ngày, giảm 10%", isDaily: false },
    { name: "Phòng VIP (Tháng)", price: "3.600.000đ", priceValue: 3600000, description: "30 ngày, giảm 20%", isDaily: false }
  ];

  const serviceCategories = [
    {
      id: "vaccination" as const,
      name: "Tiêm phòng chó mèo",
      icon: Syringe,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      services: vaccinationServices
    },
    {
      id: "grooming" as const,
      name: "Grooming, cắt tỉa, nhuộm",
      icon: Scissors,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      services: groomingServices
    },
    {
      id: "bath" as const,
      name: "Dịch vụ tắm chó mèo",
      icon: Droplet,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      services: bathServices
    },
    {
      id: "hotel" as const,
      name: "Trông giữ chó mèo",
      icon: Home,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      services: hotelServices
    }
  ];

  const handleBookService = (categoryId: string, categoryName: string, service: any) => {
    setSelectedService({
      categoryId,
      category: categoryName,
      ...service
    });
    setBookingForm({
      customerName: "",
      customerPhone: "",
      petName: "",
      petType: "dog",
      appointmentDate: "",
      appointmentTime: "",
      endDate: "",
      notes: ""
    });
    setShowBookingModal(true);
    setIsHotelService(categoryId === "hotel");
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
    setBookingSuccess(false);
    setShowCalendar(false);
    setShowEndCalendar(false);
  };

  // Calculate total days and price for hotel services
  const calculateHotelTotal = () => {
    if (!isHotelService || !selectedService || !selectedService.isDaily) {
      return { days: 0, total: 0 };
    }

    if (!bookingForm.appointmentDate || !bookingForm.endDate) {
      return { days: 0, total: 0 };
    }

    const startDate = new Date(bookingForm.appointmentDate);
    const endDate = new Date(bookingForm.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      days: diffDays,
      total: diffDays * selectedService.priceValue
    };
  };

  const handleSubmitBooking = async () => {
    // Validate
    if (!bookingForm.customerName || !bookingForm.customerPhone || !bookingForm.appointmentDate || !bookingForm.appointmentTime) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Only validate end date for daily hotel services
    if (isHotelService && selectedService?.isDaily && !bookingForm.endDate) {
      alert("Vui lòng chọn ngày kết thúc cho dịch vụ trông giữ theo ngày!");
      return;
    }

    if (isHotelService && selectedService?.isDaily && bookingForm.endDate) {
      const startDate = new Date(bookingForm.appointmentDate);
      const endDate = new Date(bookingForm.endDate);
      if (endDate <= startDate) {
        alert("Ngày kết thúc phải sau ngày bắt đầu!");
        return;
      }
    }

    // Calculate total for hotel services
    const hotelTotal = calculateHotelTotal();

    // Create booking using service layer (will be replaced with API call)
    await createBooking({
      customerName: bookingForm.customerName,
      customerPhone: bookingForm.customerPhone,
      petName: bookingForm.petName,
      petType: bookingForm.petType,
      appointmentDate: bookingForm.appointmentDate,
      appointmentTime: bookingForm.appointmentTime,
      endDate: bookingForm.endDate,
      notes: bookingForm.notes,
      service: selectedService,
      totalDays: (isHotelService && selectedService?.isDaily) ? hotelTotal.days : null,
      totalPrice: (isHotelService && selectedService?.isDaily) ? hotelTotal.total : selectedService.priceValue,
      status: "pending"
    });

    // Show success
    setBookingSuccess(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      closeBookingModal();
    }, 2000);
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setBookingForm({ ...bookingForm, appointmentDate: dateStr });
    setShowCalendar(false);
  };

  const handleEndDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setBookingForm({ ...bookingForm, endDate: dateStr });
    setShowEndCalendar(false);
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const renderCalendar = (show: boolean, handleDateSelect: (date: Date) => void, monthState: Date, setMonthState: (date: Date) => void) => {
    if (!show) return null;

    const year = monthState.getFullYear();
    const month = monthState.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Adjust for Monday start (0 = Sunday in JS, we want 1 = Monday)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: adjustedFirstDay }, (_, i) => i);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4 w-80">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMonthState(new Date(year, month - 1))}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <p className="text-gray-900 font-semibold">
            Tháng {month + 1}, {year}
          </p>
          <button
            onClick={() => setMonthState(new Date(year, month + 1))}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="h-9"></div>
          ))}
          {days.map((day) => {
            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            const isPast = date < today;
            const isToday = date.getTime() === today.getTime();

            return (
              <button
                key={day}
                onClick={() => !isPast && handleDateSelect(date)}
                disabled={isPast}
                className={`h-9 rounded-lg text-sm font-medium transition-all ${
                  isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : isToday
                    ? "bg-[#FF7B7B] text-white hover:bg-[#ff6565]"
                    : "text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B]"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Time slots
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // Check if time slot has reached maximum capacity (4 bookings)
  const isTimeSlotFull = (date: string, time: string): boolean => {
    return getTimeSlotBookingCount(date, time) >= MAX_BOOKINGS_PER_SLOT;
  };

  const hotelTotal = calculateHotelTotal();

  return (
    <StaffLayout title="Quản l�� dịch vụ">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] rounded-2xl shadow-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl mb-2">Quản lý dịch vụ MiaPET</h1>
        <p className="opacity-90">Xem bảng giá và đặt lịch dịch vụ cho khách hàng</p>
      </div>

      {/* Service Categories */}
      <div className="space-y-4">
        {serviceCategories.map((category) => {
          const Icon = category.icon;
          const isExpanded = selectedCategory === category.id;

          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => setSelectedCategory(isExpanded ? null : category.id)}
                className={`w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  isExpanded ? category.bgColor : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.services.length} dịch vụ</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Services List */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tên dịch vụ</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mô tả</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giá</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {category.services.map((service, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{service.description}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-[#FF7B7B]">{service.price}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleBookService(category.id, category.name, service)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors text-sm font-semibold"
                              >
                                <Calendar className="w-4 h-4" />
                                Đặt lịch
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowCalendar(false);
            setShowEndCalendar(false);
          }
        }}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Đặt lịch dịch vụ</h3>
              <button
                onClick={closeBookingModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            {bookingSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h4>
                <p className="text-gray-600">Lịch hẹn đã được lưu vào hệ thống.</p>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Service Info */}
                <div className="bg-[#FF7B7B]/10 rounded-lg p-4 border border-[#FF7B7B]/20">
                  <div className="text-sm text-gray-600 mb-1">Dịch vụ đã chọn</div>
                  <div className="font-bold text-gray-900 text-lg">{selectedService.category}</div>
                  <div className="text-gray-800 mt-1">{selectedService.name}</div>
                  <div className="text-[#FF7B7B] font-bold mt-2">
                    {selectedService.price}
                    {isHotelService && hotelTotal.days > 0 && (
                      <span className="ml-2 text-sm">
                        → {hotelTotal.days} ngày = {hotelTotal.total.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên khách hàng <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={bookingForm.customerName}
                        onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                      />
                    </div>
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={bookingForm.customerPhone}
                        onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                        placeholder="0987654321"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pet Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên thú cưng
                      <span className="text-gray-500 font-normal ml-1">(không bắt buộc)</span>
                    </label>
                    <input
                      type="text"
                      value={bookingForm.petName}
                      onChange={(e) => setBookingForm({ ...bookingForm, petName: e.target.value })}
                      placeholder="Mập"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                    />
                  </div>

                  {/* Pet Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loại thú cưng
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, petType: "dog" })}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition-all ${
                          bookingForm.petType === "dog"
                            ? "border-[#FF7B7B] bg-[#FF7B7B]/10 text-[#FF7B7B]"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        🐕 Chó
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, petType: "cat" })}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition-all ${
                          bookingForm.petType === "cat"
                            ? "border-[#FF7B7B] bg-[#FF7B7B]/10 text-[#FF7B7B]"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        🐱 Mèo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {(isHotelService && selectedService?.isDaily) ? "Ngày nhận" : "Ngày hẹn"} <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCalendar(!showCalendar);
                        setShowEndCalendar(false);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] text-left flex items-center justify-between"
                    >
                      <span className={bookingForm.appointmentDate ? "text-gray-900" : "text-gray-400"}>
                        {bookingForm.appointmentDate ? formatDateDisplay(bookingForm.appointmentDate) : "Chọn ngày"}
                      </span>
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </button>
                    {renderCalendar(showCalendar, handleDateSelect, currentMonth, setCurrentMonth)}
                  </div>

                  {/* End Date (only for daily hotel services) */}
                  {isHotelService && selectedService?.isDaily && (
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ngày trả <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEndCalendar(!showEndCalendar);
                          setShowCalendar(false);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] text-left flex items-center justify-between"
                      >
                        <span className={bookingForm.endDate ? "text-gray-900" : "text-gray-400"}>
                          {bookingForm.endDate ? formatDateDisplay(bookingForm.endDate) : "Chọn ngày"}
                        </span>
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </button>
                      {renderCalendar(showEndCalendar, handleEndDateSelect, currentEndMonth, setCurrentEndMonth)}
                    </div>
                  )}
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giờ hẹn <span className="text-red-500">*</span>
                    {bookingForm.appointmentDate && (
                      <span className="ml-2 text-xs text-gray-500 font-normal">
                        (Mỗi khung giờ tối đa 4 lịch hẹn)
                      </span>
                    )}
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {timeSlots.map((time) => {
                      const count = getTimeSlotBookingCount(bookingForm.appointmentDate, time);
                      const isFull = count >= 4;
                      const isSelected = bookingForm.appointmentTime === time;
                      
                      return (
                        <div key={time} className="relative">
                          <button
                            type="button"
                            onClick={() => !isFull && setBookingForm({ ...bookingForm, appointmentTime: time })}
                            disabled={isFull}
                            className={`w-full py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all ${
                              isFull
                                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                : isSelected
                                ? "border-[#FF7B7B] bg-[#FF7B7B]/10 text-[#FF7B7B]"
                                : "border-gray-300 text-gray-700 hover:border-[#FF7B7B]/50"
                            }`}
                          >
                            {time}
                          </button>
                          {bookingForm.appointmentDate && count > 0 && (
                            <div className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                              isFull ? "bg-red-500 text-white" : "bg-orange-500 text-white"
                            }`}>
                              {count}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ghi chú
                    <span className="text-gray-500 font-normal ml-1">(không bắt buộc)</span>
                  </label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    placeholder="Ghi chú thêm về thú cưng hoặc yêu cầu đặc biệt..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                  />
                </div>

                {/* Total Price (for hotel) */}
                {isHotelService && hotelTotal.days > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Tổng thời gian</p>
                        <p className="text-lg font-bold text-gray-900">{hotelTotal.days} ngày</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Tổng tiền</p>
                        <p className="text-2xl font-bold text-[#FF7B7B]">
                          {hotelTotal.total.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    className="flex-1 px-6 py-3 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Xác nhận đặt lịch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-800">
          <strong>💡 Hướng dẫn:</strong> Click vào từng mục dịch vụ để xem chi tiết bảng giá. Nhấn nút "Đặt lịch" để đặt lịch hẹn cho khách hàng gọi đến. 
          {isHotelService && " Với dịch vụ trông giữ, giá sẽ được tính tự động theo số ngày."}
        </p>
      </div>
    </StaffLayout>
  );
}