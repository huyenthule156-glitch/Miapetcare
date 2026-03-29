import { AdminLayout } from "../../components/admin-layout";
import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Wrench, Scissors, Palette, Crown, Clock, X } from "lucide-react";
import { useInventory } from "../../context/inventory-context";
import { AdminEditMainServiceModal, AdminEditAdditionalServiceModal } from "../../components/admin-edit-service-modal";
import type { Service, AdditionalService } from "../../data/services-data";

export function AdminServices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditMainModal, setShowEditMainModal] = useState(false);
  const [showEditAdditionalModal, setShowEditAdditionalModal] = useState(false);
  const [selectedMainService, setSelectedMainService] = useState<Service | null>(null);
  const [selectedAdditionalService, setSelectedAdditionalService] = useState<AdditionalService | null>(null);
  const [serviceType, setServiceType] = useState<"main" | "additional">("main");
  const { mainServices, additionalServices, vipPackages, dyeServices, deleteMainService, deleteAdditionalService, addMainService, addAdditionalService, updateMainService, updateAdditionalService } = useInventory();

  // Form states for Main Service
  const [mainServiceForm, setMainServiceForm] = useState({
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
      "20-30kg": 0
    }
  });

  // Form states for Additional Service
  const [additionalServiceForm, setAdditionalServiceForm] = useState({
    name: "",
    description: "",
    price: 0
  });

  const categories = ["Dịch vụ chính", "Dịch vụ nhuộm", "Dịch vụ phụ", "Gói VIP"];

  // Convert services to admin display format
  const displayServices = [
    ...mainServices.map(service => ({
      id: service.id,
      name: service.name,
      category: "Dịch vụ chính",
      price: `${(service.prices["<1.5kg"] / 1000).toFixed(0)}k - ${(service.prices["20-30kg"] / 1000).toFixed(0)}k`,
      duration: service.prices.duration,
      type: "main" as const,
      originalData: service
    })),
    ...dyeServices.map(service => ({
      id: service.id + 100,
      name: service.name,
      category: "Dịch vụ nhuộm",
      price: `${(service.regular.under10kg / 1000).toFixed(0)}k - ${(service.premium["10-15kg"] / 1000).toFixed(0)}k`,
      duration: "1-2 giờ",
      type: "dye" as const,
      originalData: service
    })),
    ...additionalServices.map(service => ({
      id: service.id + 200,
      name: service.name,
      category: "Dịch vụ phụ",
      price: typeof service.price === 'number' ? `${(service.price / 1000).toFixed(0)}k` : service.price,
      duration: "30p - 1h",
      type: "additional" as const,
      originalData: service
    })),
    ...vipPackages.map(pkg => ({
      id: pkg.id + 300,
      name: pkg.name,
      category: "Gói VIP",
      price: `${(pkg.dogPrices.under5kg / 1000).toFixed(0)}k - ${(pkg.dogPrices["10-15kg"] / 1000).toFixed(0)}k`,
      duration: pkg.duration,
      type: "vip" as const,
      originalData: pkg
    }))
  ];

  const filteredServices = displayServices.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (serviceId: number, type: string) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      if (type === "main") {
        deleteMainService(serviceId);
      } else if (type === "additional") {
        deleteAdditionalService(serviceId - 200);
      }
    }
  };

  const handleAddService = () => {
    if (serviceType === "main") {
      const newId = mainServices.length > 0 ? Math.max(...mainServices.map(s => s.id)) + 1 : 1;
      addMainService({
        id: newId,
        ...mainServiceForm,
        prices: {
          ...mainServiceForm.prices,
          duration: mainServiceForm.duration
        }
      });
    } else if (serviceType === "additional") {
      const newId = additionalServices.length > 0 ? Math.max(...additionalServices.map(s => s.id)) + 1 : 1;
      addAdditionalService({
        id: newId,
        ...additionalServiceForm
      });
    }
    setShowAddModal(false);
    // Reset forms
    setMainServiceForm({
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
        "20-30kg": 0
      }
    });
    setAdditionalServiceForm({
      name: "",
      description: "",
      price: 0
    });
  };

  return (
    <AdminLayout title="Quản lý dịch vụ">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
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

          <button className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg hover:bg-[#ff6565] transition-colors flex items-center gap-2" onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5" />
            <span>Thêm dịch vụ</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Tổng dịch vụ</p>
          <p className="text-2xl font-bold text-gray-900">{displayServices.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Dịch vụ chính</p>
          <p className="text-2xl font-bold text-green-500">{mainServices.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Dịch vụ phụ</p>
          <p className="text-2xl font-bold text-[#FF7B7B]">{additionalServices.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Gói VIP</p>
          <p className="text-2xl font-bold text-blue-500">{vipPackages.length}</p>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#FF7B7B] to-[#ff6565] rounded-lg flex items-center justify-center">
                        {service.category === "Dịch vụ chính" && <Scissors className="w-5 h-5 text-white" />}
                        {service.category === "Dịch vụ nhuộm" && <Palette className="w-5 h-5 text-white" />}
                        {service.category === "Gói VIP" && <Crown className="w-5 h-5 text-white" />}
                        {service.category === "Dịch vụ phụ" && <Wrench className="w-5 h-5 text-white" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#FF7B7B]">
                    {service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                        onClick={() => {
                          if (service.type === "main") {
                            setSelectedMainService(service.originalData as Service);
                            setShowEditMainModal(true);
                          } else if (service.type === "additional") {
                            setSelectedAdditionalService(service.originalData as AdditionalService);
                            setShowEditAdditionalModal(true);
                          }
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, service.type)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Không tìm thấy dịch vụ</p>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900">Thêm dịch vụ mới</h3>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowAddModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loại dịch vụ *</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as "main" | "additional")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                >
                  <option value="main">✂️ Dịch vụ chính (theo cân nặng)</option>
                  <option value="additional">🔧 Dịch vụ phụ (giá cố định)</option>
                </select>
              </div>

              {serviceType === "main" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tên dịch vụ</label>
                    <input
                      type="text"
                      value={mainServiceForm.name}
                      onChange={(e) => setMainServiceForm({ ...mainServiceForm, name: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                      value={mainServiceForm.description}
                      onChange={(e) => setMainServiceForm({ ...mainServiceForm, description: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Ảnh</label>
                    <input
                      type="text"
                      value={mainServiceForm.image}
                      onChange={(e) => setMainServiceForm({ ...mainServiceForm, image: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Thời gian</label>
                    <input
                      type="text"
                      value={mainServiceForm.duration}
                      onChange={(e) => setMainServiceForm({ ...mainServiceForm, duration: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Giá</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Dưới 1.5kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["<1.5kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "<1.5kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">1.5-3kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["1.5-3kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "1.5-3kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">3-5kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["3-5kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "3-5kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">5-7kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["5-7kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "5-7kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">7-10kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["7-10kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "7-10kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">10-15kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["10-15kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "10-15kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">15-20kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["15-20kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "15-20kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">20-30kg</label>
                        <input
                          type="number"
                          value={mainServiceForm.prices["20-30kg"]}
                          onChange={(e) => setMainServiceForm({ ...mainServiceForm, prices: { ...mainServiceForm.prices, "20-30kg": parseInt(e.target.value) } })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {serviceType === "additional" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tên dịch vụ</label>
                    <input
                      type="text"
                      value={additionalServiceForm.name}
                      onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, name: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                      value={additionalServiceForm.description}
                      onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, description: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Giá</label>
                    <input
                      type="number"
                      value={additionalServiceForm.price}
                      onChange={(e) => setAdditionalServiceForm({ ...additionalServiceForm, price: parseInt(e.target.value) })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <button
                  className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg hover:bg-[#ff6565] transition-colors"
                  onClick={handleAddService}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Main Service Modal */}
      {showEditMainModal && selectedMainService && (
        <AdminEditMainServiceModal
          isOpen={showEditMainModal}
          service={selectedMainService}
          onClose={() => {
            setShowEditMainModal(false);
            setSelectedMainService(null);
          }}
          onUpdate={updateMainService}
          onSuccess={() => {
            // Success callback
          }}
        />
      )}

      {/* Edit Additional Service Modal */}
      {showEditAdditionalModal && selectedAdditionalService && (
        <AdminEditAdditionalServiceModal
          isOpen={showEditAdditionalModal}
          service={selectedAdditionalService}
          onClose={() => {
            setShowEditAdditionalModal(false);
            setSelectedAdditionalService(null);
          }}
          onUpdate={updateAdditionalService}
          onSuccess={() => {
            // Success callback
          }}
        />
      )}
    </AdminLayout>
  );
}