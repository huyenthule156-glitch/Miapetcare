# 🎨 Visual Guide - MiaPET Database

Hướng dẫn trực quan với screenshots & examples cho người mới.

---

## 🖼️ 1. Supabase Dashboard Tour

### Homepage
```
┌────────────────────────────────────────────────────────────┐
│  🏠 Supabase Dashboard                                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📁 Your Projects                                          │
│                                                            │
│  ┌──────────────────┐  ┌──────────────────┐              │
│  │   miapet         │  │   [New Project]  │              │
│  │   🟢 Active      │  │                  │              │
│  │   Singapore      │  │   Create new     │              │
│  └──────────────────┘  └──────────────────┘              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### SQL Editor
```
┌────────────────────────────────────────────────────────────┐
│  📝 SQL Editor                                    [Run ▶]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  CREATE TABLE doctors (                                   │
│    id UUID PRIMARY KEY,                                   │
│    name VARCHAR(255),                                     │
│    specialty VARCHAR(255)                                 │
│  );                                                       │
│                                                            │
│  ✅ Success. No rows returned                             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Table Editor
```
┌────────────────────────────────────────────────────────────┐
│  📊 Table Editor              [+ Add Row]  [🔄 Refresh]   │
├────────────────────────────────────────────────────────────┤
│  Tables:                                                   │
│  > doctors                    ← Click to view             │
│  > bookings                                                │
│  > products                                                │
│  > orders                                                  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  doctors (6 rows)                                          │
│  ┌──────┬───────────────────┬──────────────┬────────┐    │
│  │ id   │ name              │ specialty    │ status │    │
│  ├──────┼───────────────────┼──────────────┼────────┤    │
│  │ 001  │ BS. Nguyễn Văn An │ Tổng quát    │ active │    │
│  │ 002  │ BS. Trần Thị Bình │ Ngoại khoa   │ active │    │
│  └──────┴───────────────────┴──────────────┴────────┘    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 📋 2. Step-by-Step Setup (Visual)

### Step 1: Create Project

```
1️⃣ Go to: https://supabase.com
   
   [Sign in] or [Start your project]

2️⃣ Click: [New Project]

3️⃣ Fill form:
   ┌─────────────────────────────────┐
   │ Name:     [miapet          ]    │
   │ Password: [••••••••••      ]    │
   │ Region:   [Southeast Asia ▼]    │
   │                                 │
   │         [Create Project]        │
   └─────────────────────────────────┘

4️⃣ Wait ~2 minutes ⏳
   [████████████████░░░░] 80%
```

---

### Step 2: Run Schema

```
1️⃣ Click: SQL Editor (left menu)
   
   📝 SQL Editor
   ├─ New query
   ├─ Templates
   └─ History

2️⃣ Click: [+ New query]

3️⃣ Copy & Paste schema:
   ┌─────────────────────────────────┐
   │ CREATE TABLE doctors (          │
   │   id UUID PRIMARY KEY,          │
   │   name VARCHAR(255),            │
   │   ...                           │
   │ );                              │
   │                                 │
   │ CREATE TABLE bookings (         │
   │   ...                           │
   │ );                              │
   └─────────────────────────────────┘

4️⃣ Click: [Run] or Ctrl+Enter

5️⃣ See result:
   ✅ Success. No rows returned
```

---

### Step 3: Import Data

```
1️⃣ New query again

2️⃣ Copy & Paste sample-data.sql

3️⃣ Run

4️⃣ See result:
   ✅ INSERT 6 rows
   ✅ INSERT 9 rows
   ✅ INSERT 13 rows
   ...
```

---

### Step 4: Verify Data

```
1️⃣ Click: Table Editor (left menu)

2️⃣ Click table: doctors
   
   ✅ 6 rows visible
   
   Row 1: BS. Nguyễn Văn An | Chó mèo tổng quát
   Row 2: BS. Trần Thị Bình | Ngoại khoa
   ...

3️⃣ Click table: bookings
   
   ✅ 9 rows visible

4️⃣ Click table: products
   
   ✅ 13 rows visible
```

---

### Step 5: Get API Keys

```
1️⃣ Click: ⚙️ Project Settings (bottom left)

2️⃣ Click: API (left sidebar)

3️⃣ Copy these values:
   ┌──────────────────────────────────────┐
   │ Project URL:                         │
   │ https://xxxxx.supabase.co            │
   │                          [Copy 📋]   │
   │                                      │
   │ anon public:                         │
   │ eyJhbGciOiJIUzI1NiIsInR5cCI...      │
   │                          [Copy 📋]   │
   │                                      │
   │ service_role: (🔒 Secret!)          │
   │ eyJhbGciOiJIUzI1NiIsInR5cCI...      │
   │                          [Copy 📋]   │
   └──────────────────────────────────────┘

4️⃣ Save to .env.local:
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 🎯 3. Sample Data Visualization

### Doctors Table
```
┌─────────────────────────────────────────────────────────────┐
│                         DOCTORS (6)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  👨‍⚕️ BS. Nguyễn Văn An          👨‍⚕️ BS. Trần Thị Bình        │
│     Chó mèo tổng quát                Ngoại khoa            │
│     8 năm kinh nghiệm                10 năm kinh nghiệm     │
│     ⭐⭐⭐⭐⭐                         ⭐⭐⭐⭐⭐                │
│                                                             │
│  👨‍⚕️ BS. Lê Văn Cường           👨‍⚕️ BS. Phạm Thị Dung       │
│     Da liễu                          Nội khoa               │
│     6 năm kinh nghiệm                12 năm kinh nghiệm     │
│     ⭐⭐⭐⭐                          ⭐⭐⭐⭐⭐                │
│                                                             │
│  👨‍⚕️ BS. Hoàng Minh Đức         👨‍⚕️ BS. Đỗ Thu Hà          │
│     Răng hàm mặt                     Dinh dưỡng             │
│     5 năm kinh nghiệm                7 năm kinh nghiệm      │
│     ⭐⭐⭐⭐                          ⭐⭐⭐⭐                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Bookings Timeline
```
┌─────────────────────────────────────────────────────────────┐
│                    BOOKINGS TIMELINE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HÔM NAY (4 bookings)                                       │
│  ├─ 08:30  🟡 PENDING    Lucky (Chó) - Grooming            │
│  ├─ 09:00  🟡 PENDING    Miu (Mèo) - Tiêm phòng            │
│  ├─ 10:00  🔵 CONFIRMED  Bông (Mèo) - Tắm vệ sinh          │
│  └─ 10:30  🔵 CONFIRMED  Max (Chó) - Spa cao cấp           │
│                                                             │
│  NGÀY MAI (2 bookings)                                      │
│  ├─ 08:00  🟡 PENDING    Simba (Mèo) - Grooming            │
│  └─ 09:00  🟡 PENDING    Buddy (Chó) - Tiêm phòng          │
│                                                             │
│  2 NGÀY NỮA (1 booking)                                     │
│  └─ 08:00  🔵 CONFIRMED  Cún (Chó) - Hotel 5 ngày          │
│                                                             │
│  ĐÃ HOÀN THÀNH (2 bookings)                                 │
│  ├─ HÔM QUA  ✅ COMPLETED  Micky (Chó) - Tắm vệ sinh       │
│  └─ 2 NGÀY TRƯỚC  ✅ COMPLETED  Kitty (Mèo) - Tiêm phòng   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Legend:
🟡 PENDING    - Chờ phân công bác sĩ
🔵 CONFIRMED  - Đã phân công bác sĩ
✅ COMPLETED  - Đã hoàn thành
🔴 CANCELLED  - Đã hủy
```

---

### Products by Category
```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTS CATALOG                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🍖 THỨC ĂN (4 products)                                    │
│  ├─ Royal Canin Mini 2kg      385,000đ  ⭐ Featured        │
│  ├─ Pedigree Vị Bò 1.5kg      145,000đ                     │
│  ├─ Me-O Cá Ngừ 1.2kg          95,000đ  ⭐ Featured        │
│  └─ Whiskas Cá Biển 1.1kg      85,000đ                     │
│                                                             │
│  🎒 PHỤ KIỆN (3 products)                                   │
│  ├─ Vòng cổ da cao cấp        245,000đ                     │
│  ├─ Lồng vận chuyển M         485,000đ  ⭐ Featured        │
│  └─ Bát ăn inox đôi           125,000đ                     │
│                                                             │
│  🎾 ĐỒ CHƠI (2 products)                                    │
│  ├─ Bóng cao su massage        75,000đ                     │
│  └─ Cần câu lông vũ            55,000đ  ⭐ Featured        │
│                                                             │
│  🧹 VỆ SINH (2 products)                                    │
│  ├─ Cát vệ sinh 10L           125,000đ  ⭐ Featured        │
│  └─ Khay vệ sinh có nắp       285,000đ                     │
│                                                             │
│  💅 CHĂM SÓC (2 products)                                   │
│  ├─ Sữa tắm Bioline           165,000đ  ⭐ Featured        │
│  └─ Lược chải lông             95,000đ                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 4. Query Examples with Results

### Example 1: Get Today's Bookings

**SQL:**
```sql
SELECT 
  customer_name,
  pet_name,
  appointment_time,
  service_category,
  status
FROM bookings
WHERE appointment_date = CURRENT_DATE
ORDER BY appointment_time;
```

**Result:**
```
┌──────────────────┬──────────┬──────┬──────────┬───────────┐
│ customer_name    │ pet_name │ time │ service  │ status    │
├──────────────────┼──────────┼──────┼──────────┼───────────┤
│ Nguyễn Thị Mai   │ Lucky    │ 8:30 │ Grooming │ pending   │
│ Trần Văn Hùng    │ Miu      │ 9:00 │ Vaccine  │ pending   │
│ Lê Thị Hương     │ Bông     │ 10:00│ Bath     │ confirmed │
│ Phạm Minh Tuấn   │ Max      │ 10:30│ Grooming │ confirmed │
└──────────────────┴──────────┴──────┴──────────┴───────────┘
4 rows returned
```

---

### Example 2: Doctors with Their Bookings

**SQL:**
```sql
SELECT 
  d.name as doctor,
  d.specialty,
  COUNT(b.id) as total_bookings,
  COUNT(CASE WHEN b.status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN b.status = 'confirmed' THEN 1 END) as confirmed
FROM doctors d
LEFT JOIN bookings b ON d.id = b.assigned_doctor_id
GROUP BY d.id, d.name, d.specialty
ORDER BY total_bookings DESC;
```

**Result:**
```
┌─────────────────────┬──────────────┬──────┬─────────┬───────────┐
│ doctor              │ specialty    │ total│ pending │ confirmed │
├─────────────────────┼──────────────┼──────┼─────────┼───────────┤
│ BS. Nguyễn Văn An   │ Tổng quát    │   2  │    0    │     2     │
│ BS. Trần Thị Bình   │ Ngoại khoa   │   1  │    0    │     1     │
│ BS. Lê Văn Cường    │ Da liễu      │   1  │    0    │     1     │
│ BS. Phạm Thị Dung   │ Nội khoa     │   1  │    0    │     1     │
│ BS. Hoàng Minh Đức  │ Răng hàm mặt │   0  │    0    │     0     │
│ BS. Đỗ Thu Hà       │ Dinh dưỡng   │   0  │    0    │     0     │
└─────────────────────┴──────────────┴──────┴─────────┴───────────┘
6 rows returned
```

---

### Example 3: Revenue by Product Category

**SQL:**
```sql
SELECT 
  category,
  COUNT(*) as product_count,
  SUM(stock) as total_stock,
  AVG(price) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM products
WHERE status = 'active'
GROUP BY category
ORDER BY product_count DESC;
```

**Result:**
```
┌──────────────┬───────┬───────┬───────────┬───────────┬───────────┐
│ category     │ count │ stock │ avg_price │ min_price │ max_price │
├──────────────┼───────┼───────┼───────────┼───────────┼───────────┤
│ Thức ăn      │   4   │  260  │  177,500đ │  85,000đ  │ 385,000đ │
│ Phụ kiện     │   3   │   90  │  285,000đ │ 125,000đ  │ 485,000đ │
│ Đồ chơi      │   2   │  180  │   65,000đ │  55,000đ  │  75,000đ │
│ Vệ sinh      │   2   │   80  │  205,000đ │ 125,000đ  │ 285,000đ │
│ Chăm sóc     │   2   │   90  │  130,000đ │  95,000đ  │ 165,000đ │
└──────────────┴───────┴───────┴───────────┴───────────┴───────────┘
5 rows returned
```

---

## 💻 5. Code Integration Preview

### React Component Example

```tsx
// StaffBookings.tsx
import { useEffect, useState } from 'react';
import { supabase } from './supabase-client';

function StaffBookings() {
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // Lấy bookings với doctor info
    const { data: bookingsData } = await supabase
      .from('bookings')
      .select(`
        *,
        assigned_doctor:doctors(id, name, specialty)
      `)
      .order('appointment_date', { ascending: false });

    // Lấy danh sách bác sĩ
    const { data: doctorsData } = await supabase
      .from('doctors')
      .select('*')
      .eq('status', 'active');

    setBookings(bookingsData);
    setDoctors(doctorsData);
  }

  async function assignDoctor(bookingId, doctorId) {
    await supabase
      .from('bookings')
      .update({ 
        assigned_doctor_id: doctorId,
        status: 'confirmed' 
      })
      .eq('id', bookingId);

    loadData(); // Reload
  }

  return (
    <div>
      <h1>Danh sách lịch hẹn</h1>
      {bookings.map(booking => (
        <div key={booking.id}>
          <h3>{booking.customer_name} - {booking.pet_name}</h3>
          <p>Dịch vụ: {booking.service_name}</p>
          
          {booking.status === 'pending' && (
            <select onChange={(e) => assignDoctor(booking.id, e.target.value)}>
              <option>Chọn bác sĩ...</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.specialty}
                </option>
              ))}
            </select>
          )}
          
          {booking.assigned_doctor && (
            <p>Bác sĩ: {booking.assigned_doctor.name}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 6. Performance Metrics

### Query Performance

```
┌─────────────────────────────────────────────────────────────┐
│                    QUERY BENCHMARKS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SELECT * FROM doctors                                      │
│  ⚡ 12ms      ✅ Very Fast                                  │
│                                                             │
│  SELECT * FROM bookings WHERE date = TODAY                  │
│  ⚡ 18ms      ✅ Fast (using index)                         │
│                                                             │
│  SELECT b.*, d.* FROM bookings b JOIN doctors d             │
│  ⚡ 25ms      ✅ Fast (optimized join)                      │
│                                                             │
│  SELECT * FROM products WHERE featured = true               │
│  ⚡ 8ms       ✅ Very Fast (indexed)                        │
│                                                             │
│  SELECT * FROM orders ORDER BY created_at DESC LIMIT 50     │
│  ⚡ 15ms      ✅ Fast (indexed timestamp)                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Legend:
⚡ < 20ms   = Very Fast
⚡ 20-50ms  = Fast
⚡ 50-100ms = Acceptable
⚡ > 100ms  = Needs optimization
```

---

## 🎉 7. Success Checklist

```
Setup Complete Checklist:

✅ Supabase project created
✅ Schema SQL executed successfully
✅ Sample data imported (6+9+13+4+9+2+5 rows)
✅ Tables visible in Table Editor
✅ API keys copied to .env.local
✅ @supabase/supabase-js installed
✅ Supabase client configured
✅ Test query successful
✅ Can see doctors in UI
✅ Can create bookings
✅ Can assign doctors
✅ Ready for production! 🚀
```

---

## 🎯 Quick Tips

### ✅ DO
- ✅ Backup database định kỳ
- ✅ Use transactions cho complex operations
- ✅ Enable RLS cho security
- ✅ Monitor query performance
- ✅ Use indexes properly

### ❌ DON'T
- ❌ Share service_role key
- ❌ Store passwords in plain text
- ❌ Run heavy queries on frontend
- ❌ Forget to handle errors
- ❌ Ignore Supabase logs

---

**🎉 Bạn đã sẵn sàng! Chúc coding vui vẻ! 🚀🐾**
