import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Users, Award, Heart, Stethoscope, Shield, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-3xl p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">
                Chăm sóc thú cưng bằng{" "}
                <span className="text-[#FF7B7B]">sự tận tâm và chuyên môn</span>
              </h1>
              
              <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                MiaPET là cửa hàng và hệ thống quản lý chăm sóc thú cưng được xây dựng với mục tiêu mang đến các sản phẩm và dịch vụ chất lượng dành cho thú cưng. Tại MiaPET, khách hàng có thể tìm thấy nhiều sản phẩm đa dạng như thức ăn, đồ chơi, phụ kiện và các vật dụng cần thiết cho thú cưng. Bên cạnh đó, cửa hàng còn cung cấp các dịch vụ chăm sóc và tư vấn sức khỏe thú cưng với sự hỗ trợ của đội ngũ nhân viên và bác sĩ thú y có kinh nghiệm. Với sự kết hợp giữa sản phẩm chất lượng, dịch vụ tận tâm và trang thiết bị hiện đại, MiaPET hướng đến việc mang lại môi trường chăm sóc toàn diện, giúp thú cưng luôn khỏe mạnh và được chăm sóc tốt nhất.
              </p>
              
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#FF7B7B]" />
                  <span className="text-gray-700">3+ Bác sĩ thú y chuyên nghiệp</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#FF7B7B]" />
                  <span className="text-gray-700">10+ Năm kinh nghiệm</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-[#FFF0E8] rounded-3xl p-8">
                <ImageWithFallback 
                  src="https://i.pinimg.com/564x/67/59/da/6759dab67081a5ed6dc0bf74e4f5f363.jpg" 
                  alt="Happy Cat Illustration" 
                  className="w-full max-w-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-12 bg-white rounded-3xl p-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Giá trị cốt lõi</h2>
            <p className="text-gray-600 text-lg">Những giá trị định hướng hoạt động của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#FF7B7B] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF5F5] rounded-full mb-4">
                <Heart className="w-8 h-8 text-[#FF7B7B]" />
              </div>
              <h3 className="text-xl mb-3">Tận tâm</h3>
              <p className="text-gray-600">
                Chăm sóc mỗi thú cưng như người thân trong gia đình
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#FF7B7B] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF5F5] rounded-full mb-4">
                <Stethoscope className="w-8 h-8 text-[#FF7B7B]" />
              </div>
              <h3 className="text-xl mb-3">Chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ bác sĩ thú y giàu kinh nghiệm và trang thiết bị hiện đại
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#FF7B7B] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF5F5] rounded-full mb-4">
                <Shield className="w-8 h-8 text-[#FF7B7B]" />
              </div>
              <h3 className="text-xl mb-3">Uy tín</h3>
              <p className="text-gray-600">
                Sản phẩm chính hãng, dịch vụ đảm bảo chất lượng
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-[#FF7B7B] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF5F5] rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-[#FF7B7B]" />
              </div>
              <h3 className="text-xl mb-3">Sáng tạo</h3>
              <p className="text-gray-600">
                Ứng dụng công nghệ để nâng cao trải nghiệm khách hàng
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-12 bg-[#FFF5F5] rounded-3xl p-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Tầm nhìn</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Chúng tôi hướng tới một tương lai nơi mỗi thú cưng đều được chăm sóc đầy đủ và toàn diện, từ dinh dưỡng, sức khỏe đến các hoạt động vui chơi và sinh hoạt hằng ngày. MiaPET mong muốn giúp các chủ nuôi dễ dàng tiếp cận những sản phẩm chất lượng, dịch vụ chăm sóc đáng tin cậy và những lời tư vấn hữu ích trong quá trình chăm sóc thú cưng.
            </p>
            
            <p>
              MiaPET không chỉ là một cửa hàng thú cưng, mà còn là người bạn đồng hành đáng tin cậy của các chủ nuôi trong hành trình chăm sóc và nuôi dưỡng thú cưng. Chúng tôi luôn nỗ lực nâng cao chất lượng sản phẩm, cải thiện dịch vụ, đồng thời ứng dụng công nghệ vào quản lý và chăm sóc khách hàng để mang lại trải nghiệm tốt nhất.
            </p>
            
            <p>
              Mục tiêu của MiaPET là trở thành một hệ thống cửa hàng và dịch vụ chăm sóc thú cưng uy tín, được nhiều khách hàng tin tưởng lựa chọn, nơi mỗi thú cưng đều được quan tâm, chăm sóc với sự tận tâm, yêu thương và chuyên nghiệp.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 bg-[#FF7B7B] rounded-3xl p-16 text-center text-white">
          <h2 className="text-4xl mb-6">Mọi điều tốt nhất cho thú cưng của bạn</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Khám phá đa dạng sản phẩm dành cho thú cưng như thức ăn, đồ chơi, phụ kiện cùng các dịch vụ chăm sóc đáng tin cậy từ đội ngũ của chúng tôi.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="bg-white text-[#FF7B7B] px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Xem sản phẩm
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[#FF7B7B] transition-colors">
              Liên hệ chúng tôi
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}