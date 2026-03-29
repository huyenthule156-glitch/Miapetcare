# 🗄️ MiaPET Database Diagram

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        MIAPET DATABASE STRUCTURE                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐
│      DOCTORS        │ ◄───┐
├─────────────────────┤     │
│ • id (PK)           │     │
│ • name              │     │
│ • specialty         │     │ 1:N
│ • phone             │     │
│ • email             │     │
│ • experience_years  │     │
│ • status            │     │
│ • bio               │     │
└─────────────────────┘     │
                            │
                            │
                            │
                  ┌─────────┴───────────┐
                  │      BOOKINGS       │
                  ├─────────────────────┤
                  │ • id (PK)           │
                  │ • customer_name     │
                  │ • customer_phone    │
                  │ • pet_name          │
                  │ • pet_type          │
                  │ • appointment_date  │
                  │ • appointment_time  │
                  │ • service_category  │
                  │ • service_name      │
                  │ • total_price       │
                  │ • status            │
                  │ • assigned_doctor_id│ (FK)
                  └─────────────────────┘
                            │
                            │
                            │ N:1
                            │
                            ▼
                  ┌─────────────────────┐
                  │        PETS         │
                  ├─────────────────────┤
                  │ • id (PK)           │
                  │ • owner_phone       │
                  │ • owner_name        │
                  │ • name              │
                  │ • type              │
                  │ • breed             │
                  │ • birth_date        │
                  │ • weight            │
                  │ • vaccinations      │
                  │ • status            │
                  └─────────────────────┘
                            │
                            │ 1:N
                            │
                            ▼
                  ┌─────────────────────┐
                  │  MEDICAL_RECORDS    │ ◄───┐
                  ├─────────────────────┤     │
                  │ • id (PK)           │     │ N:1
                  │ • pet_id (FK)       │     │
                  │ • doctor_id (FK) ───┼─────┘
                  │ • booking_id (FK)   │
                  │ • visit_date        │
                  │ • visit_type        │
                  │ • diagnosis         │
                  │ • treatment         │
                  │ • medications       │
                  │ • follow_up_date    │
                  └─────────────────────┘


┌─────────────────────┐
│      PRODUCTS       │
├─────────────────────┤
│ • id (PK)           │
│ • name              │
│ • slug (UNIQUE)     │
│ • category          │
│ • price             │
│ • stock             │
│ • brand             │
│ • image_url         │
│ • status            │
│ • featured          │
└─────────────────────┘
         │
         │ N:N (via JSONB in orders.items)
         │
         ▼
┌─────────────────────┐
│       ORDERS        │
├─────────────────────┤
│ • id (PK)           │
│ • order_number      │
│ • customer_name     │
│ • customer_phone    │
│ • customer_address  │
│ • items (JSONB)     │
│ • total_amount      │
│ • delivery_status   │
│ • payment_method    │
│ • payment_status    │
└─────────────────────┘


┌─────────────────────┐
│    STAFF_USERS      │
├─────────────────────┤
│ • id (PK)           │
│ • email (UNIQUE)    │
│ • full_name         │
│ • phone             │
│ • role              │
│ • department        │
│ • status            │
└─────────────────────┘

```

---

## 🔗 Relationships Chi Tiết

### 1. DOCTORS ↔ BOOKINGS (1:N)
```
Một bác sĩ có thể được phân công nhiều lịch hẹn
Một lịch hẹn chỉ có một bác sĩ phụ trách
```

**Foreign Key:**
```sql
bookings.assigned_doctor_id → doctors.id
```

**Query Example:**
```sql
-- Lấy lịch hẹn của bác sĩ
SELECT b.*, d.name as doctor_name
FROM bookings b
JOIN doctors d ON b.assigned_doctor_id = d.id
WHERE d.id = 'xxx';
```

---

### 2. PETS ↔ MEDICAL_RECORDS (1:N)
```
Một thú cưng có nhiều hồ sơ bệnh án
Một hồ sơ bệnh án thuộc về một thú cưng
```

**Foreign Key:**
```sql
medical_records.pet_id → pets.id
```

**Query Example:**
```sql
-- Lịch sử khám bệnh của thú cưng
SELECT mr.*, d.name as doctor_name
FROM medical_records mr
JOIN pets p ON mr.pet_id = p.id
JOIN doctors d ON mr.doctor_id = d.id
WHERE p.id = 'xxx'
ORDER BY mr.visit_date DESC;
```

---

### 3. DOCTORS ↔ MEDICAL_RECORDS (1:N)
```
Một bác sĩ có thể tạo nhiều hồ sơ bệnh án
Một hồ sơ bệnh án do một bác sĩ tạo
```

**Foreign Key:**
```sql
medical_records.doctor_id → doctors.id
```

---

### 4. BOOKINGS ↔ MEDICAL_RECORDS (1:1 optional)
```
Một lịch hẹn có thể có một hồ sơ bệnh án (sau khi khám xong)
Một hồ sơ bệnh án có thể liên kết với một lịch hẹn
```

**Foreign Key:**
```sql
medical_records.booking_id → bookings.id
```

---

### 5. PRODUCTS ↔ ORDERS (N:N via JSONB)
```
Một sản phẩm có thể có trong nhiều đơn hàng
Một đơn hàng có thể chứa nhiều sản phẩm
```

**Implementation:**
```sql
-- orders.items là JSONB array
[
  {
    "productId": "uuid",
    "name": "Royal Canin 2kg",
    "price": 385000,
    "quantity": 2,
    "image": "url"
  }
]
```

---

## 📈 Data Flow Diagrams

### Flow 1: Đặt lịch hẹn → Phân công bác sĩ

```
┌─────────────┐
│  Customer   │
└──────┬──────┘
       │ 1. Book appointment
       ▼
┌─────────────┐
│  BOOKINGS   │ ──► status: 'pending'
└──────┬──────┘     assigned_doctor_id: NULL
       │
       │ 2. Staff assigns doctor
       ▼
┌─────────────┐
│   DOCTORS   │ ──► Find available doctor
└──────┬──────┘
       │
       │ 3. Update booking
       ▼
┌─────────────┐
│  BOOKINGS   │ ──► status: 'confirmed'
└──────┬──────┘     assigned_doctor_id: 'xxx'
       │
       │ 4. After service completed
       ▼
┌─────────────┐
│MEDICAL_REC. │ ──► Create medical record
└─────────────┘
```

---

### Flow 2: Mua hàng

```
┌─────────────┐
│  Customer   │
└──────┬──────┘
       │ 1. Browse products
       ▼
┌─────────────┐
│  PRODUCTS   │ ──► Show available products
└──────┬──────┘
       │
       │ 2. Add to cart
       ▼
┌─────────────┐
│   ORDERS    │ ──► status: 'pending'
└──────┬──────┘     items: [products]
       │
       │ 3. Staff confirms
       ▼
┌─────────────┐
│   ORDERS    │ ──► status: 'confirmed'
└──────┬──────┘
       │
       │ 4. Shipping
       ▼
┌─────────────┐
│   ORDERS    │ ──► status: 'delivered'
└─────────────┘
```

---

## 🔍 Index Strategy

### Performance Indexes

```sql
-- BOOKINGS (high read/write)
CREATE INDEX idx_bookings_appointment ON bookings(appointment_date, appointment_time);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_doctor ON bookings(assigned_doctor_id);

-- PRODUCTS (high read)
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);

-- ORDERS (high read)
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_delivery_status ON orders(delivery_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- PETS (medium read)
CREATE INDEX idx_pets_owner_phone ON pets(owner_phone);

-- MEDICAL_RECORDS (medium read)
CREATE INDEX idx_medical_records_pet ON medical_records(pet_id);
CREATE INDEX idx_medical_records_doctor ON medical_records(doctor_id);
```

---

## 📊 Data Statistics

### Sample Data Counts

| Table | Records | Description |
|-------|---------|-------------|
| **doctors** | 6 | Bác sĩ thú y với các chuyên khoa khác nhau |
| **bookings** | 9 | Lịch hẹn ở nhiều trạng thái khác nhau |
| **products** | 13 | Sản phẩm thuộc 5 categories |
| **orders** | 4 | Đơn hàng ở các giai đoạn khác nhau |
| **pets** | 9 | Thú cưng của khách hàng |
| **medical_records** | 2 | Hồ sơ bệnh án mẫu |
| **staff_users** | 5 | Nhân viên hệ thống |

### Storage Estimation (1 year)

| Table | Est. Records/Year | Storage |
|-------|-------------------|---------|
| bookings | ~5,000 | ~5 MB |
| orders | ~3,000 | ~10 MB |
| medical_records | ~4,000 | ~15 MB |
| products | ~200 | ~1 MB |
| pets | ~500 | ~2 MB |
| **TOTAL** | | **~33 MB** |

---

## 🎯 Query Performance Tips

### ✅ Good Queries (Fast)

```sql
-- Use indexes
SELECT * FROM bookings 
WHERE appointment_date = '2024-03-28' 
  AND status = 'pending';

-- Join with specific columns
SELECT b.id, b.customer_name, d.name
FROM bookings b
JOIN doctors d ON b.assigned_doctor_id = d.id;
```

### ❌ Bad Queries (Slow)

```sql
-- Full table scan
SELECT * FROM bookings WHERE EXTRACT(MONTH FROM appointment_date) = 3;

-- Select all with wildcard
SELECT * FROM bookings;  -- Better: SELECT id, customer_name, appointment_date
```

---

## 🔐 Security Notes

### Row Level Security (RLS)

Khi enable RLS:

```sql
-- Cho phép staff xem mọi booking
CREATE POLICY "Staff can view all bookings" ON bookings
  FOR SELECT 
  USING (auth.role() = 'staff');

-- Customer chỉ xem booking của mình
CREATE POLICY "Customer can view own bookings" ON bookings
  FOR SELECT
  USING (customer_phone = auth.jwt() ->> 'phone');
```

### API Key Usage

- ✅ **anon key**: Frontend (public)
- ❌ **service_role key**: Backend only (private)

---

## 📚 Related Files

- `supabase-schema.sql` - Database schema
- `sample-data.sql` - Sample data
- `supabase-client-example.ts` - API examples
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick setup guide

---

## 🎉 Summary

**Database MiaPET** gồm 7 tables chính với:
- ✅ Relationships rõ ràng
- ✅ Indexes tối ưu
- ✅ Sample data đầy đủ
- ✅ Scalable design
- ✅ Production-ready

**Ready for Vercel + Supabase deployment! 🚀**
