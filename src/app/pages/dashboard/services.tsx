import { DashboardLayout } from "../../components/dashboard-layout";
import { useNavigate } from "react-router";
import { Syringe, Scissors, Droplet, ShoppingBag, Home, ArrowRight, Phone } from "lucide-react";

export function DashboardServices() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: Syringe,
      title: "Tiêm phòng chó mèo",
      description: "Bảo vệ chó mèo với các loại vắc xin chất lượng tốt, môi trường tiêm phòng an toàn. Đội ngũ bác sĩ thú y chuyên nghiệp.",
      path: "/vaccination",
      color: "from-blue-500 to-blue-600",
      features: ["Vắc xin nhập khẩu", "Bác sĩ chuyên khoa", "Tư vấn miễn phí"]
    },
    {
      id: 2,
      icon: Scissors,
      title: "Grooming, cắt tỉa, nhuộm lông",
      description: "Chú chó của bạn sẽ trở nên xinh đẹp hơn nhờ các chuyên gia grooming tài năng nhất. Đa dạng kiểu dáng theo yêu cầu.",
      path: "/grooming",
      color: "from-purple-500 to-purple-600",
      features: ["Cắt tỉa chuyên nghiệp", "Nhuộm an toàn", "Tạo kiểu độc đáo"]
    },
    {
      id: 3,
      icon: Droplet,
      title: "Dịch vụ tắm chó mèo",
      description: "Tiết kiệm thời gian của bạn với dịch vụ tắm cho chó mèo chuyên nghiệp. Sản phẩm cao cấp, an toàn cho da lông.",
      path: "/bath-service",
      color: "from-cyan-500 to-cyan-600",
      features: ["Sữa tắm cao cấp", "Sấy khô an toàn", "Vệ sinh toàn diện"]
    },
    {
      id: 4,
      icon: ShoppingBag,
      title: "Pet Shop",
      description: "Cung cấp đầy đủ đồ dùng và phụ kiện: thức ăn, đồ chơi, quần áo, nhà đệm cho chó mèo của bạn với giá cả hợp lý.",
      path: "/products",
      color: "from-orange-500 to-orange-600",
      features: ["Sản phẩm chính hãng", "Giá cả cạnh tranh", "Giao hàng nhanh"]
    },
    {
      id: 5,
      icon: Home,
      title: "Trông giữ chó mèo",
      description: "Giúp bạn yên tâm khi đi du lịch, về quê hay có việc bận mà không thể mang theo chó mèo. Chăm sóc tận tình 24/7.",
      path: "/pet-hotel",
      color: "from-green-500 to-green-600",
      features: ["Chăm sóc 24/7", "Camera giám sát", "Môi trường sạch sẽ"]
    }
  ];

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  return (
    <DashboardLayout title="Dịch vụ">
      {/* Header Section */}
      <div className="mb-8 bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] rounded-2xl shadow-lg p-8 text-white">
        <h1 className="text-3xl md:text-4xl mb-3">Dịch vụ của MiaPET</h1>
        <p className="text-lg opacity-90 max-w-3xl">
          Chăm sóc toàn diện cho thú cưng yêu quý của bạn với đội ngũ chuyên gia tận tâm và trang thiết bị hiện đại
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
            >
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-900 mb-2 group-hover:text-[#FF7B7B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleServiceClick(service.path)}
                    className="flex-1 bg-[#FF7B7B] text-white py-3 rounded-xl hover:bg-[#ff6565] transition-colors font-semibold flex items-center justify-center gap-2 group"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="tel:0877742747"
                    className="flex-1 bg-white text-[#FF7B7B] border-2 border-[#FF7B7B] py-3 rounded-xl hover:bg-[#FF7B7B] hover:text-white transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Đặt lịch
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Combo Packages */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl text-gray-900 mb-6">Gói combo tiết kiệm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-sm p-6 border-2 border-[#FF7B7B]/20 hover:shadow-lg transition-all">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-[#FF7B7B] rounded-full flex items-center justify-center mx-auto mb-3">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Combo tắm + cắt tỉa</h3>
              <p className="text-sm text-gray-600 mb-3">Tiết kiệm 15% so với đặt riêng lẻ</p>
              <div className="text-3xl text-[#FF7B7B] font-bold mb-2">Từ 180k</div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF7B7B] rounded-full"></div>
                Tắm gội sạch sẽ
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF7B7B] rounded-full"></div>
                Cắt tỉa theo yêu cầu
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF7B7B] rounded-full"></div>
                Vệ sinh tai mắt
              </li>
            </ul>
            <a
              href="tel:0877742747"
              className="w-full bg-[#FF7B7B] text-white py-2.5 rounded-xl hover:bg-[#ff6565] transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Đặt ngay
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm p-6 border-2 border-purple-300 hover:shadow-lg transition-all">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Gói spa cao cấp</h3>
              <p className="text-sm text-gray-600 mb-3">Chăm sóc toàn diện cho thú cưng</p>
              <div className="text-3xl text-purple-600 font-bold mb-2">Từ 350k</div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Tắm gội + massage
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Cắt tỉa + tạo kiểu
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Dưỡng lông + nước hoa
              </li>
            </ul>
            <a
              href="tel:0877742747"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Đặt ngay
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-sm p-6 border-2 border-blue-300 hover:shadow-lg transition-all">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Syringe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Gói tiêm phòng trọn gói</h3>
              <p className="text-sm text-gray-600 mb-3">Bảo vệ toàn diện cho cún mèo</p>
              <div className="text-3xl text-blue-600 font-bold mb-2">Từ 500k</div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Tiêm phòng đầy đủ
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Khám sức khỏe
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Tư vấn miễn phí
              </li>
            </ul>
            <a
              href="tel:0877742747"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Đặt ngay
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">Liên hệ đặt lịch dịch vụ</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Đội ngũ MiaPET luôn sẵn sàng tư vấn và hỗ trợ bạn. Hãy liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ phù hợp nhất cho thú cưng của bạn.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <a
              href="tel:0877742747"
              className="flex items-center gap-3 bg-[#FF7B7B] text-white px-8 py-4 rounded-full hover:bg-[#ff6565] transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: 0877 742 747
            </a>
            <a
              href="https://maps.google.com/?q=08+Yên+Trường+Thanh+Hoá"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-[#FF7B7B] border-2 border-[#FF7B7B] px-8 py-4 rounded-full hover:bg-[#FF7B7B] hover:text-white transition-colors font-semibold text-lg"
            >
              <Home className="w-5 h-5" />
              08 Yên Trường, Thanh Hoá
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Giờ làm việc: 8:00 - 20:00 hàng ngày (kể cả Chủ nhật & ngày lễ)
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}