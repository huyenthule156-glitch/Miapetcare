import { useState, useMemo } from "react";
import { AdminLayout } from "../../components/admin-layout";
import { Package, Plus, Search, Edit2, Trash2, AlertCircle, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { useInventory } from "../../context/inventory-context";
import { AdminEditProductModal } from "../../components/admin-edit-product-modal";
import { AdminAddProductModal } from "../../components/admin-add-product-modal";
import type { Product } from "../../data/products-data-new";

export function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();

  const categoryMap: Record<string, string> = {
    'food': 'Thức ăn',
    'toy': 'Đồ chơi',
    'accessory': 'Phụ kiện',
    'medicine': 'Thuốc & Vitamin'
  };

  const reverseCategoryMap: Record<string, 'food' | 'toy' | 'accessory' | 'medicine'> = {
    'Thức ăn': 'food',
    'Đồ chơi': 'toy',
    'Phụ kiện': 'accessory',
    'Thuốc & Vitamin': 'medicine'
  };

  // Convert products to admin format for display
  const displayProducts = products.map(product => ({
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

  const handleDelete = (productId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      deleteProduct(productId);
    }
  };

  const handleEditClick = (displayProduct: any) => {
    // Convert display product back to original product format
    const originalProduct = products.find(p => p.id === displayProduct.id);
    if (originalProduct) {
      setSelectedProduct(originalProduct);
      setShowEditModal(true);
    }
  };

  return (
    <AdminLayout title="Quản lý sản phẩm">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg hover:bg-[#ff6565] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm sản phẩm</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Tổng sản phẩm</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Hết hàng</p>
          <p className="text-2xl font-bold text-red-500">{products.filter(p => (p.stock || 0) === 0).length}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                product.status === "available" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {product.status === "available" ? "Còn hàng" : "Hết hàng"}
              </div>
            </div>
            
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-[#FF7B7B]">
                    {product.price.toLocaleString('vi-VN')}đ
                  </p>
                  <p className="text-xs text-gray-500">Kho: {product.stock}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditClick(product)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Sửa</span>
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Xóa</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Không tìm thấy sản phẩm</p>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <AdminEditProductModal
          isOpen={showEditModal}
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onUpdate={updateProduct}
          onSuccess={() => {
            // Reload or refresh if needed
          }}
        />
      )}

      {/* Add Product Modal */}
      <AdminAddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addProduct}
        onSuccess={() => {
          // Product added successfully
        }}
      />
    </AdminLayout>
  );
}