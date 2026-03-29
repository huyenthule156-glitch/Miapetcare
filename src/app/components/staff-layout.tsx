import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ShoppingBag, 
  Wrench, 
  LogOut, 
  Menu, 
  X, 
  Briefcase,
  Home,
  PawPrint,
  ClipboardList
} from "lucide-react";
import { useAuth } from "../contexts/auth-context";

interface StaffLayoutProps {
  children: ReactNode;
  title?: string;
}

export function StaffLayout({ children, title }: StaffLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsername(userData.fullName || userData.username);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { path: "/staff/overview", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/staff/orders", label: "Quản lý đơn hàng", icon: ShoppingCart },
    { path: "/staff/products", label: "Quản lý sản phẩm", icon: ShoppingBag },
    { path: "/staff/services", label: "Quản lý dịch vụ", icon: Wrench },
    { path: "/staff/bookings", label: "Danh sách dịch vụ", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:block w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed h-full">
        <div className="p-6">
          <Link to="/staff/overview" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <div className="bg-[#FF7B7B] rounded-lg p-1.5">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#FF7B7B]">Mia</span>
              <span className="text-white">PET</span>
            </span>
          </Link>

          {/* Staff Badge */}
          <div className="bg-[#FF7B7B]/20 border border-[#FF7B7B] rounded-lg p-3 mb-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#FF7B7B]" />
              <span className="text-sm font-semibold text-white">NHÂN VIÊN</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">{username}</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#FF7B7B] text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-gray-700"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link to="/staff/overview" className="flex items-center gap-2">
                  <div className="bg-[#FF7B7B] rounded-lg p-1.5">
                    <PawPrint className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    <span className="text-[#FF7B7B]">Mia</span>
                    <span className="text-white">PET</span>
                  </span>
                </Link>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="bg-[#FF7B7B]/20 border border-[#FF7B7B] rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#FF7B7B]" />
                  <span className="text-sm font-semibold text-white">NHÂN VIÊN</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">{username}</p>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#FF7B7B] text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="my-6 border-t border-gray-700"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{title || "Dashboard"}</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FF7B7B]/20 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-[#FF7B7B]" />
              </div>
              <span className="text-sm font-medium text-gray-700">{username}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}