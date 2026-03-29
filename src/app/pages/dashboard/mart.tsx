import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { categories, petTypes } from "../../data/products-data-new";
import { ShoppingCart, Search, Filter, Check } from "lucide-react";
import { useCart } from "../../context/cart-context";
import { useInventory } from "../../context/inventory-context";

export function DashboardMart() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useInventory();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);

  // Handle URL query params for category filter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleAddToCart = (product: typeof products[0]) => {
    // Add visual feedback
    setAddedToCart([...addedToCart, product.id]);
    setTimeout(() => {
      setAddedToCart(addedToCart.filter(id => id !== product.id));
    }, 2000);
    
    // Add to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPetType = selectedPetType === 'all' || product.petType === selectedPetType || product.petType === 'both';
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPetType && matchesSearch;
  });

  return (
    <DashboardLayout title="Mart - Cửa hàng">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent bg-white"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#FF7B7B]" />
          <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-3">Danh mục</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#FF7B7B] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Type Filter */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Loại thú cưng</p>
          <div className="flex flex-wrap gap-2">
            {petTypes.map((petType) => (
              <button
                key={petType.id}
                onClick={() => setSelectedPetType(petType.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPetType === petType.id
                    ? 'bg-[#FF7B7B] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{petType.icon}</span>
                {petType.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Hiển thị <span className="font-semibold text-[#FF7B7B]">{filteredProducts.length}</span> sản phẩm
        </p>
      </div>

      {/* Products Grid - 5 columns */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                      Hết hàng
                    </span>
                  </div>
                )}
                {addedToCart.includes(product.id) && (
                  <div className="absolute inset-0 bg-[#FF7B7B] bg-opacity-90 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Check className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-sm font-semibold">Đã thêm!</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg text-[#FF7B7B] font-bold">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                    product.inStock
                      ? 'bg-[#FF7B7B] text-white hover:bg-[#ff6b6b]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl p-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-600 mb-6">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPetType('all');
              setSearchQuery('');
            }}
            className="bg-[#FF7B7B] text-white px-6 py-3 rounded-full hover:bg-[#ff6b6b] transition-colors font-semibold"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#FF7B7B]/5 rounded-xl p-6 border border-[#FF7B7B]/20">
          <div className="text-3xl mb-2">🛒</div>
          <h3 className="font-semibold text-gray-900 mb-1">Giỏ hàng của tôi</h3>
          <p className="text-sm text-gray-600 mb-3">Xem các sản phẩm đã chọn</p>
          <button 
            onClick={() => navigate('/dashboard/my-orders')}
            className="text-[#FF7B7B] font-semibold text-sm hover:underline"
          >
            Xem giỏ hàng →
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-6 border border-blue-100">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-semibold text-gray-900 mb-1">Đơn hàng của tôi</h3>
          <p className="text-sm text-gray-600 mb-3">Theo dõi đơn hàng đã đặt</p>
          <button 
            onClick={() => navigate('/dashboard/my-orders')}
            className="text-blue-600 font-semibold text-sm hover:underline"
          >
            Xem đơn hàng →
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl p-6 border border-green-100">
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-semibold text-gray-900 mb-1">Cần tư vấn?</h3>
          <p className="text-sm text-gray-600 mb-3">Liên hệ với chúng tôi</p>
          <button 
            onClick={() => navigate('/contact')}
            className="text-green-600 font-semibold text-sm hover:underline"
          >
            Liên hệ ngay →
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}