import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b09aa6ec/health", (c) => {
  return c.json({ status: "ok" });
});

// Setup database - insert sample data into Supabase tables
app.post("/make-server-b09aa6ec/setup-database", async (c) => {
  try {
    console.log('Starting Supabase database setup...');

    const doctors = [
      {
        id: 'bsty1',
        name: 'BS. Nguyễn Văn A',
        specialty: 'Chó mèo tổng quát',
        phone: '0901234567',
        email: 'bsty1@miapet.com',
        experience_years: 8,
        status: 'active',
        bio: 'Bác sĩ chuyên khoa chó mèo tổng quát với 8 năm kinh nghiệm. Tốt nghiệp Đại học Nông Lâm TP.HCM.'
      },
      {
        id: 'bsty2',
        name: 'BS. Trần Thị B',
        specialty: 'Ngoại khoa',
        phone: '0909876543',
        email: 'bsty2@miapet.com',
        experience_years: 10,
        status: 'active',
        bio: 'Chuyên gia ngoại khoa thú y với 10 năm kinh nghiệm. Giỏi các ca phẫu thuật phức tạp.'
      },
      {
        id: 'bsty3',
        name: 'BS. Lê Văn C',
        specialty: 'Da liễu',
        phone: '0903456789',
        email: 'bsty3@miapet.com',
        experience_years: 6,
        status: 'active',
        bio: 'Bác sĩ chuyên khoa da liễu thú y, điều trị các bệnh về da, lông, móng cho chó mèo.'
      },
      {
        id: 'bsty4',
        name: 'BS. Phạm Thị D',
        specialty: 'Nội khoa',
        phone: '0904567890',
        email: 'bsty4@miapet.com',
        experience_years: 12,
        status: 'active',
        bio: 'Chuyên gia nội khoa với 12 năm kinh nghiệm. Giỏi chẩn đoán và điều trị các bệnh lý tim mạch, tiêu hóa.'
      }
    ];

    const products = [
      {
        name: 'Thức ăn dinh dưỡng ANF AD27 cho chó mọi lứa tuổi',
        slug: 'anf-ad27-cho-cho',
        description: 'Thức ăn cao cấp dinh dưỡng chuẩn Âu cho chó mọi lứa tuổi',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho chó',
        price: 850000,
        original_price: null,
        discount_percent: 0,
        stock: 50,
        brand: 'ANF',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Pate lon 400g A Pro gà nấu nhuyễn cho chó trưởng thành',
        slug: 'pate-apro-ga-400g',
        description: 'Pate gà nấu nhuyễn cho chó trưởng thành, bổ sung protein',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho chó',
        price: 45000,
        original_price: null,
        discount_percent: 0,
        stock: 120,
        brand: 'A Pro',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Pate lon 400g A Pro bò nấu nhuyễn cho chó trưởng thành',
        slug: 'pate-apro-bo-400g',
        description: 'Pate bò nấu nhuyễn giàu protein cho chó trưởng thành',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho chó',
        price: 45000,
        original_price: 58000,
        discount_percent: 22,
        stock: 120,
        brand: 'A Pro',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Thức ăn cao cấp Maxime Elite Puppy cho chó con',
        slug: 'maxime-elite-puppy-1-5kg',
        description: 'Thức ăn cao cấp cho chó con và chó mẹ nhiều protein gói 1.5kg',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho chó',
        price: 250000,
        original_price: null,
        discount_percent: 0,
        stock: 30,
        brand: 'Maxime',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Thức ăn Maxime Adult With Beef cho chó trưởng thành',
        slug: 'maxime-adult-beef',
        description: 'Thức ăn cho chó trưởng thành vị thịt bò',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho chó',
        price: 220000,
        original_price: null,
        discount_percent: 0,
        stock: 40,
        brand: 'Maxime',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Súp thưởng WOW gói 6 thanh',
        slug: 'sup-thuong-wow-6-thanh',
        description: 'Súp thưởng dinh dưỡng cho chó mèo gói 6 thanh',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho mèo',
        price: 35000,
        original_price: null,
        discount_percent: 0,
        stock: 100,
        brand: 'WOW',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Sữa non Colostrum Petilac cho mèo',
        slug: 'sua-non-petilac',
        description: 'Sữa non Colostrum bổ sung kháng thể cho mèo con',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho mèo',
        price: 120000,
        original_price: null,
        discount_percent: 0,
        stock: 25,
        brand: 'Petilac',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Pate lon WOW 85g cho mèo vị thịt gà và lòng đỏ trứng',
        slug: 'pate-wow-85g-ga-trung',
        description: 'Pate lon 85g vị gà và lòng đỏ trứng cho mèo',
        category: 'Thức ăn',
        sub_category: 'Thc ăn cho mèo',
        price: 22000,
        original_price: null,
        discount_percent: 0,
        stock: 200,
        brand: 'WOW',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Thức ăn hạt Wonder Cats cho mèo mọi lứa tuổi',
        slug: 'wonder-cats-all-ages',
        description: 'Thức ăn hạt dinh dưỡng cho mèo mọi lứa tuổi',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho mèo',
        price: 165000,
        original_price: null,
        discount_percent: 0,
        stock: 45,
        brand: 'Wonder Cats',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Thức ăn Cuties Catz Seafood cho mèo trưởng thành',
        slug: 'cuties-catz-seafood',
        description: 'Thức ăn vị hải sản cho mèo trưởng thành',
        category: 'Thức ăn',
        sub_category: 'Thức ăn cho mèo',
        price: 175000,
        original_price: null,
        discount_percent: 0,
        stock: 35,
        brand: 'Cuties Catz',
        image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Bát ăn chống gù chân voi cho chó mèo',
        slug: 'bat-an-chong-gu-chan-voi',
        description: 'Bát ăn chống gù thiết kế chân voi cho chó mèo',
        category: 'Phụ kiện',
        sub_category: 'Bát ăn & Uống',
        price: 85000,
        stock: 60,
        image_url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Bát ăn tự động nạp thức ăn cho chó mèo',
        slug: 'bat-an-tu-dong',
        description: 'Bát ăn tự động nạp thức ăn thông minh cho chó mèo',
        category: 'Phụ kiện',
        sub_category: 'Bát ăn & Uống',
        price: 150000,
        stock: 30,
        image_url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Lồng vận chuyển cho mèo ký gửi hàng không',
        slug: 'long-van-chuyen-hang-khong',
        description: 'Lồng vận chuyển cho mèo đạt chuẩn hàng không, ô tô',
        category: 'Phụ kiện',
        sub_category: 'Lồng & Chuồng',
        price: 650000,
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Vòng cổ phản quang cho chó mèo',
        slug: 'vong-co-phan-quang',
        description: 'Vòng cổ phản quang an toàn cho chó mèo',
        category: 'Phụ kiện',
        sub_category: 'Vòng cổ & Dây dắt',
        price: 35000,
        stock: 80,
        image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Vòng cổ da có chuông cho chó mèo',
        slug: 'vong-co-da-chuong',
        description: 'Vòng cổ da thật có chuông cho chó mèo',
        category: 'Phụ kiện',
        sub_category: 'Vòng cổ & Dây dắt',
        price: 30000,
        stock: 100,
        image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Đồ chơi bóng tự lăn và phát sáng cho chó mèo',
        slug: 'bong-tu-lan-phat-sang',
        description: 'Đồ chơi bóng tự lăn và phát sáng kích thích vận động',
        category: 'Đồ chơi',
        sub_category: 'Đồ chơi cho chó',
        price: 45000,
        stock: 70,
        image_url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Đồ chơi cần câu móng con lăn cho mèo',
        slug: 'can-cau-mong-con-lan',
        description: 'Cần câu đồ chơi móng con lăn cho mèo',
        category: 'Đồ chơi',
        sub_category: 'Đồ chơi cho mèo',
        price: 35000,
        stock: 90,
        image_url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Tháp bóng 3 tầng đồ chơi mèo',
        slug: 'thap-bong-3-tang',
        description: 'Tháp bóng 3 tầng đồ chơi kích thích bản năng săn mồi',
        category: 'Đồ chơi',
        sub_category: 'Đồ chơi cho mèo',
        price: 120000,
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Đồ chơi cần gậm dây thừng bện cà rốt',
        slug: 'can-gam-day-thung-ca-rot',
        description: 'Đồ chơi cần gậm dây thừng hình cà rốt cho chó',
        category: 'Đồ chơi',
        sub_category: 'Đồ chơi cho chó',
        price: 40000,
        stock: 60,
        image_url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Khay vệ sinh mèo thành cao cửa hở',
        slug: 'khay-ve-sinh-thanh-cao',
        description: 'Khay vệ sinh mèo thành cao cửa hở, dễ vệ sinh',
        category: 'Vệ sinh',
        sub_category: 'Khay & Nhà vệ sinh',
        price: 180000,
        stock: 35,
        image_url: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Sữa tắm cho mèo YOJI hương trái cây và trà',
        slug: 'sua-tam-yoji-trai-cay',
        description: 'Sữa tắm cho mèo YOJI hương trái cây và trà tự nhiên',
        category: 'Vệ sinh',
        sub_category: 'Sữa tắm',
        price: 85000,
        stock: 50,
        image_url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Khay vệ sinh vuông thành trong suốt cho mèo',
        slug: 'khay-ve-sinh-vuong-trong-suot',
        description: 'Khay vệ sinh vuông thành trong suốt, hiện đại',
        category: 'Vệ sinh',
        sub_category: 'Khay & Nhà vệ sinh',
        price: 160000,
        stock: 40,
        image_url: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Thanh nhai 7 Dental Effects vị bơ sữa 160g',
        slug: 'thanh-nhai-dental-bo-sua',
        description: 'Thanh nhai làm sạch răng thơm miệng vị bơ và sữa cho chó',
        category: 'Sức khỏe',
        sub_category: 'Chăm sóc răng miệng',
        price: 65000,
        stock: 45,
        brand: '7 Dental Effects',
        image_url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500',
        status: 'active',
        featured: false
      },
      {
        name: 'Thanh nhai 7 Dental Effects vị thịt bò nướng 160g',
        slug: 'thanh-nhai-dental-bo-nuong',
        description: 'Thanh nhai làm sạch răng vị thịt bò nướng cho chó',
        category: 'Sức khỏe',
        sub_category: 'Chăm sóc răng miệng',
        price: 65000,
        stock: 45,
        brand: '7 Dental Effects',
        image_url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500',
        status: 'active',
        featured: true
      },
      {
        name: 'Thanh bánh thưởng Dental Health cho chó mèo',
        slug: 'thanh-banh-dental-health',
        description: 'Thanh bánh thưởng Dental Health làm sạch răng',
        category: 'Sức khỏe',
        sub_category: 'Chăm sóc răng miệng',
        price: 45000,
        stock: 60,
        brand: 'Dental Health',
        image_url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500',
        status: 'active',
        featured: false
      }
    ];

    const staffUsers = [
      {
        email: 'admin@miapet.vn',
        full_name: 'Nguyễn Thị Huyền',
        phone: '0877742747',
        role: 'admin',
        department: 'Quản lý',
        hire_date: '2020-01-01',
        status: 'active'
      },
      {
        email: 'staff1@miapet.vn',
        full_name: 'Trần Văn Nam',
        phone: '0901111111',
        role: 'staff',
        department: 'Dịch vụ',
        hire_date: '2021-06-15',
        status: 'active'
      },
      {
        email: 'staff2@miapet.vn',
        full_name: 'Lê Thị Linh',
        phone: '0902222222',
        role: 'staff',
        department: 'Bán hàng',
        hire_date: '2022-03-20',
        status: 'active'
      },
      {
        email: 'nguyenvana@miapet.vn',
        full_name: 'BS. Nguyễn Văn A',
        phone: '0901234567',
        role: 'vet',
        department: 'Y tế',
        hire_date: '2016-05-10',
        status: 'active'
      },
      {
        email: 'tranthib@miapet.vn',
        full_name: 'BS. Trần Thị B',
        phone: '0902345678',
        role: 'vet',
        department: 'Y tế',
        hire_date: '2014-02-15',
        status: 'active'
      },
      {
        email: 'levanc@miapet.vn',
        full_name: 'BS. Lê Văn C',
        phone: '0903456789',
        role: 'vet',
        department: 'Y tế',
        hire_date: '2018-08-20',
        status: 'active'
      },
      {
        email: 'phamthid@miapet.vn',
        full_name: 'BS. Phạm Thị D',
        phone: '0904567890',
        role: 'vet',
        department: 'Y tế',
        hire_date: '2012-11-01',
        status: 'active'
      }
    ];

    const pets = [
      {
        owner_phone: '0912345678',
        owner_name: 'Nguyễn Thị Mai',
        name: 'Lucky',
        type: 'dog',
        breed: 'Poodle',
        gender: 'male',
        birth_date: '2021-03-15',
        age_years: 3,
        weight: 5.2,
        color: 'Trắng kem',
        status: 'active'
      },
      {
        owner_phone: '0923456789',
        owner_name: 'Trần Văn Hùng',
        name: 'Miu',
        type: 'cat',
        breed: 'Mèo ta',
        gender: 'female',
        birth_date: '2022-06-20',
        age_years: 2,
        weight: 3.5,
        color: 'Tam thể',
        status: 'active'
      },
      {
        owner_phone: '0934567890',
        owner_name: 'Lê Thị Hương',
        name: 'Bông',
        type: 'cat',
        breed: 'Ba Tư',
        gender: 'female',
        birth_date: '2020-11-10',
        age_years: 3,
        weight: 4.2,
        color: 'Trắng xám',
        status: 'active'
      },
      {
        owner_phone: '0945678901',
        owner_name: 'Phạm Minh Tuấn',
        name: 'Max',
        type: 'dog',
        breed: 'Golden Retriever',
        gender: 'male',
        birth_date: '2019-08-05',
        age_years: 5,
        weight: 28.5,
        color: 'Vàng đậm',
        status: 'active'
      },
      {
        owner_phone: '0956789012',
        owner_name: 'Võ Thị Lan',
        name: 'Simba',
        type: 'cat',
        breed: 'Ba Tư',
        gender: 'male',
        birth_date: '2021-12-25',
        age_years: 2,
        weight: 5.8,
        color: 'Cam vàng',
        status: 'active'
      },
      {
        owner_phone: '0967890123',
        owner_name: 'Đặng Văn Nam',
        name: 'Buddy',
        type: 'dog',
        breed: 'Corgi',
        gender: 'male',
        birth_date: '2022-04-18',
        age_years: 2,
        weight: 11.3,
        color: 'Nâu vàng',
        status: 'active'
      },
      {
        owner_phone: '0989012345',
        owner_name: 'Bùi Văn Đức',
        name: 'Micky',
        type: 'dog',
        breed: 'Chihuahua',
        gender: 'male',
        birth_date: '2021-09-30',
        age_years: 2,
        weight: 2.5,
        color: 'Trắng đen',
        status: 'active'
      },
      {
        owner_phone: '0990123456',
        owner_name: 'Hoàng Thị Thu',
        name: 'Kitty',
        type: 'cat',
        breed: 'Scottish Fold',
        gender: 'female',
        birth_date: '2022-01-08',
        age_years: 2,
        weight: 3.9,
        color: 'Xám trắng',
        status: 'active'
      }
    ];

    const bookings = [
      {
        id: '650e8400-e29b-41d4-a716-446655440001',
        customer_name: 'Nguyễn Thị Mai',
        customer_phone: '0912345678',
        customer_email: 'mai@gmail.com',
        pet_name: 'Lucky',
        pet_type: 'dog',
        appointment_date: new Date().toISOString().slice(0, 10),
        appointment_time: '08:30',
        notes: 'Chó cần tắm và cắt tỉa lông',
        service_category_id: 'spa',
        service_category: 'SPA & Grooming',
        service_name: 'SPA Cắt tỉa 1',
        service_price: '310.000đ',
        service_price_value: 310000,
        total_price: 310000,
        status: 'pending',
        assigned_doctor_id: null
      },
      {
        id: '650e8400-e29b-41d4-a716-446655440002',
        customer_name: 'Trần Văn Hùng',
        customer_phone: '0923456789',
        customer_email: 'hung@gmail.com',
        pet_name: 'Miu',
        pet_type: 'cat',
        appointment_date: new Date().toISOString().slice(0, 10),
        appointment_time: '09:00',
        notes: 'Mèo cần tắm và vệ sinh cơ bản',
        service_category_id: 'bath',
        service_category: 'Tắm & Vệ sinh',
        service_name: 'Tắm + VS (Lông ngắn)',
        service_price: '90.000đ',
        service_price_value: 90000,
        total_price: 90000,
        status: 'pending',
        assigned_doctor_id: null
      },
      {
        id: '650e8400-e29b-41d4-a716-446655440003',
        customer_name: 'Lê Thị Hương',
        customer_phone: '0934567890',
        customer_email: 'huong@gmail.com',
        pet_name: 'Bông',
        pet_type: 'cat',
        appointment_date: new Date().toISOString().slice(0, 10),
        appointment_time: '10:00',
        notes: 'Mèo Ba Tư cần cắt tỉa lông',
        service_category_id: 'grooming',
        service_category: 'Grooming',
        service_name: 'SPA Cắt tỉa 2',
        service_price: '300.000đ',
        service_price_value: 300000,
        total_price: 300000,
        status: 'confirmed',
        assigned_doctor_id: 'bsty3'
      },
      {
        id: '650e8400-e29b-41d4-a716-446655440004',
        customer_name: 'Phạm Minh Tuấn',
        customer_phone: '0945678901',
        customer_email: 'tuan@gmail.com',
        pet_name: 'Max',
        pet_type: 'dog',
        appointment_date: new Date().toISOString().slice(0, 10),
        appointment_time: '10:30',
        notes: 'Chó Golden cần spa cao cấp',
        service_category_id: 'spa',
        service_category: 'SPA & Grooming',
        service_name: 'SPA Cắt tỉa 3',
        service_price: '510.000đ',
        service_price_value: 510000,
        total_price: 510000,
        status: 'confirmed',
        assigned_doctor_id: 'bsty1'
      }
    ];

    const orders = [
      {
        order_number: 'DH202403280001',
        customer_name: 'Nguyễn Văn A',
        customer_phone: '0901111111',
        customer_email: 'nguyenvana@gmail.com',
        customer_address: '123 Đường ABC, Quận 1, TP.HCM',
        items: [
          {
            productId: '1',
            name: 'Thức ăn ANF AD27 cho chó',
            price: 850000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500'
          }
        ],
        total_amount: 850000,
        shipping_fee: 30000,
        final_amount: 880000,
        payment_method: 'cod',
        payment_status: 'pending',
        delivery_status: 'confirmed'
      },
      {
        order_number: 'DH202403280002',
        customer_name: 'Trần Thị B',
        customer_phone: '0902222222',
        customer_email: 'tranthib@gmail.com',
        customer_address: '456 Đường DEF, Quận 2, TP.HCM',
        items: [
          {
            productId: '3',
            name: 'Pate lon WOW 85g cho mèo',
            price: 22000,
            quantity: 10,
            image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500'
          },
          {
            productId: '13',
            name: 'Khay vệ sinh mèo thành cao',
            price: 180000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=500'
          }
        ],
        total_amount: 400000,
        shipping_fee: 30000,
        final_amount: 430000,
        payment_method: 'bank-transfer',
        payment_status: 'pending',
        delivery_status: 'pending'
      }
    ];

    async function seedTable(tableName, rows, onConflict) {
      if (rows.length === 0) {
        return { table: tableName, inserted: 0 };
      }

      const builder = onConflict
        ? supabase.from(tableName).upsert(rows, { onConflict })
        : supabase.from(tableName).insert(rows);

      const { error } = await builder;
      if (error) {
        throw new Error(`Failed seeding ${tableName}: ${error.message}`);
      }
      return { table: tableName, inserted: rows.length };
    }

    const results = [];
    results.push(await seedTable('doctors', doctors, 'id'));
    results.push(await seedTable('products', products, 'slug'));
    results.push(await seedTable('staff_users', staffUsers, 'email'));
    results.push(await seedTable('pets', pets));
    results.push(await seedTable('bookings', bookings, 'id'));
    results.push(await seedTable('orders', orders, 'order_number'));

    // Medical records depend on pet IDs from pets table.
    const petLookup = {};
    for (const ownerPhone of ['0989012345', '0990123456']) {
      const { data: petRows, error: petError } = await supabase
        .from('pets')
        .select('id, owner_phone')
        .eq('owner_phone', ownerPhone)
        .limit(1);

      if (petError) {
        throw new Error(`Failed to query pets for owner phone ${ownerPhone}: ${petError.message}`);
      }

      if (petRows?.length > 0) {
        petLookup[ownerPhone] = petRows[0].id;
      }
    }

    const medicalRecords = [];
    if (petLookup['0989012345']) {
      medicalRecords.push({
        pet_id: petLookup['0989012345'],
        doctor_id: 'bsty2',
        booking_id: '650e8400-e29b-41d4-a716-446655440007',
        visit_date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10),
        visit_type: 'grooming',
        symptoms: 'Không có triệu chứng bệnh lý',
        diagnosis: 'Thú cưng khỏe mạnh',
        treatment: 'Tắm vệ sinh, cắt móng',
        notes: 'Chó Chihuahua ngoan, dễ tắm. Lông khỏe đẹp.'
      });
    }
    if (petLookup['0990123456']) {
      medicalRecords.push({
        pet_id: petLookup['0990123456'],
        doctor_id: 'bsty4',
        booking_id: '650e8400-e29b-41d4-a716-446655440008',
        visit_date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().slice(0, 10),
        visit_type: 'grooming',
        symptoms: 'Không có triệu chứng bệnh lý',
        diagnosis: 'Thú cưng khỏe mạnh',
        treatment: 'Spa và cắt tỉa lông',
        notes: 'Mèo Scottish Fold ngoan, không sợ nước. Spa hoàn thành tốt.'
      });
    }

    if (medicalRecords.length > 0) {
      results.push(await seedTable('medical_records', medicalRecords));
    }

    console.log('Supabase setup completed:', results);
    return c.json({
      success: true,
      message: 'Supabase database đã được seed thành công. Chạy một lần là đủ.',
      results,
    });
  } catch (error) {
    console.error('Error in /setup-database:', error);
    return c.json({
      success: false,
      error: String(error),
      hint: 'Kiểm tra xem các bảng đã tồn tại trong Supabase hay chưa, và đảm bảo service role key có quyền ghi dữ liệu.',
    }, 500);
  }
});

// Get doctor info by ID
app.get("/make-server-b09aa6ec/doctors/:id", async (c) => {
  try {
    const doctorId = c.req.param('id');
    
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', doctorId)
      .single();
    
    if (error) {
      console.log(`[INFO] Table 'doctors' not found in Supabase, using fallback data for doctor ${doctorId}`);
      
      // Fallback to hardcoded doctors data
      // Map numeric IDs (from localStorage) to doctor IDs
      const idMap: Record<string, string> = {
        '4': 'bsty1',
        '5': 'bsty2',
        '6': 'bsty3',
        '7': 'bsty4',
        'bsty1': 'bsty1',
        'bsty2': 'bsty2',
        'bsty3': 'bsty3',
        'bsty4': 'bsty4',
      };
      
      const mappedId = idMap[doctorId] || doctorId;
      
      const doctors: Record<string, any> = {
        'bsty1': {
          id: 'bsty1',
          name: 'BS. Nguyễn Văn A',
          specialty: 'Chó mèo tổng quát',
          phone: '0901234567',
          email: 'bsty1@miapet.com',
          experience_years: 8,
          status: 'active',
          bio: 'Bác sĩ chuyên khoa chó mèo tổng quát với 8 năm kinh nghiệm.'
        },
        'bsty2': {
          id: 'bsty2',
          name: 'BS. Trần Thị B',
          specialty: 'Ngoại khoa',
          phone: '0909876543',
          email: 'bsty2@miapet.com',
          experience_years: 10,
          status: 'active',
          bio: 'Chuyên gia ngoại khoa thú y với 10 năm kinh nghiệm.'
        },
        'bsty3': {
          id: 'bsty3',
          name: 'BS. Lê Văn C',
          specialty: 'Da liễu',
          phone: '0903456789',
          email: 'bsty3@miapet.com',
          experience_years: 6,
          status: 'active',
          bio: 'Bác sĩ chuyên khoa da liễu thú y.'
        },
        'bsty4': {
          id: 'bsty4',
          name: 'BS. Phạm Thị D',
          specialty: 'Nội khoa',
          phone: '0904567890',
          email: 'bsty4@miapet.com',
          experience_years: 12,
          status: 'active',
          bio: 'Chuyên gia nội khoa với 12 năm kinh nghiệm.'
        }
      };
      
      const doctor = doctors[mappedId];
      if (doctor) {
        console.log(`Using fallback doctor data for ${doctorId} (mapped to ${mappedId})`);
        return c.json(doctor);
      }
      
      return c.json({ error: 'Không tìm thấy thông tin bác sĩ' }, 404);
    }
    
    return c.json(data);
  } catch (error) {
    console.error('Error in /doctors/:id:', error);
    return c.json({ error: 'Lỗi server khi lấy thông tin bác sĩ', details: String(error) }, 500);
  }
});

// Get all doctors
app.get("/make-server-b09aa6ec/doctors", async (c) => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('status', 'active')
      .order('name');
    
    if (error) {
      console.error('Error fetching doctors from Supabase:', error);
      
      // Fallback to hardcoded doctors data
      const doctors = [
        {
          id: 'bsty1',
          name: 'BS. Nguyễn Văn A',
          specialty: 'Chó mèo tổng quát',
          phone: '0901234567',
          email: 'bsty1@miapet.com',
          experience_years: 8,
          status: 'active'
        },
        {
          id: 'bsty2',
          name: 'BS. Trần Thị B',
          specialty: 'Ngoại khoa',
          phone: '0909876543',
          email: 'bsty2@miapet.com',
          experience_years: 10,
          status: 'active'
        },
        {
          id: 'bsty3',
          name: 'BS. Lê Văn C',
          specialty: 'Da liễu',
          phone: '0903456789',
          email: 'bsty3@miapet.com',
          experience_years: 6,
          status: 'active'
        },
        {
          id: 'bsty4',
          name: 'BS. Phạm Thị D',
          specialty: 'Nội khoa',
          phone: '0904567890',
          email: 'bsty4@miapet.com',
          experience_years: 12,
          status: 'active'
        }
      ];
      
      console.log('Using fallback doctors list');
      return c.json(doctors);
    }
    
    return c.json(data);
  } catch (error) {
    console.error('Error in /doctors:', error);
    return c.json({ error: 'Lỗi server khi lấy danh sách bác sĩ', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);