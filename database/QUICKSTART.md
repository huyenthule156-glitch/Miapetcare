# 🚀 Quick Start - 5 phút Setup Database

## Bước 1: Tạo Supabase Project (2 phút)

1. Vào https://supabase.com → Sign in
2. **New Project** → Điền:
   - Name: `miapet`
   - Password: `Tạo password mạnh`
   - Region: `Southeast Asia (Singapore)`
3. Đợi 2 phút → Project sẵn sàng ✅

## Bước 2: Import Database (2 phút)

1. Vào project → Click **SQL Editor** (menu trái)
2. **New query** → Copy file `supabase-schema.sql` → **Run** ✅
3. **New query** → Copy file `sample-data.sql` → **Run** ✅

## Bước 3: Lấy API Keys (1 phút)

1. Click **Project Settings** (icon bánh răng)
2. Click **API** trong sidebar
3. Copy 2 thông tin này:

```
Project URL:  https://xxxxx.supabase.co
anon key:     eyJhbGci...
```

## ✅ DONE!

Database đã sẵn sàng với:
- ✅ 6 bác sĩ thú y
- ✅ 9 lịch hẹn mẫu
- ✅ 13 sản phẩm
- ✅ 4 đơn hàng
- ✅ 9 thú cưng
- ✅ 2 hồ sơ bệnh án
- ✅ 5 nhân viên

---

## 🔍 Kiểm tra nhanh

Chạy query này trong SQL Editor:

```sql
SELECT 
  'doctors' as table_name, COUNT(*) as count FROM doctors
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'products', COUNT(*) FROM products;
```

Kết quả:
```
doctors   | 6
bookings  | 9
products  | 13
```

---

## 📊 Xem dữ liệu

1. Click **Table Editor** (menu trái)
2. Chọn table muốn xem (doctors, bookings, products...)
3. Xem, thêm, sửa, xóa dữ liệu trực tiếp

---

## 🎯 Next: Kết nối với Code

### Cài package:
```bash
npm install @supabase/supabase-js
```

### Tạo file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### Sử dụng:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Lấy danh sách bác sĩ
const { data: doctors } = await supabase
  .from('doctors')
  .select('*')
  .eq('status', 'active');
```

---

## 📚 Chi tiết hơn?

Xem file `README.md` để có hướng dẫn đầy đủ về:
- Cấu trúc tables
- Sample queries
- API endpoints
- Migration guide
- Best practices

---

## 💡 Tips

✅ **Sao lưu password** Supabase của bạn!
✅ **Không share service_role key** (chỉ dùng ở backend)
✅ **Sử dụng anon key** cho frontend
✅ **Enable RLS** (Row Level Security) khi production
✅ **Backup database** định kỳ

---

## 🎉 Chúc mừng!

Database của bạn đã sẵn sàng production! 🚀

**Support:**
- 📖 Supabase Docs: https://supabase.com/docs
- 💬 Discord: https://discord.supabase.com
- 🐛 GitHub Issues: https://github.com/supabase/supabase
