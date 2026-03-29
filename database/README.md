# 🗄️ MiaPET Database Setup Guide

Hướng dẫn chi tiết để setup database Supabase cho dự án MiaPET.

## 📋 Mục lục

1. [Tổng quan Database](#tổng-quan-database)
2. [Hướng dẫn Setup Supabase](#hướng-dẫn-setup-supabase)
3. [Cấu trúc Tables](#cấu-trúc-tables)
4. [Sample Data](#sample-data)
5. [API Endpoints](#api-endpoints)
6. [Migration từ localStorage](#migration-từ-localstorage)

---

## 🎯 Tổng quan Database

Database được thiết kế cho hệ thống quản lý cửa hàng chăm sóc thú cưng MiaPET bao gồm:

### 7 Tables chính:

1. **doctors** - Bác sĩ thú y (6 bác sĩ mẫu)
2. **bookings** - Lịch hẹn dịch vụ (9 lịch mẫu)
3. **products** - Sản phẩm pet shop (13 sản phẩm mẫu)
4. **orders** - Đơn hàng (4 đơn mẫu)
5. **pets** - Thú cưng của khách (9 thú cưng mẫu)
6. **medical_records** - Hồ sơ bệnh án (2 hồ sơ mẫu)
7. **staff_users** - Nhân viên hệ thống (5 nhân viên mẫu)

### ✨ Tính năng:

- ✅ Auto-update timestamps với triggers
- ✅ Foreign key relationships
- ✅ Indexes cho performance
- ✅ UUID primary keys
- ✅ JSONB columns cho dữ liệu linh hoạt
- ✅ Enum constraints cho data validation
- ✅ Comments đầy đủ

---

## 🚀 Hướng dẫn Setup Supabase

### Bước 1: Tạo Project Supabase

1. Truy cập [https://supabase.com](https://supabase.com)
2. Sign in hoặc tạo account mới
3. Click **"New Project"**
4. Điền thông tin:
   - **Name**: `miapet` (hoặc tên tùy ý)
   - **Database Password**: Tạo password mạnh (lưu lại!)
   - **Region**: Chọn `Southeast Asia (Singapore)` cho tốc độ tốt nhất
5. Click **"Create new project"**
6. Đợi ~2 phút để project được tạo

### Bước 2: Chạy Schema SQL

1. Vào project vừa tạo
2. Click menu **"SQL Editor"** bên trái
3. Click **"New query"**
4. Copy toàn bộ nội dung file **`supabase-schema.sql`**
5. Paste vào SQL Editor
6. Click **"Run"** (hoặc phím tắt Ctrl/Cmd + Enter)
7. ✅ Chờ thông báo "Success. No rows returned"

### Bước 3: Import Sample Data

1. Vẫn ở **SQL Editor**
2. Tạo **"New query"** mới
3. Copy toàn bộ nội dung file **`sample-data.sql`**
4. Paste vào SQL Editor
5. Click **"Run"**
6. ✅ Chờ thông báo thành công

### Bước 4: Verify Data

Chạy các query sau để kiểm tra:

```sql
-- Kiểm tra số lượng records
SELECT 'doctors' as table_name, COUNT(*) FROM doctors
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'pets', COUNT(*) FROM pets
UNION ALL
SELECT 'medical_records', COUNT(*) FROM medical_records
UNION ALL
SELECT 'staff_users', COUNT(*) FROM staff_users;
```

Kết quả mong đợi:
```
doctors          | 6
bookings         | 9
products         | 13
orders           | 4
pets             | 9
medical_records  | 2
staff_users      | 5
```

### Bước 5: Lấy API Keys

1. Click menu **"Project Settings"** (icon bánh răng) bên trái
2. Click **"API"** trong sidebar
3. Lưu lại các thông tin sau:

```
Project URL:     https://xxxxx.supabase.co
anon public key: eyJhbGci...
service_role:    eyJhbGci... (GIỮ BÍ MẬT!)
```

4. Sử dụng trong code:

```typescript
// Frontend - dùng anon key
const supabase = createClient(
  'https://xxxxx.supabase.co',
  'eyJhbGci... (anon key)'
);

// Backend - dùng service_role key (có full quyền)
const supabase = createClient(
  'https://xxxxx.supabase.co',
  'eyJhbGci... (service_role key)'
);
```

---

## 📊 Cấu trúc Tables

### 1. doctors (Bác sĩ thú y)

```sql
id              UUID PRIMARY KEY
name            VARCHAR(255)      -- Tên bác sĩ
specialty       VARCHAR(255)      -- Chuyên khoa
phone           VARCHAR(20)
email           VARCHAR(255)
experience_years INTEGER          -- Số năm kinh nghiệm
status          VARCHAR(20)       -- active, inactive, on-leave
bio             TEXT              -- Tiểu sử
```

**Sample query:**
```sql
-- Lấy danh sách bác sĩ đang hoạt động
SELECT * FROM doctors WHERE status = 'active' ORDER BY name;
```

### 2. bookings (Lịch hẹn)

```sql
id                    UUID PRIMARY KEY
customer_name         VARCHAR(255)
customer_phone        VARCHAR(20)
pet_name              VARCHAR(255)
pet_type              VARCHAR(10)      -- dog, cat
appointment_date      DATE
appointment_time      TIME
service_category      VARCHAR(100)
service_name          VARCHAR(255)
total_price           INTEGER
status                VARCHAR(20)      -- pending, confirmed, completed, cancelled
assigned_doctor_id    UUID             -- FK to doctors
```

**Sample queries:**
```sql
-- Lấy lịch hẹn hôm nay chưa được phân công
SELECT * FROM bookings 
WHERE appointment_date = CURRENT_DATE 
  AND status = 'pending'
ORDER BY appointment_time;

-- Lấy lịch hẹn của bác sĩ cụ thể
SELECT b.*, d.name as doctor_name
FROM bookings b
JOIN doctors d ON b.assigned_doctor_id = d.id
WHERE d.id = '550e8400-e29b-41d4-a716-446655440001'
  AND b.appointment_date >= CURRENT_DATE
ORDER BY b.appointment_date, b.appointment_time;

-- Đếm số lịch hẹn theo khung giờ
SELECT appointment_date, appointment_time, COUNT(*) as booking_count
FROM bookings
WHERE status != 'cancelled'
  AND appointment_date = CURRENT_DATE
GROUP BY appointment_date, appointment_time
ORDER BY appointment_time;
```

### 3. products (Sản phẩm)

```sql
id               UUID PRIMARY KEY
name             VARCHAR(255)
slug             VARCHAR(255) UNIQUE
category         VARCHAR(100)       -- Thức ăn, Phụ kiện, Đồ chơi, v.v.
price            INTEGER
stock            INTEGER
status           VARCHAR(20)        -- active, inactive, out-of-stock
featured         BOOLEAN
```

**Sample queries:**
```sql
-- Lấy sản phẩm nổi bật
SELECT * FROM products WHERE featured = true AND status = 'active';

-- Lọc theo category
SELECT * FROM products WHERE category = 'Thức ăn' AND stock > 0;

-- Tìm kiếm sản phẩm
SELECT * FROM products WHERE name ILIKE '%royal canin%';
```

### 4. orders (Đơn hàng)

```sql
id               UUID PRIMARY KEY
order_number     VARCHAR(50) UNIQUE
customer_name    VARCHAR(255)
customer_phone   VARCHAR(20)
items            JSONB              -- Array of products
total_amount     INTEGER
delivery_status  VARCHAR(20)        -- pending, confirmed, shipping, delivered, cancelled
payment_method   VARCHAR(50)
```

**Sample queries:**
```sql
-- Lấy đơn hàng cần xử lý
SELECT * FROM orders 
WHERE delivery_status IN ('pending', 'confirmed')
ORDER BY created_at DESC;

-- Thống kê doanh thu theo ngày
SELECT DATE(created_at) as date, 
       COUNT(*) as order_count,
       SUM(final_amount) as revenue
FROM orders
WHERE delivery_status = 'delivered'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### 5. pets (Thú cưng)

```sql
id            UUID PRIMARY KEY
owner_phone   VARCHAR(20)         -- Link với customer
name          VARCHAR(255)
type          VARCHAR(10)         -- dog, cat
breed         VARCHAR(100)
birth_date    DATE
weight        DECIMAL(5,2)
vaccinations  JSONB               -- Lịch sử tiêm phòng
```

**Sample queries:**
```sql
-- Lấy thú cưng của khách hàng
SELECT * FROM pets WHERE owner_phone = '0912345678';

-- Thống kê số lượng thú cưng
SELECT type, COUNT(*) FROM pets WHERE status = 'active' GROUP BY type;
```

---

## 📝 Sample Data

### Doctors (6 bác sĩ)

| Tên | Chuyên khoa | Kinh nghiệm |
|-----|-------------|-------------|
| BS. Nguyễn Văn An | Chó mèo tổng quát | 8 năm |
| BS. Trần Thị Bình | Ngoại khoa | 10 năm |
| BS. Lê Văn Cường | Da liễu | 6 năm |
| BS. Phạm Thị Dung | Nội khoa | 12 năm |
| BS. Hoàng Minh Đức | Răng hàm mặt | 5 năm |
| BS. Đỗ Thu Hà | Dinh dưỡng | 7 năm |

### Bookings (9 lịch hẹn)

- 2 lịch hôm nay **pending** (chưa phân công)
- 2 lịch hôm nay **confirmed** (đã phân công bác sĩ)
- 2 lịch ngày mai **pending**
- 1 lịch trông giữ 5 ngày
- 2 lịch **completed** (đã hoàn thành)

### Products (13 sản phẩm)

Phân bổ theo category:
- **Thức ăn**: 4 sản phẩm (Royal Canin, Pedigree, Me-O, Whiskas)
- **Phụ kiện**: 3 sản phẩm (vòng cổ, lồng, bát ăn)
- **Đồ chơi**: 2 sản phẩm (bóng massage, cần câu lông vũ)
- **Vệ sinh**: 2 sản phẩm (cát, khay vệ sinh)
- **Chăm sóc**: 2 sản phẩm (sữa tắm, lược chải)

---

## 🔌 API Endpoints (Gợi ý)

Khi tích hợp với Vercel, bạn có thể tạo các API routes:

### Doctors API

```typescript
// GET /api/doctors - Lấy danh sách bác sĩ
// GET /api/doctors/:id - Lấy thông tin bác sĩ
// GET /api/doctors/available?date=2024-03-28&time=08:00 - Bác sĩ rảnh
```

### Bookings API

```typescript
// GET /api/bookings - Lấy danh sách lịch hẹn
// POST /api/bookings - Tạo lịch hẹn mới
// PUT /api/bookings/:id - Cập nhật lịch hẹn
// PUT /api/bookings/:id/assign - Phân công bác sĩ
// GET /api/bookings/count?date=2024-03-28&time=08:00 - Đếm số lịch hẹn
```

### Products API

```typescript
// GET /api/products - Lấy danh sách sản phẩm
// GET /api/products/:slug - Chi tiết sản phẩm
// POST /api/products - Tạo sản phẩm (admin)
```

### Orders API

```typescript
// GET /api/orders - Lấy danh sách đơn hàng
// POST /api/orders - Tạo đơn hàng
// PUT /api/orders/:id/status - Cập nhật trạng thái
```

---

## 🔄 Migration từ localStorage

### File cần update: `/src/app/services/booking-service.ts`

**TRƯỚC (localStorage):**
```typescript
export const getAllBookings = (): Booking[] => {
  return JSON.parse(localStorage.getItem("miapet_staff_bookings") || "[]");
};
```

**SAU (Supabase):**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getAllBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      assigned_doctor:doctors(id, name, specialty)
    `)
    .order('appointment_date', { ascending: false })
    .order('appointment_time', { ascending: false });
  
  if (error) throw error;
  return data;
};
```

### Cài đặt Supabase Client

```bash
npm install @supabase/supabase-js
```

### Environment Variables (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 📱 Test Database

### 1. Test với Supabase Dashboard

Vào **Table Editor** để:
- ✅ Xem dữ liệu
- ✅ Thêm/sửa/xóa records
- ✅ Filter & sort

### 2. Test với SQL Editor

```sql
-- Test relationship: Bookings with Doctor
SELECT 
  b.customer_name,
  b.appointment_date,
  b.appointment_time,
  b.service_category,
  d.name as doctor_name,
  b.status
FROM bookings b
LEFT JOIN doctors d ON b.assigned_doctor_id = d.id
WHERE b.appointment_date >= CURRENT_DATE
ORDER BY b.appointment_date, b.appointment_time;

-- Test available time slots
SELECT 
  appointment_time,
  COUNT(*) as booked_count,
  4 - COUNT(*) as remaining_slots
FROM bookings
WHERE appointment_date = CURRENT_DATE
  AND status != 'cancelled'
GROUP BY appointment_time
ORDER BY appointment_time;
```

---

## 🎯 Next Steps

1. ✅ Setup Supabase project
2. ✅ Import schema & data
3. ⬜ Install `@supabase/supabase-js`
4. ⬜ Tạo Supabase client
5. ⬜ Update booking-service.ts
6. ⬜ Update UI components
7. ⬜ Test trên localhost
8. ⬜ Deploy lên Vercel
9. ⬜ Add environment variables trên Vercel

---

## 📞 Support

Nếu gặp vấn đề:

1. Check Supabase logs: **Logs** menu
2. Verify API keys: **Project Settings > API**
3. Test với Postman/Thunder Client
4. Review RLS policies nếu enable

---

## 🎉 Hoàn thành!

Database của bạn đã sẵn sàng cho production với Vercel + Supabase! 🚀

**Lợi ích:**
- 🗄️ Database PostgreSQL mạnh mẽ
- 🔄 Real-time sync
- 🔐 Authentication built-in
- 📊 Analytics dashboard
- 🌍 CDN global
- 💰 Free tier hậu hĩnh (500MB storage, 2GB bandwidth)
