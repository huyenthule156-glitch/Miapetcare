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

// Setup database - Create tables and insert sample data
app.post("/make-server-b09aa6ec/setup-database", async (c) => {
  try {
    console.log('Starting database setup...');
    
    // Create doctors table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS doctors (
        id VARCHAR(50) PRIMARY KEY,
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

      CREATE INDEX IF NOT EXISTS idx_doctors_status ON doctors(status);
      CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
    `;
    
    // Execute table creation using raw SQL
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL }).single();
    
    if (createError) {
      console.error('Error creating table:', createError);
      // Try alternative method - direct insert will auto-create in some cases
    }

    // Insert sample doctors data
    const doctors = [
      {
        id: 'bsty1',
        name: 'BS. Nguyễn Văn A',
        specialty: 'Chó mèo tổng quát',
        phone: '0901234567',
        email: 'bsty1@miapet.com',
        experience_years: 8,
        status: 'active',
        bio: 'Bác sĩ chuyên khoa chó mèo tổng quát với 8 năm kinh nghiệm.'
      },
      {
        id: 'bsty2',
        name: 'BS. Trần Thị B',
        specialty: 'Ngoại khoa',
        phone: '0909876543',
        email: 'bsty2@miapet.com',
        experience_years: 10,
        status: 'active',
        bio: 'Chuyn gia ngoại khoa thú y với 10 năm kinh nghiệm.'
      },
      {
        id: 'bsty3',
        name: 'BS. Lê Văn C',
        specialty: 'Da liễu',
        phone: '0903456789',
        email: 'bsty3@miapet.com',
        experience_years: 6,
        status: 'active',
        bio: 'Bác sĩ chuyên khoa da liễu thú y.'
      },
      {
        id: 'bsty4',
        name: 'BS. Phạm Thị D',
        specialty: 'Nội khoa',
        phone: '0904567890',
        email: 'bsty4@miapet.com',
        experience_years: 12,
        status: 'active',
        bio: 'Chuyên gia nội khoa với 12 năm kinh nghiệm.'
      }
    ];

    // Upsert doctors data
    const { error: insertError } = await supabase
      .from('doctors')
      .upsert(doctors, { onConflict: 'id' });

    if (insertError) {
      console.error('Error inserting doctors:', insertError);
      return c.json({ 
        success: false, 
        error: insertError.message,
        hint: 'Vui lòng tạo table doctors thủ công qua Supabase Dashboard → SQL Editor'
      }, 500);
    }

    console.log('Database setup completed successfully');
    return c.json({ 
      success: true, 
      message: 'Database đã được setup thành công!',
      doctors: doctors.length
    });

  } catch (error) {
    console.error('Error in /setup-database:', error);
    return c.json({ 
      success: false, 
      error: String(error),
      hint: 'Vui lòng tạo table doctors thủ công qua Supabase Dashboard → SQL Editor'
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