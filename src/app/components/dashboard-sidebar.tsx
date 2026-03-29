import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  PawPrint, 
  MessageSquare, 
  Calendar, 
  Scissors, 
  ShoppingCart, 
  Package,
  History,
  ChevronDown
} from "lucide-react";
import { useCart } from "../context/cart-context";
import { useState } from "react";

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/dashboard/pets", icon: PawPrint, label: "Thú cưng" },
  { path: "/dashboard/appointments", icon: Calendar, label: "Lịch hẹn" },
  { path: "/dashboard/services", icon: Scissors, label: "Dịch vụ" },
  { 
    path: "/dashboard/mart", 
    icon: ShoppingCart, 
    label: "Sản phẩm",
    hasSubmenu: true,
    submenu: [
      { path: "/dashboard/mart?category=food", label: "🍖 Thức ăn" },
      { path: "/dashboard/mart?category=toy", label: "🎾 Đồ chơi" },
      { path: "/dashboard/mart?category=accessory", label: "👕 Phụ kiện" },
      { path: "/dashboard/mart?category=medicine", label: "💊 Thuốc & Vitamin" },
    ]
  },
  { path: "/dashboard/my-orders", icon: Package, label: "Giỏ hàng", showBadge: true },
  { path: "/dashboard/order-history", icon: History, label: "Lịch sử" },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <div className="w-64 bg-white min-h-screen shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-[#FF7B7B] rounded-lg p-1.5">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#FF7B7B]">Mia</span>
            <span className="text-gray-900">PET</span>
          </span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isExpanded = expandedMenus.includes(item.path);
          
          return (
            <div key={item.path}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.path)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                      isActive
                        ? "bg-[#FF7B7B] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isExpanded && item.submenu && (
                    <div className="ml-4 mb-2 space-y-1">
                      {item.submenu.map((subitem: any) => (
                        <Link
                          key={subitem.path}
                          to={subitem.path}
                          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#FF7B7B] transition-colors"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? "bg-[#FF7B7B] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.showBadge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}