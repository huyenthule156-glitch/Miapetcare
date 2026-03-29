import { AdminLayout } from "../../components/admin-layout";
import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Heart, Calendar, User } from "lucide-react";
import { 
  getAllPets, 
  getPetsWithOwnerInfo, 
  getPetStats, 
  deletePet as deletePetFromStorage,
  searchPets
} from "../../../lib/pet-storage";
import { AdminAddPetModal } from "../../components/admin-add-pet-modal";

interface PetWithOwner {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;
  lastCheckup?: string;
  status: "healthy" | "treatment" | "monitoring";
  image: string;
  userId: string;
}

export function AdminPets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [pets, setPets] = useState<PetWithOwner[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    healthy: 0,
    treatment: 0,
    monitoring: 0
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load pets from localStorage
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = () => {
    const petsData = getPetsWithOwnerInfo() as PetWithOwner[];
    setPets(petsData);
    
    const statsData = getPetStats();
    setStats({
      total: statsData.total,
      healthy: statsData.healthy,
      treatment: statsData.treatment,
      monitoring: statsData.monitoring
    });
  };

  const species = ["Chó", "Mèo", "Chim", "Hamster", "Thỏ"];

  const filteredPets = pets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = selectedSpecies === "all" || pet.species === selectedSpecies;
    return matchesSearch && matchesSpecies;
  });

  const handleDelete = (petId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa hồ sơ thú cưng này?")) {
      const success = deletePetFromStorage(petId);
      if (success) {
        loadPets(); // Reload data after delete
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "treatment":
        return "bg-red-100 text-red-800";
      case "monitoring":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy":
        return "Khỏe mạnh";
      case "treatment":
        return "Đang điều trị";
      case "monitoring":
        return "Theo dõi";
      default:
        return status;
    }
  };

  return (
    <AdminLayout title="Quản lý thú cưng">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm thú cưng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
          >
            <option value="all">Tất cả loài</option>
            {species.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg hover:bg-[#ff6565] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm thú cưng</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Tổng thú cưng</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Khỏe mạnh</p>
          <p className="text-2xl font-bold text-green-500">{stats.healthy}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Đang điều trị</p>
          <p className="text-2xl font-bold text-red-500">{stats.treatment}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Đang theo dõi</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.monitoring}</p>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <img 
                src={pet.image} 
                alt={pet.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pet.status)}`}>
                {getStatusText(pet.status)}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                  <p className="text-sm text-gray-500">{pet.breed}</p>
                </div>
                <Heart className="w-5 h-5 text-[#FF7B7B]" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">Loài:</span>
                  <span>{pet.species}</span>
                  <span className="mx-1">•</span>
                  <span>{pet.age}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{pet.ownerName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Khám: {pet.lastCheckup ? new Date(pet.lastCheckup).toLocaleDateString("vi-VN") : "Chưa có"}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Xem chi tiết</span>
                </button>
                <button 
                  onClick={() => handleDelete(pet.id)}
                  className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Không tìm thấy thú cưng</p>
        </div>
      )}

      <AdminAddPetModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadPets}
      />
    </AdminLayout>
  );
}