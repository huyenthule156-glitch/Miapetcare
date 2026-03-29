import { StaffLayout } from "../../components/staff-layout";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, PawPrint, FileText, CheckCircle2, XCircle, AlertCircle, Stethoscope, X } from "lucide-react";
import { getAllBookings, updateBooking, Booking } from "../../services/booking-service";

export function StaffBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");

  // Danh sách bác sĩ thú y
  const doctors = [
    { id: "bsty1", name: "BS. Nguyễn Văn A", specialty: "Chó mèo tổng quát" },
    { id: "bsty2", name: "BS. Trần Thị B", specialty: "Ngoại khoa" },
    { id: "bsty3", name: "BS. Lê Văn C", specialty: "Da liễu" },
    { id: "bsty4", name: "BS. Phạm Thị D", specialty: "Nội khoa" },
  ];

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = getAllBookings();
    // Sort by date and time, newest first
    const sorted = allBookings.sort((a, b) => {
      const dateCompare = b.appointmentDate.localeCompare(a.appointmentDate);
      if (dateCompare !== 0) return dateCompare;
      return b.appointmentTime.localeCompare(a.appointmentTime);
    });
    setBookings(sorted);
  };

  const handleAssignDoctor = (booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedDoctor(booking.assignedDoctor || "");
    setShowAssignModal(true);
  };

  const submitAssignDoctor = () => {
    if (!selectedBooking || !selectedDoctor) {
      alert("Vui lòng chọn bác sĩ!");
      return;
    }

    const doctorInfo = doctors.find(d => d.id === selectedDoctor);
    if (!doctorInfo) return;

    updateBooking(selectedBooking.id, {
      assignedDoctor: selectedDoctor,
      assignedDoctorName: doctorInfo.name,
      status: "confirmed"
    });

    loadBookings();
    setShowAssignModal(false);
    setSelectedBooking(null);
    setSelectedDoctor("");
  };

  const updateBookingStatus = (id: number, status: Booking["status"]) => {
    updateBooking(id, { status });
    loadBookings();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const badges = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: AlertCircle, label: "Chờ xử lý" },
      confirmed: { bg: "bg-blue-100", text: "text-blue-800", icon: CheckCircle2, label: "Đã xác nhận" },
      completed: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle2, label: "Hoàn thành" },
      cancelled: { bg: "bg-red-100", text: "text-red-800", icon: XCircle, label: "Đã hủy" },
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus !== "all" && booking.status !== filterStatus) return false;
    if (filterDate && booking.appointmentDate !== filterDate) return false;
    return true;
  });

  // Group by date
  const groupedBookings = filteredBookings.reduce((acc, booking) => {
    const date = booking.appointmentDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  return (
    <StaffLayout title="Danh sách dịch vụ">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] rounded-2xl shadow-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl mb-2">Danh sách lịch hẹn dịch vụ</h1>
        <p className="opacity-90">Quản lý và phân công bác sĩ thú y cho các lịch hẹn</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === "pending").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã xác nhận</p>
              <p className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === "confirmed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng số</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lọc theo trạng thái
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lọc theo ngày
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
            />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {Object.keys(groupedBookings).length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Chưa có lịch hẹn nào</p>
          </div>
        ) : (
          Object.entries(groupedBookings).map(([date, dateBookings]) => (
            <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Date Header */}
              <div className="bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] px-6 py-3">
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-bold">{formatDate(date)}</h3>
                  <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
                    {dateBookings.length} lịch hẹn
                  </span>
                </div>
              </div>

              {/* Bookings */}
              <div className="divide-y divide-gray-200">
                {dateBookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Time */}
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Clock className="w-5 h-5 text-[#FF7B7B]" />
                        <span className="font-bold text-gray-900">{booking.appointmentTime}</span>
                      </div>

                      {/* Service Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{booking.service.category}</h4>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{booking.service.name}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{booking.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{booking.customerPhone}</span>
                          </div>
                          {booking.petName && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <PawPrint className="w-4 h-4" />
                              <span>{booking.petName} ({booking.petType === "dog" ? "Chó" : "Mèo"})</span>
                            </div>
                          )}
                          {booking.notes && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <FileText className="w-4 h-4" />
                              <span className="truncate">{booking.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Hotel Service Info */}
                        {booking.endDate && (
                          <div className="mt-2 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-sm">
                            <span className="text-green-700">
                              Trông giữ: {formatDate(booking.appointmentDate)} → {formatDate(booking.endDate)}
                              {booking.totalDays && ` (${booking.totalDays} ngày)`}
                            </span>
                          </div>
                        )}

                        {/* Assigned Doctor */}
                        {booking.assignedDoctorName && (
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <Stethoscope className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 font-semibold">{booking.assignedDoctorName}</span>
                          </div>
                        )}
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col gap-2 items-end min-w-[180px]">
                        {getStatusBadge(booking.status)}
                        
                        <div className="flex gap-2 mt-2">
                          {booking.status === "pending" && (
                            <button
                              onClick={() => handleAssignDoctor(booking)}
                              className="px-3 py-1.5 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors text-xs font-semibold flex items-center gap-1"
                            >
                              <Stethoscope className="w-3 h-3" />
                              Phân công
                            </button>
                          )}
                          
                          {booking.status === "confirmed" && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, "completed")}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-semibold"
                            >
                              Hoàn thành
                            </button>
                          )}
                          
                          {(booking.status === "pending" || booking.status === "confirmed") && (
                            <button
                              onClick={() => {
                                if (confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
                                  updateBookingStatus(booking.id, "cancelled");
                                }
                              }}
                              className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-semibold"
                            >
                              Hủy
                            </button>
                          )}
                        </div>

                        <div className="text-xs text-gray-500">
                          Giá: {booking.totalPrice.toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Assign Doctor Modal */}
      {showAssignModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Phân công bác sĩ</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Booking Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">{selectedBooking.service.category}</h4>
                <p className="text-sm text-gray-600">{selectedBooking.service.name}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{formatDate(selectedBooking.appointmentDate)}</span>
                  <Clock className="w-4 h-4 text-gray-500 ml-2" />
                  <span>{selectedBooking.appointmentTime}</span>
                </div>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chọn bác sĩ thú y <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDoctor === doctor.id
                          ? "border-[#FF7B7B] bg-[#FF7B7B]/10"
                          : "border-gray-300 hover:border-[#FF7B7B]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                        {selectedDoctor === doctor.id && (
                          <CheckCircle2 className="w-6 h-6 text-[#FF7B7B]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Hủy
                </button>
                <button
                  onClick={submitAssignDoctor}
                  className="flex-1 px-6 py-3 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors font-semibold"
                >
                  Xác nhận phân công
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </StaffLayout>
  );
}