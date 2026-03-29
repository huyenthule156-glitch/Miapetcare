import { DashboardLayout } from "../../components/dashboard-layout";
import { useDashboard } from "../../context/dashboard-context";
import { useState } from "react";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Calendar, 
  CreditCard, 
  FileText,
  Home,
  Building2,
  ChevronDown,
  Filter,
  Trash2
} from "lucide-react";

export function DashboardRequests() {
  const { requests, removeRequest } = useDashboard();
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Đang chờ xử lý',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-600'
        };
      case 'approved':
        return {
          label: 'Đã duyệt',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle2,
          iconColor: 'text-green-600'
        };
      case 'rejected':
        return {
          label: 'Đã từ chối',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-600'
        };
    }
  };

  // Chỉ lấy yêu cầu chưa có bác sĩ nhận (chưa chuyển sang lịch hẹn)
  const pendingRequests = requests.filter(req => !req.vetName);

  const filteredRequests = pendingRequests.filter(req => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  return (
    <DashboardLayout title="Yêu cầu dịch vụ">
      <div className="max-w-6xl mx-auto">
        {/* Header with Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Danh sách yêu cầu</h2>
              <p className="text-gray-600 mt-1">
                Tổng cộng: <span className="font-semibold text-[#FF7B7B]">{pendingRequests.length}</span> yêu cầu
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
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Đang chờ xử lý</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Đã từ chối</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filterStatus === 'all' ? 'Chưa có yêu cầu nào' : `Không có yêu cầu ${getStatusConfig(filterStatus).label.toLowerCase()}`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? 'Hãy đặt dịch vụ đầu tiên cho thú cưng của bạn!'
                : 'Thử thay đổi bộ lọc để xem các yêu cầu khác'}
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
            {filteredRequests.map((request) => {
              const statusConfig = getStatusConfig(request.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedId === request.id;

              return (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-[#FF7B7B]/20 transition-all overflow-hidden"
                >
                  {/* Main Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {request.service}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} flex items-center gap-1`}>
                            <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconColor}`} />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Yêu cầu tạo lúc: {formatDate(request.date)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#FF7B7B]">
                          {formatPrice(request.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#FF7B7B]" />
                        <div>
                          <p className="text-gray-500">Ngày hẹn</p>
                          <p className="font-semibold text-gray-900">{request.appointmentDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#FF7B7B]" />
                        <div>
                          <p className="text-gray-500">Giờ hẹn</p>
                          <p className="font-semibold text-gray-900">{request.appointmentTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        {request.locationType === 'store' ? (
                          <Building2 className="w-4 h-4 text-[#FF7B7B]" />
                        ) : (
                          <Home className="w-4 h-4 text-[#FF7B7B]" />
                        )}
                        <div>
                          <p className="text-gray-500">Địa điểm</p>
                          <p className="font-semibold text-gray-900">
                            {request.locationType === 'store' ? 'Tại cửa hàng' : 'Tận nhà'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : request.id)}
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
                            <p className="text-sm font-medium text-gray-900">{request.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">Phương thức thanh toán</p>
                            <p className="text-sm font-medium text-gray-900">
                              {request.paymentMethod === 'bank' 
                                ? '💳 Chuyển khoản ngân hàng' 
                                : '💵 Thanh toán khi nhận dịch vụ'}
                            </p>
                          </div>
                        </div>

                        {request.note && (
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">Ghi chú</p>
                              <p className="text-sm text-gray-700 italic">"{request.note}"</p>
                            </div>
                          </div>
                        )}

                        {request.vetName && (
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">Bác sĩ phụ trách</p>
                              <p className="text-sm font-semibold text-green-700">{request.vetName}</p>
                            </div>
                          </div>
                        )}

                        {/* Status Message */}
                        {request.status === 'pending' && (
                          <>
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                ⏳ Yêu cầu của bạn đang được xem xét. Chúng tôi sẽ liên hệ sớm nhất!
                              </p>
                            </div>
                            
                            {/* Cancel Button */}
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => {
                                  if (window.confirm('Bạn có chắc muốn huỷ yêu cầu này? Hành động này không thể hoàn tác.')) {
                                    removeRequest(request.id);
                                  }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl hover:bg-red-100 transition-colors font-medium text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                Huỷ yêu cầu
                              </button>
                            </div>
                          </>
                        )}

                        {request.status === 'approved' && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800">
                              ✅ Yêu cầu đã được duyệt! Vui lòng đến đúng giờ hẹn.
                            </p>
                          </div>
                        )}

                        {request.status === 'rejected' && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">
                              ❌ Rất tiếc, yêu cầu không thể thực hiện. Vui lòng liên hệ hotline để biết thêm chi tiết.
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