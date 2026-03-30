-- ============================================
-- MIAPET - SUPABASE DATABASE SCHEMA
-- ============================================
-- Database cho cửa hàng chăm sóc thú cưng MiaPET
-- Bao gồm: Bác sĩ, Lịch hẹn, Đơn hàng, Thú cưng, v.v.
-- ============================================

-- 1. DOCTORS TABLE (Bác sĩ thú y)
-- ============================================
CREATE TABLE IF NOT EXISTS doctors (
  id VARCHAR(50) PRIMARY KEY, -- Use string ID for custom IDs like 'bsty1', 'bsty2'
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  avatar_url TEXT,
  experience_years INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-leave')),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for searching doctors
CREATE INDEX idx_doctors_status ON doctors(status);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);

-- ============================================
-- 2. BOOKINGS TABLE (Lịch hẹn dịch vụ)
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  pet_name VARCHAR(255),
  pet_type VARCHAR(10) CHECK (pet_type IN ('dog', 'cat')),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  end_date DATE, -- For hotel services
  notes TEXT,
  
  -- Service information
  service_category_id VARCHAR(50) NOT NULL,
  service_category VARCHAR(100) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_price VARCHAR(100) NOT NULL,
  service_price_value INTEGER NOT NULL,
  
  -- Pricing
  total_days INTEGER,
  total_price INTEGER NOT NULL,
  
  -- Status & Assignment
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  assigned_doctor_id VARCHAR(50) REFERENCES doctors(id) ON DELETE SET NULL, -- Changed from UUID to VARCHAR(50)
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_bookings_appointment ON bookings(appointment_date, appointment_time);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_doctor ON bookings(assigned_doctor_id);
CREATE INDEX idx_bookings_customer_phone ON bookings(customer_phone);

-- ============================================
-- 3. PRODUCTS TABLE (Sản phẩm)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100),
  
  -- Pricing
  price INTEGER NOT NULL,
  original_price INTEGER,
  discount_percent INTEGER DEFAULT 0,
  
  -- Inventory
  stock INTEGER DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  
  -- Details
  brand VARCHAR(100),
  weight VARCHAR(50),
  origin VARCHAR(100),
  
  -- Media
  image_url TEXT,
  images_urls TEXT[], -- Array of image URLs
  
  -- SEO & Status
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out-of-stock')),
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_slug ON products(slug);

-- ============================================
-- 4. SERVICES TABLE (Dịch vụ)
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY,
  service_group VARCHAR(20) NOT NULL CHECK (service_group IN ('main', 'additional', 'dye', 'vip', 'vaccination', 'grooming', 'bath', 'hotel')),
  service_type VARCHAR(50),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image TEXT,
  price INTEGER,
  prices JSONB,
  duration VARCHAR(100),
  benefits TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_services_group ON services(service_group);
CREATE INDEX idx_services_name ON services(name);

-- ============================================
-- 5. ORDERS TABLE (Đơn hàng)
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Customer info
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  customer_address TEXT NOT NULL,
  
  -- Order details
  items JSONB NOT NULL, -- Array of {productId, name, price, quantity, image}
  total_amount INTEGER NOT NULL,
  shipping_fee INTEGER DEFAULT 0,
  discount_amount INTEGER DEFAULT 0,
  final_amount INTEGER NOT NULL,
  
  -- Payment
  payment_method VARCHAR(50) DEFAULT 'cod' CHECK (payment_method IN ('cod', 'bank-transfer', 'momo', 'zalopay')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  
  -- Delivery
  delivery_status VARCHAR(20) DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  delivery_note TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_delivery_status ON orders(delivery_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- 5. CUSTOMERS TABLE (Thông tin khách hàng)
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  address TEXT,
  city VARCHAR(100),
  district VARCHAR(100),
  ward VARCHAR(100),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_status ON customers(status);

-- ============================================
-- 6. PETS TABLE (Thú cưng của khách hàng)
-- ============================================
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_phone VARCHAR(20) NOT NULL, -- Link to customer by phone
  owner_name VARCHAR(255) NOT NULL,
  
  -- Pet details
  name VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('dog', 'cat')),
  breed VARCHAR(100),
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'unknown')),
  birth_date DATE,
  age_years INTEGER,
  age_months INTEGER,
  weight DECIMAL(5,2), -- in kg
  color VARCHAR(100),
  
  -- Health info
  allergies TEXT[],
  medical_conditions TEXT[],
  vaccinations JSONB, -- Array of {name, date, nextDate}
  special_notes TEXT,
  
  -- Media
  avatar_url TEXT,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deceased')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_pets_owner_phone ON pets(owner_phone);
CREATE INDEX idx_pets_type ON pets(type);
CREATE INDEX idx_pets_status ON pets(status);

-- ============================================
-- 6. MEDICAL RECORDS TABLE (Hồ sơ bệnh án)
-- ============================================
CREATE TABLE IF NOT EXISTS medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  doctor_id VARCHAR(50) REFERENCES doctors(id) ON DELETE SET NULL, -- Changed from UUID to VARCHAR(50)
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  
  -- Visit details
  visit_date DATE NOT NULL,
  visit_type VARCHAR(50) NOT NULL, -- 'checkup', 'vaccination', 'treatment', 'surgery', etc.
  
  -- Medical info
  symptoms TEXT,
  diagnosis TEXT,
  treatment TEXT,
  medications JSONB, -- Array of {name, dosage, frequency, duration}
  notes TEXT,
  
  -- Follow-up
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date DATE,
  
  -- Attachments
  attachments_urls TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_medical_records_pet ON medical_records(pet_id);
CREATE INDEX idx_medical_records_doctor ON medical_records(doctor_id);
CREATE INDEX idx_medical_records_visit_date ON medical_records(visit_date DESC);

-- ============================================
-- 7. STAFF USERS TABLE (Nhân viên hệ thống)
-- ============================================
-- Note: Có thể dùng Supabase Auth cho authentication
-- Table này chỉ lưu thông tin bổ sung
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff', 'vet')),
  
  -- Additional info
  avatar_url TEXT,
  department VARCHAR(100),
  hire_date DATE,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_staff_users_email ON staff_users(email);
CREATE INDEX idx_staff_users_role ON staff_users(role);
CREATE INDEX idx_staff_users_status ON staff_users(status);

-- ============================================
-- TRIGGERS: Auto-update updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_users_updated_at BEFORE UPDATE ON staff_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Optional
-- ============================================
-- Uncomment nếu muốn enable RLS cho security

-- ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;

-- Example RLS policy (cho doctors - mọi người có thể đọc)
-- CREATE POLICY "Allow public read access on doctors" ON doctors
--   FOR SELECT USING (true);

-- CREATE POLICY "Allow staff to manage doctors" ON doctors
--   FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE doctors IS 'Danh sách bác sĩ thú y của cửa hàng';
COMMENT ON TABLE bookings IS 'Lịch hẹn dịch vụ (spa, grooming, vaccination, hotel)';
COMMENT ON TABLE products IS 'Sản phẩm bán tại pet shop';
COMMENT ON TABLE orders IS 'Đơn hàng của khách';
COMMENT ON TABLE customers IS 'Thông tin khách hàng';
COMMENT ON TABLE pets IS 'Thông tin thú cưng của khách hàng';
COMMENT ON TABLE medical_records IS 'Hồ sơ bệnh án của thú cưng';
COMMENT ON TABLE staff_users IS 'Thông tin nhân viên hệ thống';