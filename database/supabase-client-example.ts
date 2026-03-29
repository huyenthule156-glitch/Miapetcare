// ============================================
// SUPABASE CLIENT SETUP EXAMPLE
// ============================================
// File này là ví dụ về cách setup Supabase client
// Sao chép code này vào project khi sẵn sàng migrate
// ============================================

import { createClient } from '@supabase/supabase-js';

// ============================================
// 1. SETUP CLIENT
// ============================================

// Environment variables (thêm vào .env.local)
// NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// 2. TYPE DEFINITIONS
// ============================================

// Match với database schema
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  experience_years: number;
  status: 'active' | 'inactive' | 'on-leave';
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  pet_name: string | null;
  pet_type: 'dog' | 'cat' | null;
  appointment_date: string; // 'YYYY-MM-DD'
  appointment_time: string; // 'HH:MM:SS'
  end_date: string | null;
  notes: string | null;
  service_category_id: string;
  service_category: string;
  service_name: string;
  service_price: string;
  service_price_value: number;
  total_days: number | null;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  assigned_doctor_id: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  cancelled_at: string | null;
  // Joined data
  assigned_doctor?: Doctor;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  sub_category: string | null;
  price: number;
  original_price: number | null;
  discount_percent: number;
  stock: number;
  sku: string | null;
  brand: string | null;
  weight: string | null;
  origin: string | null;
  image_url: string | null;
  images_urls: string[] | null;
  tags: string[] | null;
  status: 'active' | 'inactive' | 'out-of-stock';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_address: string;
  items: any; // JSONB
  total_amount: number;
  shipping_fee: number;
  discount_amount: number;
  final_amount: number;
  payment_method: 'cod' | 'bank-transfer' | 'momo' | 'zalopay';
  payment_status: 'pending' | 'paid' | 'failed';
  delivery_status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  delivery_note: string | null;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
}

// ============================================
// 3. DOCTORS API
// ============================================

/**
 * Lấy tất cả bác sĩ đang hoạt động
 */
export async function getActiveDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('status', 'active')
    .order('name');

  if (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }

  return data;
}

/**
 * Lấy thông tin bác sĩ theo ID
 */
export async function getDoctorById(id: string): Promise<Doctor | null> {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }

  return data;
}

/**
 * Lấy danh sách bác sĩ rảnh trong khung giờ cụ thể
 * (Bác sĩ chưa có lịch hẹn hoặc có ít hơn 2 lịch hẹn trong khung giờ đó)
 */
export async function getAvailableDoctors(
  date: string,
  time: string
): Promise<Doctor[]> {
  // Lấy tất cả bác sĩ active
  const { data: doctors, error: doctorsError } = await supabase
    .from('doctors')
    .select('*')
    .eq('status', 'active');

  if (doctorsError) throw doctorsError;

  // Lấy số lượng booking của từng bác sĩ trong khung giờ đó
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('assigned_doctor_id')
    .eq('appointment_date', date)
    .eq('appointment_time', time)
    .neq('status', 'cancelled');

  if (bookingsError) throw bookingsError;

  // Đếm số booking của từng bác sĩ
  const bookingCounts: Record<string, number> = {};
  bookings?.forEach((booking) => {
    if (booking.assigned_doctor_id) {
      bookingCounts[booking.assigned_doctor_id] = 
        (bookingCounts[booking.assigned_doctor_id] || 0) + 1;
    }
  });

  // Filter bác sĩ có ít hơn 2 lịch hẹn (giới hạn 2 lịch/khung giờ cho mỗi bác sĩ)
  return doctors?.filter(
    (doctor) => (bookingCounts[doctor.id] || 0) < 2
  ) || [];
}

// ============================================
// 4. BOOKINGS API
// ============================================

/**
 * Tạo lịch hẹn mới
 */
export async function createBooking(
  bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'completed_at' | 'cancelled_at'>
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  return data;
}

/**
 * Lấy tất cả lịch hẹn (có thể filter)
 */
export async function getBookings(filters?: {
  date?: string;
  status?: string;
  doctorId?: string;
}): Promise<Booking[]> {
  let query = supabase
    .from('bookings')
    .select(`
      *,
      assigned_doctor:doctors(id, name, specialty)
    `)
    .order('appointment_date', { ascending: false })
    .order('appointment_time', { ascending: false });

  if (filters?.date) {
    query = query.eq('appointment_date', filters.date);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.doctorId) {
    query = query.eq('assigned_doctor_id', filters.doctorId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }

  return data;
}

/**
 * Đếm số lượng booking trong khung giờ cụ thể
 */
export async function countBookingsInTimeSlot(
  date: string,
  time: string
): Promise<number> {
  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('appointment_date', date)
    .eq('appointment_time', time)
    .neq('status', 'cancelled');

  if (error) {
    console.error('Error counting bookings:', error);
    throw error;
  }

  return count || 0;
}

/**
 * Phân công bác sĩ cho lịch hẹn
 */
export async function assignDoctorToBooking(
  bookingId: string,
  doctorId: string
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      assigned_doctor_id: doctorId,
      status: 'confirmed',
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId)
    .select(`
      *,
      assigned_doctor:doctors(id, name, specialty)
    `)
    .single();

  if (error) {
    console.error('Error assigning doctor:', error);
    throw error;
  }

  return data;
}

/**
 * Cập nhật trạng thái lịch hẹn
 */
export async function updateBookingStatus(
  bookingId: string,
  status: Booking['status']
): Promise<Booking> {
  const updates: any = {
    status,
    updated_at: new Date().toISOString()
  };

  if (status === 'completed') {
    updates.completed_at = new Date().toISOString();
  } else if (status === 'cancelled') {
    updates.cancelled_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }

  return data;
}

// ============================================
// 5. PRODUCTS API
// ============================================

/**
 * Lấy tất cả sản phẩm (có filter)
 */
export async function getProducts(filters?: {
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('name');

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured);
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data;
}

/**
 * Lấy sản phẩm theo slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

// ============================================
// 6. ORDERS API
// ============================================

/**
 * Tạo đơn hàng mới
 */
export async function createOrder(
  orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'confirmed_at' | 'shipped_at' | 'delivered_at' | 'cancelled_at'>
): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }

  return data;
}

/**
 * Lấy đơn hàng theo số điện thoại
 */
export async function getOrdersByPhone(phone: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_phone', phone)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data;
}

/**
 * Cập nhật trạng thái đơn hàng
 */
export async function updateOrderStatus(
  orderId: string,
  deliveryStatus: Order['delivery_status']
): Promise<Order> {
  const updates: any = {
    delivery_status: deliveryStatus,
    updated_at: new Date().toISOString()
  };

  if (deliveryStatus === 'confirmed') {
    updates.confirmed_at = new Date().toISOString();
  } else if (deliveryStatus === 'shipping') {
    updates.shipped_at = new Date().toISOString();
  } else if (deliveryStatus === 'delivered') {
    updates.delivered_at = new Date().toISOString();
  } else if (deliveryStatus === 'cancelled') {
    updates.cancelled_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  return data;
}

// ============================================
// 7. REAL-TIME SUBSCRIPTIONS (Bonus!)
// ============================================

/**
 * Subscribe to bookings changes
 * Usage:
 *   const subscription = subscribeToBookings((payload) => {
 *     console.log('Booking changed:', payload);
 *   });
 *   // Later: subscription.unsubscribe();
 */
export function subscribeToBookings(
  callback: (payload: any) => void
) {
  return supabase
    .channel('bookings-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookings' },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to orders changes
 */
export function subscribeToOrders(
  callback: (payload: any) => void
) {
  return supabase
    .channel('orders-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'orders' },
      callback
    )
    .subscribe();
}

// ============================================
// 8. USAGE EXAMPLES
// ============================================

/*
// Trong React component:

import { useEffect, useState } from 'react';
import { getActiveDoctors, getBookings, assignDoctorToBooking } from './supabase-client';

function StaffBookingsPage() {
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [doctorsData, bookingsData] = await Promise.all([
          getActiveDoctors(),
          getBookings({ date: new Date().toISOString().split('T')[0] })
        ]);
        
        setDoctors(doctorsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleAssignDoctor = async (bookingId: string, doctorId: string) => {
    try {
      await assignDoctorToBooking(bookingId, doctorId);
      // Reload bookings
      const bookingsData = await getBookings();
      setBookings(bookingsData);
      alert('Phân công bác sĩ thành công!');
    } catch (error) {
      console.error('Error assigning doctor:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      // Your UI here
    </div>
  );
}
*/
