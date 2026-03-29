import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useParams, useNavigate } from "react-router";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const newsArticlesDetail = {
  "1": {
    id: 1,
    title: "5 Dấu hiệu nhận biết thú cưng của bạn đang cần được \"đi Spa\" ngay lập tức",
    image: "https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwc3BhJTIwZ3Jvb21pbmd8ZW58MXx8fHwxNzczNzYzNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Chăm sóc",
    date: "15/03/2026",
    content: `
      <p>Việc chăm sóc vẻ bề ngoài của thú cưng không chỉ giúp chúng trở nên xinh đẹp, sạch sẽ mà còn đảm bảo sức khỏe tốt. Dưới đây là 5 dấu hiệu cho thấy thú cưng của bạn đang cần được đưa đến spa ngay lập tức:</p>

      <h2>1. Lông bị rối, bết dính và có mùi khó chịu</h2>
      <p>Nếu bạn nhận thấy lông của thú cưng bị rối, bết dính hoặc có mùi khó chịu, đó là dấu hiệu cho thấy chúng cần được tắm và chải lông kỹ l��ỡng. Lông rối không chỉ làm mất thẩm mỹ mà còn có thể gây ngứa, kích ứng da và tạo môi trường cho ký sinh trùng phát triển.</p>

      <h2>2. Móng chân quá dài</h2>
      <p>Móng quá dài có thể gây đau đớn khi thú cưng di chuyển, thậm chí dẫn đến chấn thương hoặc biến dạng xương khớp. Việc cắt móng định kỳ là rất quan trọng để đảm bảo sự thoải mái và sức khỏe cho thú cưng.</p>

      <h2>3. Tai bị bẩn hoặc có mùi lạ</h2>
      <p>Tai là một trong những bộ phận dễ bị nhiễm trùng nhất ở thú cưng. Nếu bạn phát hiện tai của chúng bị bẩn, có chất tiết ra hoặc mùi lạ, hãy đưa chúng đến spa để được vệ sinh và kiểm tra kỹ lưỡng.</p>

      <h2>4. Da bị khô, ngứa hoặc có vảy</h2>
      <p>Da khô, ngứa ngáy hoặc xuất hiện vảy có thể là dấu hiệu của nhiều vấn đề như dị ứng, thiếu dinh dưỡng hoặc ký sinh trùng. Các liệu trình spa với sản phẩm chăm sóc da chuyên dụng sẽ giúp cải thiện tình trạng này.</p>

      <h2>5. Răng miệng có mùi hôi hoặc cao răng</h2>
      <p>Vệ sinh răng miệng kém có thể dẫn đến nhiều vấn đề sức khỏe nghiêm trọng. Nếu thú cưng của bạn có hơi thở hôi hoặc răng bị vàng, đã đến lúc cần chăm sóc vệ sinh răng miệng chuyên nghiệp.</p>

      <h2>Kết luận</h2>
      <p>Đừng đợi đến khi thú cưng của bạn gặp vấn đề nghiêm trọng mới đưa chúng đi spa. Việc chăm sóc định kỳ không chỉ giúp thú cưng luôn sạch sẽ, xinh đẹp mà còn phòng ngừa nhiều bệnh tật. Hãy liên hệ với MiaPET để đặt lịch spa cho thú cưng của bạn ngay hôm nay!</p>
    `
  },
  "2": {
    id: 2,
    title: "Chế độ ăn \"Eat Clean\" cho cún cưng: Nên hay không nên?",
    image: "https://images.unsplash.com/photo-1609284568429-b73c7ea66d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwZWF0aW5nJTIwZm9vZHxlbnwxfHx8fDE3NzM3NjM2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Dinh dưỡng",
    date: "12/03/2026",
    content: `
      <p>Xu hướng "Eat Clean" đang ngày càng phổ biến không chỉ với con người mà còn với thú cưng. Nhưng liệu chế độ ăn này có thực sự phù hợp với cún cưng của bạn?</p>

      <h2>Eat Clean cho thú cưng là gì?</h2>
      <p>Chế độ ăn Eat Clean cho thú cưng tập trung vào việc sử dụng thực phẩm tươi, tự nhiên, không chứa chất bảo quản, màu nhân tạo hay phụ gia hóa học. Thay vì thức ăn công nghiệp, chủ nuôi sẽ tự chuẩn bị bữa ăn từ thịt tươi, rau củ và ngũ cốc nguyên hạt.</p>

      <h2>Lợi ích của chế độ ăn Eat Clean</h2>
      <h3>1. Kiểm soát nguồn gốc thực phẩm</h3>
      <p>Bạn biết chính xác thú cưng của mình đang ăn gì, đảm bảo chất lượng và an toàn thực phẩm tuyệt đối.</p>

      <h3>2. Giảm nguy cơ dị ứng</h3>
      <p>Thực phẩm tự nhiên, không chứa phụ gia giúp giảm thiểu nguy cơ dị ứng và các vấn đề về tiêu hóa.</p>

      <h3>3. Cải thiện sức khỏe tổng thể</h3>
      <p>Nhiều chủ nuôi nhận thấy thú cưng của họ có lông bóng mượt hơn, da khỏe mạnh hơn và năng lượng dồi dào hơn khi áp dụng chế độ ăn này.</p>

      <h2>Những lưu ý quan trọng</h2>
      <h3>1. Cần có kiến thức dinh dưỡng</h3>
      <p>Việc tự chuẩn bị thức ăn đòi hỏi bạn phải hiểu rõ nhu cầu dinh dưỡng của thú cưng để đảm bảo chúng nhận đủ protein, vitamin, khoáng chất cần thiết.</p>

      <h3>2. Tốn thời gian và chi phí</h3>
      <p>So với thức ăn công nghiệp, việc chuẩn bị thức ăn tươi tốn nhiều thời gian và có thể tốn kém hơn.</p>

      <h3>3. Tham khảo ý kiến bác sĩ thú y</h3>
      <p>Trước khi thay đổi chế độ ăn, hãy tham khảo ý kiến bác sĩ thú y để đảm bảo chế độ ăn phù hợp với tình trạng sức khỏe của thú cưng.</p>

      <h2>Kết luận</h2>
      <p>Chế độ ăn Eat Clean có thể mang lại nhiều lợi ích cho thú cưng nếu được thực hiện đúng cách. Tuy nhiên, điều quan trọng nhất là đảm bảo thú cưng nhận đủ dinh dưỡng cần thiết. Hãy liên hệ với đội ngũ chuyên gia dinh dưỡng tại MiaPET để được tư vấn chế độ ăn phù hợp nhất cho thú cưng của bạn!</p>
    `
  },
  "3": {
    id: 3,
    title: "[Sự kiện] Ngày hội \"Giao lưu bốn chân\" cùng Miapet cuối tuần này",
    image: "https://images.unsplash.com/photo-1668522907255-62950845ff46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZ3MlMjBjYXRzJTIwcGxheWluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3Mzc2MzY4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sự kiện",
    date: "10/03/2026",
    content: `
      <p>MiaPET trân trọng kính mời quý khách hàng và các boss bốn chân tham gia Ngày hội "Giao lưu bốn chân" - sự kiện giao lưu thú cưng lớn nhất trong năm!</p>

      <h2>Thông tin sự kiện</h2>
      <ul>
        <li><strong>Thời gian:</strong> 8:00 - 17:00, Chủ nhật, 22/03/2026</li>
        <li><strong>Địa điểm:</strong> 08, Lưu Khê, Xã Yên Trường, Tỉnh Thanh Hóa</li>
        <li><strong>Đối tượng:</strong> Tất cả những ai yêu thú cưng</li>
        <li><strong>Phí tham gia:</strong> MIỄN PHÍ</li>
      </ul>

      <h2>Các hoạt động trong ngày hội</h2>
      
      <h3>1. Cuộc thi "Boss xinh đẹp 2026"</h3>
      <p>Cơ hội để thú cưng của bạn thể hiện vẻ đẹp và tài năng. Giải thưởng hấp dẫn dành cho top 3 boss được bình chọn nhiều nhất!</p>

      <h3>2. Khu vui chơi tương tác</h3>
      <p>Khu vực rộng rãi, an toàn cho các boss giao lưu, vui chơi và kết bạn mới. Có đội ngũ nhân viên chuyên nghiệp hỗ trợ và giám sát.</p>

      <h3>3. Trải nghiệm dịch vụ miễn phí</h3>
      <p>Nhận ngay voucher trải nghiệm dịch vụ spa, tắm, cắt tỉa lông hoàn toàn MIỄN PHÍ cho 50 khách hàng đăng ký sớm nhất.</p>

      <h3>4. Hội chợ sản phẩm thú cưng</h3>
      <p>Hơn 20 gian hàng với đa dạng sản phẩm: thức ăn, đồ chơi, phụ kiện thời trang cho thú cưng với mức giá ưu đãi đặc biệt.</p>

      <h3>5. Tư vấn sức khỏe miễn phí</h3>
      <p>Đội ngũ bác sĩ thú y giàu kinh nghiệm sẽ có mặt để tư vấn miễn phí về sức khỏe, dinh dưỡng và chăm sóc thú cưng.</p>

      <h2>Quà tặng hấp dẫn</h2>
      <ul>
        <li>100% khách tham gia nhận túi quà giá trị</li>
        <li>Rút thăm may mắn trúng voucher dịch vụ trị giá lên đến 2 triệu đồng</li>
        <li>Giảm giá 30% tất cả sản phẩm và dịch vụ khi mua tại sự kiện</li>
      </ul>

      <h2>Đăng ký tham gia</h2>
      <p>Để đăng ký tham gia và nhận voucher trải nghiệm miễn phí, vui lòng liên hệ:</p>
      <ul>
        <li><strong>Hotline:</strong> 0877742747</li>
        <li><strong>Email:</strong> huyenthule156@gmail.com</li>
        <li><strong>Hoặc inbox trực tiếp fanpage MiaPET</strong></li>
      </ul>

      <p><em>Lưu ý: Số lượng voucher trải nghiệm miễn phí có hạn. Đăng ký ngay để không bỏ lỡ cơ hội!</em></p>

      <h2>Hẹn gặp bạn và boss tại Ngày hội!</h2>
      <p>Đừng quên chuẩn bị sẵn sàng để cùng boss của mình tham gia một ngày hội đầy màu sắc và ý nghĩa. MiaPET rất mong được gặp bạn!</p>
    `
  }
};

export function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = id ? newsArticlesDetail[id as keyof typeof newsArticlesDetail] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Không tìm thấy bài viết</h1>
            <button
              onClick={() => navigate("/news")}
              className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff6b6b] transition-colors"
            >
              Quay lại trang tin tức
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
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 text-[#FF7B7B] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại tin tức
          </button>

          <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-[21/9] overflow-hidden">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center gap-1.5 bg-[#FF7B7B]/10 text-[#FF7B7B] px-4 py-2 rounded-full font-medium">
                  <Tag className="w-4 h-4" />
                  {article.category}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl mb-8 leading-tight">
                {article.title}
              </h1>

              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-[#FF7B7B] 
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:text-gray-700 prose-ul:my-6
                  prose-li:my-2
                  prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </article>

          <div className="mt-8 bg-gradient-to-r from-[#FF7B7B] to-[#ff9b9b] rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl mb-4">Quan tâm đến dịch vụ của chúng tôi?</h2>
            <p className="text-lg mb-6 opacity-90">
              Liên hệ ngay với MiaPET để được tư vấn và đặt lịch hẹn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0877742747"
                className="bg-white text-[#FF7B7B] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Gọi: 0877742747
              </a>
              <a
                href="mailto:huyenthule156@gmail.com"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF7B7B] transition-colors"
              >
                Gửi Email
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}