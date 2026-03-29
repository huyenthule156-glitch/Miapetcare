import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { MapPin, Briefcase, Wallet, Users, Calendar, Clock, BookOpen, CheckCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router";

const jobDetails = {
  "2": {
    id: 2,
    title: "Bác sĩ thú y",
    location: "08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa",
    type: "Full - time",
    salary: "Thương lượng",
    positions: "01",
    deadline: "15/06/2026",
    description: "Chúng tôi đang tìm kiếm Bác sĩ thú y có kinh nghiệm để tham gia đội ngũ chăm sóc sức khỏe thú cưng của MiaPET.",
    responsibilities: [
      "Khám và chẩn đoán bệnh cho thú cưng",
      "Điều trị và chăm sóc sức khỏe cho thú cưng",
      "Tư vấn cho khách hàng về chăm sóc và dinh dưỡng",
      "Thực hiện phẫu thuật và các thủ thuật y tế",
      "Ghi chép hồ sơ bệnh án đầy đủ"
    ],
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành Thú y",
      "Có chứng chỉ hành nghề Bác sĩ thú y",
      "Có kinh nghiệm làm việc tại phòng khám thú y là lợi thế",
      "Yêu thương động vật, có trách nhiệm với công việc",
      "Kỹ năng giao tiếp tốt, nhiệt tình với khách hàng"
    ]
  },
  "3": {
    id: 3,
    title: "Nhân viên kinh doanh",
    location: "08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa",
    type: "Part - time",
    salary: "20k/1h",
    positions: "Không giới hạn",
    deadline: "Tuyển dụng liên tục",
    description: "Tìm kiếm Nhân viên kinh doanh năng động để mở rộng dịch vụ chăm sóc thú cưng của MiaPET.",
    responsibilities: [
      "Tư vấn sản phẩm và dịch vụ cho khách hàng",
      "Chăm sóc và hỗ trợ khách hàng qua điện thoại, mạng xã hội",
      "Tiếp nhận và xử lý đơn hàng",
      "Tìm kiếm và phát triển khách hàng mới",
      "Báo cáo kết quả kinh doanh định kỳ"
    ],
    requirements: [
      "Không yêu cầu kinh nghiệm, sinh viên có thể làm part-time",
      "Nhiệt tình, năng động, yêu thích thú cưng",
      "Kỹ năng giao tiếp tốt",
      "Sử dụng thành thạo mạng xã hội",
      "Có khả năng làm việc linh hoạt về thời gian"
    ]
  },
  "4": {
    id: 4,
    title: "Nhân viên chăm sóc thú cưng",
    location: "08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa",
    type: "Part - time",
    salary: "3-5 triệu",
    positions: "01",
    deadline: "20/05/2026",
    description: "Tìm kiếm Nhân viên chăm sóc thú cưng để cung cấp dịch vụ spa, tắm, cắt tỉa lông chuyên nghiệp.",
    responsibilities: [
      "Tắm, vệ sinh, chăm sóc lông cho thú cưng",
      "Cắt tỉa, tạo kiểu lông theo yêu cầu",
      "Kiểm tra sức khỏe cơ bản của thú cưng",
      "Tư vấn khách hàng về dịch vụ chăm sóc",
      "Vệ sinh và sắp xếp khu vực làm việc"
    ],
    requirements: [
      "Yêu thương động vật, kiên nhẫn và tỉ mỉ",
      "Có kinh nghiệm chăm sóc thú cưng là lợi thế",
      "Khỏe mạnh, chịu được áp lực công việc",
      "Có kỹ năng giao tiếp tốt",
      "Sẵn sàng học hỏi các kỹ thuật mới"
    ]
  }
};

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = id ? jobDetails[id as keyof typeof jobDetails] : null;

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Không tìm thấy công việc</h1>
            <button
              onClick={() => navigate("/careers")}
              className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff6b6b] transition-colors"
            >
              Quay lại trang tuyển dụng
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto px-8 py-16">
        <button
          onClick={() => navigate("/careers")}
          className="text-[#FF7B7B] hover:underline mb-6 inline-flex items-center gap-2"
        >
          ← Quay lại danh sách tuyển dụng
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h1 className="text-4xl text-[#FF7B7B] mb-6">
            {job.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#FF7B7B]" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#FF7B7B]" />
              <span>{job.type}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-[#FF7B7B]" />
              <span>{job.salary}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#FF7B7B]" />
              <span>{job.positions} vị trí</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#FF7B7B]" />
              <span>Hạn nộp: {job.deadline}</span>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl text-[#FF7B7B] mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Mô tả công việc
          </h2>
          <ul className="space-y-3">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#FF7B7B] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl text-[#FF7B7B] mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Yêu cầu công việc
          </h2>
          <ul className="space-y-3">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#FF7B7B] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl mb-4">Sẵn sàng gia nhập MiaPET?</h2>
          <p className="text-lg mb-6 opacity-90">
            Gửi CV của bạn về email hoặc liên hệ trực tiếp với chúng tôi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:huyenthule156@gmail.com"
              className="bg-white text-[#FF7B7B] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Gửi CV qua Email
            </a>
            <a 
              href="tel:0877742747"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF7B7B] transition-colors"
            >
              Gọi: 0877742747
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}