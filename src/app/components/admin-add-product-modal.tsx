import { X } from "lucide-react";
import { useState } from "react";
import type { Product } from "../data/products-data-new";

interface AdminAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onSuccess?: () => void;
}

export function AdminAddProductModal({ isOpen, onClose, onAdd, onSuccess }: AdminAddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "food" as 'food' | 'toy' | 'accessory' | 'medicine',
    petType: "both" as 'dog' | 'cat' | 'both',
    image: "",
    stock: "0",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống";
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }
    
    if (!formData.image.trim()) {
      newErrors.image = "URL ảnh không được để trống";
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Số lượng tồn kho không hợp lệ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new product
    const newProduct: Product = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      petType: formData.petType,
      image: formData.image,
      stock: parseInt(formData.stock),
      inStock: parseInt(formData.stock) > 0,
      status: parseInt(formData.stock) > 0 ? 'available' : 'out-of-stock',
    };

    onAdd(newProduct);
    onSuccess?.();
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      category: "food",
      petType: "both",
      image: "",
      stock: "0",
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Thêm sản phẩm mới</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
              min="0"
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
            >
              <option value="food">Thức ăn</option>
              <option value="toy">Đồ chơi</option>
              <option value="accessory">Phụ kiện</option>
              <option value="medicine">Thuốc & Vitamin</option>
            </select>
          </div>

          {/* Loại thú cưng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại thú cưng <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.petType}
              onChange={(e) => setFormData({ ...formData, petType: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
            >
              <option value="dog">Chó</option>
              <option value="cat">Mèo</option>
              <option value="both">Cả hai</option>
            </select>
          </div>

          {/* URL Ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Ảnh <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://..."
            />
            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+Image';
                  }}
                />
              </div>
            )}
          </div>

          {/* Số lượng tồn kho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng tồn kho <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
              min="0"
            />
            {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
            <p className="mt-1 text-sm text-gray-500">
              {parseInt(formData.stock || "0") === 0 ? "Sản phẩm sẽ được đánh dấu hết hàng" : "Sản phẩm sẽ có sẵn"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#FF7B7B] text-white px-4 py-2 rounded-lg hover:bg-[#ff6565] transition-colors"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}