# 🔑 Tài khoản Test - MiaPET

## 👤 Tài khoản khách hàng (User Accounts)

### Account 1: Nguyễn Văn A
```
Username: nguyenvana
Email: nguyenvana@email.com
Password: user123
```
**Đặc điểm:**
- Có 2 pets: Bobby (chó Golden Retriever), Miu Miu (mèo Persian)
- Có 3 đơn hàng (ORD001, ORD003, ORD005)
- Tổng chi tiêu: ₫980,000
- Có 2 lịch hẹn dịch vụ

---

### Account 2: Trần Thị B
```
Username: tranthib
Email: tranthib@email.com
Password: user123
```
**Đặc điểm:**
- Có 2 pets: Luna (mèo British Shorthair), Milo (chó Poodle)
- Có 2 đơn hàng (ORD002, ORD004)
- Tổng chi tiêu: ₫200,000
- Có 2 lịch hẹn dịch vụ

---

## 👨‍⚕️ Tài khoản Bác sĩ thú y (Vet Accounts)

### Bác sĩ 1: Lê Thị Mai
```
Username: bsty1
Email: bsty1@miapet.com
Password: 123456
```
**Chuyên môn:** Nội khoa thú y

---

### Bác sĩ 2: Trần Minh Tuấn
```
Username: bsty2
Email: bsty2@miapet.com
Password: 123456
```
**Chuyên môn:** Phẫu thuật thú y

---

## 👔 Tài khoản Admin

### Admin
```
Username: admin
Email: admin@miapet.com
Password: admin123
```
**Quyền hạn:**
- Quản lý người dùng (5 users)
- Quản lý sản phẩm (53 products)
- Quản lý dịch vụ (4 loại: main, additional, dye, VIP)
- Quản lý thú cưng (4 pets)
- Xem báo cáo doanh thu
- Phân quyền người dùng

---

## 📊 Thống kê hệ thống (March 2026)

### Đơn hàng
- **Tổng đơn hàng:** 5 đơn
- **Đơn hàng tháng này (March):** 5 đơn
- **Đơn hàng tháng trước (Feb):** 0 đơn

### Doanh thu
- **Doanh thu tháng này:** ₫1,180,000
- **Doanh thu tháng trước:** ₫0
- **Tăng trưởng:** +100%

### Lịch hẹn
- **Lịch hẹn hôm nay (21/03/2026):** 4 bookings
- **Trạng thái:** 3 confirmed, 1 pending

### Top sản phẩm bán chạy (theo doanh thu)
1. **Thức ăn chó chó Apro lon 20kg** - 1 bán, ₫690k
2. **Máy lọc nước cưng vật 2L** - 1 bán, ₫250k
3. **Pate mèo SC mix Tellme 40g** - 4 bán, ₫180k
4. **Bộ chõi lắc bóng vàng đá** - 2 bán, ₫40k
5. **Vòng cổ da cho chó 55x5cm** - 1 bán, ₫20k

---

## 🗂️ Cấu trúc Database (Mock)

### Users Table
- **Total users:** 5
- **Admin:** 1
- **Vets:** 2
- **Customers:** 2

### Products Table
- **Total products:** 53
- **Categories:** Food, Toy, Accessory, Medicine
- **Pet types:** Dog, Cat, Both

### Services Tables
- **Main Services:** 6 (Tắm gội, SPA, Cắt tỉa)
- **Additional Services:** 9 (Vệ sinh tai, Bấm móng, etc.)
- **Dye Services:** 4 (Nhuộm tai, đuôi, chân)
- **VIP Packages:** 2 (VIP6, VIP10)

### Orders Table
- **Total orders:** 5
- **Status:** shipping (2), completed (2), processing (1)
- **Payment methods:** card (2), momo (1), cash (1), bank_transfer (1)

### Bookings Table
- **Total bookings:** 4
- **Today's bookings:** 4
- **Status:** confirmed (3), pending (1)

---

## 🔄 Test Scenarios

### Scenario 1: Khách hàng đặt hàng
1. Đăng nhập: `nguyenvana / user123`
2. Vào trang sản phẩm
3. Thêm sản phẩm vào giỏ
4. Checkout (hiện đang mock)

### Scenario 2: Xem lịch sử đơn hàng
1. Đăng nhập: `nguyenvana / user123`
2. Vào Dashboard → Lịch sử
3. Xem tất cả đơn hàng của user (3 đơn):
   - #ORD001: Thức ăn chó Apro 20kg - 690,000₫ - Đang giao
   - #ORD003: Bộ chõi lắc bóng x2 - 40,000₫ - Đang xử lý
   - #ORD005: Máy lọc nước 2L - 250,000₫ - Hoàn thành
4. Lọc theo trạng thái: Tất cả (3), Chờ xử lý (0), Đang xử lý (1), Đang giao (1), Hoàn thành (1), Đã hủy (0)
5. Xem chi tiết: Mã đơn, Sản phẩm, Số lượng, Giá tiền, Ngày đặt, Phương thức thanh toán

### Scenario 3: Đặt lịch dịch vụ
1. Đăng nhập: `tranthib / user123`
2. Vào trang dịch vụ
3. Chọn dịch vụ
4. Đặt lịch hẹn (hiện đang mock)

### Scenario 4: Admin quản lý
1. Đăng nhập: `admin / admin123`
2. Vào Admin Panel → Tổng quan
3. Xem thống kê real-time:
   - Tổng người dùng: 5
   - Doanh thu tháng này: ₫1.2M
4. Quản lý sản phẩm → Sửa/Xóa
5. Quản lý dịch vụ → Sửa/Xóa
6. Quản lý người dùng → Xem danh sách

### Scenario 5: Bác sĩ xem hồ sơ
1. Đăng nhập: `bsty1 / 123456`
2. Vào Vet Dashboard
3. Xem danh sách thú cưng (4 pets)
4. Xem hồ sơ chi tiết pet

---

## 📝 Notes

- ✅ Tất cả tên khách hàng đã đồng bộ: **Nguyễn Văn A**, **Trần Thị B**
- ✅ UserID trong orders đã khớp với users table (id: 4, 5)
- ✅ Data mock sẵn sàng migrate sang Supabase
- ✅ Tất cả logic tính toán doanh thu/thống kê đã hoạt động
- 🔜 Cần tích hợp Supabase để có database thật
- 🔜 Cần implement checkout flow hoàn chỉnh
- 🔜 Cần implement booking flow hoàn chỉnh

---

## 🚀 Deploy lên Vercel + Supabase

Khi deploy:
1. Chạy SQL scripts trong `DATABASE_SCHEMA.md`
2. Migrate mock data vào Supabase
3. Thay thế localStorage functions bằng Supabase queries
4. Cấu hình RLS policies
5. Test lại tất cả scenarios

**Demo data sẽ giống hệt như hiện tại!**