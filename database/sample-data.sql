-- ============================================
-- MIAPET - SAMPLE DATA (DỮ LIỆU THẬT TỪ HỆ THỐNG)
-- ============================================
-- Dữ liệu thật từ website MiaPET hiện tại
-- ============================================

-- ============================================
-- 1. DOCTORS DATA (Bác sĩ thú y - Từ Staff System)
-- ============================================
INSERT INTO doctors (id, name, specialty, phone, email, experience_years, status, bio) VALUES
  ('bsty1', 'BS. Nguyễn Văn A', 'Chó mèo tổng quát', '0901234567', 'bsty1@miapet.com', 8, 'active', 'Bác sĩ chuyên khoa chó mèo tổng quát với 8 năm kinh nghiệm. Tốt nghiệp Đại học Nông Lâm TP.HCM.'),
  ('bsty2', 'BS. Trần Thị B', 'Ngoại khoa', '0909876543', 'bsty2@miapet.com', 10, 'active', 'Chuyên gia ngoại khoa thú y với 10 năm kinh nghiệm. Giỏi các ca phẫu thuật phức tạp.'),
  ('bsty3', 'BS. Lê Văn C', 'Da liễu', '0903456789', 'bsty3@miapet.com', 6, 'active', 'Bác sĩ chuyên khoa da liễu thú y, điều trị các bệnh về da, lông, móng cho chó mèo.'),
  ('bsty4', 'BS. Phạm Thị D', 'Nội khoa', '0904567890', 'bsty4@miapet.com', 12, 'active', 'Chuyên gia nội khoa với 12 năm kinh nghiệm. Giỏi chẩn đoán và điều trị các bệnh lý tim mạch, tiêu hóa.');

-- ============================================
-- 2. PRODUCTS DATA (Sản phẩm - Từ Pet Shop)
-- ============================================

-- Thức ăn cho chó
INSERT INTO products (name, slug, description, category, sub_category, price, original_price, discount_percent, stock, brand, image_url, status, featured) VALUES
  ('Thức ăn dinh dưỡng ANF AD27 cho chó mọi lứa tuổi', 'anf-ad27-cho-cho', 'Thức ăn cao cấp dinh dưỡng chuẩn Âu cho chó mọi lứa tuổi', 'Thức ăn', 'Thức ăn cho chó', 850000, NULL, 0, 50, 'ANF', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', true),
  ('Pate lon 400g A Pro gà nấu nhuyễn cho chó trưởng thành', 'pate-apro-ga-400g', 'Pate gà nấu nhuyễn cho chó trưởng thành, bổ sung protein', 'Thức ăn', 'Thức ăn cho chó', 45000, NULL, 0, 120, 'A Pro', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', false),
  ('Pate lon 400g A Pro bò nấu nhuyễn cho chó trưởng thành', 'pate-apro-bo-400g', 'Pate bò nấu nhuyễn giàu protein cho chó trưởng thành', 'Thức ăn', 'Thức ăn cho chó', 45000, 58000, 22, 120, 'A Pro', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', false),
  ('Thức ăn cao cấp Maxime Elite Puppy cho chó con', 'maxime-elite-puppy-1-5kg', 'Thức ăn cao cấp cho chó con và chó mẹ nhiều protein gói 1.5kg', 'Thức ăn', 'Thức ăn cho chó', 250000, NULL, 0, 30, 'Maxime', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', true),
  ('Thức ăn Maxime Adult With Beef cho chó trưởng thành', 'maxime-adult-beef', 'Thức ăn cho chó trưởng thành vị thịt bò', 'Thức ăn', 'Thức ăn cho chó', 220000, NULL, 0, 40, 'Maxime', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', false);

-- Thức ăn cho mèo
INSERT INTO products (name, slug, description, category, sub_category, price, original_price, discount_percent, stock, brand, image_url, status, featured) VALUES
  ('Súp thưởng WOW gói 6 thanh', 'sup-thuong-wow-6-thanh', 'Súp thưởng dinh dưỡng cho chó mèo gói 6 thanh', 'Thức ăn', 'Thức ăn cho mèo', 35000, NULL, 0, 100, 'WOW', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', true),
  ('Sữa non Colostrum Petilac cho mèo', 'sua-non-petilac', 'Sữa non Colostrum bổ sung kháng thể cho mèo con', 'Thức ăn', 'Thức ăn cho mèo', 120000, NULL, 0, 25, 'Petilac', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', false),
  ('Pate lon WOW 85g cho mèo vị thịt gà và lòng đỏ trứng', 'pate-wow-85g-ga-trung', 'Pate lon 85g vị gà và lòng đỏ trứng cho mèo', 'Thức ăn', 'Thc ăn cho mèo', 22000, NULL, 0, 200, 'WOW', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', true),
  ('Thức ăn hạt Wonder Cats cho mèo mọi lứa tuổi', 'wonder-cats-all-ages', 'Thức ăn hạt dinh dưỡng cho mèo mọi lứa tuổi', 'Thức ăn', 'Thức ăn cho mèo', 165000, NULL, 0, 45, 'Wonder Cats', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', false),
  ('Thức ăn Cuties Catz Seafood cho mèo trưởng thành', 'cuties-catz-seafood', 'Thức ăn vị hải sản cho mèo trưởng thành', 'Thức ăn', 'Thức ăn cho mèo', 175000, NULL, 0, 35, 'Cuties Catz', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500', 'active', true);

-- Phụ kiện
INSERT INTO products (name, slug, description, category, sub_category, price, stock, image_url, status, featured) VALUES
  ('Bát ăn chống gù chân voi cho chó mèo', 'bat-an-chong-gu-chan-voi', 'Bát ăn chống gù thiết kế chân voi cho chó mèo', 'Phụ kiện', 'Bát ăn & Uống', 85000, 60, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', 'active', false),
  ('Bát ăn tự động nạp thức ăn cho chó mèo', 'bat-an-tu-dong', 'Bát ăn tự động nạp thức ăn thông minh cho chó mèo', 'Phụ kiện', 'Bát ăn & Uống', 150000, 30, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', 'active', true),
  ('Lồng vận chuyển cho mèo ký gửi hàng không', 'long-van-chuyen-hang-khong', 'Lồng vận chuyển cho mèo đạt chuẩn hàng không, ô tô', 'Phụ kiện', 'Lồng & Chuồng', 650000, 15, 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=500', 'active', true),
  ('Vòng cổ phản quang cho chó mèo', 'vong-co-phan-quang', 'Vòng cổ phản quang an toàn cho chó mèo', 'Phụ kiện', 'Vòng cổ & Dây dắt', 35000, 80, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500', 'active', false),
  ('Vòng cổ da có chuông cho chó mèo', 'vong-co-da-chuong', 'Vòng cổ da thật có chuông cho chó mèo', 'Phụ kiện', 'Vòng cổ & Dây dắt', 30000, 100, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500', 'active', false);

-- Đồ chơi
INSERT INTO products (name, slug, description, category, sub_category, price, stock, image_url, status, featured) VALUES
  ('Đồ chơi bóng tự lăn và phát sáng cho chó mèo', 'bong-tu-lan-phat-sang', 'Đồ chơi bóng tự lăn và phát sáng kích thích vận động', 'Đồ chơi', 'Đồ chơi cho chó', 45000, 70, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', 'active', true),
  ('Đồ chơi cần câu móng con lăn cho mèo', 'can-cau-mong-con-lan', 'Cần câu đồ chơi móng con lăn cho mèo', 'Đồ chơi', 'Đồ chơi cho mèo', 35000, 90, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', 'active', false),
  ('Tháp bóng 3 tầng đồ chơi mèo', 'thap-bong-3-tang', 'Tháp bóng 3 tầng đồ chơi kích thích bản năng săn mồi', 'Đồ chơi', 'Đồ chơi cho mèo', 120000, 25, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', 'active', true),
  ('Đồ chơi cần gậm dây thừng bện cà rốt', 'can-gam-day-thung-ca-rot', 'Đồ chơi cần gậm dây thừng hình cà rốt cho chó', 'Đồ chơi', 'Đồ chơi cho chó', 40000, 60, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', 'active', false);

-- Vệ sinh
INSERT INTO products (name, slug, description, category, sub_category, price, stock, image_url, status, featured) VALUES
  ('Khay vệ sinh mèo thành cao cửa hở', 'khay-ve-sinh-thanh-cao', 'Khay vệ sinh mèo thành cao cửa hở, dễ vệ sinh', 'Vệ sinh', 'Khay & Nhà vệ sinh', 180000, 35, 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500', 'active', true),
  ('Sữa tắm cho mèo YOJI hương trái cây và trà', 'sua-tam-yoji-trai-cay', 'Sữa tắm cho mèo YOJI hương trái cây và trà tự nhiên', 'Vệ sinh', 'Sữa tắm', 85000, 50, 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500', 'active', false),
  ('Khay vệ sinh vuông thành trong suốt cho mèo', 'khay-ve-sinh-vuong-trong-suot', 'Khay vệ sinh vuông thành trong suốt, hiện đại', 'Vệ sinh', 'Khay & Nhà vệ sinh', 160000, 40, 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500', 'active', false);

-- Sức khỏe
INSERT INTO products (name, slug, description, category, sub_category, price, stock, brand, image_url, status, featured) VALUES
  ('Thanh nhai 7 Dental Effects vị bơ sữa 160g', 'thanh-nhai-dental-bo-sua', 'Thanh nhai làm sạch răng thơm miệng vị bơ và sữa cho chó', 'Sức khỏe', 'Chăm sóc răng miệng', 65000, 45, '7 Dental Effects', 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500', 'active', false),
  ('Thanh nhai 7 Dental Effects vị thịt bò nướng 160g', 'thanh-nhai-dental-bo-nuong', 'Thanh nhai làm sạch răng vị thịt bò nướng cho chó', 'Sức khỏe', 'Chăm sóc răng miệng', 65000, 45, '7 Dental Effects', 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500', 'active', true),
  ('Thanh bánh thưởng Dental Health cho chó mèo', 'thanh-banh-dental-health', 'Thanh bánh thưởng Dental Health làm sạch răng', 'Sức khỏe', 'Chăm sóc răng miệng', 45000, 60, 'Dental Health', 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500', 'active', false);

-- ============================================
-- 3. BOOKINGS DATA (Lịch hẹn - Từ Staff System)
-- ============================================
INSERT INTO bookings (
  id, customer_name, customer_phone, customer_email, pet_name, pet_type,
  appointment_date, appointment_time, notes,
  service_category_id, service_category, service_name, service_price, service_price_value,
  total_price, status, assigned_doctor_id
) VALUES
  -- Lịch hôm nay (pending - chờ phân công)
  ('650e8400-e29b-41d4-a716-446655440001', 'Nguyễn Thị Mai', '0912345678', 'mai@gmail.com', 'Lucky', 'dog',
   CURRENT_DATE, '08:30', 'Chó cần tắm và cắt tỉa lông',
   'spa', 'SPA & Grooming', 'SPA Cắt tỉa 1', '310.000đ', 310000,
   310000, 'pending', NULL),
  
  ('650e8400-e29b-41d4-a716-446655440002', 'Trần Văn Hùng', '0923456789', 'hung@gmail.com', 'Miu', 'cat',
   CURRENT_DATE, '09:00', 'Mèo cần tắm và vệ sinh cơ bản',
   'bath', 'Tắm & Vệ sinh', 'Tắm + VS (Lông ngắn)', '90.000đ', 90000,
   90000, 'pending', NULL),
  
  -- Lịch hôm nay (confirmed - đã phân công)
  ('650e8400-e29b-41d4-a716-446655440003', 'Lê Thị Hương', '0934567890', 'huong@gmail.com', 'Bông', 'cat',
   CURRENT_DATE, '10:00', 'Mèo Ba Tư cần cắt tỉa lông',
   'grooming', 'Grooming', 'SPA Cắt tỉa 2', '300.000đ', 300000,
   300000, 'confirmed', 'bsty3'),
  
  ('650e8400-e29b-41d4-a716-446655440004', 'Phạm Minh Tuấn', '0945678901', 'tuan@gmail.com', 'Max', 'dog',
   CURRENT_DATE, '10:30', 'Chó Golden cần spa cao cấp',
   'spa', 'SPA & Grooming', 'SPA Cắt tỉa 3', '510.000đ', 510000,
   510000, 'confirmed', 'bsty1'),
  
  -- Lịch ngày mai
  ('650e8400-e29b-41d4-a716-446655440005', 'Võ Thị Lan', '0956789012', 'lan@gmail.com', 'Simba', 'cat',
   CURRENT_DATE + INTERVAL '1 day', '08:00', 'Mèo Ba Tư cần spa',
   'spa', 'SPA & Grooming', 'SPA Cắt tỉa 2', '290.000đ', 290000,
   290000, 'pending', NULL),
  
  ('650e8400-e29b-41d4-a716-446655440006', 'Đặng Văn Nam', '0967890123', 'nam@gmail.com', 'Buddy', 'dog',
   CURRENT_DATE + INTERVAL '1 day', '09:00', 'Chó Corgi cần tắm',
   'bath', 'Tắm & Vệ sinh', 'Tắm + VS (Lông ngắn)', '140.000đ', 140000,
   140000, 'pending', NULL),
  
  -- Lịch đã hoàn thành
  ('650e8400-e29b-41d4-a716-446655440007', 'Bùi Văn Đức', '0989012345', 'duc@gmail.com', 'Micky', 'dog',
   CURRENT_DATE - INTERVAL '1 day', '14:00', 'Tắm và cắt móng',
   'bath', 'Tắm & Vệ sinh', 'Tắm + VS (Lông ngắn)', '180.000đ', 180000,
   180000, 'completed', 'bsty2'),
  
  ('650e8400-e29b-41d4-a716-446655440008', 'Hoàng Thị Thu', '0990123456', 'thu@gmail.com', 'Kitty', 'cat',
   CURRENT_DATE - INTERVAL '2 days', '10:30', 'Spa và cắt tỉa',
   'spa', 'SPA & Grooming', 'SPA Cắt tỉa 1', '230.000đ', 230000,
   230000, 'completed', 'bsty4');

-- ============================================
-- 4. ORDERS DATA (Đơn hàng)
-- ============================================
INSERT INTO orders (
  order_number, customer_name, customer_phone, customer_email, customer_address,
  items, total_amount, shipping_fee, final_amount,
  payment_method, payment_status, delivery_status
) VALUES
  -- Đơn hàng đang xử lý
  ('DH202403280001', 'Nguyễn Văn A', '0901111111', 'nguyenvana@gmail.com', '123 Đường ABC, Quận 1, TP.HCM',
   '[{"productId": "1", "name": "Thức ăn ANF AD27 cho chó", "price": 850000, "quantity": 1, "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500"}]'::jsonb,
   850000, 30000, 880000,
   'cod', 'pending', 'confirmed'),
  
  ('DH202403280002', 'Trần Thị B', '0902222222', 'tranthib@gmail.com', '456 Đường DEF, Quận 2, TP.HCM',
   '[{"productId": "3", "name": "Pate lon WOW 85g cho mèo", "price": 22000, "quantity": 10, "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500"}, {"productId": "13", "name": "Khay vệ sinh mèo thành cao", "price": 180000, "quantity": 1, "image": "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500"}]'::jsonb,
   400000, 30000, 430000,
   'bank-transfer', 'pending', 'pending'),
  
  -- Đơn hàng đang giao
  ('DH202403270001', 'Lê Văn C', '0903333333', 'levanc@gmail.com', '789 Đường GHI, Quận 3, TP.HCM',
   '[{"productId": "9", "name": "Lồng vận chuyển cho mèo", "price": 650000, "quantity": 1, "image": "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=500"}]'::jsonb,
   650000, 50000, 700000,
   'momo', 'paid', 'shipping'),
  
  -- Đơn hàng đã giao
  ('DH202403260001', 'Phạm Thị D', '0904444444', 'phamthid@gmail.com', '321 Đường JKL, Quận 4, TP.HCM',
   '[{"productId": "1", "name": "Thức ăn ANF AD27 cho chó", "price": 850000, "quantity": 1, "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500"}, {"productId": "14", "name": "Sữa tắm YOJI cho mèo", "price": 85000, "quantity": 2, "image": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500"}]'::jsonb,
   1020000, 30000, 1050000,
   'cod', 'paid', 'delivered');

-- Update timestamps for completed order
UPDATE orders 
SET confirmed_at = CURRENT_TIMESTAMP - INTERVAL '2 days',
    shipped_at = CURRENT_TIMESTAMP - INTERVAL '1 day',
    delivered_at = CURRENT_TIMESTAMP
WHERE order_number = 'DH202403260001';

-- ============================================
-- 5. PETS DATA (Thú cưng)
-- ============================================
INSERT INTO pets (owner_phone, owner_name, name, type, breed, gender, birth_date, age_years, weight, color, status) VALUES
  ('0912345678', 'Nguyễn Thị Mai', 'Lucky', 'dog', 'Poodle', 'male', '2021-03-15', 3, 5.2, 'Trắng kem', 'active'),
  ('0923456789', 'Trần Văn Hùng', 'Miu', 'cat', 'Mèo ta', 'female', '2022-06-20', 2, 3.5, 'Tam thể', 'active'),
  ('0934567890', 'Lê Thị Hương', 'Bông', 'cat', 'Ba Tư', 'female', '2020-11-10', 3, 4.2, 'Trắng xám', 'active'),
  ('0945678901', 'Phạm Minh Tuấn', 'Max', 'dog', 'Golden Retriever', 'male', '2019-08-05', 5, 28.5, 'Vàng đậm', 'active'),
  ('0956789012', 'Võ Thị Lan', 'Simba', 'cat', 'Ba Tư', 'male', '2021-12-25', 2, 5.8, 'Cam vàng', 'active'),
  ('0967890123', 'Đặng Văn Nam', 'Buddy', 'dog', 'Corgi', 'male', '2022-04-18', 2, 11.3, 'Nâu vàng', 'active'),
  ('0989012345', 'Bùi Văn Đức', 'Micky', 'dog', 'Chihuahua', 'male', '2021-09-30', 2, 2.5, 'Trắng đen', 'active'),
  ('0990123456', 'Hoàng Thị Thu', 'Kitty', 'cat', 'Scottish Fold', 'female', '2022-01-08', 2, 3.9, 'Xám trắng', 'active');

-- ============================================
-- 6. MEDICAL RECORDS DATA
-- ============================================
INSERT INTO medical_records (
  pet_id, doctor_id, booking_id, visit_date, visit_type,
  symptoms, diagnosis, treatment, notes
)
SELECT 
  (SELECT id FROM pets WHERE owner_phone = '0989012345' LIMIT 1),
  'bsty2',
  '650e8400-e29b-41d4-a716-446655440007',
  CURRENT_DATE - INTERVAL '1 day',
  'grooming',
  'Không có triệu chứng bệnh lý',
  'Thú cưng khỏe mạnh',
  'Tắm vệ sinh, cắt móng',
  'Chó Chihuahua ngoan, dễ tắm. Lông khỏe đẹp.'
WHERE EXISTS (SELECT 1 FROM pets WHERE owner_phone = '0989012345');

INSERT INTO medical_records (
  pet_id, doctor_id, booking_id, visit_date, visit_type,
  symptoms, diagnosis, treatment, notes
)
SELECT 
  (SELECT id FROM pets WHERE owner_phone = '0990123456' LIMIT 1),
  'bsty4',
  '650e8400-e29b-41d4-a716-446655440008',
  CURRENT_DATE - INTERVAL '2 days',
  'grooming',
  'Không có triệu chứng bệnh lý',
  'Thú cưng khỏe mạnh',
  'Spa và cắt tỉa lông',
  'Mèo Scottish Fold ngoan, không sợ nước. Spa hoàn thành tốt.'
WHERE EXISTS (SELECT 1 FROM pets WHERE owner_phone = '0990123456');

-- ============================================
-- 7. STAFF USERS DATA
-- ============================================
INSERT INTO staff_users (email, full_name, phone, role, department, hire_date, status) VALUES
  ('admin@miapet.vn', 'Nguyễn Thị Huyền', '0877742747', 'admin', 'Quản lý', '2020-01-01', 'active'),
  ('staff1@miapet.vn', 'Trần Văn Nam', '0901111111', 'staff', 'Dịch vụ', '2021-06-15', 'active'),
  ('staff2@miapet.vn', 'Lê Thị Linh', '0902222222', 'staff', 'Bán hàng', '2022-03-20', 'active'),
  ('nguyenvana@miapet.vn', 'BS. Nguyễn Văn A', '0901234567', 'vet', 'Y tế', '2016-05-10', 'active'),
  ('tranthib@miapet.vn', 'BS. Trần Thị B', '0902345678', 'vet', 'Y tế', '2014-02-15', 'active'),
  ('levanc@miapet.vn', 'BS. Lê Văn C', '0903456789', 'vet', 'Y tế', '2018-08-20', 'active'),
  ('phamthid@miapet.vn', 'BS. Phạm Thị D', '0904567890', 'vet', 'Y tế', '2012-11-01', 'active');

-- ============================================
-- DONE!
-- ============================================