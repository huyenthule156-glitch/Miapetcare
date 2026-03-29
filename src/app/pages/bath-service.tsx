import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Phone, MapPin, ChevronRight, ChevronDown } from "lucide-react";
import svgPaths from "../../imports/svg-8m72shvdzw";

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

export function BathService() {
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(null);

  const bathingSteps = [
    "Tắm chó, mèo với sữa tắm chuyên dụng",
    "Sấy và chải lông cẩn thận",
    "Lau khô tai sạch sẽ",
    "Cắt móng an toàn",
    "Nước hoa thơm tho",
    "Vệ sinh tai mắt kỹ lưỡng",
    "Kiểm tra sức khỏe tổng quát"
  ];

  const priceList = [
    {
      title: "Gói tắm cơ bản cho chó",
      items: [
        { size: "Chó nhỏ (< 5kg)", price: "80.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai" },
        { size: "Chó vừa (5-15kg)", price: "120.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai" },
        { size: "Chó lớn (15-30kg)", price: "180.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai" },
        { size: "Chó rất lớn (> 30kg)", price: "250.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai" }
      ]
    },
    {
      title: "Gói tắm cao cấp cho chó",
      items: [
        { size: "Chó nhỏ (< 5kg)", price: "150.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai mắt, cắt móng, vắt tuyến hôi, nước hoa" },
        { size: "Chó vừa (5-15kg)", price: "220.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai mắt, cắt móng, vắt tuyến hôi, nước hoa" },
        { size: "Chó lớn (15-30kg)", price: "320.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai mắt, cắt móng, vắt tuyến hôi, nước hoa" },
        { size: "Chó rất lớn (> 30kg)", price: "450.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai mắt, cắt móng, vắt tuyến hôi, nước hoa" }
      ]
    },
    {
      title: "Gói tắm cho mèo",
      items: [
        { size: "Mèo cỡ nhỏ", price: "100.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai" },
        { size: "Mèo cỡ lớn", price: "150.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông, vệ sinh tai" },
        { size: "Mèo lông dài", price: "200.000đ", description: "Bao gồm: Tắm gội, sấy khô, chải lông kỹ, gỡ rối, vệ sinh tai" }
      ]
    },
    {
      title: "Dịch vụ bổ sung",
      items: [
        { size: "Cắt móng", price: "30.000đ", description: "Cắt móng cẩn thận, không làm đau thú cưng" },
        { size: "Vệ sinh tai", price: "30.000đ", description: "Làm sạch ráy tai, khử mùi hôi" },
        { size: "Vắt tuyến hôi", price: "50.000đ", description: "Vắt tuyến hôi chuyên nghiệp, tránh viêm nhiễm" },
        { size: "Gỡ rối lông", price: "Từ 100.000đ", description: "Giá phụ thuộc vào mức độ rối lông" },
        { size: "Xịt nước hoa", price: "30.000đ", description: "Nước hoa cao cấp, thơm lâu" }
      ]
    }
  ];

  const whyChooseUs = [
    {
      title: "Sản phẩm tắm gội cao cấp",
      description: "MiaPET sử dụng các dòng sữa tắm chuyên dụng cho thú cưng từ các thương hiệu uy tín, an toàn cho da và lông, không gây kích ứng. Sản phẩm phù hợp với từng loại lông và làn da nhạy cảm."
    },
    {
      title: "Trang thiết bị hiện đại",
      description: "Hệ thống bồn tắm chuyên dụng, máy sấy công nghiệp điều chỉnh nhiệt độ phù hợp, đảm bảo an toàn tuyệt đối cho thú cưng. Tất cả thiết bị được khử trùng sau mỗi lần sử dụng."
    },
    {
      title: "Nhân viên giàu kinh nghiệm",
      description: "Đội ngũ nhân viên được đào tạo bài bản, có kinh nghiệm xử lý với nhiều giống chó mèo khác nhau, kể cả những bé khó tính hoặc sợ nước. Chăm sóc tận tình, nhẹ nhàng."
    },
    {
      title: "Quy trình chuẩn chỉ",
      description: "Mỗi thú cưng đều được thực hiện theo quy trình tắm gội chuẩn, đầy đủ các bước từ vệ sinh, tắm gội, sấy khô đến chải lông. Đảm bảo sạch sẽ, thơm tho và đẹp mắt."
    },
    {
      title: "Không gian sạch sẽ, thoáng mát",
      description: "Khu vực tắm rửa được thiết kế chuyên biệt, thông thoáng, đầy đủ ánh sáng tự nhiên. Vệ sinh và khử trùng hàng ngày, tạo môi trường an toàn và thoải mái cho thú cưng."
    },
    {
      title: "Giá cả hợp lý, minh bạch",
      description: "Bảng giá rõ ràng theo từng gói dịch vụ và kích cỡ thú cưng. Không phát sinh chi phí ngoài ý muốn. Có các gói combo tiết kiệm cho khách hàng thường xuyên."
    }
  ];

  const importantNotes = [
    "Thú cưng nên được tiêm phòng đầy đủ trước khi sử dụng dịch vụ tắm",
    "Không nên tắm cho thú cưng trong vòng 1 tuần sau khi tiêm phòng",
    "Thông báo cho nhân viên nếu thú cưng có vấn đề về da hoặc đang điều trị bệnh gì",
    "Mang theo sổ sức khỏe của thú cưng khi đến lần đầu",
    "Nên đặt lịch trước để tránh phải chờ đợi lâu, đặc biệt vào cuối tuần",
    "Thú cưng cái đang mang thai nên tham khảo ý kiến bác sĩ trước khi tắm"
  ];

  const togglePrice = (index: number) => {
    setOpenPriceIndex(openPriceIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <a href="/" className="text-[#FF7B7B] hover:underline capitalize">Trang chủ</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Dịch vụ tắm chó mèo</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-8 py-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6 font-normal">
            Dịch vụ tắm chó mèo tại Thanh Hoá
          </h1>
          
          <div className="relative mb-6">
            <div className="border-b-2 border-dashed border-[#FF7B7B] pb-4">
              <div className="w-12 h-6 mx-auto relative -mb-3">
                <div className="absolute inset-0 bg-[#FF7B7B] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-left space-y-4 text-gray-700 leading-relaxed text-base">
            <p className="font-medium">
              Bạn có mệt mỏi khi phải vật lộn với thú cưng của mình khi tắm cho chúng không? Bạn có lo lắng về việc cắt tỉa móng? Hay bộ lông của chúng đang trở nên rối, dính bẩn và đầy bụi đất? Việc sấy lông cho chúng có làm bạn vất vả và mất quá nhiều thời gian?
            </p>
            <p className="font-medium">
              Thay vì chiến đấu với thú cưng của bạn trong nhà tắm, hãy để các nhân viên chăm sóc thú cưng của MiaPET làm điều đó cho bạn để bạn có thể có những giây phút nghỉ ngơi. Gọi cho chúng tôi ngay hôm nay để đặt lịch tắm cho chó mèo của bạn!
            </p>
          </div>
        </div>

        {/* Bath Process Section */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Dịch vụ tắm chó mèo chuyên nghiệp
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-6 font-medium">
              Tắm thường xuyên rất quan trọng trong việc chăm sóc sức khỏe chó mèo cũng như cho người nuôi. Chó mèo sẽ luôn được sạch sẽ, vệ sinh, giúp loại bỏ lông rối, hạn chế bọ chét và các bệnh về da. Việc thường xuyên sử dụng dịch vụ tắm chó mèo tại MiaPET sẽ đem lại lợi ích thiết thực cho thú cưng của bạn. Tại MiaPET, thú cưng sẽ được tắm và chăm sóc theo đúng các quy trình tắm thú cưng chuyên nghiệp, bài bản và đầy đủ các bước:
            </p>
            <ul className="space-y-3">
              {bathingSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <SmallCheckIcon />
                  </div>
                  <span className="text-gray-700 font-medium">{step}</span>
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
              Tôi Muốn Đặt Lịch Tắm Ngay
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

        {/* Price List Section with Accordion */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Bảng giá tắm chó mèo
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            {priceList.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => togglePrice(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-normal text-gray-900">{category.title}</h3>
                  <ChevronDown 
                    className={`w-6 h-6 text-[#FF7B7B] transition-transform ${
                      openPriceIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openPriceIndex === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <div className="mt-1">
                            <CheckIcon />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-gray-900 font-medium">{item.size}</p>
                              <p className="text-[#FF7B7B] font-bold text-lg whitespace-nowrap ml-4">{item.price}</p>
                            </div>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 text-center">
            <p className="text-gray-700 leading-relaxed font-medium">
              💡 Giá có thể thay đổi tùy thuộc vào tình trạng lông và độ hợp tác của thú cưng. Vui lòng liên hệ trực tiếp qua hotline{" "}
              <a href="tel:0877742747" className="text-[#FF7B7B] font-bold hover:underline">
                0877 742 747
              </a>{" "}
              để được tư vấn chi tiết và đặt lịch hẹn.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Tại sao khách hàng luôn chọn dịch vụ tắm tại MiaPET?
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

        {/* Important Notes Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Lưu ý khi sử dụng dịch vụ tắm chó mèo
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <ul className="space-y-4">
              {importantNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <SmallCheckIcon />
                  </div>
                  <span className="text-gray-700 font-medium">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl mb-6 font-normal">
              Hãy để MiaPET chăm sóc thú cưng của bạn!
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto font-medium">
              Với đội ngũ nhân viên chuyên nghiệp, trang thiết bị hiện đại và sản phẩm cao cấp, chúng tôi cam kết mang đến cho thú cưng của bạn trải nghiệm tắm rửa tuyệt vời nhất. Đặt lịch ngay hôm nay!
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
            <h3 className="text-2xl text-[#FF7B7B] mb-4">Liên hệ đặt lịch tắm cho thú cưng</h3>
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
