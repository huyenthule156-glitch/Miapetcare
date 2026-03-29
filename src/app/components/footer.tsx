import { MapPin, Phone, Mail, FileText, ChevronUp } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300"
      style={{ transform: isHovered ? 'translateY(0)' : 'translateY(calc(100% - 24px))' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hint bar */}
      <div className="bg-[#FF7B7B] h-6 flex items-center justify-center cursor-pointer">
        <ChevronUp className="w-4 h-4 text-white animate-bounce" />
      </div>
      
      {/* Footer content */}
      <footer className="bg-[#FF7B7B] px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-3 text-white">
            {/* Row 1 */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm">
                08 Lưu Khê, xã Yên Trường, tỉnh Thanh Hoá
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm">0877742748</span>
            </div>
            
            {/* Row 2 */}
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm">huyenthule156@gmail.com</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm">MST: 038304005944</span>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-white/30 pt-2 text-center text-white">
            <p className="text-xs md:text-sm">
              © 2026 MiaPet | All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}