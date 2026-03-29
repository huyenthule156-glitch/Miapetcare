import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ShoppingBag, 
  Wrench, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Settings,
  Home,
  PawPrint,
  Heart,
  ShoppingCart
} from "lucide-react";
import { useAuth } from "../contexts/auth-context";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsername(userData.username);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { path: "/admin/overview", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/admin/orders", label: "Quản lý đơn hàng", icon: ShoppingCart },
    { path: "/admin/users", label: "Quản lý người dùng", icon: Users },
    { path: "/admin/pets", label: "Quản lý thú cưng", icon: Heart },
    { path: "/admin/products", label: "Quản lý sản phẩm", icon: ShoppingBag },
    { path: "/admin/services", label: "Quản lý dịch vụ", icon: Wrench },
    { path: "/admin/reports", label: "Báo cáo & Thống kê", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:block w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed h-full">
        <div className="p-6">
          <Link to="/admin/overview" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <div className="bg-[#FF7B7B] rounded-lg p-1.5">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#FF7B7B]">Mia</span>
              <span className="text-white">PET</span>
            </span>
          </Link>

          {/* Admin Badge */}
          <div className="bg-[#FF7B7B]/20 border border-[#FF7B7B] rounded-lg p-3 mb-6">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#FF7B7B]" />
              <span className="text-sm font-semibold text-[#FF7B7B]">ADMIN PANEL</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">@{username}</p>
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/30 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl text-gray-900">{title || "Admin Dashboard"}</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF7B7B] rounded-full"></span>
              </button>
              
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
                <Settings className="w-4 h-4 text-[#FF7B7B]" />
                <span className="text-sm font-medium text-gray-900">{username}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Link to="/admin/overview" className="flex items-center gap-2">
                  <div className="bg-[#FF7B7B] rounded-lg p-1.5">
                    <PawPrint className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    <span className="text-[#FF7B7B]">Mia</span>
                    <span className="text-white">PET</span>
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Admin Badge */}
              <div className="bg-[#FF7B7B]/20 border border-[#FF7B7B] rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#FF7B7B]" />
                  <span className="text-sm font-semibold text-[#FF7B7B]">ADMIN PANEL</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">@{username}</p>
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/30 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}