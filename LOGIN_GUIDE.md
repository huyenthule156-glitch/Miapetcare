# 🔐 Hướng Dẫn Đăng Nhập - MiaPET

## 🚀 Quick Login

### Admin
```
👤 Username: admin
🔑 Password: admin123
🎯 Truy cập: /admin
```

### Nhân viên (Staff)
```
👤 Username: nhanvien1
🔑 Password: 123456
📧 Email: staff1@miapet.com
👥 Họ tên: Nguyễn Thị Hoa
```

```
👤 Username: nhanvien2
🔑 Password: 123456
📧 Email: staff2@miapet.com
👥 Họ tên: Lê Văn Nam
```

### Bác sĩ thú y (BSTY)
```
👤 Username: bsty1
🔑 Password: 123456
📧 Email: bsty1@miapet.com
👥 Họ tên: BS. Lê Thị Mai
💼 Chuyên môn: Nội khoa thú y
```

```
👤 Username: bsty2
🔑 Password: 123456
📧 Email: bsty2@miapet.com
👥 Họ tên: BS. Trần Minh Tuấn
💼 Chuyên môn: Phẫu thuật thú y
```

```
👤 Username: bsty3
🔑 Password: 123456
📧 Email: bsty3@miapet.com
👥 Họ tên: BS. Phạm Văn Khoa
💼 Chuyên môn: Da liễu thú y
```

### Khách hàng (Customer)
```
👤 Username: nguyenvana
🔑 Password: user123
📧 Email: nguyenvana@email.com
👥 Họ tên: Nguyễn Văn A
🐾 Thú cưng: Bobby, Max, Rocky (3 con)
```

```
👤 Username: tranthib
🔑 Password: user123
📧 Email: tranthib@email.com
👥 Họ tên: Trần Thị B
🐾 Thú cưng: Miu Miu, Kitty (2 con)
```

```
👤 Username: phamthic
🔑 Password: user123
📧 Email: phamthic@email.com
👥 Họ tên: Phạm Thị C
🐾 Thú cưng: Chưa có
```

---

## 📍 Routes theo Role

### Admin Routes
- `/admin/overview` - Dashboard Admin
- `/admin/users` - Quản lý người dùng
- `/admin/pets` - Quản lý thú cưng
- `/admin/products` - Quản lý sản phẩm
- `/admin/services` - Quản lý dịch vụ
- `/admin/reports` - Báo cáo & Thống kê

### Staff Routes (Nhân viên)
- `/staff/overview` - Tổng quan nhân viên
- `/staff/orders` - Quản lý đơn hàng
- `/staff/products` - Xem sản phẩm & kho
- `/staff/services` - Xem dịch vụ

### Vet Routes (Bác sĩ thú y)
- `/vet/dashboard` - Dashboard BSTY
- `/vet/pending-appointments` - Lịch hẹn chờ xử lý
- `/vet/my-appointments` - Lịch hẹn của tôi

### User/Staff/Vet Routes
- `/dashboard` - Dashboard chung
- `/dashboard/pets` - Thú cưng của tôi
- `/dashboard/appointments` - Lịch hẹn
- `/dashboard/services` - Dịch vụ
- `/dashboard/mart` - Sản phẩm
- `/dashboard/my-orders` - Giỏ hàng
- `/dashboard/order-history` - Lịch sử đơn hàng
- `/dashboard/checkout` - Thanh toán

---

## 🎭 Tính năng theo Role

### 🔴 Admin
✅ Toàn quyền hệ thống
✅ Quản lý tài khoản (thêm/sửa/xóa/phân quyền)
✅ Quản lý sản phẩm & kho
✅ Quản lý dịch vụ
✅ Xem báo cáo doanh thu
✅ Thống kê tổng quan
✅ Quản lý tất cả thú cưng
✅ Quản lý đơn hàng

### 🟡 Staff (Nhân viên)
✅ Quản lý đơn hàng (xác nhận gửi hàng)
✅ Xem sản phẩm & tồn kho
✅ Xem danh sách dịch vụ
✅ Giao diện riêng màu Indigo
🔒 **Logic xác nhận:** Khi nhân viên xác nhận gửi hàng, đơn chuyển sang "Đang giao" → Khách KHÔNG thể hủy nữa
❌ Không có quyền sửa/xóa sản phẩm
❌ Không có quyền phân quyền
❌ Không xem được báo cáo tài chính

### 🟢 Vet (Bác sĩ thú y)
✅ Quản lý hồ sơ thú cưng
✅ Thêm/sửa medical history
✅ Kê đơn thuốc
✅ Quản lý lịch khám
✅ Xem vaccination records
❌ Không quản lý sản phẩm
❌ Không xem báo cáo doanh thu

### 🔵 User (Khách hàng)
✅ Quản lý thú cưng của mình
✅ Đặt lịch hẹn
✅ Mua sắm sản phẩm
✅ Xem lịch sử đơn hàng
✅ Theo dõi medical history
❌ Không xem được thú cưng của người khác
❌ Không có quyền quản trị

---

## 🧪 Test Scenarios

### Test 1: Đăng nhập Admin
1. Truy cập `/login`
2. Username: `admin` / Password: `admin123`
3. Tự động redirect → `/admin`
4. Xem dashboard admin với đầy đủ quyền

### Test 2: Đăng nhập Nhân viên
1. Truy cập `/login`
2. Username: `nhanvien1` / Password: `123456`
3. Tự động redirect → `/dashboard`
4. Có thể xem đơn hàng, lịch hẹn

### Test 3: Đăng nhập BSTY
1. Truy cập `/login`
2. Username: `bsty1` / Password: `123456`
3. Tự động redirect → `/dashboard`
4. Quản lý thú cưng, medical records

### Test 4: Đăng nhập Khách hàng có thú cưng
1. Truy cập `/login`
2. Username: `nguyenvana` / Password: `user123`
3. Redirect → `/dashboard`
4. Xem 3 thú cưng: Bobby, Max, Rocky

### Test 5: Mua hàng & Kiểm tra Stock
1. Đăng nhập user: `nguyenvana`
2. Vào `/dashboard/mart`
3. Thêm sản phẩm vào giỏ
4. Checkout
5. Đăng nhập admin → Xem stock đã giảm

### Test 6: Hủy đơn & Hoàn stock
1. Đăng nhập user có đơn hàng
2. Vào `/dashboard/order-history`
3. Hủy đơn "Chờ xử lý"
4. Đăng nhập admin → Stock tăng lại

### Test 7: Nhân viên xác nhận gửi hàng (QUAN TRỌNG)
1. Đăng nhập user: `nguyenvana` / `user123`
2. Mua sản phẩm → Checkout → Đơn hàng "Chờ xử lý"
3. **Lúc này khách có thể HỦY đơn**
4. Đăng xuất → Đăng nhập nhân viên: `nhanvien1` / `123456`
5. Vào `/staff/orders` → Thấy đơn "Chờ xử lý"
6. Click "Xác nhận gửi hàng" (icon Send)
7. Đơn chuyển sang "Đang giao"
8. **Từ giờ khách KHÔNG thể hủy đơn nữa!**
9. Đăng xuất → Đăng nhập lại user
10. Vào `/dashboard/order-history` → Không còn nút "Hủy đơn"

---

## 🔧 Debugging

### Kiểm tra localStorage
```javascript
// Console
localStorage.getItem('miapet_users')
localStorage.getItem('miapet_products')
localStorage.getItem('miapet_orders')
```

### Reset tất cả data
```javascript
// Console
localStorage.clear()
location.reload()
```

### Check user hiện tại
```javascript
// Console
localStorage.getItem('miapet_current_user')
```

---

## 💡 Tips

1. **Admin dashboard riêng biệt:** Admin không cần truy cập `/dashboard`, chỉ dùng `/admin`
2. **Password đơn giản:** Tất cả account test đều dùng password đơn giản để dễ nhớ
3. **Stock realtime:** Mỗi lần đặt/hủy đơn, stock tự động cập nhật
4. **Multi-role:** Có thể test nhiều role khác nhau trong cùng 1 browser (dùng incognito)

---

## 📞 Support

Nếu cần reset database mẫu hoặc có vấn đề về đăng nhập, xem file `DATABASE_SAMPLE.md`