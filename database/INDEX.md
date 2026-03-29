# 📚 MiaPET Database Documentation Index

Chào mừng đến với tài liệu database cho dự án **MiaPET** - Hệ thống quản lý cửa hàng chăm sóc thú cưng.

---

## 🚀 Bắt đầu nhanh (Đọc đầu tiên!)

### 1. [QUICKSTART.md](./QUICKSTART.md) ⚡
**⏱️ 5 phút setup**

Hướng dẫn nhanh nhất để:
- Tạo Supabase project
- Import database schema
- Lấy API keys
- Verify dữ liệu

👉 **Bắt đầu từ đây nếu bạn chưa có database!**

---

## 📖 Tài liệu đầy đủ

### 2. [README.md](./README.md) 📘
**⏱️ 15-20 phút đọc**

Tài liệu chi tiết bao gồm:
- ✅ Tổng quan database (7 tables)
- ✅ Hướng dẫn setup Supabase từng bước
- ✅ Cấu trúc tables chi tiết
- ✅ Sample queries
- ✅ API endpoints suggestions
- ✅ Migration guide từ localStorage
- ✅ Test & verify
- ✅ Deployment checklist

👉 **Đọc kỹ để hiểu toàn bộ hệ thống!**

---

## 📊 Sơ đồ & Kiến trúc

### 3. [DATABASE-DIAGRAM.md](./DATABASE-DIAGRAM.md) 🗺️
**⏱️ 10 phút đọc**

Visual documentation:
- ✅ Entity Relationship Diagram (ERD)
- ✅ Data flow diagrams
- ✅ Relationships chi tiết
- ✅ Index strategy
- ✅ Performance tips
- ✅ Security notes

👉 **Đọc để hiểu cách các tables liên kết với nhau!**

---

## 💾 Files SQL

### 4. [supabase-schema.sql](./supabase-schema.sql) 🗄️
**File SQL tạo database structure**

Bao gồm:
- ✅ CREATE TABLE statements (7 tables)
- ✅ Indexes for performance
- ✅ Foreign key constraints
- ✅ Triggers for auto-update timestamps
- ✅ Comments đầy đủ

**Cách dùng:**
```sql
-- Copy toàn bộ file → Paste vào Supabase SQL Editor → Run
```

---

### 5. [sample-data.sql](./sample-data.sql) 📝
**File SQL insert dữ liệu mẫu**

Sample data:
- ✅ 6 bác sĩ thú y
- ✅ 9 lịch hẹn (pending, confirmed, completed)
- ✅ 13 sản phẩm (5 categories)
- ✅ 4 đơn hàng
- ✅ 9 thú cưng
- ✅ 2 hồ sơ bệnh án
- ✅ 5 nhân viên

**Cách dùng:**
```sql
-- Chạy AFTER schema.sql
-- Copy → Paste → Run
```

---

## 💻 Code Examples

### 6. [supabase-client-example.ts](./supabase-client-example.ts) 🔧
**TypeScript examples cho Supabase client**

Code mẫu:
- ✅ Setup Supabase client
- ✅ TypeScript type definitions
- ✅ CRUD functions cho tất cả tables
- ✅ Advanced queries (joins, filters)
- ✅ Real-time subscriptions
- ✅ React hooks examples

**Cách dùng:**
```typescript
// Copy functions cần thiết vào project
import { getActiveDoctors, createBooking } from './supabase-client';
```

---

## 📋 Checklist Setup

### ✅ Checklist cho người mới

- [ ] Đọc [QUICKSTART.md](./QUICKSTART.md)
- [ ] Tạo Supabase account & project
- [ ] Chạy [supabase-schema.sql](./supabase-schema.sql)
- [ ] Chạy [sample-data.sql](./sample-data.sql)
- [ ] Verify data trong Table Editor
- [ ] Lấy API keys (URL + anon key)
- [ ] Đọc [README.md](./README.md) để hiểu rõ hơn
- [ ] Xem [DATABASE-DIAGRAM.md](./DATABASE-DIAGRAM.md)
- [ ] Cài `@supabase/supabase-js`
- [ ] Setup `.env.local` với API keys
- [ ] Copy code từ [supabase-client-example.ts](./supabase-client-example.ts)
- [ ] Test API calls
- [ ] Deploy lên Vercel
- [ ] Thêm env variables trên Vercel

---

## 🎯 Flow đọc tài liệu

### Nếu bạn là Developer:
1. **QUICKSTART.md** → Setup database nhanh
2. **supabase-client-example.ts** → Copy code vào project
3. **README.md** → Đọc phần Migration guide
4. **DATABASE-DIAGRAM.md** → Tham khảo khi cần

### Nếu bạn là Database Designer:
1. **README.md** → Hiểu overview
2. **DATABASE-DIAGRAM.md** → Xem ERD & relationships
3. **supabase-schema.sql** → Review schema chi tiết
4. **sample-data.sql** → Xem sample data structure

### Nếu bạn là Project Manager:
1. **QUICKSTART.md** → Hiểu setup process
2. **README.md** → Đọc tổng quan & features
3. **DATABASE-DIAGRAM.md** → Xem data flow

---

## 📊 Database Overview

### 7 Tables chính:

| Table | Records | Purpose |
|-------|---------|---------|
| **doctors** | 6 | Bác sĩ thú y với chuyên khoa |
| **bookings** | 9 | Lịch hẹn dịch vụ |
| **products** | 13 | Sản phẩm pet shop |
| **orders** | 4 | Đơn hàng của khách |
| **pets** | 9 | Thú cưng của khách hàng |
| **medical_records** | 2 | Hồ sơ bệnh án |
| **staff_users** | 5 | Nhân viên hệ thống |

### Features:

- ✅ **UUID Primary Keys** - Secure & scalable
- ✅ **Foreign Keys** - Data integrity
- ✅ **Indexes** - Performance optimized
- ✅ **Triggers** - Auto-update timestamps
- ✅ **JSONB** - Flexible data storage
- ✅ **Constraints** - Data validation
- ✅ **Comments** - Self-documented

---

## 🔗 External Links

### Supabase Documentation:
- 📖 [Supabase Docs](https://supabase.com/docs)
- 🚀 [Getting Started](https://supabase.com/docs/guides/getting-started)
- 💾 [Database Guide](https://supabase.com/docs/guides/database)
- 🔐 [Auth Guide](https://supabase.com/docs/guides/auth)
- 📊 [Storage Guide](https://supabase.com/docs/guides/storage)

### Vercel Documentation:
- 🚀 [Vercel Docs](https://vercel.com/docs)
- 🔗 [Supabase Integration](https://vercel.com/integrations/supabase)
- 🌍 [Environment Variables](https://vercel.com/docs/environment-variables)

---

## 🆘 Troubleshooting

### Lỗi thường gặp:

#### 1. "Error: relation does not exist"
**Nguyên nhân:** Chưa chạy schema.sql
**Giải pháp:** Chạy [supabase-schema.sql](./supabase-schema.sql) trước

#### 2. "Error: duplicate key value"
**Nguyên nhân:** Đã chạy sample-data.sql nhiều lần
**Giải pháp:** 
```sql
-- Xóa data cũ trước khi chạy lại
DELETE FROM medical_records;
DELETE FROM bookings;
DELETE FROM orders;
DELETE FROM pets;
DELETE FROM products;
DELETE FROM doctors;
DELETE FROM staff_users;
```

#### 3. "Invalid API key"
**Nguyên nhân:** Sai API key hoặc URL
**Giải pháp:** Kiểm tra lại trong Project Settings > API

#### 4. "Row level security policy"
**Nguyên nhân:** RLS enabled nhưng chưa có policy
**Giải pháp:** Disable RLS hoặc tạo policies phù hợp

---

## 📞 Support

### Cần giúp đỡ?

1. **Đọc lại tài liệu** - 90% câu hỏi đã được trả lời
2. **Check Supabase logs** - Project > Logs
3. **Supabase Discord** - https://discord.supabase.com
4. **GitHub Issues** - https://github.com/supabase/supabase/issues

---

## 🎉 Ready to Start?

Bắt đầu với [QUICKSTART.md](./QUICKSTART.md) ngay! ⚡

**Estimated setup time:** 5 phút

**Prerequisites:**
- ✅ Supabase account (free)
- ✅ 5 phút thời gian
- ✅ Internet connection

**Result:**
- ✅ Full database với sample data
- ✅ API keys sẵn sàng
- ✅ Ready for development

---

## 📝 License & Credits

**Database Design:** MiaPET Team
**Platform:** Supabase (PostgreSQL)
**Deployment:** Vercel
**Version:** 1.0.0
**Last Updated:** March 2024

---

## 🔄 Updates

| Date | Version | Changes |
|------|---------|---------|
| 2024-03 | 1.0.0 | Initial release |

---

**Happy Coding! 🚀🐾**
