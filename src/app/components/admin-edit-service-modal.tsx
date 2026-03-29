import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Service, AdditionalService } from "../data/services-data";

interface AdminEditMainServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service: Service | null;
  onUpdate: (id: number, service: Partial<Service>) => void;
}

export function AdminEditMainServiceModal({
  isOpen,
  onClose,
  onSuccess,
  service,
  onUpdate,
}: AdminEditMainServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    duration: "",
    prices: {
      "<1.5kg": 0,
      "1.5-3kg": 0,
      "3-5kg": 0,
      "5-7kg": 0,
      "7-10kg": 0,
      "10-15kg": 0,
      "15-20kg": 0,
      "20-30kg": 0,
    },
  });

  useEffect(() => {
    if (service && isOpen) {
      setFormData({
        name: service.name,
        description: service.description,
        image: service.image,
        duration: service.prices.duration,
        prices: {
          "<1.5kg": service.prices["<1.5kg"],
          "1.5-3kg": service.prices["1.5-3kg"],
          "3-5kg": service.prices["3-5kg"],
          "5-7kg": service.prices["5-7kg"],
          "7-10kg": service.prices["7-10kg"],
          "10-15kg": service.prices["10-15kg"],
          "15-20kg": service.prices["15-20kg"],
          "20-30kg": service.prices["20-30kg"],
        },
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    const updatedService: Partial<Service> = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      prices: {
        ...formData.prices,
        duration: formData.duration,
      },
    };

    onUpdate(service.id, updatedService);
    onSuccess();
    onClose();
  };

  const handlePriceChange = (weightRange: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [weightRange]: parseInt(value) || 0,
      },
    }));
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Sửa dịch vụ chính</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tên dịch vụ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên dịch vụ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="Tên dịch vụ"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="Mô tả chi tiết dịch vụ"
            />
          </div>

          {/* URL ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL ảnh <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                      "https://via.placeholder.com/400x300?text=Invalid+Image";
                  }}
                />
              </div>
            )}
          </div>

          {/* Thời gian */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thời gian ước tính <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="VD: 2h - 3h"
            />
          </div>

          {/* Bảng giá theo cân nặng */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Bảng giá theo cân nặng (VNĐ) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.prices).map(([range, price]) => (
                <div key={range}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {range}
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => handlePriceChange(range, e.target.value)}
                    required
                    min="0"
                    step="1000"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
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

// Additional Service Edit Modal
interface AdminEditAdditionalServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service: AdditionalService | null;
  onUpdate: (id: number, service: Partial<AdditionalService>) => void;
}

export function AdminEditAdditionalServiceModal({
  isOpen,
  onClose,
  onSuccess,
  service,
  onUpdate,
}: AdminEditAdditionalServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (service && isOpen) {
      setFormData({
        name: service.name,
        description: service.description,
        price: typeof service.price === "number" ? service.price : 0,
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    const updatedService: Partial<AdditionalService> = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
    };

    onUpdate(service.id, updatedService);
    onSuccess();
    onClose();
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Sửa dịch vụ phụ</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tên dịch vụ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên dịch vụ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="Tên dịch vụ"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="Mô tả chi tiết dịch vụ"
            />
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
              }
              required
              min="0"
              step="1000"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              placeholder="0"
            />
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
