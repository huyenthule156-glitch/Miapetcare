import { useState } from "react";
import { X } from "lucide-react";
import { createPet, Pet } from "../../lib/pet-storage";
import { getAllUsers } from "../../lib/user-storage";

interface AdminAddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminAddPetModal({ isOpen, onClose, onSuccess }: AdminAddPetModalProps) {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    species: "Chó" as Pet["species"],
    breed: "",
    age: "",
    dateOfBirth: "",
    weight: "",
    gender: "Đực" as Pet["gender"],
    status: "healthy" as Pet["status"],
    image: "",
    color: "",
    microchipId: "",
    notes: ""
  });

  const users = getAllUsers().filter(u => u.role === "user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.name || !formData.breed) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      createPet({
        userId: formData.userId,
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: formData.age || "Chưa rõ",
        dateOfBirth: formData.dateOfBirth,
        weight: formData.weight,
        gender: formData.gender,
        status: formData.status,
        image: formData.image || "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400",
        color: formData.color,
        microchipId: formData.microchipId,
        notes: formData.notes
      });

      // Reset form
      setFormData({
        userId: "",
        name: "",
        species: "Chó",
        breed: "",
        age: "",
        dateOfBirth: "",
        weight: "",
        gender: "Đực",
        status: "healthy",
        image: "",
        color: "",
        microchipId: "",
        notes: ""
      });

      onSuccess();
      onClose();
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm thú cưng!");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Thêm thú cưng mới</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Chủ nhân */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Chủ nhân <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
              required
            >
              <option value="">Chọn chủ nhân</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.full_name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tên */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên thú cưng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                placeholder="VD: Bobby"
                required
              />
            </div>

            {/* Loài */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loài <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value as Pet["species"] })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                required
              >
                <option value="Chó">Chó</option>
                <option value="Mèo">Mèo</option>
                <option value="Chim">Chim</option>
                <option value="Hamster">Hamster</option>
                <option value="Thỏ">Thỏ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Giống */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giống <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                placeholder="VD: Golden Retriever"
                required
              />
            </div>

            {/* Tuổi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tuổi
              </label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                placeholder="VD: 3 tuổi"
              />
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ngày sinh
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
              />
            </div>

            {/* Cân nặng */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cân nặng
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                placeholder="VD: 30 kg"
              />
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giới tính
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as Pet["gender"] })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
              >
                <option value="Đực">Đực</option>
                <option value="Cái">Cái</option>
              </select>
            </div>

            {/* Màu sắc */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Màu sắc
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                placeholder="VD: Vàng"
              />
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trạng thái sức khỏe
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Pet["status"] })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
              >
                <option value="healthy">Khỏe mạnh</option>
                <option value="treatment">Đang điều trị</option>
                <option value="monitoring">Đang theo dõi</option>
              </select>
            </div>

            {/* Microchip ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mã Microchip
              </label>
              <input
                type="text"
                value={formData.microchipId}
                onChange={(e) => setFormData({ ...formData, microchipId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
                placeholder="VD: 982000123456789"
              />
            </div>
          </div>

          {/* URL hình ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL hình ảnh
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Để trống để sử dụng ảnh mặc định
            </p>
          </div>

          {/* Ghi chú */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
              rows={3}
              placeholder="Thông tin bổ sung về thú cưng..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF7B7B] text-white rounded-lg hover:bg-[#ff6565] transition-colors font-semibold"
            >
              Thêm thú cưng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
