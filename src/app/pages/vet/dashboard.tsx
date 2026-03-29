import { VetLayout } from "../../components/vet-layout";
import { useAuth } from "../../contexts/auth-context";
import { getAllBookings, Booking } from "../../services/booking-service";
import { fetchDoctorById } from "../../../lib/api-client";
import { FallbackDataNotice } from "../../components/fallback-data-notice";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Activity,
  Users,
  Stethoscope
} from "lucide-react";

export function VetDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doctorInfo, setDoctorInfo] = useState<{ name: string; specialty: string } | null>(null);

  // Load bookings when component mounts
  useEffect(() => {
    const allBookings = getAllBookings();
    setBookings(allBookings);
  }, []);

  // Fetch doctor info from database
  useEffect(() => {
    async function loadDoctorInfo() {
      if (user?.id && user?.role === 'vet') {
        // First try to use user data from localStorage (faster and no API call)
        if (user.fullName && user.specialization) {
          setDoctorInfo({
            name: user.fullName,
            specialty: user.specialization,
          });
          return;
        }
        
        // If user data is incomplete, fetch from API
        const doctor = await fetchDoctorById(user.id);
        if (doctor) {
          setDoctorInfo({
            name: doctor.name,
            specialty: doctor.specialty,
          });
        }
      }
    }
    loadDoctorInfo();
  }, [user?.id, user?.role, user?.fullName, user?.specialization]);

  // Filter appointments that are confirmed and assigned to this vet
  const pendingAppointments = bookings.filter(booking => 
    booking.status === 'confirmed' && booking.assignedDoctor === user?.username
  );

  // Filter appointments assigned to this vet (all statuses)
  const myAppointments = bookings.filter(booking => 
    booking.assignedDoctor === user?.username
  );

  const completedAppointments = myAppointments.filter(booking => 
    booking.status === 'completed'
  );

  const upcomingAppointments = myAppointments.filter(booking => 
    booking.status === 'confirmed'
  );

  const stats = [
    {
      title: "Lịch hẹn chờ xử lý",
      value: pendingAppointments.length,
      icon: Clock,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Lịch hẹn của tôi",
      value: myAppointments.length,
      icon: Calendar,
      color: "bg-[#FF7B7B]",
      textColor: "text-[#FF7B7B]",
      bgColor: "bg-pink-50",
    },
    {
      title: "Đã hoàn thành",
      value: completedAppointments.length,
      icon: CheckCircle2,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Đang xử lý",
      value: upcomingAppointments.length,
      icon: Activity,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Get upcoming appointments in chronological order
  const nextAppointments = myAppointments
    .filter(booking => booking.status === 'confirmed')
    .sort((a, b) => {
      const dateA = new Date(a.appointmentDate + ' ' + a.appointmentTime);
      const dateB = new Date(b.appointmentDate + ' ' + b.appointmentTime);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  return (
    <VetLayout title="Tổng quan">
      <div className="space-y-6">
        {/* Fallback Data Notice */}
        <FallbackDataNotice />

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#FF7B7B] to-[#FF9999] rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Xin chào, {doctorInfo?.name || user?.fullName}! 👋</h1>
              <p className="text-white/90 text-lg mb-1">{doctorInfo?.specialty || user?.specialization}</p>
              <p className="text-white/90">Hôm nay bạn có <span className="font-bold">{upcomingAppointments.length}</span> lịch hẹn đang chờ xử lý</p>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <Stethoscope className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Appointments */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Lịch hẹn chờ xử lý</h3>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                {pendingAppointments.length}
              </span>
            </div>
            {pendingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Không có lịch hẹn chờ xử lý</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {pendingAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <p className="font-semibold text-gray-900 mb-1">{appointment.service.category} - {appointment.service.name}</p>
                      <p className="text-sm text-gray-600">
                        📅 {appointment.appointmentDate} • ⏰ {appointment.appointmentTime}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => window.location.href = '/vet/pending-appointments'}
                  className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-colors font-semibold"
                >
                  Xem tất cả ({pendingAppointments.length})
                </button>
              </>
            )}
          </div>

          {/* Next Appointments */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Lịch sắp tới</h3>
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            {nextAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Chưa có lịch hẹn sắp tới</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {nextAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <p className="font-semibold text-gray-900 mb-1">{appointment.service.category} - {appointment.service.name}</p>
                      <p className="text-sm text-gray-600">
                        📅 {appointment.appointmentDate} • ⏰ {appointment.appointmentTime}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => window.location.href = '/vet/my-appointments'}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
                >
                  Xem lịch của tôi
                </button>
              </>
            )}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Thống kê hiệu suất</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Tỉ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {myAppointments.length > 0 
                  ? Math.round((completedAppointments.length / myAppointments.length) * 100)
                  : 0}%
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Tổng khách hàng</p>
              <p className="text-2xl font-bold text-gray-900">{myAppointments.length}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
            </div>
          </div>
        </div>
      </div>
    </VetLayout>
  );
}