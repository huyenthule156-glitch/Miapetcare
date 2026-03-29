import { DashboardLayout } from "../../components/dashboard-layout";
import { useDashboard } from "../../context/dashboard-context";
import { useState } from "react";
import { 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  CreditCard, 
  FileText,
  Home,
  Building2,
  ChevronDown,
  Filter,
  UserCheck,
  Stethoscope
} from "lucide-react";

export function DashboardAppointments() {
  const { requests } = useDashboard();
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
      minute: '2-digit'
    });
  };

  // Chỉ lấy các lịch hẹn đã có bác sĩ nhận
  const appointments = requests.filter(req => req.vetName);

  const filteredAppointments = appointments.filter(apt => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return apt.status === 'pending';
    if (filterStatus === 'completed') return apt.status === 'completed';
    return false;
  });

  return (
    <DashboardLayout title="Lịch hẹn">
      <div className="max-w-6xl mx-auto">
        {/* Header with Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lịch hẹn của tôi</h2>
              <p className="text-gray-600 mt-1">
                Tổng cộng: <span className="font-semibold text-[#FF7B7B]">{appointments.length}</span> lịch hẹn
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent outline-none"
              >
                <option value="all">Tất cả lịch hẹn</option>
                <option value="pending">Đang chờ xử lý</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filterStatus === 'all' ? 'Chưa có lịch hẹn nào' : `Không có lịch hẹn ${filterStatus === 'pending' ? 'đang chờ xử lý' : 'đã hoàn thành'}`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? 'Các yêu cầu dịch vụ sẽ tự động chuyển thành lịch hẹn khi có bác sĩ nhận!'
                : 'Thử thay đổi bộ lọc để xem các lịch hẹn khác'}
            </p>
            {filterStatus === 'all' && (
              <button
                onClick={() => window.location.href = '/dashboard/services'}
                className="bg-[#FF7B7B] text-white px-6 py-3 rounded-full hover:bg-[#ff6565] transition-colors font-semibold inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Đặt dịch vụ ngay
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => {
              const isExpanded = expandedId === appointment.id;

              // Determine badge based on status
              const isCompleted = appointment.status === 'completed';
              const badgeConfig = isCompleted 
                ? {
                    label: 'Đã hoàn thành',
                    className: 'bg-green-100 text-green-800 border-green-200',
                    iconColor: 'text-green-600'
                  }
                : {
                    label: 'Đã có bác sĩ',
                    className: 'bg-green-100 text-green-800 border-green-200',
                    iconColor: 'text-green-600'
                  };

              return (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-sm border-2 border-[#FF7B7B]/20 transition-all overflow-hidden"
                >
                  {/* Main Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {appointment.service}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeConfig.className} flex items-center gap-1`}>
                            <UserCheck className={`w-3.5 h-3.5 ${badgeConfig.iconColor}`} />
                            {badgeConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Yêu cầu tạo lúc: {formatDate(appointment.date)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FF7B7B]">
                          {formatPrice(appointment.price)}
                        </p>
                      </div>
                    </div>

                    {/* Vet Info */}
                    <div className="mb-4 p-3 bg-[#FF7B7B]/5 border border-[#FF7B7B]/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FF7B7B] rounded-full flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bác sĩ phụ trách</p>
                          <p className="text-sm font-bold text-[#FF7B7B]">{appointment.vetName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#FF7B7B]" />
                        <div>
                          <p className="text-gray-500">Ngày hẹn</p>
                          <p className="font-semibold text-gray-900">{appointment.appointmentDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#FF7B7B]" />
                        <div>
                          <p className="text-gray-500">Giờ hẹn</p>
                          <p className="font-semibold text-gray-900">{appointment.appointmentTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        {appointment.locationType === 'store' ? (
                          <Building2 className="w-4 h-4 text-[#FF7B7B]" />
                        ) : (
                          <Home className="w-4 h-4 text-[#FF7B7B]" />
                        )}
                        <div>
                          <p className="text-gray-500">Địa điểm</p>
                          <p className="font-semibold text-gray-900">
                            {appointment.locationType === 'store' ? 'Tại cửa hàng MiaPET' : 'Tận nhà'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : appointment.id)}
                      className="w-full flex items-center justify-center gap-2 text-[#FF7B7B] hover:text-[#ff6565] font-medium text-sm py-2 border-t border-gray-100 transition-colors"
                    >
                      {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">Địa chỉ</p>
                            <p className="text-sm font-medium text-gray-900">{appointment.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">Phương thức thanh toán</p>
                            <p className="text-sm font-medium text-gray-900">
                              {appointment.paymentMethod === 'bank' 
                                ? '💳 Chuyển khoản ngân hàng' 
                                : '💵 Thanh toán khi nhận dịch vụ'}
                            </p>
                          </div>
                        </div>

                        {appointment.note && (
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">Ghi chú</p>
                              <p className="text-sm text-gray-700 italic">"{appointment.note}"</p>
                            </div>
                          </div>
                        )}

                        {/* Info Message */}
                        {isCompleted ? (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>
                                ✅ Dịch vụ đã hoàn thành! Cảm ơn bạn đã tin tưởng MiaPET.
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800 flex items-start gap-2">
                              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>
                                ⏳ Yêu cầu của bạn đang được xử lý. Chúng tôi sẽ liên hệ sớm nhất!
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}