import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import type { Product } from "../data/products-data-new";

interface AdminEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
  onUpdate: (id: number, product: Partial<Product>) => void;
}

export function AdminEditProductModal({
  isOpen,
  onClose,
  onSuccess,
  product,
  onUpdate,
}: AdminEditProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "food" as "food" | "toy" | "accessory" | "medicine",
    petType: "both" as "dog" | "cat" | "both",
    image: "",
    inStock: true,
    stock: "50",
  });

  // Load product data when modal opens
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        petType: product.petType,
        image: product.image,
        inStock: product.inStock,
        stock: product.stock ? product.stock.toString() : "50",
      });
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const stockValue = parseInt(formData.stock);
    const updatedProduct: Partial<Product> = {
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      petType: formData.petType,
      image: formData.image,
      stock: stockValue,
      inStock: stockValue > 0,
      status: stockValue > 0 ? "available" : "out-of-stock",
    };

    onUpdate(product.id, updatedProduct);
    onSuccess();
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Sửa sản phẩm</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          {/* Danh mục & Loại thú cưng */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              >
                <option value="food">Thức ăn</option>
                <option value="toy">Đồ chơi</option>
                <option value="accessory">Phụ kiện</option>
                <option value="medicine">Thuốc & Vitamin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dành cho <span className="text-red-500">*</span>
              </label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              >
                <option value="dog">Chó</option>
                <option value="cat">Mèo</option>
                <option value="both">Cả chó & mèo</option>
              </select>
            </div>
          </div>

          {/* Giá & Số lượng tồn kho */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giá (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="1000"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số lượng tồn kho <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* URL ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL ảnh sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x400?text=Invalid+Image";
                  }}
                />
              </div>
            )}
          </div>

          {/* Thông tin trạng thái */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Trạng thái:</span>{" "}
              {parseInt(formData.stock || "0") === 0 ? (
                <span className="text-red-600 font-semibold">Hết hàng</span>
              ) : (
                <span className="text-green-600 font-semibold">Còn hàng</span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Trạng thái tự động cập nhật dựa trên số lượng tồn kho
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors font-semibold"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}