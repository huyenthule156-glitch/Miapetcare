import { VetLayout } from "../../components/vet-layout";
import { useAuth } from "../../contexts/auth-context";
import { useState, useEffect } from "react";
import { getAllBookings, Booking, updateBooking } from "../../services/booking-service";
import {
  Clock,
  Calendar,
  MapPin,
  Home,
  Building2,
  CreditCard,
  FileText,
  CheckCircle2,
  ChevronDown,
  UserCheck,
  User,
  Phone,
  PawPrint
} from "lucide-react";

export function VetPendingAppointments() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Load bookings when component mounts
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = getAllBookings();
    setBookings(allBookings);
  };

  // Filter appointments that are confirmed and assigned to this vet
  const pendingAppointments = bookings.filter(
    (booking) => 
      booking.status === 'confirmed' && 
      booking.assignedDoctor === user?.username
  );

  const handleCompleteAppointment = (bookingId: number, serviceName: string) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn đánh dấu lịch hẹn "${serviceName}" là đã hoàn thành?`
    );

    if (confirmed) {
      updateBooking(bookingId, { status: 'completed' });
      loadBookings(); // Reload to update UI
      alert(`✅ Đã hoàn thành lịch hẹn!\\n\\nLịch hẹn đã được chuyển vào "Lịch hẹn của tôi".`);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAppointmentDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", { 
      weekday: "short", 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit" 
    });
  };

  return (
    <VetLayout title="Lịch hẹn chờ xử lý">
      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Danh sách lịch hẹn được phân công
              </h2>
              <p className="text-gray-600 mt-1">
                Tổng cộng:{" "}
                <span className="font-semibold text-blue-600">
                  {pendingAppointments.length}
                </span>{" "}
                lịch hẹn đang chờ bạn xử lý
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-2xl">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {pendingAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không có lịch hẹn chờ xử lý
            </h3>
            <p className="text-gray-600">
              Hiện tại không có lịch hẹn nào được phân công cho bạn. Hãy kiểm tra lại sau!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingAppointments.map((appointment) => {
              const isExpanded = expandedId === appointment.id;

              return (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-200 transition-all overflow-hidden"
                >
                  {/* Main Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {appointment.service.category} - {appointment.service.name}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Đã phân công
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Tạo lúc: {formatDate(appointment.createdAt)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatPrice(appointment.totalPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-gray-500">Ngày hẹn</p>
                          <p className="font-semibold text-gray-900">
                            {formatAppointmentDate(appointment.appointmentDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-gray-500">Giờ hẹn</p>
                          <p className="font-semibold text-gray-900">
                            {appointment.appointmentTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-gray-500">Khách hàng</p>
                          <p className="font-semibold text-gray-900">
                            {appointment.customerName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.customerPhone}</span>
                      </div>
                      {appointment.petName && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <PawPrint className="w-4 h-4" />
                          <span>{appointment.petName} ({appointment.petType === "dog" ? "Chó" : "Mèo"})</span>
                        </div>
                      )}
                    </div>

                    {/* Hotel Service Info */}
                    {appointment.endDate && (
                      <div className="mb-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-sm">
                        <span className="text-green-700">
                          Trông giữ: {formatAppointmentDate(appointment.appointmentDate)} → {formatAppointmentDate(appointment.endDate)}
                          {appointment.totalDays && ` (${appointment.totalDays} ngày)`}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : appointment.id)
                        }
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-700 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Complete Button - Show only after appointment time has passed */}
                      {(() => {
                        const appointmentDateTime = new Date(appointment.appointmentDate + ' ' + appointment.appointmentTime);
                        const currentDateTime = new Date();
                        const isPastAppointment = appointmentDateTime < currentDateTime;

                        if (isPastAppointment) {
                          return (
                            <button
                              onClick={() => handleCompleteAppointment(appointment.id, `${appointment.service.category} - ${appointment.service.name}`)}
                              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center gap-2 shadow-lg"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                              Hoàn thành
                            </button>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-4">
                        {appointment.notes && (
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">Ghi chú</p>
                              <p className="text-sm text-gray-700 italic">
                                "{appointment.notes}"
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Reminder Message */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            💡 <strong>Lưu ý:</strong> Lịch hẹn này đã được nhân viên phân công cho bạn. 
                            Sau khi hoàn thành dịch vụ, hãy đánh dấu "Hoàn thành" để chuyển vào lịch sử.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Help Info */}
        {pendingAppointments.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Hướng dẫn xử lý lịch hẹn
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Kiểm tra thời gian và địa điểm trước khi đến</li>
                  <li>Liên hệ khách hàng qua số điện thoại nếu cần</li>
                  <li>Chuẩn bị đầy đủ dụng cụ và thuốc men cần thiết</li>
                  <li>Sau khi hoàn thành, đánh dấu "Hoàn thành" trên hệ thống</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </VetLayout>
  );
}