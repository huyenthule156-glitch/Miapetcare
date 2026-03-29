import { ProductsHeader } from "../components/products-header";
import { Footer } from "../components/footer";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { categories, petTypes, products } from "../data/products-data-new";
import { ShoppingCart, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/cart-context";

type SortType = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'oldest';

const ITEMS_PER_PAGE = 20;

export function Products() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Handle URL query params for category filter and page
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const pageParam = searchParams.get('page');
    const petTypeParam = searchParams.get('petType');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
    if (petTypeParam) {
      setSelectedPetType(petTypeParam);
    }
  }, [searchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', '1');
      return newParams;
    });
  }, [selectedCategory, selectedPetType, searchQuery, sortBy]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    setAddedProductName(product.name);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPetType = selectedPetType === 'all' || product.petType === selectedPetType || product.petType === 'both';
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPetType && matchesSearch;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name, 'vi');
      case 'name-desc':
        return b.name.localeCompare(a.name, 'vi');
      case 'newest':
        return b.id - a.id;
      case 'oldest':
        return a.id - b.id;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProductsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1">
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-2 border-green-500 animate-[slideDown_0.3s_ease-out]">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-semibold text-gray-900">Đã thêm vào giỏ hàng!</p>
              <p className="text-sm text-gray-600">{addedProductName}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar - Categories */}
            <aside className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h2>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                        selectedCategory === category.id
                          ? 'bg-[#FF7B7B] text-white font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="flex-1">{category.name}</span>
                      <span className={`text-sm ${selectedCategory === category.id ? 'text-white' : 'text-gray-500'}`}>
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Pet Type Filter */}
                <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">Dành cho</h2>
                <div className="space-y-2">
                  {petTypes.map(petType => (
                    <button
                      key={petType.id}
                      onClick={() => setSelectedPetType(petType.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                        selectedPetType === petType.id
                          ? 'bg-[#FF7B7B] text-white font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{petType.icon}</span>
                      <span>{petType.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Sort Options */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-t border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-gray-700">Sắp xếp:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="price-asc"
                        checked={sortBy === 'price-asc'}
                        onChange={(e) => setSortBy(e.target.value as SortType)}
                        className="w-3.5 h-3.5 text-[#FF7B7B] border-gray-400 focus:ring-[#FF7B7B]"
                      />
                      <span className="text-gray-700">Giá tăng dần</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="price-desc"
                        checked={sortBy === 'price-desc'}
                        onChange={(e) => setSortBy(e.target.value as SortType)}
                        className="w-3.5 h-3.5 text-[#FF7B7B] border-gray-400 focus:ring-[#FF7B7B]"
                      />
                      <span className="text-gray-700">Giá giảm dần</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="name-asc"
                        checked={sortBy === 'name-asc'}
                        onChange={(e) => setSortBy(e.target.value as SortType)}
                        className="w-3.5 h-3.5 text-[#FF7B7B] border-gray-400 focus:ring-[#FF7B7B]"
                      />
                      <span className="text-gray-700">A → Z</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value="name-desc"
                        checked={sortBy === 'name-desc'}
                        onChange={(e) => setSortBy(e.target.value as SortType)}
                        className="w-3.5 h-3.5 text-[#FF7B7B] border-gray-400 focus:ring-[#FF7B7B]"
                      />
                      <span className="text-gray-700">Z → A</span>
                    </label>
                  </div>
                  <div className="text-sm text-gray-600">
                    Hiển thị <span className="font-semibold text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> trong <span className="font-semibold text-gray-900">{filteredProducts.length}</span> sản phẩm
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-4 gap-6">
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    {/* Product Image - Clickable */}
                    <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                          - {product.discount}%
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px] hover:text-[#FF7B7B] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="mb-3">
                        {product.originalPrice ? (
                          <div>
                            <p className="text-gray-400 line-through text-xs mb-1">
                              {formatPrice(product.originalPrice)}
                            </p>
                            <p className="text-[#FF7B7B] font-bold text-lg">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[#FF7B7B] font-bold text-lg">
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                          product.inStock
                            ? 'bg-[#FF7B7B] text-white hover:bg-[#ff6b6b] active:scale-95'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Thêm vào giỏ
                          </>
                        ) : (
                          'Hết hàng'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg flex items-center gap-1 font-semibold transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-[#FF7B7B] hover:text-white border border-gray-300'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Trước</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#FF7B7B] text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg flex items-center gap-1 font-semibold transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-[#FF7B7B] hover:text-white border border-gray-300'
                    }`}
                  >
                    <span className="hidden sm:inline">Sau</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm phù hợp</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}