import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Play, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

export function Home() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleAppointmentClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard/appointments");
    } else {
      setShowLoginDialog(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/wE8s993ZV-8?autoplay=1&mute=1&loop=1&playlist=wE8s993ZV-8&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
          title="Background Video"
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: 'none' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#FF7B7B]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 max-w-7xl mx-auto px-8 flex flex-col justify-end pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-5xl mb-6 text-white font-bold">
                Hãy để chúng tôi chăm sóc thú cưng của bạn
              </h1>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Hệ thống quản lý thú cưng của chúng tôi cung cấp các sản phẩm thoả mãn thú cưng của bạn đồng thời giúp bạn theo dõi sức khỏe, lịch hẹn và lịch chăm sóc của chúng. Với tính năng đặt lịch dễ dàng, hồ sơ thú cưng chi tiết và dịch vụ thú y chuyên nghiệp, chúng tôi đảm bảo thú cưng của bạn nhận được sự chăm sóc tốt nhất có thể.
              </p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handleAppointmentClick}
                  className="bg-[#FF7B7B] text-white px-8 py-3 rounded-full hover:bg-[#ff6565] transition-colors font-semibold shadow-lg"
                >
                  Đặt lịch hẹn
                </button>
                <button 
                  onClick={() => setShowVideoDialog(true)}
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white transition-colors text-white"
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
             
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Yêu cầu đăng nhập</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Bạn cần đăng nhập để sử dụng tính năng tạo lịch hẹn cho thú cưng của mình.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              to="/sign-in"
              className="bg-[#FF7B7B] text-white px-6 py-3 rounded-full hover:bg-[#ff6565] transition-colors text-center"
            >
              Đăng nhập ngay
            </Link>
            <Link
              to="/sign-up"
              className="border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full hover:border-[#FF7B7B] hover:text-[#FF7B7B] transition-colors text-center"
            >
              Tạo tài khoản mới
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Video giới thiệu cửa hàng thú cưng</DialogTitle>
            <DialogDescription>
              Xem video giới thiệu về dịch vụ chăm sóc thú cưng của chúng tôi
            </DialogDescription>
          </DialogHeader>
          <div className="relative bg-black">
            <button
              onClick={() => setShowVideoDialog(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/tJDekd3FrTs?autoplay=1"
              title="Video giới thiệu cửa hàng thú cưng"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}