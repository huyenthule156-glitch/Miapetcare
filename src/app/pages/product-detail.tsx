import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { products } from "../data/products-data-new";
import { ProductsHeader } from "../components/products-header";
import { Footer } from "../components/footer";
import { Minus, Plus, ShoppingCart, Package, Truck, Shield, Clock, Phone } from "lucide-react";
import { useCart } from "../context/cart-context";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Find product by ID - Convert string id to number
  const product = products.find((p) => p.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProductsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
          <Link to="/products" className="text-[#FF7B7B] hover:underline">
            Quay lại trang sản phẩm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Show notification
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/dashboard/my-orders");
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  // Get category name in Vietnamese
  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      food: "Thức ăn",
      toy: "Đồ chơi",
      accessory: "Phụ kiện",
      hygiene: "Vệ sinh",
      medicine: "Thuốc & Vitamin",
      fashion: "Thời trang",
    };
    return categories[category] || category;
  };

  const getPetTypeName = (petType: string) => {
    return petType === "dog" ? "cho chó" : petType === "cat" ? "cho mèo" : "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#FF7B7B]">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#FF7B7B]">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Product Image */}
            <div>
              <div className="bg-gray-50 rounded-lg p-8 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "500px" }}
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Category */}
              <div className="text-sm text-gray-600 mb-4">
                Loại: <span className="text-[#FF7B7B] font-medium">{getCategoryName(product.category)}</span>
                {product.petType && (
                  <>
                    {" • "}
                    <span className="text-[#FF7B7B] font-medium">{getPetTypeName(product.petType)}</span>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#FF6B35]">
                    {product.price.toLocaleString()}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}₫
                    </span>
                  )}
                </div>
                {product.originalPrice && product.discount && (
                  <div className="mt-2 text-sm text-green-600 font-medium">
                    Tiết kiệm {product.discount}%
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 text-center border border-gray-300 rounded-lg font-semibold"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 99}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#FFA500] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#ff9500] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#FF6B35] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#ff5525] transition-colors"
                >
                  Mua ngay
                </button>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-[#FF7B7B] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Miễn phí ship cho đơn hàng trên 200.000₫</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#FF7B7B] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Giao hàng trong 2 giờ nội thành</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#FF7B7B] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Thanh toán đơn giản, bảo mật với VietQR</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#FF7B7B] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Đổi trả dễ dàng, nhanh gọn trong 7 ngày</p>
                  </div>
                </div>
              </div>

              {/* Support Contact */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-yellow-100 rounded-full p-3">
                  <Phone className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Hỗ trợ mua hàng</p>
                  <a href="tel:0877742747" className="text-lg font-bold text-[#FF7B7B]">
                    0877 742 747
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả sản phẩm</h2>
            
            {/* Basic Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Khám phá {product.name}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.name} là sản phẩm {getCategoryName(product.category).toLowerCase()} chất lượng cao, 
                được thiết kế đặc biệt {getPetTypeName(product.petType)}. Sản phẩm đảm bảo an toàn, 
                đáp ứng mọi nhu cầu chăm sóc thú cưng của bạn.
              </p>
            </div>

            {/* Features (Generic based on category) */}
            {product.category === "food" && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Lợi ích nổi bật của {product.name}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Hương vị thơm ngon khó cưỡng: Được chế biến từ thịt gà và gan bò chất lượng cao, pate mang đến trải nghiệm ẩm thực hấp dẫn, kích thích vị giác ngay cả với những chú {product.petType === "dog" ? "chó" : "mèo"} kén ăn.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Dinh dưỡng toàn diện: Bao gồm hơn {product.petType === "dog" ? "22%" : "25%"} cùng các năng lượng đầy đủ, đáp bảo cung cấp nguồn năng lượng và sức khoẻ tối ưu cho mỗi giai đoạn sống.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Hỗ trợ tiêu hóa: Chứa chất xơ (&lt;15%) và các khoáng chất thiết yếu giúp, giúp cải thiện hệ tiêu hoá và tăng cường sức khoẻ đường ruột.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Bổ sung vitamin và khoáng chất: Công thức giàu vitamin A, B, D3, E và các khoáng chất như canxi, kẽm, magie, đảm bảo cho chú cưng luôn khoẻ mạnh và tràn đầy năng lượng.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Tuổi thọ tiêu chuẩn an toàn: Sản phẩm được sản xuất từ quy trình nghiệm ngặt, đảm bảo chất lượng và an toàn cho thú cưng, phù hợp với các tiêu chuẩn quốc tế.</span>
                  </li>
                </ul>
              </div>
            )}

            {product.category === "fashion" && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Đặc điểm nổi bật</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Thiết kế năng động, phong cách thể thao</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Dễ dàng mặc và tháo, không gây khó chịu cho thú cưng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Có nhiều size phù hợp với mọi giống {product.petType === "dog" ? "chó" : "mèo"}</span>
                  </li>
                </ul>
              </div>
            )}

            {(product.category === "accessory" || product.category === "toy") && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Đặc điểm nổi bật</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Chất liệu an toàn, không độc hại</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Thiết kế bền bỉ, chịu lực tốt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Dễ dàng vệ sinh và bảo quản</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Phù hợp với mọi lứa tuổi của {product.petType === "dog" ? "chó" : "mèo"}</span>
                  </li>
                </ul>
              </div>
            )}

            {product.category === "hygiene" && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Công dụng</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Làm sạch sâu, loại bỏ bụi bẩn và mùi hôi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Dưỡng lông mềm mại, óng ả</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>An toàn với làn da nhạy cảm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Hương thơm nhẹ nhàng, dễ chịu</span>
                  </li>
                </ul>
              </div>
            )}

            {product.category === "medicine" && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Công dụng</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Bổ sung vitamin và khoáng chất thiết yếu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Tăng cường hệ miễn dịch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Hỗ trợ xương khớp và hệ tiêu hóa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7B7B] mt-1">•</span>
                    <span>Phù hợp cho mọi lứa tuổi</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Thành phần và quy cách</h3>
              <p className="text-gray-700 mb-4">
                Sản phẩm {product.name} được chế biến từ các nguyên liệu chọn lọc, 
                đảm bảo an toàn và đáp ứng tiêu chuẩn chất lượng cao nhất. 
                Mỗi sản phẩm đều trải qua kiểm định nghiêm ngặt trước khi đến tay người tiêu dùng.
              </p>
              <p className="text-sm text-gray-600 italic">
                * Lưu ý: Vui lòng tham khảo ý kiến bác sĩ thú y trước khi sử dụng nếu thú cưng của bạn có vấn đề về sức khỏe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}