import { StaffLayout } from "../../components/staff-layout";
import { useState, useEffect } from "react";
import { Search, Package, ShoppingCart, X, CheckCircle2, User, Phone, Wallet, CreditCard } from "lucide-react";
import { useInventory } from "../../context/inventory-context";
import { createOrder, createOrderItems } from "../../lib/orders-storage";
import { reduceStock, getAllProducts } from "../../lib/products-storage";

export function StaffProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { products } = useInventory();
  const [localProducts, setLocalProducts] = useState(products);
  
  // Update local products when context products change
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);
  
  // Sale Modal States
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [saleForm, setSaleForm] = useState({
    quantity: 1,
    customerName: "",
    customerPhone: "",
    paymentMethod: "cash" as "cash" | "card" | "momo"
  });
  const [saleSuccess, setSaleSuccess] = useState(false);

  const categoryMap: Record<string, string> = {
    'food': 'Thức ăn',
    'toy': 'Đồ chơi',
    'accessory': 'Phụ kiện',
    'medicine': 'Thuốc & Vitamin'
  };

  // Convert products to display format
  const displayProducts = localProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: categoryMap[product.category] || product.category,
    price: product.price,
    stock: product.stock || 0,
    image: product.image,
    status: (product.stock || 0) > 0 ? "available" as const : "out-of-stock" as const,
    petType: product.petType,
    originalCategory: product.category
  }));

  const categories = ["Thức ăn", "Phụ kiện", "Đồ chơi", "Thuốc & Vitamin"];

  const filteredProducts = displayProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full border border-red-300">Hết hàng</span>;
    } else if (stock < 10) {
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-300">Sắp hết ({stock})</span>;
    } else {
      return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-300">Còn hàng ({stock})</span>;
    }
  };

  const openSaleModal = (product: any) => {
    setSelectedProduct(product);
    setSaleForm({
      quantity: 1,
      customerName: "",
      customerPhone: "",
      paymentMethod: "cash"
    });
    setShowSaleModal(true);
  };

  const closeSaleModal = () => {
    setShowSaleModal(false);
    setSelectedProduct(null);
    setSaleSuccess(false);
  };

  const handleSale = () => {
    if (!selectedProduct) return;

    // Validate quantity
    if (saleForm.quantity <= 0) {
      alert("Số lượng phải lớn hơn 0!");
      return;
    }

    if (saleForm.quantity > selectedProduct.stock) {
      alert(`Chỉ còn ${selectedProduct.stock} sản phẩm trong kho!`);
      return;
    }

    const totalAmount = saleForm.quantity * selectedProduct.price;

    // Create order for walk-in customer
    const orderId = createOrder({
      userId: 'walk-in-customer', // Special ID for walk-in customers
      userName: saleForm.customerName || 'Khách lẻ',
      customerName: saleForm.customerName || 'Khách lẻ',
      customerPhone: saleForm.customerPhone || undefined,
      orderType: 'product' as const,
      totalAmount: totalAmount,
      status: 'completed' as const, // Immediately completed for walk-in sales
      paymentMethod: saleForm.paymentMethod as any,
      paymentStatus: 'paid' as const, // Walk-in sales are paid immediately
    });

    // Create order items
    createOrderItems([{
      orderId: orderId,
      productId: selectedProduct.id,
      itemName: selectedProduct.name,
      itemPrice: selectedProduct.price,
      quantity: saleForm.quantity,
      subtotal: totalAmount,
    }]);

    // Reduce stock
    reduceStock(selectedProduct.id, saleForm.quantity);

    // Trigger products-updated event to refresh inventory
    window.dispatchEvent(new CustomEvent('products-updated', { 
      detail: { action: 'stock-reduced', productId: selectedProduct.id } 
    }));

    // Update local products immediately
    setLocalProducts(getAllProducts());

    // Show success
    setSaleSuccess(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      closeSaleModal();
    }, 2000);
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <Wallet className="w-4 h-4" />;
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'momo':
        return <Phone className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  return (
    <StaffLayout title="Quản lý sản phẩm">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-800">Tổng sản phẩm</span>
          </div>
          <p className="text-2xl font-bold text-indigo-900">{displayProducts.length}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Còn hàng</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {displayProducts.filter(p => p.stock > 10).length}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">Sắp hết</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">
            {displayProducts.filter(p => p.stock > 0 && p.stock < 10).length}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-800">Hết hàng</span>
          </div>
          <p className="text-2xl font-bold text-red-900">
            {displayProducts.filter(p => p.stock === 0).length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tên sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Danh mục</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tồn kho</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">ID: {product.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {product.price.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">{product.stock}</span>
                      {product.stock === 0 && (
                        <span className="ml-2 text-xs text-red-600">(Hết hàng)</span>
                      )}
                      {product.stock > 0 && product.stock < 10 && (
                        <span className="ml-2 text-xs text-yellow-600">(Sắp hết)</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openSaleModal(product)}
                        disabled={product.stock === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          product.stock === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#FF7B7B] text-white hover:bg-[#ff6565]'
                        }`}
                        title={product.stock === 0 ? 'Sản phẩm hết hàng' : 'Bán hàng trực tiếp'}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Bán hàng
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Modal */}
      {showSaleModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Bán hàng trực tiếp</h3>
              <button
                onClick={closeSaleModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            {saleSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Bán hàng thành công!</h4>
                <p className="text-gray-600">Đơn hàng đã được tạo và kho đã được cập nhật.</p>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Product Info */}
                <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{selectedProduct.name}</h4>
                    <p className="text-sm text-gray-600">Tồn kho: {selectedProduct.stock}</p>
                    <p className="text-lg font-bold text-[#FF7B7B] mt-1">
                      {selectedProduct.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.stock}
                    value={saleForm.quantity}
                    onChange={(e) => setSaleForm({ ...saleForm, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                  />
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên khách hàng
                    <span className="text-gray-500 font-normal ml-1">(không bắt buộc)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={saleForm.customerName}
                      onChange={(e) => setSaleForm({ ...saleForm, customerName: e.target.value })}
                      placeholder="Khách lẻ"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                    />
                  </div>
                </div>

                {/* Customer Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                    <span className="text-gray-500 font-normal ml-1">(không bắt buộc)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={saleForm.customerPhone}
                      onChange={(e) => setSaleForm({ ...saleForm, customerPhone: e.target.value })}
                      placeholder="0987654321"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phương thức thanh toán <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setSaleForm({ ...saleForm, paymentMethod: 'cash' })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        saleForm.paymentMethod === 'cash'
                          ? 'border-[#FF7B7B] bg-[#FF7B7B]/10 text-[#FF7B7B]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Wallet className="w-6 h-6" />
                      <span className="text-sm font-semibold">Tiền mặt</span>
                    </button>
                    <button
                      onClick={() => setSaleForm({ ...saleForm, paymentMethod: 'card' })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        saleForm.paymentMethod === 'card'
                          ? 'border-[#FF7B7B] bg-[#FF7B7B]/10 text-[#FF7B7B]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="text-sm font-semibold">Thẻ</span>
                    </button>
                    <button
                      onClick={() => setSaleForm({ ...saleForm, paymentMethod: 'momo' })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        saleForm.paymentMethod === 'momo'
                          ? 'border-[#FF7B7B] bg-[#FF7B7B]/10 text-[#FF7B7B]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Phone className="w-6 h-6" />
                      <span className="text-sm font-semibold">MoMo</span>
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Đơn giá:</span>
                    <span className="font-semibold">{selectedProduct.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-semibold">{saleForm.quantity}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-[#FF7B7B]">
                      {(selectedProduct.price * saleForm.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={closeSaleModal}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSale}
                    className="flex-1 px-6 py-3 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Xác nhận bán
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </StaffLayout>
  );
}