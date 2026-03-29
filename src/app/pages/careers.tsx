import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { MapPin, Briefcase, Wallet, Users, Calendar } from "lucide-react";
import { Link } from "react-router";

const jobListings = [
  {
    id: 2,
    title: "Bác sĩ thú y",
    location: "08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa",
    type: "Full - time",
    salary: "Thương lượng",
    positions: "01",
    deadline: "15/06/2026"
  },
  {
    id: 3,
    title: "Nhân viên kinh doanh",
    location: "08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa",
    type: "Part - time",
    salary: "20k/1h",
    positions: "Không giới hạn",
    deadline: "Tuyển dụng liên tục"
  },
  {
    id: 4,
    title: "Nhân viên chăm sóc thú cưng",
    location: "08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa",
    type: "Part - time",
    salary: "3-5 triệu",
    positions: "01",
    deadline: "20/05/2026"
  }
];

export function Careers() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4">
            Cơ hội nghề nghiệp tại MiaPET
          </h1>
          <p className="text-gray-600 text-lg">
            Gia nhập đi ngũ của chúng tôi và cùng nhau chăm sóc những người bạn bốn chân đáng yêu
          </p>
        </div>

        <div className="space-y-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-[#FF7B7B] mb-4">
                    {job.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span>{job.type}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>{job.positions} vị trí</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-4">
                  <div className="flex items-center gap-2 text-[#FF7B7B] font-semibold">
                    <Calendar className="w-5 h-5" />
                    <span>{job.deadline}</span>
                  </div>
                  
                  <Link to={`/careers/${job.id}`} className="bg-white border-2 border-[#FF7B7B] text-[#FF7B7B] px-6 py-2 rounded-lg font-semibold hover:bg-[#FF7B7B] hover:text-white transition-colors">
                    XEM CHI TIẾT
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}