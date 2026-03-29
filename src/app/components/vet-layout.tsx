import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { fetchDoctorById } from "../../lib/api-client";
import {
  Calendar,
  User,
  LogOut,
  Home,
  Clock,
  Stethoscope,
  Menu,
  X,
  Bell,
  PawPrint
} from "lucide-react";

interface VetLayoutProps {
  children: ReactNode;
  title?: string;
}

export function VetLayout({ children, title }: VetLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<{ name: string; specialty: string } | null>(null);

  // Fetch doctor info from database
  useEffect(() => {
    async function loadDoctorInfo() {
      if (user?.id && user?.role === 'vet') {
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
  }, [user?.id, user?.role]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      path: "/vet/dashboard",
      label: "Tổng quan",
      icon: Home,
    },
    {
      path: "/vet/pending-appointments",
      label: "Lịch hẹn chờ xử lý",
      icon: Clock,
    },
    {
      path: "/vet/my-appointments",
      label: "Lịch hẹn của tôi",
      icon: Calendar,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gradient-to-b from-gray-900 to-black text-white fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF7B7B] rounded-lg p-2">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="text-[#FF7B7B]">Mia</span>
                <span className="text-white">PET</span>
              </h1>
              <p className="text-xs text-gray-400">Bác sĩ thú y</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF7B7B] rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{doctorInfo?.name || user?.fullName || 'Bác sĩ'}</p>
              <p className="text-xs text-gray-400 truncate">{doctorInfo?.specialty || user?.specialization || 'Chuyên khoa'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-[#FF7B7B] text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar - Mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF7B7B] rounded-lg p-2">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  <span className="text-[#FF7B7B]">Mia</span>
                  <span className="text-gray-900">PET</span>
                </h1>
                <p className="text-xs text-gray-500">Bác sĩ thú y</p>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 bg-white">
              <div className="p-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        active
                          ? "bg-[#FF7B7B] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Page Header - Desktop */}
        <div className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF7B7B] rounded-full"></span>
              </button>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{user?.username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 lg:p-8">
          {title && (
            <div className="lg:hidden mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}