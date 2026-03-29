import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Link } from "react-router";
import { ArrowRight, Tag } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const newsArticles = [
  {
    id: 1,
    title: "5 Dấu hiệu nhận biết thú cưng của bạn đang cần được \"đi Spa\" ngay lập tức",
    excerpt: "Khám phá những dấu hiệu cho thấy thú cưng của bạn cần được chăm sóc spa để giữ gìn vẻ đẹp và sức khỏe tốt nhất.",
    image: "https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwc3BhJTIwZ3Jvb21pbmd8ZW58MXx8fHwxNzczNzYzNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Chăm sóc",
    date: "15/03/2026"
  },
  {
    id: 2,
    title: "Chế độ ăn \"Eat Clean\" cho cún cưng: Nên hay không nên?",
    excerpt: "Tìm hiểu về chế độ ăn sạch cho thú cưng, lợi ích và những điều cần lưu ý khi áp dụng chế độ ăn này.",
    image: "https://images.unsplash.com/photo-1609284568429-b73c7ea66d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwZWF0aW5nJTIwZm9vZHxlbnwxfHx8fDE3NzM3NjM2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Dinh dưỡng",
    date: "12/03/2026"
  },
  {
    id: 3,
    title: "[Sự kiện] Ngày hội \"Giao lưu bốn chân\" cùng Miapet cuối tuần này",
    excerpt: "Tham gia ngày hội giao lưu thú cưng đầy thú vị với nhiều hoạt động hấp dẫn và quà tặng giá trị dành cho bạn và boss.",
    image: "https://images.unsplash.com/photo-1668522907255-62950845ff46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZ3MlMjBjYXRzJTIwcGxheWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3Mzc2MzY4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sự kiện",
    date: "10/03/2026"
  }
];

export function News() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl text-[#FF7B7B] mb-4">
            Tin tức & Sự kiện
          </h1>
          <p className="text-gray-600 text-lg">
            Cập nhật tin tức mới nhất về chăm sóc thú cưng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 bg-[#FF7B7B]/10 text-[#FF7B7B] px-3 py-1 rounded-full text-sm font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    {article.category}
                  </div>
                  <span className="text-gray-400 text-sm">{article.date}</span>
                </div>

                <h3 className="text-xl mb-3 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <Link
                  to={`/news/${article.id}`}
                  className="inline-flex items-center gap-2 text-[#FF7B7B] font-medium hover:gap-3 transition-all"
                >
                  Xem thêm
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}