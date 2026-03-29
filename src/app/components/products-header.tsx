import { Link } from "react-router";
import { PawPrint, Search, Phone, ShoppingCart, UserCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { useCart } from "../context/cart-context";

interface ProductsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductsHeader({ searchQuery, onSearchChange }: ProductsHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-[#FF7B7B] to-[#ff9999] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 border-b border-white/20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="bg-white rounded-lg p-1.5">
              <PawPrint className="w-5 h-5 text-[#FF7B7B]" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Mia</span>
              <span className="text-gray-900">PET</span>
            </span>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Hotline */}
            <a href="tel:0877742747" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-5 h-5" />
              <div>
                <p className="text-xs">Hotline:</p>
                <p className="font-bold">0877 742 747</p>
              </div>
            </a>

            {/* Cart */}
            <Link to="/dashboard/my-orders" className="relative hover:opacity-80 transition-opacity">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hover:opacity-80 transition-opacity"
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
                      Dashboard
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-200"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/sign-in" className="hover:opacity-80 transition-opacity" title="Đăng nhập">
                <UserCircle className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-1 py-3">
          <Link
            to="/products"
            className="px-6 py-2 hover:bg-white/10 rounded transition-colors font-medium"
          >
            Sản phẩm
          </Link>

          {/* Mua cho chó - Dropdown */}
          <div className="relative group">
            <button className="px-6 py-2 hover:bg-white/10 rounded transition-colors font-medium flex items-center gap-1">
              Mua cho chó
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-56 bg-white text-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link to="/products?category=food&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Thức ăn cho chó
                </Link>
                <Link to="/products?category=medicine&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Dinh dưỡng, khoáng chất
                </Link>
                <Link to="/products?category=hygiene&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Sữa tắm cho chó
                </Link>
                <Link to="/products?petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Vòng cổ cho chó
                </Link>
                <Link to="/products?petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Dây dắt chó
                </Link>
                <Link to="/products?category=fashion&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Thời trang cho chó
                </Link>
                <Link to="/products?petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Bát ăn, bình nước
                </Link>
                <Link to="/products?category=hygiene&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Chăm sóc lông, móng
                </Link>
                <Link to="/products?category=medicine&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Phòng vệ diệt bọ chét, ve, rận
                </Link>
                <Link to="/products?category=hygiene&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Vật dụng vệ sinh
                </Link>
                <Link to="/products?category=toy&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Đồ chơi cho chó
                </Link>
                <Link to="/products?petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Chuồng, nhà và lồng
                </Link>
                <Link to="/products?petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Túi vận chuyển, dụ, balo
                </Link>
                <Link to="/products?category=hygiene&petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Khử mùi, khử trùng
                </Link>
                <Link to="/products?petType=dog" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Dụng cụ huấn luyện
                </Link>
              </div>
            </div>
          </div>

          {/* Mua cho mèo - Dropdown */}
          <div className="relative group">
            <button className="px-6 py-2 hover:bg-white/10 rounded transition-colors font-medium flex items-center gap-1">
              Mua cho mèo
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute left-0 mt-1 w-56 bg-white text-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link to="/products?category=food&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Thức ăn cho mèo
                </Link>
                <Link to="/products?category=medicine&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Dinh dưỡng, khoáng chất
                </Link>
                <Link to="/products?category=hygiene&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Sữa tắm cho mèo
                </Link>
                <Link to="/products?petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Vòng cổ cho mèo
                </Link>
                <Link to="/products?petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Dây dắt mèo
                </Link>
                <Link to="/products?category=fashion&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Thời trang cho mèo
                </Link>
                <Link to="/products?petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Bát ăn, bình nước
                </Link>
                <Link to="/products?category=hygiene&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Chăm sóc lông, móng
                </Link>
                <Link to="/products?category=medicine&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Phòng vệ diệt bọ chét, ve, rận
                </Link>
                <Link to="/products?category=hygiene&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Vật dụng vệ sinh
                </Link>
                <Link to="/products?category=toy&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Đồ chơi cho mèo
                </Link>
                <Link to="/products?petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Chuồng, nhà và lồng
                </Link>
                <Link to="/products?petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Túi vận chuyển, dụ, balo
                </Link>
                <Link to="/products?category=hygiene&petType=cat" className="block w-full text-left px-4 py-2.5 hover:bg-[#FF7B7B]/10 hover:text-[#FF7B7B] transition-colors">
                  Khử mùi, khử trùng
                </Link>
              </div>
            </div>
          </div>

          {/* Thức ăn chó - Direct Link */}
          <Link
            to="/products?category=food&petType=dog"
            className="px-6 py-2 hover:bg-white/10 rounded transition-colors font-medium"
          >
            Thức ăn chó
          </Link>

          {/* Thức ăn mèo - Direct Link */}
          <Link
            to="/products?category=food&petType=cat"
            className="px-6 py-2 hover:bg-white/10 rounded transition-colors font-medium"
          >
            Thức ăn mèo
          </Link>
        </nav>
      </div>
    </header>
  );
}