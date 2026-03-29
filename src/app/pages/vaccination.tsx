import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Check, Phone, MapPin, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import svgPaths from "../../imports/svg-8kjvdm808o";

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

export function Vaccination() {
  const benefits = [
    {
      title: "Được kiểm tra sức khỏe trước khi tiêm chủng",
      description: "Các thú cưng khi đến với MiaPET sẽ được đội ngũ nhân viên bác sĩ kiểm tra sức khỏe hiện tại của các bé xem có bị bệnh nào không, có ổn định hay không. Ngoài ra các bác sĩ còn đưa ra những tư vấn hữu ích giúp chủ nhân của các bé chó, mèo chăm sóc các bé tốt hơn tại nhà."
    },
    {
      title: "Sử dụng những loại vắc xin chất lượng tốt và độ an toàn cao",
      description: "Để giúp cho các bé chó và mèo có sức khỏe, sự đề kháng tốt nhất, phòng khám thú y MiaPET luôn sử dụng các loại vắc xin có chất lượng cao. Đây là những loại vắc xin đạt tiêu chuẩn cao, được nhập khẩu từ Mỹ, Pháp, Anh,…"
    },
    {
      title: "Nhập vắc xin trực tiếp từ nhà phân phối",
      description: "MiaPET luôn nhập các loại vắc xin trực tiếp từ nhà phân phối. Đảm bảo về nguồn gốc xuất xứ, cũng như chất lượng tốt nhất và độ an toàn cao nhất."
    },
    {
      title: "Môi trường tiêm phòng an toàn",
      description: "MiaPET luôn đảm bảo tiêm phòng được thực hiện trong một môi trường an toàn và sạch sẽ. Khu vực tiêm phòng được khử trùng hàng ngày và được trang bị máy xịt khử trùng tự động để đảm bảo sự tiệt trùng và thơm tho, trên hết MiaPET không điều trị các bệnh truyền nhiễm, bạn có thể yên tâm thú cưng của bạn sẽ không phải lo lắng về nguy cơ nhiễm bệnh khi đến tiêm phòng tại MiaPET."
    },
    {
      title: "Đội ngũ bác sĩ thú y chuyên nghiệp và đáng tin cậy",
      description: "Nhân viên, bác sĩ thú y MiaPET không chỉ có chuyên môn tốt, mà còn rất yêu quý động vật. Chúng tôi còn là những người có kinh nghiệm tiếp xúc, chăm sóc với các bé thú cưng. Do đó, chó mèo sẽ cảm thấy thoải mái, không lo âu và căng thẳng khi tham gia tiêm chủng các loại vắc xin tại MiaPET."
    },
    {
      title: "Lưu giữ, tra cứu lịch sử tiêm chủng trực tiếp trên website",
      description: "Khi tiêm phòng cho chó mèo tại MiaPET, lịch tiêm của các bé sẽ được lưu trữ trên hệ thống quản lý tiêm phòng, từ đó lên lịch nhắc khi tới ngày tiêm mũi tiếp theo. Bạn có thể chủ động tự mình kiểm tra lịch tiêm phòng của thú cưng."
    },
    {
      title: "Nhắc lịch tiêm miễn phí – Không lo quên lịch tiêm",
      description: "Bạn sẽ không phải lo lắng quên lịch tiêm phòng cho thú cưng ở các mũi, hay tiêm nhắc lại vào các năm sau. Khi tới lịch tiêm nhân viên MiaPET sẽ chủ động gọi điện và báo lịch tiêm cho bạn."
    }
  ];

  const dogVaccineSchedule = [
    "Mũi 1: 6 tuần tuổi – Tiêm Puppy DP",
    "Mũi 2: 8 tuần tuổi – Tiêm 6 bệnh",
    "Mũi 3: 12 tuần tuổi – Tiêm 7 bệnh",
    "Mũi 4: 16 tuần tuổi – Tiêm 7 bệnh + Dại",
    "Tiêm nhắc lại sau 1 năm: 7 bệnh + Dại"
  ];

  const catVaccineSchedule = [
    "Mũi 1: 6 tuần tuổi – Tiêm 3 bệnh",
    "Mũi 2: 9 tuần tuổi – Tiêm 3 bệnh",
    "Mũi 3: 12 tuần tuổi – Tiêm 3 bệnh",
    "Mũi 4: 16 tuần tuổi – Tiêm Dại",
    "Tiêm nhắc lại sau 1 năm: 3 bệnh + Dại"
  ];

  const notes = [
    "Cần cung cấp đầy đủ thông tin về tình trạng sức khỏe của thú cưng",
    "Đảm bảo thú cưng không bị ốm, sốt hoặc có triệu chứng bệnh trước khi tiêm",
    "Sau khi tiêm cần theo dõi tình trạng của thú cưng trong 24-48h đầu",
    "Hạn chế cho thú cưng vận động mạnh sau tiêm 2-3 ngày"
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
            <span className="text-gray-600">Dịch vụ tiêm phòng vắc xin chó mèo</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-8 py-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6 font-normal">
            Dịch vụ tiêm phòng Vắc xin cho chó mèo tại Thanh Hoá
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
              Là một người chủ quan tâm đến sức khỏe của các bé chó và mèo, chủ nuôi đều chú ý đến việc tiêm phòng vắc xin cho các bé. Hiện nay, tại thành phố Thanh Hoá cũng có nhiều đơn vị phòng khám chuyên chăm sóc sức khỏe các bé cưng, trong đó có thực hiện việc <strong>tiêm phòng vắc xin cho chó mèo</strong>. Phòng khám thú y MiaPET là một trong những đơn vị hàng đầu ở Thanh Hoá chuyên về chăm sóc sức khỏe thú nuôi. Đây cũng là đơn vị được đánh giá cao khi thực hiện dịch vụ tiêm phòng vắc xin các loại cho chó mèo tại Thanh Hoá.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Tại sao nên tiêm phòng vắc xin chó mèo tại MiaPET?
          </h2>
          
          <div className="relative mb-8">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          <p className="text-gray-700 text-center mb-8 leading-relaxed font-medium">
            Hàng ngàn chủ nuôi tại thành phố Thanh Hoá đã chọn MiaPET là nơi tiêm chủng vắc xin cho chó mèo. Bởi vì dịch vụ tiêm phòng thú cưng của MiaPET luôn mang lại sự yên tâm, và đảm bảo nhất:
          </p>

          {/* Benefits List */}
          <div className="space-y-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckIcon />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 mb-8">
            <a
              href="tel:0877742747"
              className="flex items-center justify-center gap-3 bg-[#cf2e2e] text-white px-12 py-4 rounded-full hover:shadow-xl transition-all font-medium text-lg w-full max-w-md mx-auto"
            >
              Tôi Muốn Đặt Lịch Tiêm Phòng Cho Thú Cưng Ngay
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

        {/* Vaccine Schedule Section */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6 font-normal">
            Lịch tiêm phòng cho chó mèo
          </h2>
          
          <div className="relative mb-12">
            <div className="border-b border-gray-200">
              <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
            </div>
          </div>

          {/* Dog Schedule */}
          <div className="mb-12">
            <h3 className="text-2xl font-normal text-gray-900 mb-6">Lịch tiêm phòng cho chó</h3>
            <p className="text-gray-700 font-medium mb-6">Đối với chó lịch tiêm chủng thông thường diễn ra như sau:</p>

            <ul className="space-y-3">
              {dogVaccineSchedule.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <SmallCheckIcon />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cat Schedule */}
          <div className="mb-12">
            <h3 className="text-2xl font-normal text-gray-900 mb-6">Lịch tiêm phòng cho mèo</h3>
            <p className="text-gray-700 font-medium mb-6">Đối với mèo lịch tiêm chủng thông thường diễn ra như sau:</p>

            <ul className="space-y-3">
              {catVaccineSchedule.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <SmallCheckIcon />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="bg-[#FFF5F5] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lưu ý khi tiêm phòng cho chó mèo tại MiaPET</h3>
            <ul className="space-y-3">
              {notes.map((note, index) => (
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

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="text-center space-y-4 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl text-[#FF7B7B] mb-4">Liên hệ đặt lịch tiêm phòng</h3>
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