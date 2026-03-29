import { Syringe, Scissors, Droplet, ShoppingBag, Home } from "lucide-react";

export function CircularServices() {
  const services = [
    {
      id: "tiem-phong",
      icon: Syringe,
      title: "TIÊM PHÒNG CHÓ MÈO",
      description: "Bảo vệ chó mèo với các loại vắc xin chất lượng tốt, môi trường tiêm phòng an toàn",
      position: "top-left" as const,
    },
    {
      id: "grooming",
      icon: Scissors,
      title: "GROOMING, CẮT TỈA, NHUỘM LÔNG",
      description: "Chú chó của bạn sẽ trở nên xinh đẹp hơn nhờ các chuyên gia grooming tài năng nhất",
      position: "top-right" as const,
    },
    {
      id: "tam-cho-meo",
      icon: Droplet,
      title: "DỊCH VỤ TẮM CHÓ MÈO",
      description: "Tiết kiệm thời gian của bạn với dịch vụ tắm cho mèo chuyên nghiệp",
      position: "middle-right" as const,
    },
    {
      id: "pet-shop",
      icon: ShoppingBag,
      title: "PET SHOP",
      description: "Cung cấp đủ loại đồ dùng và phụ kiện từ đầy đủ, rộ mớm, sữa tắm, quần áo, nhà đệm, và thức ăn cho chó mèo của bạn",
      position: "bottom-right" as const,
    },
    {
      id: "trong-giu",
      icon: Home,
      title: "TRÔNG GIỮ CHÓ MÈO",
      description: "Giúp bạn yên tâm khi đi du lịch, về quê hay có việc bận mà không thể mang theo chó mèo",
      position: "bottom-left" as const,
    },
  ];

  const positionStyles = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "middle-right": "top-1/2 -translate-y-1/2 right-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  const scrollToSection = (id: string) => {
    // If it's pet-shop, navigate to products page
    if (id === "pet-shop") {
      window.location.href = "/products";
      return;
    }
    
    // If it's trong-giu, navigate to pet hotel page
    if (id === "trong-giu") {
      window.location.href = "/pet-hotel";
      return;
    }
    
    // If it's tiem-phong, navigate to vaccination page
    if (id === "tiem-phong") {
      window.location.href = "/vaccination";
      return;
    }
    
    // If it's grooming, navigate to grooming page
    if (id === "grooming") {
      window.location.href = "/grooming";
      return;
    }
    
    // If it's tam-cho-meo, navigate to bath service page
    if (id === "tam-cho-meo") {
      window.location.href = "/bath-service";
      return;
    }
    
    // Otherwise scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#FF7B7B] mb-4">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <p className="text-gray-600 text-lg">
            Chăm sóc toàn diện cho thú cưng yêu quý của bạn
          </p>
        </div>

        {/* Contact Info Center */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-6 bg-white rounded-full px-8 py-4 shadow-md">
            <div className="text-3xl">🐕🐱</div>
            <div className="text-left">
              <div className="font-bold text-gray-800 text-lg">MiaPET</div>
              <div className="text-[#FF7B7B] font-semibold">0877 742 747</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-left text-sm text-gray-600">
              <div>08 Yên Trường</div>
              <div>Thanh Hoá</div>
            </div>
          </div>
        </div>

        {/* Services Grid - 2 Rows */}
        <div className="space-y-6">
          {/* Row 1 - 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-[#FF7B7B]/20"
                  onClick={() => scrollToSection(service.id)}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF7B7B] to-[#ff9b9b] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-base leading-tight group-hover:text-[#FF7B7B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2 - 2 services centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.slice(3, 5).map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-[#FF7B7B]/20"
                  onClick={() => scrollToSection(service.id)}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF7B7B] to-[#ff9b9b] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-base leading-tight group-hover:text-[#FF7B7B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}