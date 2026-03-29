import { Database, Info } from 'lucide-react';
import { useState } from 'react';

export function FallbackDataNotice() {
  const [isDismissed, setIsDismissed] = useState(
    localStorage.getItem('fallback-notice-dismissed') === 'true'
  );

  const handleDismiss = () => {
    localStorage.setItem('fallback-notice-dismissed', 'true');
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Đang sử dụng dữ liệu tạm thời
          </h3>
          <p className="text-sm text-blue-800 mb-2">
            App đang dùng <strong>fallback data</strong> từ server. 
            Để migrate lên database thật, xem hướng dẫn trong file <code className="bg-blue-100 px-1 rounded">/SUPABASE_SETUP.md</code>
          </p>
          <button
            onClick={handleDismiss}
            className="text-xs font-medium text-blue-700 hover:text-blue-900 underline"
          >
            Đã hiểu, ẩn thông báo này
          </button>
        </div>
        <button
          onClick={handleDismiss}
          className="text-blue-600 hover:text-blue-800 p-1"
          aria-label="Đóng"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
