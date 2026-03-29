import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";
import { PawPrint } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-8 py-16">
        <h1 className="text-5xl mb-12 text-center">
          Liên hệ với chúng tôi
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Left Side - Google Maps */}
          <div className="h-[600px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59536.98!2d105.6!3d20.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zWcOqbiBUcsaw4budbmcsIFRoYW5oIEhvw6E!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s&q=L%C6%B0u+Kh%C3%AA%2C+X%C3%A3+Y%C3%AAn+Tr%C6%B0%E1%BB%9Dng%2C+Thanh+H%C3%B3a"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí MiaPET"
            />
          </div>

          {/* Right Side - Contact Info */}
          <div className="bg-[#FF7B7B] text-white p-12 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-8 shadow-lg">
                <PawPrint className="w-16 h-16 text-[#FF7B7B]" />
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">
                <span className="text-white">Mia</span>
                <span className="text-gray-900">PET</span>
              </h2>
              <p className="text-white/90">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn từ 8h00 - 18h00 mỗi ngày
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Địa chỉ</h3>
                  <p className="text-white/90">
                    08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-white/90">huyenthule156@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Số điện thoại</h3>
                  <p className="text-white/90">0877742747</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Giờ làm việc</h3>
                  <p className="text-white/90">8:00 - 18:00 (Hàng ngày)</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-4 text-center">Kết nối với chúng tôi:</h3>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#FF7B7B] p-3 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#FF7B7B] p-3 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://zalo.me/g/nvdvie5lfl0fiooq9gpu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#FF7B7B] p-3 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Zalo"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}