# 🚀 HƯỚNG DẪN SETUP SUPABASE DATABASE

## ✅ APP ĐÃ HOẠT ĐỘNG NGAY!

**Tin tốt**: App đã có **fallback data** tự động, không cần setup database để test!

Login với `bsty1` / `123456` ngay bây giờ → Dashboard sẽ hiển thị **"BS. Nguyễn Văn A"** ✅

---

## 🔄 Cách hoạt động hiện tại:

```
API call /doctors/:id
  ├─ ✅ Nếu có Supabase table: Dùng data từ database
  └─ ❌ Nếu chưa có table: Dùng hardcoded fallback data
```

**Fallback data** có sẵn trong server cho 4 bác sĩ:
- bsty1: BS. Nguyễn Văn A - Chó mèo tổng quát
- bsty2: BS. Trần Thị B - Ngoại khoa
- bsty3: BS. Lê Văn C - Da liễu
- bsty4: BS. Phạm Thị D - Nội khoa

---

## 📝 (Tùy chọn) MIGRATE LÊN DATABASE THẬT

Khi muốn dùng database thật thay vì fallback, làm theo:

### **Bước 1: Import Schema vào Supabase**

1. **Mở Supabase Dashboard** 
   - Vào project của bạn
   - Click **SQL Editor** ở sidebar trái

2. **Tạo New Query**
   - Click nút "+ New Query"

3. **Copy & Run Schema**
   - Mở file `/database/supabase-schema.sql`
   - Copy **TOÀN BỘ** nội dung
   - Paste vào SQL Editor
   - Click **RUN** (hoặc Ctrl+Enter)

---

### **Bước 2: Import Sample Data**

1. **Tạo New Query mới**

2. **Copy & Run Sample Data**
   - Mở file `/database/sample-data.sql`
   - Copy **TOÀN BỘ** nội dung
   - Paste vào SQL Editor
   - Click **RUN**

---

### **Bước 3: Kiểm tra Data**

Chạy query sau:

```sql
SELECT id, name, specialty, email, experience_years 
FROM doctors 
ORDER BY name;
```

**Kết quả mong đợi:**
```
┌───────┬──────────────────┬────────────────────┬──────────────────┬──────────────────┐
│  id   │      name        │     specialty      │      email       │ experience_years │
├───────┼──────────────────┼────────────────────┼──────────────────┼──────────────────┤
│ bsty1 │ BS. Nguyễn Văn A │ Chó mèo tổng quát  │ bsty1@miapet.com │        8         │
│ bsty2 │ BS. Trần Thị B   │ Ngoại khoa         │ bsty2@miapet.com │       10         │
│ bsty3 │ BS. Lê Văn C     │ Da liễu            │ bsty3@miapet.com │        6         │
│ bsty4 │ BS. Phạm Thị D   │ Nội khoa           │ bsty4@miapet.com │       12         │
└───────┴──────────────────┴────────────────────┴──────────────────┴──────────────────┘
```

---

### **Bước 4: Kiểm tra Console**

Sau khi setup, **refresh app** và mở **Console (F12)**:

**TRƯỚC KHI SETUP:**
```
Error fetching doctor from Supabase: [schema cache error]
Using fallback doctor data for bsty1
```

**SAU KHI SETUP:**
```
GET /make-server-b09aa6ec/doctors/bsty1
Response: {
  id: "bsty1",
  name: "BS. Nguyễn Văn A",
  specialty: "Chó mèo tổng quát",
  ...
}
```

API tự động chuyển sang dùng database! ✨

---

## 🔧 Migration Status

### ✅ ĐÃ HOÀN THÀNH:
- [x] Database schema với 7 tables
- [x] Sample data cho 4 bác sĩ
- [x] Server API endpoints: `/doctors/:id` và `/doctors`
- [x] Frontend API client
- [x] VetLayout fetch tên từ database
- [x] VetDashboard fetch tên từ database

### 🔄 ĐANG LÀM:
- [ ] Migrate authentication sang Supabase Auth
- [ ] Migrate bookings từ localStorage sang database
- [ ] Migrate products từ localStorage sang database
- [ ] Migrate pets từ localStorage sang database

---

**🐾 MiaPET - Chăm sóc thú cưng tận tâm** 💙