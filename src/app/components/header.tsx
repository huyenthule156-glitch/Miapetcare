import { Link, useNavigate, useLocation } from "react-router";
import { PawPrint, Menu, X, UserCircle, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { useCart } from "../context/cart-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  // Check if we're on the products page or checkout/cart pages
  const isProductsPage = location.pathname === '/products';
  const isCheckoutPage = location.pathname === '/dashboard/checkout';
  const isCartPage = location.pathname === '/dashboard/my-orders';
  const isOrderHistoryPage = location.pathname === '/dashboard/order-history';
  
  // Show cart and user icons on products, checkout, cart, and order history pages
  const showShoppingIcons = isProductsPage || isCheckoutPage || isCartPage || isOrderHistoryPage;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  const handleDashboardClick = () => {
    if (user?.role === "admin") {
      navigate("/admin/overview");
    } else {
      navigate("/dashboard/appointments");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-[#FF7B7B] rounded-lg p-1.5">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#FF7B7B]">Mia</span>
            <span className="text-gray-900">PET</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {/* Trang chủ */}
          <Link
            to="/"
            className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Trang chủ
          </Link>

          {/* PET SHOP - Dropdown */}
          <div className="relative group">
            <Link
              to="/products"
              className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-1"
            >
              Pet Shop
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link
                  to="/products?category=all"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🛍️ Tất cả sản phẩm
                </Link>
                <Link
                  to="/products?category=food"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🍖 Thức ăn
                </Link>
                <Link
                  to="/products?category=accessory"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🎀 Phụ kiện
                </Link>
                <Link
                  to="/products?category=toy"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🎾 Đồ chơi
                </Link>
                <Link
                  to="/products?category=hygiene"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🧼 Vệ sinh
                </Link>
                <Link
                  to="/products?category=medicine"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  💊 Thuốc & Vitamin
                </Link>
                <Link
                  to="/products?category=fashion"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  👗 Thời trang
                </Link>
              </div>
            </div>
          </div>

          {/* DỊCH VỤ - Dropdown */}
          <div className="relative group">
            <Link
              to="/services"
              className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-1"
            >
              Dịch vụ
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link
                  to="/vaccination"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  💉 Tiêm phòng chó mèo
                </Link>
                <Link
                  to="/grooming"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  ✂️ Grooming, cắt tỉa, nhuộm
                </Link>
                <Link
                  to="/bath-service"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🛁 Dịch vụ tắm chó mèo
                </Link>
                <Link
                  to="/products"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🛍️ Pet Shop
                </Link>
                <Link
                  to="/pet-hotel"
                  className="block px-4 py-2.5 text-gray-700 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors"
                >
                  🏠 Trông giữ chó mèo
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/news"
            className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Tin tức
          </Link>
          <Link
            to="/about"
            className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon - Only visible on products page */}
          {showShoppingIcons && (
            <Link
              to="/dashboard/my-orders"
              className="relative hidden lg:block"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#FF7B7B] transition-colors" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF7B7B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          )}

          {/* User Icon/Menu - Always visible */}
          {isAuthenticated ? (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#FF7B7B] transition-colors"
              >
                <UserCircle className="w-6 h-6" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2 inline-block" />
                    Dashboard
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2 inline-block" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="hidden lg:block"
              title="Đăng nhập"
            >
              <UserCircle className="w-6 h-6 text-gray-700 hover:text-[#FF7B7B] transition-colors" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-900 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#FF7B7B]">Mia</span>
                <span className="text-gray-900">PET</span>
              </span>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                to="/products"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link
                to="/services"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dịch vụ
              </Link>
              <Link
                to="/news"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tin tức
              </Link>
              <Link
                to="/about"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Về chúng tôi
              </Link>
              <Link
                to="/contact"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Liên hệ
              </Link>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              {isAuthenticated ? (
                <div className="flex flex-col">
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2 inline-block" />
                    Dashboard
                  </Link>
                  <button
                    className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2 inline-block" />
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  className="px-4 py-3 rounded-lg bg-[#FF7B7B] text-white hover:bg-[#ff6565] transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}