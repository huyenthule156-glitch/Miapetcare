import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import svgPaths from "../../imports/svg-7mtowfoe57";

// Icon component for checkmark bullets
function CheckIcon() {
  return (
    <div className="h-[20px] relative w-[18.58px] flex-shrink-0">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g>
          <path d={svgPaths.p3e008270} fill="#FF7B7B" />
        </g>
      </svg>
    </div>
  );
}

// Smaller icon for sub-bullets
function SmallCheckIcon() {
  return (
    <div className="h-[16px] relative w-[14.86px] flex-shrink-0">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g>
          <path d={svgPaths.p35c94900} fill="#FF7B7B" />
        </g>
      </svg>
    </div>
  );
}

export function Grooming() {
  const hairCutBenefits = [
    "Cắt tỉa lông chuyên nghiệp với các kiểu dáng đa dạng theo yêu cầu",
    "Sử dụng trang thiết bị chuyên dụng nhập khẩu 100%",
    "Nhân viên được đào tạo bài bản theo tiêu chuẩn quốc tế",
    "Thú cưng được chăm sóc tận tình, chu đáo trong suốt quá trình",
    "Giá cả hợp lý, minh bạch, không phát sinh chi phí",
    "Tư vấn cách chăm sóc lông tại nhà sau khi cắt tỉa",
    "Môi trường sạch sẽ, an toàn, thơm tho"
  ];

  const dyeingBenefits = [
    "Sử dụng thuốc nhuộm chuyên dụng cho thú cưng, an toàn tuyệt đối",
    "Màu sắc đa dạng, bền màu, không gây kích ứng da",
    "Tạo kiểu độc đáo, nổi bật theo phong cách riêng của từng bé",
    "Chuyên gia tư vấn màu sắc phù hợp với giống và tính cách thú cưng",
    "Quy trình nhuộm chuẩn, đảm bảo không ảnh hưởng đến sức khỏe",
    "Chăm sóc sau nhuộm để giữ màu lâu và lông luôn mượt mà"
  ];

  const groomingPrices = [
    {
      category: "Chó nhỏ (< 5kg)",
      services: [
        { name: "Tắm gội cơ bản", price: "100.000đ" },
        { name: "Tắm + Cắt tỉa", price: "200.000đ" },
        { name: "Spa trọn gói", price: "300.000đ" },
        { name: "Nhuộm điểm nhấn", price: "150.000đ" }
      ]
    },
    {
      category: "Chó vừa (5-15kg)",
      services: [
        { name: "Tắm gội cơ bản", price: "150.000đ" },
        { name: "Tắm + Cắt tỉa", price: "300.000đ" },
        { name: "Spa trọn gói", price: "450.000đ" },
        { name: "Nhuộm điểm nhấn", price: "250.000đ" }
      ]
    },
    {
      category: "Chó lớn (15-30kg)",
      services: [
        { name: "Tắm gội cơ bản", price: "200.000đ" },
        { name: "Tắm + Cắt tỉa", price: "400.000đ" },
        { name: "Spa trọn gói", price: "600.000đ" },
        { name: "Nhuộm điểm nhấn", price: "350.000đ" }
      ]
    },
    {
      category: "Chó rất lớn (> 30kg)",
      services: [
        { name: "Tắm gội cơ bản", price: "300.000đ" },
        { name: "Tắm + Cắt tỉa", price: "550.000đ" },
        { name: "Spa trọn gói", price: "800.000đ" },
        { name: "Nhuộm điểm nhấn", price: "450.000đ" }
      ]
    }
  ];

  const catPrices = [
    {
      category: "Mèo (tất cả kích cỡ)",
      services: [
        { name: "Tắm gội cơ bản", price: "120.000đ" },
        { name: "Tắm + Cắt tỉa", price: "220.000đ" },
        { name: "Spa trọn gói", price: "350.000đ" },
        { name: "Nhuộm điểm nhấn", price: "180.000đ" }
      ]
    }
  ];

  const specialServices = [
    { name: "Nhuộm toàn thân", price: "Từ 500.000đ - 1.500.000đ" },
    { name: "Cạo lông toàn thân", price: "Từ 100.000đ - 300.000đ" },
    { name: "Tỉa móng + Vệ sinh tai mắt", price: "50.000đ" },
    { name: "Vắt tuyến hôi", price: "50.000đ" },
    { name: "Gỡ rối lông", price: "Từ 100.000đ - 500.000đ" }
  ];

  const whyChooseUs = [
    {
      title: "Đội ngũ groomer chuyên nghiệp",
      description: "Các groomer của MiaPET đều được đào tạo bài bản, có kinh nghiệm làm việc với nhiều giống chó mèo khác nhau. Chúng tôi không chỉ cắt tỉa đẹp mà còn hiểu rõ đặc điểm từng giống để tư vấn kiểu dáng phù hợp nhất."
    },
    {
      title: "Sản phẩm và thiết bị cao cấp",
      description: "MiaPET luôn sử dụng các dòng sản phẩm tắm gội, dưỡng lông chất lượng cao từ các thương hiệu uy tín. Trang thiết bị cắt tỉa, sấy khô được nhập khẩu 100%, đảm bảo an toàn tuyệt đối cho thú cưng."
    },
    {
      title: "Môi trường sạch sẽ, an toàn",
      description: "Khu vực grooming được khử trùng hàng ngày, trang bị máy xịt khử trùng tự động. MiaPET không điều trị các bệnh truyền nhiễm nên bạn hoàn toàn yên tâm về vấn đề vệ sinh và an toàn cho thú cưng."
    },
    {
      title: "Chăm sóc tận tình, yêu quý thú cưng",
      description: "Nhân viên MiaPET không chỉ có tay nghề cao mà còn rất yêu quý động vật. Các bé sẽ được đối xử nhẹ nhàng, thân thiện để cảm thấy thoải mái nhất trong suốt quá trình làm đẹp."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <a href="/" className="text-[#FF7B7B] hover:underline capitalize">Trang chủ</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Grooming, cắt tỉa, nhuộm lông</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-8 py-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6 font-normal">
            Grooming, cắt tỉa lông chó, nhuộm lông chó tại Thanh Hoá
          </h1>
          
          <div className="relative mb-6">
            <div className="border-b-2 border-dashed border-[#FF7B7B] pb-4">
              <div className="w-12 h-6 mx-auto relative -mb-3">
                <div className="absolute inset-0 bg-[#FF7B7B] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-left space-y-4 text-gray-700 leading-relaxed text-base">
            <p>
              Giúp chó mèo của bạn xinh đẹp hơn và đáng yêu hơn với dịch vụ <strong>grooming</strong>, <strong>cắt tỉa lông</strong>, <strong>nhuộm lông</strong> làm đẹp với các chuyên gia nhiều kinh nghiệm và được đào tạo bài bản theo tiêu chuẩn quốc tế tại MiaPET.
            </p>
            <p>
              Tọa lạc tại 08 Yên Trường – Thanh Hoá, Dịch vụ chăm sóc chó mèo MiaPET chính là địa chỉ tin cậy khi bạn muốn chăm sóc, làm đẹp cho thú cưng của mình. Luôn sử dụng các dòng sản phẩm tốt nhất, trang thiết bị nhập ngoại 100% cùng với nhân viên thân thiện, yêu quý <strong>thú cưng</strong> và có tay nghề, cùng kiếu thẩm mỹ tốt để đảm bảo rằng thú cưng của bạn được chăm sóc tận tình chu đáo, luôn xinh đẹp, sạch sẽ và khỏe mạnh.
            </p>
          </div>
        </div>

        {/* Haircut Service Section */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Dịch vụ cắt tỉa lông chó đẹp tại Thanh Hoá
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-6 font-medium">
              Dịch vụ cắt tỉa lông tại MiaPET không chỉ đơn thuần là làm đẹp mà còn giúp thú cưng của bạn cảm thấy thoải mái, mát mẻ, đặc biệt trong mùa hè. Các bé sẽ được chăm sóc tỉ mỉ từng chi tiết để luôn xinh đẹp và dễ thương nhất.
            </p>
            <ul className="space-y-3">
              {hairCutBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <SmallCheckIcon />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 mb-8">
            <a
              href="tel:0877742747"
              className="flex items-center justify-center gap-3 bg-[#cf2e2e] text-white px-12 py-4 rounded-full hover:shadow-xl transition-all font-medium text-lg w-full max-w-md mx-auto"
            >
              Tôi Muốn Đặt Lịch Grooming Ngay
            </a>
            
            <p className="text-center text-sm text-gray-600 font-medium">Hoặc</p>
            
            <a
              href="https://maps.google.com/?q=08+Yên+Trường+Thanh+Hoá"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#0693e3] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all font-medium text-lg w-full max-w-xs mx-auto"
            >
              Chỉ đường cho tôi tới MiaPET
            </a>
          </div>
        </div>

        {/* Grooming Services Grid */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Bảng giá cắt tỉa lông chó
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {groomingPrices.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-normal text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckIcon />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-gray-700 font-medium">{service.name}</p>
                          <p className="text-[#FF7B7B] font-bold whitespace-nowrap ml-4">{service.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cat Prices */}
          <div className="mb-12">
            <h3 className="text-2xl font-normal text-gray-900 mb-6 text-center">Bảng giá cho mèo</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {catPrices.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-normal text-gray-900 mb-4">{category.category}</h4>
                  <ul className="space-y-3">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckIcon />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-gray-700 font-medium">{service.name}</p>
                            <p className="text-[#FF7B7B] font-bold whitespace-nowrap ml-4">{service.price}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Special Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-normal text-gray-900 mb-6 text-center">Dịch vụ đặc biệt</h3>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ul className="space-y-3">
                {specialServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckIcon />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-700 font-medium">{service.name}</p>
                        <p className="text-[#FF7B7B] font-bold whitespace-nowrap ml-4">{service.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed font-medium text-center">
              Giá cắt tỉa lông tại MiaPET phụ thuộc vào kích thước, giống chó mèo và kiểu dáng bạn lựa chọn. Chúng tôi cam kết giá cả minh bạch, hợp lý và không phát sinh chi phí ngoài ý muốn.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium mt-4 text-center">
              Vui lòng liên hệ trực tiếp qua hotline <a href="tel:0877742747" className="text-[#FF7B7B] font-bold hover:underline">0877 742 747</a> để được tư vấn chi tiết về dịch vụ và bảng giá phù hợp nhất cho thú cưng của bạn.
            </p>
          </div>
        </div>

        {/* Dyeing Service Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Dịch vụ nhuộm lông cho chó mèo
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-6 font-medium">
              Nhuộm lông cho chó mèo là xu hướng làm đẹp thú cưng được nhiều chủ nuôi yêu thích. Tại MiaPET, chúng tôi sử dụng thuốc nhuộm chuyên dụng, an toàn tuyệt đối cho sức khỏe và làn da của các bé.
            </p>
            <ul className="space-y-3">
              {dyeingBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <SmallCheckIcon />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Tại sao nên chọn dịch vụ grooming tại MiaPET?
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="space-y-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckIcon />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl mb-6 font-normal">
              Hãy để MiaPET giúp thú cưng của bạn trở nên xinh đẹp hơn!
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto font-medium">
              Với đội ngũ groomer chuyên nghiệp, trang thiết bị hiện đại và sản phẩm cao cấp, chúng tôi cam kết mang đến cho thú cưng của bạn trải nghiệm làm đẹp tuyệt vời nhất. Đặt lịch ngay hôm nay để nhận ưu đãi đặc biệt!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="tel:0877742747"
                className="flex items-center justify-center gap-3 bg-[#cf2e2e] text-white px-12 py-4 rounded-full hover:shadow-xl transition-all font-medium text-lg"
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: 0877 742 747
              </a>
              <a
                href="https://maps.google.com/?q=08+Yên+Trường+Thanh+Hoá"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#0693e3] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all font-medium text-lg"
              >
                <MapPin className="w-5 h-5" />
                Xem bản đồ
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="text-center space-y-4 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl text-[#FF7B7B] mb-4">Liên hệ đặt lịch grooming</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="tel:0877742747" className="flex items-center gap-2 text-gray-700 hover:text-[#FF7B7B] transition-colors">
                <Phone className="w-5 h-5 text-[#FF7B7B]" />
                <span className="font-semibold">0877 742 747</span>
              </a>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <a 
                href="https://maps.google.com/?q=08+Yên+Trường+Thanh+Hoá" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-[#FF7B7B] transition-colors"
              >
                <MapPin className="w-5 h-5 text-[#FF7B7B]" />
                <span className="font-medium">08 Yên Trường, Thanh Hoá</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}