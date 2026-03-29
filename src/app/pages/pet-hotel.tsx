import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Check, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PetHotel() {
  const benefits = [
    "Được kiểm tra sức khỏe trước khi nhận trông giữ",
    "Môi trường sạch sẽ, an toàn và thoáng mát",
    "Chế độ dinh dưỡng phù hợp với từng bé",
    "Phòng riêng tư, thoải mái cho thú cưng",
    "Đội ngũ chăm sóc chuyên nghiệp và yêu thương động vật",
    "Camera theo dõi 24/7 – Cập nhật tình trạng liên tục",
    "Nhắc lịch đưa đón miễn phí"
  ];

  const pricingTiers = [
    { weight: "Dưới 3kg", price: "60.000đ/ngày" },
    { weight: "Từ 3kg - 5kg", price: "70.000đ/ngày" },
    { weight: "Từ 5kg - 7kg", price: "80.000đ/ngày" },
    { weight: "Từ 7kg - 10kg", price: "90.000đ/ngày" },
    { weight: "Từ 10kg - 15kg", price: "100.000đ/ngày" },
  ];

  const notes = [
    "Đối với thú cưng trên 15kg: Báo giá riêng theo tình trạng và nhu cầu chăm sóc",
    "Miễn phí tắm rửa vệ sinh 1 lần/tuần cho thú cưng gửi từ 7 ngày trở lên",
    "Giảm 10% cho khách hàng gửi trên 1 tháng",
    "Hỗ trợ đưa đón tận nơi (tính phí riêng theo khu vực)"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pink-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-[#FF7B7B] hover:underline">Trang chủ</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Dịch vụ trông giữ chó mèo</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-8 py-8 text-center">
          <h1 className="text-4xl md:text-5xl text-[#FF7B7B] mb-6">
            Dịch vụ trông giữ chó mèo tại MiaPET
          </h1>
          
          <div className="border-b-2 border-dashed border-[#FF7B7B]/30 pb-4 mb-6">
            <div className="w-12 h-3 mx-auto relative">
              <div className="absolute inset-0 bg-[#FF7B7B] rounded-full"></div>
            </div>
          </div>

          <div className="text-left space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              Vào các kỳ nghỉ lễ, về quê, đi du lịch, dành thời gian cho gia đình mình,...
            </p>
            
            <div className="bg-[#FFF5F5] border-l-4 border-[#FF7B7B] rounded-lg p-6 space-y-3">
              <p>
                😢 <strong>Thật đau đầu khi phải nghĩ xem cách chăm sóc chó mèo khi đi vắng.</strong> Không biết ở nhà các thú cưng có nghịch ngợm không, có bỏ bữa hay bay bữa không?
              </p>
              <p>
                ☘️ <strong>Đừng lo vì MiaPET sẽ giúp các bạn giải quyết vấn đề nhức nhối này.</strong>
              </p>
            </div>

            <p className="text-center font-medium">
              MiaPET cung cấp dịch vụ trông giữ, nội trú, pet hotel chó mèo như sau:
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          <h2 className="text-3xl md:text-4xl text-center mb-6">
            Tại sao nên gửi chó mèo tại MiaPET?
          </h2>
          
          <div className="border-b border-gray-200 mb-8">
            <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
          </div>

          <p className="text-gray-700 text-center mb-8 leading-relaxed">
            Hàng trăm chủ nuôi tại Thanh Hoá đã chọn MiaPET là nơi trông giữ thú cưng. Bởi vì dịch vụ của MiaPET luôn mang lại sự yên tâm và đảm bảo nhất:
          </p>

          {/* Image */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 max-w-3xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-[#FF7B7B]/10 to-[#FF7B7B]/5 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏡🐕🐱</div>
                <p className="text-gray-500 text-sm">Không gian trông giữ chuyên nghiệp tại MiaPET</p>
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm mt-4">
              MiaPET mang đến dịch vụ trông giữ chó mèo tốt hàng đầu Thanh Hoá
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF7B7B] flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit === "Được kiểm tra sức khỏe trước khi nhận trông giữ" && 
                      "Các thú cưng khi đến với MiaPET sẽ được đội ngũ nhân viên kiểm tra sức khỏe hiện tại xem có bị bệnh nào không, có ổn định hay không. Ngoài ra còn đưa ra những tư vấn hữu ích giúp chủ nhân chăm sóc các bé tốt hơn tại nhà."}
                    
                    {benefit === "Môi trường sạch sẽ, an toàn và thoáng mát" && 
                      "MiaPET luôn đảm bảo thú cưng được trông giữ trong môi trường an toàn và sạch sẽ. Khu vực được khử trùng hàng ngày và trang bị máy xịt khử trùng tự động để đảm bảo sự tiệt trùng và thơm tho."}
                    
                    {benefit === "Chế độ dinh dưỡng phù hợp với từng bé" && 
                      "Các bé được cung cấp thức ăn chất lượng cao, phù hợp với từng độ tuổi và giống loài. Bạn cũng có thể mang theo thức ăn quen thuộc của bé để đảm bảo chế độ ăn uống ổn định."}
                    
                    {benefit === "Phòng riêng tư, thoải mái cho thú cưng" && 
                      "Mỗi bé đều có không gian riêng, thoải mái để nghỉ ngơi và vui chơi. Phòng được thiết kế thoáng mát, đầy đủ tiện nghi phù hợp với nhu cầu của từng loại thú cưng."}
                    
                    {benefit === "Đội ngũ chăm sóc chuyên nghiệp và yêu thương động vật" && 
                      "Nhân viên MiaPET không chỉ có chuyên môn tốt mà còn rất yêu quý động vật. Chúng tôi còn là những người có kinh nghiệm tiếp xúc, chăm sóc các bé thú cưng. Do đó, chó mèo sẽ cảm thấy thoải mái, không lo âu và căng thẳng."}
                    
                    {benefit === "Camera theo dõi 24/7 – Cập nhật tình trạng liên tục" && 
                      "Bạn có thể yên tâm theo dõi tình trạng của bé mọi lúc mọi nơi. MiaPET sẽ gửi hình ảnh, video cập nhật định kỳ để bạn biết bé đang vui chơi, ăn uống như thế nào."}
                    
                    {benefit === "Nhắc lịch đưa đón miễn phí" && 
                      "Bạn sẽ không phải lo lắng quên lịch đón thú cưng. Khi tới ngày hẹn, nhân viên MiaPET sẽ chủ động gọi điện nhắc nhở bạn."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h2 className="text-3xl md:text-4xl text-center mb-6">
            Bảng giá dịch vụ gửi chó mèo
          </h2>
          
          <div className="border-b border-gray-200 mb-12">
            <div className="w-16 h-1 bg-[#FF7B7B] mx-auto mb-[-2px]"></div>
          </div>

          {/* Image */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#FF7B7B]/10 to-[#FF7B7B]/5 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💰📋</div>
                <p className="text-gray-500 text-sm">Bảng giá trông giữ theo cân nặng</p>
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm mt-4">
              Bảng giá dịch vụ trông giữ chó mèo tại MiaPET
            </p>
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <ul className="space-y-4">
              {pricingTiers.map((tier, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFF5F5] to-white rounded-xl border border-[#FF7B7B]/20 hover:shadow-md transition-shadow"
                >
                  <span className="text-gray-700 font-medium flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FF7B7B] text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {tier.weight}
                  </span>
                  <span className="text-[#FF7B7B] font-bold text-xl">
                    {tier.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="bg-[#FFF5F5] rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lưu ý khi sử dụng dịch vụ trông giữ của MiaPET</h3>
            <ul className="space-y-3">
              {notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-[#FF7B7B] mt-2 flex-shrink-0"></div>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-12">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#FF7B7B]/10 to-[#FF7B7B]/5 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🐕💕🐱</div>
                <p className="text-gray-500 text-sm">Chăm sóc tận tâm tại MiaPET</p>
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm mt-4">
              Dịch vụ trông giữ chó mèo chuyên nghiệp tại Thanh Hoá
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <a
              href="tel:0877742747"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] text-white px-12 py-4 rounded-full hover:shadow-xl transition-all font-bold text-lg w-full"
            >
              <Phone className="w-5 h-5" />
              Tôi Muốn Đặt Lịch Trông Giữ Ngay
            </a>
            
            <p className="text-center text-sm text-gray-500">Hoặc</p>
            
            <a
              href="https://maps.google.com/?q=08+Yên+Trường+Thanh+Hoá"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#FF7B7B] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all font-bold text-lg w-full md:w-auto md:mx-auto"
            >
              <MapPin className="w-5 h-5" />
              Chỉ đường cho tôi tới MiaPET
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Liên hệ: <a href="tel:0877742747" className="text-[#FF7B7B] font-semibold hover:underline">0877 742 747</a> để biết thêm chi tiết
            </p>
            <p className="text-sm text-gray-500">
              Địa chỉ: <span className="text-gray-700 font-medium">08 Yên Trường, Thanh Hoá</span>
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-2xl text-yellow-400">⭐</span>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-[#FF7B7B]">5.0</span> • 158 đánh giá
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
