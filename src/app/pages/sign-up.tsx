import { Link, useNavigate } from "react-router";
import { PawPrint, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/auth-context";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const validatePassword = (pass: string) => {
    if (pass.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    const hasNumber = /\d/.test(pass);
    const hasLetter = /[a-zA-Z]/.test(pass);
    if (!hasNumber || !hasLetter) {
      setPasswordError("Mật khẩu phải chứa cả chữ và số");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validatePassword(password)) {
      return;
    }

    if (!username || !email || !fullName) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    // Register user with role "user" (khách hàng)
    const result = register(username, email, password, fullName);
    
    if (result.success) {
      console.log("Đăng ký thành công:", { username, email, role: "user" });
      // Navigate to dashboard (customer dashboard)
      navigate("/dashboard");
    } else {
      setError(result.error || "Đăng ký thất bại");
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

      {/* Right Side - Sign Up Form */}
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
          
          <h2 className="text-4xl mb-8 text-gray-900">Đăng ký</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                required
              />
            </div>
            
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
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
                required
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
                required
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-[#FF7B7B] text-white py-3 rounded-full hover:bg-[#ff6565] transition-colors"
            >
              Đăng ký
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/sign-in" className="text-[#FF7B7B] hover:text-[#ff6565]">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}