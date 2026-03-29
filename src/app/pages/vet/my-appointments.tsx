import { VetLayout } from "../../components/vet-layout";
import { useAuth } from "../../contexts/auth-context";
import { useState, useEffect } from "react";
import { getAllBookings, updateBooking, Booking } from "../../services/booking-service";
import {
  Calendar,
  Clock,
  MapPin,
  Home,
  Building2,
  FileText,
  CreditCard,
  ChevronDown,
  CheckCircle2,
  Filter,
  User,
  Phone,
  PawPrint,
} from "lucide-react";

export function VetMyAppointments() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Load bookings when component mounts
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const allBookings = getAllBookings();
    setBookings(allBookings);
  };

  // Filter appointments assigned to this vet and completed
  const myAppointments = bookings.filter(
    (booking) => 
      booking.assignedDoctor === user?.username && 
      booking.status === 'completed'
  );

  const filteredAppointments = myAppointments.filter((booking) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "upcoming") {
      const appointmentDate = new Date(booking.appointmentDate + ' ' + booking.appointmentTime);
      const currentDate = new Date();
      return appointmentDate > currentDate;
    }
    return booking.status === "completed";
  });

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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Chờ xử lý',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-600',
        };
      case 'confirmed':
        return {
          label: 'Đã xác nhận',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-600',
        };
      case 'completed':
        return {
          label: 'Đã hoàn thành',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle2,
          iconColor: 'text-green-600',
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-600',
        };
    }
  };

  // Sort by appointment date
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(a.appointmentDate + ' ' + a.appointmentTime);
    const dateB = new Date(b.appointmentDate + ' ' + b.appointmentTime);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });

  return (
    <VetLayout title="Lịch hẹn của tôi">
      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Lịch sử lịch hẹn đã hoàn thành
              </h2>
              <p className="text-gray-600 mt-1">
                Tổng cộng:{" "}
                <span className="font-semibold text-green-600">
                  {myAppointments.length}
                </span>{" "}
                lịch hẹn đã hoàn thành
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">Tất cả</option>
                <option value="upcoming">Sắp tới</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {sortedAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có lịch hẹn nào đã hoàn thành
            </h3>
            <p className="text-gray-600 mb-6">
              Sau khi hoàn thành các lịch hẹn, chúng sẽ được hiển thị ở đây
            </p>
            <button
              onClick={() => window.location.href = '/vet/pending-appointments'}
              className="bg-[#FF7B7B] text-white px-6 py-3 rounded-full hover:bg-[#FF6666] transition-colors font-semibold inline-flex items-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Xem lịch hẹn chờ xử lý
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAppointments.map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedId === appointment.id;

              return (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-green-200 transition-all overflow-hidden"
                >
                  {/* Main Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {appointment.service.category} - {appointment.service.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} flex items-center gap-1`}
                          >
                            <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Hoàn thành lúc: {formatDate(appointment.createdAt)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {formatPrice(appointment.totalPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-gray-500">Ngày hẹn</p>
                          <p className="font-semibold text-gray-900">
                            {formatAppointmentDate(appointment.appointmentDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-gray-500">Giờ hẹn</p>
                          <p className="font-semibold text-gray-900">
                            {appointment.appointmentTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-green-600" />
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

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : appointment.id)
                      }
                      className="w-full flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm py-2 border-t border-gray-100 transition-colors"
                    >
                      {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
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

                        {/* Success Message */}
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            ✅ Lịch hẹn đã hoàn thành. Cảm ơn bạn đã thực hiện tốt nhiệm vụ!
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
      </div>
    </VetLayout>
  );
}