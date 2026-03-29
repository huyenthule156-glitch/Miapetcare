import svgPaths from "./svg-8kjvdm808o";
import imgImage from "figma:asset/4ceba317566df0f189eb52aa05934c64dd6a7272.png";
import imgPetCareMangDnDchVTiemPhongChoMeoTtHangDuVinh from "figma:asset/01182a4469301cbec4324238eca80c3c1859ecff.png";
import imgDchVTiemPhongVcXinChoChoMeoTiVinh from "figma:asset/3decc65e85f82ffdf36a7eb0686d80dea0a43588.png";
import imgDchVTiemPhongVcXinChoChoMeoTiVinh1 from "figma:asset/bcd33ca4eae9e98c1c67d8a95fbc1d21d5e32c4e.png";

function Icon() {
  return (
    <div className="h-[15.972px] relative w-[5.71px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.71 15.972">
        <g id="Icon">
          <path d={svgPaths.pc141b40} fill="var(--fill-0, #444444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[24px] left-[46.08px] overflow-clip right-[46.08px] top-[46.08px]" data-name="Container">
      <div className="-translate-y-1/2 absolute capitalize flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#0964bf] text-[16px] top-[11.5px] w-[45.889px]">
        <p className="leading-[24px]">Home</p>
      </div>
      <div className="absolute flex h-[15.972px] items-center justify-center left-[50.55px] top-[3.03px] w-[5.71px]">
        <div className="-scale-y-100 flex-none">
          <Icon />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[66.26px] text-[#444] text-[16px] top-[11.5px] w-[265.663px]">
        <p className="leading-[24px]">Địa chỉ tiêm phòng vắc xin chó mèo</p>
      </div>
    </div>
  );
}

function SectionHeading() {
  return (
    <div className="absolute h-[98.19px] left-[56.08px] right-[56.08px] top-[95.08px]" data-name="Section → Heading 1">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[50px] justify-center leading-[0] left-[calc(50%+0.18px)] text-[38px] text-black text-center top-[26px] w-[888.203px]">
        <p className="leading-[53.2px]">Dịch vụ tiêm phòng Vắc xin cho chó mèo tại Vinh</p>
      </div>
      <div className="absolute border border-[#0964bf] border-dashed bottom-[-2px] h-[2px] left-0 right-0" data-name="Horizontal Divider" />
      <div className="-translate-x-1/2 absolute bottom-[-11px] h-[21px] left-1/2 w-[41px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function Strong() {
  return (
    <div className="absolute font-['Raleway:Bold',sans-serif] font-bold h-[43px] left-0 top-[26px] w-[1023.39px]" data-name="Strong">
      <div className="-translate-y-1/2 absolute flex flex-col h-[19px] justify-center left-[879.01px] top-[9.5px] w-[144.692px]">
        <p className="leading-[24px]">tiêm phòng vắc xin</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[19px] justify-center left-0 top-[33.5px] w-[98.983px]">
        <p className="leading-[24px]">cho chó mèo</p>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[96px] leading-[0] left-[56.08px] right-[56.08px] text-[#444] text-[16px] top-[273.27px]" data-name="Section">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center left-0 top-[23.5px] w-[1030.89px]">
        <p className="leading-[24px] mb-0">Là một người chủ quan tâm đến sức khỏe của các bé chó và mèo, chủ nuôi đều chú ý đến việc tiêm phòng vắc xin cho các bé. Hiện nay, tại</p>
        <p className="leading-[24px]">{`thành phố Vinh cũng có nhiều đơn vị phòng khám chuyên chăm sóc sức khỏe các bé cưng, trong đó có thực hiện việc `}</p>
      </div>
      <Strong />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center left-[98.62px] top-[59.5px] w-[914.858px]">
        <p className="leading-[24px]">. Phòng khám thú y Petcare là một trong những đơn vị hàng đầu ở Vinh chuyên về chăm sóc sức khỏe thú nuôi. Đây cũng là</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center left-0 top-[83.5px] w-[715.68px]">
        <p className="leading-[24px]">đơn vị được đánh giá cao khi thực hiện dịch vụ tiêm phòng vắc xin các loại cho chó mèo tại Vinh.</p>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute h-[64px] left-[56.08px] right-[56.08px] top-[409.27px]" data-name="Section">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[49px] justify-center leading-[0] left-[calc(50%+0.19px)] text-[35px] text-black text-center top-[24.5px] w-[879.531px]">
        <p className="leading-[49px]">{`Tại sao nên tiêm phòng vắc xin chó mèo tại PetCare? `}</p>
      </div>
      <div className="-translate-x-1/2 absolute border border-[#ebebeb] border-solid bottom-[-2px] h-[2px] left-1/2 w-[360px]" data-name="Horizontal Divider" />
      <div className="-translate-x-1/2 absolute border border-[#0964bf] border-solid bottom-[-2px] h-[2px] left-1/2 w-[60px]" data-name="Horizontal Divider" />
    </div>
  );
}

function PetCareMangDnDchVTiemPhongChoMeoTtHangDuVinh() {
  return (
    <div className="-translate-x-1/2 absolute h-[520px] left-1/2 top-[3px] w-[800px]" data-name="PetCare mang đến dịch vụ tiêm phòng chó mèo tốt hàng đầu Vinh">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPetCareMangDnDchVTiemPhongChoMeoTtHangDuVinh} />
      </div>
    </div>
  );
}

function Figure() {
  return (
    <div className="-translate-x-1/2 absolute bg-white border border-[#f0f0f0] border-solid h-[593px] left-1/2 top-[68px] w-[808px]" data-name="Figure">
      <PetCareMangDnDchVTiemPhongChoMeoTtHangDuVinh />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] left-[calc(50%+0.15px)] text-[#444] text-[16px] text-center top-[569px] w-[573.952px]">
        <p className="leading-[24px]">PetCare mang đến dịch vụ tiêm phòng chó mèo tốt hàng đầu thành phố Vinh</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[676px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon1 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[428.527px]">
        <p className="leading-[28px]">Được kiểm tra sức khỏe trước khi tiêm chủng</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[785px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon2 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[567.03px]">
        <p className="leading-[28px]">Sử dụng những loại vắc xin chất lượng tốt và độ an toàn cao</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[894px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon3 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[377.827px]">
        <p className="leading-[28px]">Nhập vắc xin trực tiếp từ nhà phân phối</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[1003px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon4 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[295.265px]">
        <p className="leading-[28px]">Môi trường tiêm phòng an toàn</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[1136px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon5 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[479.017px]">
        <p className="leading-[28px]">Đội ngũ bác sĩ thú y chuyên nghiệp và đáng tin cậy</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[1269px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon6 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[536.835px]">
        <p className="leading-[28px]">Lưu giữ, tra cứu lịch sử tiêm chủng trực tiếp trên website</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute font-['Raleway:Medium',sans-serif] font-medium h-[43px] leading-[0] left-0 text-[#0964bf] text-[16px] top-[1336px] w-[1009.94px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col h-[19px] justify-center left-[905.25px] top-[9.5px] w-[105.052px]">
        <p className="leading-[24px]">trang kiểm tra</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[19px] justify-center left-0 top-[33.5px] w-[117.011px]">
        <p className="leading-[24px]">lịch tiêm phòng</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] relative w-[18.58px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.58 20">
        <g id="Icon">
          <path d={svgPaths.p3e008270} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-[1402px]" data-name="Heading 4">
      <div className="absolute flex h-[20px] items-center justify-center left-0 top-[5px] w-[18.58px]">
        <div className="-scale-y-100 flex-none">
          <Icon7 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[28.58px] text-[#222] text-[20px] top-[14px] w-[478.416px]">
        <p className="leading-[28px]">Nhăc lịch tiêm miễn phí – Không lo quên lịch tiêm</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#cf2e2e] h-[49px] left-1/2 rounded-[9999px] top-[1500px] w-[480.83px]" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] left-[calc(50%+0.18px)] text-[18px] text-center text-white top-[24.5px] w-[429.227px]">
        <p className="leading-[27px]">Tôi Muốn Đặt Lịch Tiêm Phòng Cho Thú Cưng Ngay</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#0693e3] h-[49px] left-1/2 rounded-[9999px] top-[1595px] w-[297.33px]" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] left-[calc(50%+0.19px)] text-[18px] text-center text-white top-[24.5px] w-[245.751px]">
        <p className="leading-[27px]">Chỉ đường cho tôi tới PetCare</p>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute h-[1633px] left-[56.08px] right-[56.08px] top-[538.27px]" data-name="Section">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[23.5px] w-[1004.71px]">
        <p className="leading-[24px] mb-0">Hàng ngàn chủ nuôi tại thành phố Vinh đã chọn PetCare là nơi tiêm chủng vắc xin cho chó mèo. Bởi vì dịch vụ tiêm phòng thú cưng của</p>
        <p className="leading-[24px]">PetCare luôn mang lại sự yên tâm, và đảm bảo nhất:</p>
      </div>
      <Figure />
      <Heading />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[740.5px] w-[1025.46px]">
        <p className="leading-[24px] mb-0">Các thú cưng khi đến với PetCare sẽ được đội ngũ nhân viên bác sĩ kiểm tra sức khỏe hiện tại của các bé xem có bị bệnh nào không, có ổn</p>
        <p className="leading-[24px]">định hay không. Ngoài ra các bác sĩ còn đưa ra những tư vấn hữu ích giúp chủ nhân của các bé chó, mèo chăm sóc các bé tốt hơn tại nhà.</p>
      </div>
      <Heading1 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[849.5px] w-[1021.29px]">
        <p className="leading-[24px] mb-0">Để giúp cho các bé chó và mèo có sức khỏe, sự đề kháng tốt nhất, phòng khám thú y PetCare luôn sử dụng các loại vắc xin có chất lượng</p>
        <p className="leading-[24px]">cao. Đây là những loại vắc xin đạt tiêu chuẩn cao, được nhập khẩu từ Mỹ, Pháp, Anh,…</p>
      </div>
      <Heading2 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[958.5px] w-[1029.46px]">
        <p className="leading-[24px] mb-0">PetCare luôn nhập các loại vắc xin trực tiếp từ nhà phân phối. Đảm bảo về nguồn ngốc xuất xứ, cũng như chất lượng tốt nhất và độ an toàn</p>
        <p className="leading-[24px]">cao nhất.</p>
      </div>
      <Heading3 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[67px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[1079.5px] w-[1036.89px]">
        <p className="leading-[24px] mb-0">PetCare luôn đảm bảo tiêm phòng được thực hiện trong một môi trường an toàn và sạch sẽ. Khu vực tiêm phòng được khử trùng hàng ngày</p>
        <p className="leading-[24px] mb-0">và được trang bị máy xịt khử trùng tự động để đảm bảo sự tiệt trùng và thơm tho, trên hết PetCare không điều trị các bệnh truyền nhiễm,</p>
        <p className="leading-[24px]">bạn có thể yên tâm thú cưng của bạn sẽ không phải lo lắng về nguy cơ nhiễm bệnh khi đến tiêm phòng tại PetCare.</p>
      </div>
      <Heading4 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[67px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[1212.5px] w-[1031.57px]">
        <p className="leading-[24px] mb-0">Nhân viên, bác sĩ thú y PetCare không chỉ có chuyên môn tốt, mà còn rất yêu quý động vật. Chúng tôi còn là những người có kinh nghiệm</p>
        <p className="leading-[24px] mb-0">tiếp xúc, chăm sóc với các bé thú cưng. Do đó, chó mèo sẽ cảm thấy thoải mái, không lo âu và căng thẳng khi tham gia tiêm chủng các loại</p>
        <p className="leading-[24px]">vắc xin tại PetCare.</p>
      </div>
      <Heading5 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[1333.5px] w-[1022.7px]">
        <p className="leading-[24px] mb-0">Khi tiêm phòng cho chó mèo tại PetCare, lịch tiêm của các bé sẽ được lưu trữ trên hệ thống quản lý tiềm phòng, từ đó lên lịch nhắc khi tới</p>
        <p className="leading-[24px]">{`ngày tiêm mũi tiếp theo. Bạn có thể chủ động tự mình kiểm tra lịch tiêm phong của thủ cưng trên website của PetCare tại `}</p>
      </div>
      <Link />
      <Heading6 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[43px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[1466.5px] w-[994.82px]">
        <p className="leading-[24px] mb-0">Bạn sẽ không phải lo lắng quên lịch tiêm phòng cho thú cưng ở các mũi, hay tiêm nhắc lại vào các năm sau. Khi tới lịch tiêm nhân viên</p>
        <p className="leading-[24px]">PetCare sẽ chủ động gọi điện và báo lịch tiêm cho bạn.</p>
      </div>
      <Link1 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[1573.5px] w-[39.349px]">
        <p className="leading-[24px]">Hoặc</p>
      </div>
      <Link2 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute h-[64px] left-[56.08px] right-[56.08px] top-[2215.27px]" data-name="Section">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[49px] justify-center leading-[0] left-[calc(50%+0.2px)] text-[35px] text-black text-center top-[24.5px] w-[495.643px]">
        <p className="leading-[49px]">{`Lịch tiêm phòng cho chó mèo `}</p>
      </div>
      <div className="-translate-x-1/2 absolute border border-[#ebebeb] border-solid bottom-[-2px] h-[2px] left-1/2 w-[360px]" data-name="Horizontal Divider" />
      <div className="-translate-x-1/2 absolute border border-[#0964bf] border-solid bottom-[-2px] h-[2px] left-1/2 w-[60px]" data-name="Horizontal Divider" />
    </div>
  );
}

function DchVTiemPhongVcXinChoChoMeoTiVinh() {
  return (
    <div className="-translate-x-1/2 absolute h-[449px] left-1/2 top-[3px] w-[800px]" data-name="Dịch vụ tiêm phòng Vắc xin cho chó mèo tại Vinh">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDchVTiemPhongVcXinChoChoMeoTiVinh} />
      </div>
    </div>
  );
}

function Figure1() {
  return (
    <div className="-translate-x-1/2 absolute bg-white border border-[#f0f0f0] border-solid h-[532px] left-1/2 top-[106.79px] w-[808px]" data-name="Figure">
      <DchVTiemPhongVcXinChoChoMeoTiVinh />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] left-[calc(50%+0.16px)] text-[#444] text-[16px] text-center top-[508px] w-[326.217px]">
        <p className="leading-[24px]">Dịch vụ tiêm phòng Vắc xin cho chó tại Vinh</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DchVTiemPhongVcXinChoChoMeoTiVinh1() {
  return (
    <div className="-translate-x-1/2 absolute h-[531px] left-1/2 top-[3px] w-[800px]" data-name="Dịch vụ tiêm phòng Vắc xin cho chó mèo tại Vinh">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDchVTiemPhongVcXinChoChoMeoTiVinh1} />
      </div>
    </div>
  );
}

function Figure2() {
  return (
    <div className="-translate-x-1/2 absolute bg-white border border-[#f0f0f0] border-solid h-[614px] left-1/2 top-[1009.59px] w-[808px]" data-name="Figure">
      <DchVTiemPhongVcXinChoChoMeoTiVinh1 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] left-[calc(50%+0.17px)] text-[#444] text-[16px] text-center top-[590px] w-[364.112px]">
        <p className="leading-[24px]">Dịch vụ tiêm phòng Vắc xin cho chó mèo tại Vinh</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute h-[1822.59px] left-[56.08px] right-[56.08px] top-[2344.27px]" data-name="Section">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[30.8px] justify-center leading-[0] left-0 text-[#222] text-[22px] top-[15.4px] w-[255.869px]">
        <p className="leading-[30.8px]">Lịch tiêm phòng cho chó</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[54.79px] w-[429.597px]">
        <p className="leading-[24px]">Đôi với chó lịch tiêm chủng thông thường diễn ra như sau:</p>
      </div>
      <Figure1 />
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[657.79px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon8 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[666.29px] w-[424.955px]">
        <p className="leading-[24px]">Chó được 6 tuần tuổi: Tiêm vắc xin tổng hợp mũi đầu tiên</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[702.79px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon9 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[711.29px] w-[978.611px]">
        <p className="leading-[24px]">9 tuần tuổi tiêm mũi 2 vắc xin tổng hợp 7 bệnh: bệnh carre virus, bệnh do Parvo virus, bệnh viêm gan truyền nhiễm, bệnh ho cũi chó,</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[735.29px] w-[402.407px]">
        <p className="leading-[24px]">bệnh phó cúm, bệnh do Leptospira, bệnh coronavirus.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[771.79px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon10 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[780.29px] w-[357.639px]">
        <p className="leading-[24px]">12 tuần tuổi: Tiêm mũi 3 vắc xin tổng hợp 7 bệnh</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[816.79px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon11 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[825.29px] w-[926.441px]">
        <p className="leading-[24px]">Chó được 15 tuần tuổi: Tiêm 1 mũi vắc xin phòng bệnh chó dại – rabires. Đây là loại vắc xin tiêm phòng bắt buộc tại Việt Nam.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[861.79px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon12 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[870.29px] w-[600.087px]">
        <p className="leading-[24px]">Chó cần tiêm nhắc lại định kỳ hàng năm sau đó: 1 mũi 7 bệnh và 1 mũi phòng dại.</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[30.8px] justify-center leading-[0] left-0 text-[#222] text-[22px] top-[918.19px] w-[263.182px]">
        <p className="leading-[30.8px]">Lịch tiêm phòng cho mèo</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[957.59px] w-[627.242px]">
        <p className="leading-[24px]">Tương tự như các chú chó, mèo cưng cũng cần tiêm phòng theo lịch cụ thể như sau:</p>
      </div>
      <Figure2 />
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[1642.59px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon13 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[1651.09px] w-[1007.507px]">
        <p className="leading-[24px]">Khi mèo được 6 – 8 tuần tuổi tiêm vắc xin tổng hợp mũi đầu tiên: bệnh giảm bạch cầu, bệnh viêm mũi – khí quản truyền nhiễm, bệnh hô</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[1675.09px] w-[139.008px]">
        <p className="leading-[24px]">hấp do herpevirus.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[1711.59px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon14 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[1720.09px] w-[378.737px]">
        <p className="leading-[24px]">Mèo từ 9 – 12 tuần tuổi tiêm vắc xin tổng hợp mũi 2</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[1756.59px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon15 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[1765.09px] w-[328.528px]">
        <p className="leading-[24px]">Từ 16 tuần tuổi tiêm vắc xin phòng bệnh dại.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[1801.59px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon16 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[1810.09px] w-[827.561px]">
        <p className="leading-[24px]">Hàng năm, mèo vẫn cần tiêm nhắc lại, bao gồm vắc xin tổng hợp phòng trên cùng vắc xin tiêm phòng bệnh dại.</p>
      </div>
    </div>
  );
}

function Section5() {
  return (
    <div className="absolute h-[108px] left-[56.08px] right-[56.08px] top-[4206.86px]" data-name="Section">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[49px] justify-center leading-[0] left-[calc(50%+0.16px)] text-[35px] text-black text-center top-[24.5px] w-[702.817px]">
        <p className="leading-[49px]">Lưu ý khi tiêm phòng vắc xin cho chó mèo</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] left-[calc(50%+0.15px)] text-[#444] text-[16px] text-center top-[71px] w-[584.834px]">
        <p className="leading-[24px]">Chủ nuôi cần phải chú ý những điều sau khi tiêm phòng để giúp bé khỏe mạnh</p>
      </div>
      <div className="-translate-x-1/2 absolute border border-[#ebebeb] border-solid bottom-[-2px] h-[2px] left-1/2 w-[360px]" data-name="Horizontal Divider" />
      <div className="-translate-x-1/2 absolute border border-[#0964bf] border-solid bottom-[-2px] h-[2px] left-1/2 w-[60px]" data-name="Horizontal Divider" />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[16px] relative w-[14.86px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.86 16">
        <g id="Icon">
          <path d={svgPaths.p35c94900} fill="var(--fill-0, #0964BF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#cf2e2e] h-[49px] left-1/2 rounded-[9999px] top-[444px] w-[480.83px]" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] left-[calc(50%+0.18px)] text-[18px] text-center text-white top-[24.5px] w-[429.227px]">
        <p className="leading-[27px]">Tôi Muốn Đặt Lịch Tiêm Phòng Cho Thú Cưng Ngay</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#0693e3] h-[49px] left-1/2 rounded-[9999px] top-[539px] w-[297.33px]" data-name="Link">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] left-[calc(50%+0.19px)] text-[18px] text-center text-white top-[24.5px] w-[245.751px]">
        <p className="leading-[27px]">Chỉ đường cho tôi tới PetCare</p>
      </div>
    </div>
  );
}

function Section6() {
  return (
    <div className="absolute h-[577px] left-[56.08px] right-[56.08px] top-[4379.86px]" data-name="Section">
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[4px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon17 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[12.5px] w-[980.311px]">
        <p className="leading-[24px]">Không nên tiêm phòng cho các bé mới đón về nhà trong vòng 7 – 10 ngày đầu. Vì như vậy các bé chưa có sức khỏe đủ tốt, cũng như</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[36.5px] w-[290.283px]">
        <p className="leading-[24px]">chưa đủ khả năng tạo hệ miễn dịch tốt.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[73px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon18 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[81.5px] w-[611.459px]">
        <p className="leading-[24px]">Không nên để các bé ăn các thức ăn nhiều mỡ, sữa và đồ tanh sau khi tiêm phòng.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[118px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon19 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[126.5px] w-[657.358px]">
        <p className="leading-[24px]">Các bé có biểu hiện lạ và dấu hiệu sức khỏe không tốt thì không nên tiêm phòng vắc xin.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[163px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon20 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[171.5px] w-[394.303px]">
        <p className="leading-[24px]">Nên kiêng tắm 1 tuần cho các bé sau khi tiêm phòng.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[208px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon21 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[216.5px] w-[488.28px]">
        <p className="leading-[24px]">Cần tiêm phòng đầy đủ các mũi và tiêm nhắc lại định kỳ mỗi năm.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[253px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon22 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[261.5px] w-[387.621px]">
        <p className="leading-[24px]">Sau khi tiêm phòng 1 tuần thì cần tiến hành tẩy giun.</p>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-0 top-[298px] w-[14.86px]">
        <div className="-scale-y-100 flex-none">
          <Icon23 />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[24.86px] text-[#444] text-[16px] top-[306.5px] w-[1008.537px]">
        <p className="leading-[24px]">Một vài bé sau khi tiêm có thể sốt nhẹ, bỏ ăn một vài buổi là dấu hiệu bình thường. Đó là do phản ứng của hệ thống miễn dịch trong quá</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[330.5px] w-[246.812px]">
        <p className="leading-[24px]">trình tạo kháng thể của thú cưng.</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[67px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[398.5px] w-[1013.1px]">
        <p className="leading-[24px] mb-0">Với mục tiêu hoạt động là để luôn mang lại điều tốt nhất cho thú cưng. PetCare đã trở thành một trong những đơn vị chuyên chăm sóc,</p>
        <p className="leading-[24px] mb-0">tiêm phòng cho các thú cưng hàng đầu tại thành phố Vinh. Bạn có thể đặt lịch ngay để sử dụng dịch vụ tiêm phòng vắc xin cho chó mèo</p>
        <p className="leading-[24px]">của PetCare.</p>
      </div>
      <Link3 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-0 text-[#444] text-[16px] top-[517.5px] w-[39.349px]">
        <p className="leading-[24px]">Hoặc</p>
      </div>
      <Link4 />
    </div>
  );
}

function InactiveSvg() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="inactive.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_316)" id="inactive.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #777777)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_316">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InactiveSvgFill() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="inactive.svg fill">
      <InactiveSvg />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute left-[394.14px] size-[24px] top-[5045.25px]" data-name="Image">
      <InactiveSvgFill />
    </div>
  );
}

function InactiveSvg1() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="inactive.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_316)" id="inactive.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #777777)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_316">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InactiveSvgFill1() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="inactive.svg fill">
      <InactiveSvg1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute left-[422.14px] size-[24px] top-[5045.25px]" data-name="Image">
      <InactiveSvgFill1 />
    </div>
  );
}

function InactiveSvg2() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="inactive.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_316)" id="inactive.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #777777)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_316">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InactiveSvgFill2() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="inactive.svg fill">
      <InactiveSvg2 />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute left-[450.14px] size-[24px] top-[5045.25px]" data-name="Image">
      <InactiveSvgFill2 />
    </div>
  );
}

function InactiveSvg3() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="inactive.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_316)" id="inactive.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #777777)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_316">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InactiveSvgFill3() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="inactive.svg fill">
      <InactiveSvg3 />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute left-[478.14px] size-[24px] top-[5045.25px]" data-name="Image">
      <InactiveSvgFill3 />
    </div>
  );
}

function InactiveSvg4() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="inactive.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_316)" id="inactive.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #777777)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_316">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InactiveSvgFill4() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="inactive.svg fill">
      <InactiveSvg4 />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute left-[506.14px] size-[24px] top-[5045.25px]" data-name="Image">
      <InactiveSvgFill4 />
    </div>
  );
}

function ActiveSvg() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="active.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_325)" id="active.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, #FFA500)" id="Vector" stroke="var(--stroke-0, #FF8C00)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_325">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ActiveSvgFill() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="active.svg fill">
      <ActiveSvg />
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="Image">
      <ActiveSvgFill />
    </div>
  );
}

function ActiveSvg1() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="active.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_325)" id="active.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, #FFA500)" id="Vector" stroke="var(--stroke-0, #FF8C00)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_325">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ActiveSvgFill1() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="active.svg fill">
      <ActiveSvg1 />
    </div>
  );
}

function Image6() {
  return (
    <div className="absolute left-[28px] size-[24px] top-0" data-name="Image">
      <ActiveSvgFill1 />
    </div>
  );
}

function ActiveSvg2() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="active.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_325)" id="active.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, #FFA500)" id="Vector" stroke="var(--stroke-0, #FF8C00)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_325">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ActiveSvgFill2() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="active.svg fill">
      <ActiveSvg2 />
    </div>
  );
}

function Image7() {
  return (
    <div className="absolute left-[56px] size-[24px] top-0" data-name="Image">
      <ActiveSvgFill2 />
    </div>
  );
}

function ActiveSvg3() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="active.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_325)" id="active.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, #FFA500)" id="Vector" stroke="var(--stroke-0, #FF8C00)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_325">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ActiveSvgFill3() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="active.svg fill">
      <ActiveSvg3 />
    </div>
  );
}

function Image8() {
  return (
    <div className="absolute left-[84px] size-[24px] top-0" data-name="Image">
      <ActiveSvgFill3 />
    </div>
  );
}

function ActiveSvg4() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="active.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_471_325)" id="active.svg">
          <path d={svgPaths.p3f14d440} fill="var(--fill-0, #FFA500)" id="Vector" stroke="var(--stroke-0, #FF8C00)" strokeWidth="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_471_325">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ActiveSvgFill4() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="active.svg fill">
      <ActiveSvg4 />
    </div>
  );
}

function Image9() {
  return (
    <div className="absolute left-[112px] size-[24px] top-0" data-name="Image">
      <ActiveSvgFill4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[24px] left-[394.14px] overflow-clip top-[5045.25px] w-[129.59px]" data-name="Container">
      <Image5 />
      <Image6 />
      <Image7 />
      <Image8 />
      <Image9 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[13px] relative w-[7.44px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.44 13">
        <g id="Icon">
          <path d={svgPaths.p175c7700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function FacebookLink() {
  return (
    <div className="absolute bg-[#3b5998] h-[28px] left-[71px] rounded-[4px] top-[12px] w-[88px]" data-name="Facebook → Link">
      <div className="absolute flex h-[13px] items-center justify-center left-[21.26px] top-[7.39px] w-[7.44px]">
        <div className="-scale-y-100 flex-none">
          <Icon24 />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14px] justify-center leading-[0] left-[calc(50%+6.82px)] not-italic text-[11.6px] text-center text-white top-[14px] w-[32.23px]">
        <p className="leading-[28px]">Share</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[54px] left-[46.08px] overflow-clip right-[46.08px] top-[5071.66px]" data-name="Container">
      <FacebookLink />
    </div>
  );
}

function Textarea() {
  return (
    <div className="absolute bg-white border border-[#e4e4e4] border-solid h-[174px] left-0 overflow-auto right-[2.24%] top-0" data-name="Textarea">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[25px] justify-center leading-[0] left-[11px] text-[#999] text-[14px] top-[23.5px] w-[100.435px]">
        <p className="leading-[25px]">Comment Text*</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[16px] left-[11px] overflow-clip top-[11px] w-[293px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] left-0 text-[#999] text-[14px] top-[8px] w-[44.364px]">
        <p className="leading-[normal]">Name*</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white border border-[#e4e4e4] border-solid h-[40px] left-0 overflow-clip top-[196px] w-[317px]" data-name="Input">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[16px] left-[11px] overflow-clip top-[11px] w-[293px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] left-0 text-[#999] text-[14px] top-[8px] w-[41.024px]">
        <p className="leading-[normal]">Email*</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-white border border-[#e4e4e4] border-solid h-[40px] left-0 overflow-clip top-[251px] w-[317px]" data-name="Input">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[16px] left-[11px] overflow-clip top-[11px] w-[293px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] left-0 text-[#999] text-[14px] top-[8px] w-[54.255px]">
        <p className="leading-[normal]">Website</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-white border border-[#e4e4e4] border-solid h-[40px] left-0 overflow-clip top-[306px] w-[317px]" data-name="Input">
      <Container5 />
    </div>
  );
}

function Input3() {
  return (
    <div className="absolute bg-[#0274be] h-[38px] left-[932.37px] overflow-clip rounded-[3px] top-[405px] w-[127.47px]" data-name="Input">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] left-[calc(50%+0.18px)] text-[14px] text-center text-white top-[19px] w-[97.821px]">
        <p className="leading-[14px]">Post Comment</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute h-[0.01px] left-0 right-0 top-[74px]" data-name="Form">
      <Textarea />
      <Input />
      <Input1 />
      <Input2 />
      <div className="absolute bg-white border border-[#767676] border-solid left-0 rounded-[2.5px] size-[18px] top-[365px]" data-name="Input" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] left-[30.06px] text-[#444] text-[16px] top-[373.5px] w-[668.91px]">
        <p className="leading-[18px]">Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần bình luận kế tiếp của tôi.</p>
      </div>
      <Input3 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-white h-[517px] left-[46.08px] right-[46.08px] top-[5170.66px]" data-name="Background">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto_Slab:Regular',sans-serif] font-normal h-[39px] justify-center leading-[0] left-0 text-[#222] text-[30px] top-[26.5px] w-[194.851px]">
        <p className="leading-[42px]">Leave a Reply</p>
      </div>
      <Form />
    </div>
  );
}

export default function Article() {
  return (
    <div className="bg-white relative shadow-[0px_0px_1px_0px_rgba(50,50,50,0.1)] size-full" data-name="Article">
      <Container />
      <SectionHeading />
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Raleway:Medium',sans-serif] font-medium h-[28.8px] justify-center leading-[0] left-[546.14px] text-[#444] text-[19.2px] top-[5057.26px] w-[200.055px]">
        <p className="leading-[28.8px]">4.7/5 - (236 bình chọn)</p>
      </div>
      <Image />
      <Image1 />
      <Image2 />
      <Image3 />
      <Image4 />
      <Container1 />
      <Container2 />
      <Background />
    </div>
  );
}