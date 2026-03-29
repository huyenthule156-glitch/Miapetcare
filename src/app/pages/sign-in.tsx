import { Link, useNavigate } from "react-router";
import { PawPrint } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/auth-context";
import { checkAndUpdateUsers } from "../../lib/user-storage";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Check and update users on component mount
  useEffect(() => {
    checkAndUpdateUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(username, password);
    
    if (success) {
      // Check if there's a redirect URL saved
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      
      if (redirectPath) {
        // Clear the redirect path and navigate to it
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      } else {
        // Default redirect based on user role
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user.role === "admin") {
            navigate("/admin/overview");
          } else if (user.role === "vet") {
            navigate("/vet/dashboard");
          } else if (user.role === "staff") {
            navigate("/staff/overview");
          } else {
            navigate("/dashboard/appointments");
          }
        }
      }
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Coral Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FF7B7B] text-white p-16 flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <div className="bg-white rounded-lg p-1.5">
              <PawPrint className="w-5 h-5 text-[#FF7B7B]" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Mia</span>
              <span className="text-gray-900">PET</span>
            </span>
          </Link>
          
          <h1 className="text-4xl mb-6">
            Chào mừng đến với MiaPET
          </h1>
          
          <p className="text-white/90 text-lg leading-relaxed">
            Đăng ký ngay hôm nay để trải nghiệm các sản phẩm và dịch vụ chăm sóc thú cưng tốt nhất dành cho bạn và thú cưng của mình.
          </p>
        </div>
        
        <div className="flex justify-center">
          <ImageWithFallback 
            src="https://i.pinimg.com/originals/1b/24/ac/1b24ac8a09be517125c1e6af660be32c.gif" 
            alt="Pet Care Illustration" 
            className="w-full max-w-sm"
          />
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-[#FF7B7B] rounded-lg p-1.5">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#FF7B7B]">Mia</span>
                <span className="text-gray-900">PET</span>
              </span>
            </Link>
          </div>
          
          <h2 className="text-4xl mb-8 text-gray-900">Đăng nhập</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#FF7B7B] text-white py-3 rounded-full hover:bg-[#ff6565] transition-colors"
            >
              Đăng nhập
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/sign-up" className="text-[#FF7B7B] hover:text-[#ff6565]">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}