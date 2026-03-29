import { DashboardLayout } from "../../components/dashboard-layout";
import { useState } from "react";
import { useDashboard } from "../../context/dashboard-context";
import type { Pet } from "../../context/dashboard-context";
import { 
  Plus, 
  Heart, 
  Edit2, 
  Trash2, 
  X, 
  Upload, 
  Calendar,
  Scale,
  Cake,
  PawPrint
} from "lucide-react";

export function DashboardPets() {
  const { pets, addPet, updatePet, removePet } = useDashboard();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    species: "Chó",
    breed: "",
    gender: "male" as "male" | "female",
    birthday: "",
    weight: "",
    image: "",
    color: "",
    microchipId: ""
  });

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    if (years === 0) {
      return `${months} tháng tuổi`;
    } else if (months < 0) {
      return `${years - 1} năm ${12 + months} tháng`;
    } else if (months === 0) {
      return `${years} năm`;
    }
    return `${years} năm ${months} tháng`;
  };

  const handleOpenAddModal = () => {
    setEditingPet(null);
    setFormData({
      name: "",
      species: "Chó",
      breed: "",
      gender: "male",
      birthday: "",
      weight: "",
      image: "",
      color: "",
      microchipId: ""
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (pet: Pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      species: pet.species || "Chó",
      breed: pet.breed,
      gender: pet.gender || "male",
      birthday: pet.birthday || "",
      weight: pet.weight || "",
      image: pet.image,
      color: pet.color || "",
      microchipId: pet.microchipId || ""
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPet) {
      // Update existing pet
      updatePet(editingPet.id, { ...formData, id: editingPet.id });
    } else {
      // Add new pet
      const newPet: Pet = {
        ...formData,
        id: Date.now()
      };
      addPet(newPet);
    }
    
    setShowAddModal(false);
  };

  const handleDelete = (petId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa thông tin thú cưng này?")) {
      removePet(petId);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate image upload - in real app, this would upload to server
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout title="Thú Cưng Của Tôi">
      {/* Header with Add Button */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Danh sách thú cưng</h2>
          <p className="text-gray-500 mt-1">Quản lý thông tin các bé cưng của bạn</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm Thú Cưng</span>
        </button>
      </div>

      {/* Empty State */}
      {pets.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-[#FF7B7B]/10 to-[#ff6565]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <PawPrint className="w-12 h-12 text-[#FF7B7B]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Chưa có thú cưng nào
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy thêm thông tin về những bé cưng của bạn để chúng tôi có thể chăm sóc chúng tốt hơn!
            </p>
            <button
              onClick={handleOpenAddModal}
              className="bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Thêm Thú Cưng Đầu Tiên</span>
            </button>
          </div>
        </div>
      )}

      {/* Pets Grid */}
      {pets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Pet Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PawPrint className="w-20 h-20 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className={`text-xs font-semibold ${
                    pet.gender === "male" ? "text-blue-600" : "text-pink-600"
                  }`}>
                    {pet.gender === "male" ? "♂ Đực" : "♀ Cái"}
                  </span>
                </div>
              </div>

              {/* Pet Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
                    <p className="text-sm text-gray-500">{pet.breed}</p>
                  </div>
                  <Heart className="w-6 h-6 text-[#FF7B7B] fill-[#FF7B7B]" />
                </div>

                <div className="space-y-2 mb-4">
                  {pet.species && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <PawPrint className="w-4 h-4 text-[#FF7B7B]" />
                      <span className="font-medium">{pet.species}</span>
                    </div>
                  )}
                  
                  {pet.birthday && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Cake className="w-4 h-4 text-[#FF7B7B]" />
                      <span>{calculateAge(pet.birthday)}</span>
                    </div>
                  )}

                  {pet.weight && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Scale className="w-4 h-4 text-[#FF7B7B]" />
                      <span>{pet.weight} kg</span>
                    </div>
                  )}

                  {pet.color && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: pet.color.toLowerCase() }}></div>
                      <span>Màu: {pet.color}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleOpenEditModal(pet)}
                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Chỉnh sửa</span>
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPet ? "Chỉnh sửa thông tin" : "Thêm thú cưng mới"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ảnh thú cưng
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PawPrint className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer inline-flex items-center gap-2 font-medium">
                        <Upload className="w-4 h-4" />
                        <span>Tải ảnh lên</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG tối đa 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên <span className="text-[#FF7B7B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Bobby, Miu Miu"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                  />
                </div>

                {/* Species and Breed */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loài <span className="text-[#FF7B7B]">*</span>
                    </label>
                    <select
                      required
                      value={formData.species}
                      onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    >
                      <option value="Chó">Chó</option>
                      <option value="Mèo">Mèo</option>
                      <option value="Chim">Chim</option>
                      <option value="Thỏ">Thỏ</option>
                      <option value="Hamster">Hamster</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Giống <span className="text-[#FF7B7B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      placeholder="VD: Golden Retriever"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Gender and Birthday */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Giới tính <span className="text-[#FF7B7B]">*</span>
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    >
                      <option value="male">Đực</option>
                      <option value="female">Cái</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày sinh <span className="text-[#FF7B7B]">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.birthday}
                      onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Weight and Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cân nặng (kg) <span className="text-[#FF7B7B]">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="VD: 5.5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Màu lông
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="VD: Vàng, Đen, Trắng"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Microchip ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã chip (nếu có)
                  </label>
                  <input
                    type="text"
                    value={formData.microchipId}
                    onChange={(e) => setFormData({ ...formData, microchipId: e.target.value })}
                    placeholder="VD: 123456789012345"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF7B7B] to-[#ff6565] text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  {editingPet ? "Cập nhật" : "Thêm thú cưng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}