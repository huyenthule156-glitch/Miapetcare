// ============================================
// BOOKING SERVICE - API LAYER
// ============================================
// This file serves as an abstraction layer for booking data access.
// Currently using localStorage, but designed to be easily replaced with
// REST API calls when deploying to Vercel with SQL database.
//
// MIGRATION GUIDE:
// When ready to use a real database (e.g., PostgreSQL on Vercel):
// 1. Replace localStorage calls with fetch() to your API endpoints
// 2. Add proper error handling and loading states
// 3. Update function signatures to return Promise<T>
// 4. Add authentication headers (JWT tokens)
// ============================================

import { supabase } from "../../lib/supabase-client";

export interface Booking {
  id: number;
  customerName: string;
  customerPhone: string;
  petName?: string;
  petType: "dog" | "cat";
  appointmentDate: string; // ISO date format: "YYYY-MM-DD"
  appointmentTime: string; // Format: "HH:MM"
  endDate?: string; // For hotel services
  notes?: string;
  service: {
    categoryId: string;
    category: string;
    name: string;
    price: string;
    priceValue: number;
  };
  totalDays?: number | null;
  totalPrice: number;
  createdAt: string; // ISO datetime
  status: "pending" | "confirmed" | "completed" | "cancelled";
  assignedDoctor?: string; // Doctor ID
  assignedDoctorName?: string; // Doctor name for display
  backendId?: string; // Supabase booking UUID
}

const mapBookingToDbRow = (booking: Omit<Booking, "id" | "createdAt">) => ({
  customer_name: booking.customerName,
  customer_phone: booking.customerPhone,
  pet_name: booking.petName ?? null,
  pet_type: booking.petType,
  appointment_date: booking.appointmentDate,
  appointment_time: booking.appointmentTime,
  end_date: booking.endDate ?? null,
  notes: booking.notes ?? null,
  service_category_id: booking.service.categoryId,
  service_category: booking.service.category,
  service_name: booking.service.name,
  service_price: booking.service.price,
  service_price_value: booking.service.priceValue,
  total_days: booking.totalDays ?? null,
  total_price: booking.totalPrice,
  status: booking.status,
  assigned_doctor_id: booking.assignedDoctor ?? null,
});

const insertBookingToSupabase = async (booking: Omit<Booking, "id" | "createdAt">, localId: number) => {
  try {
    console.log('Supabase insert payload:', mapBookingToDbRow(booking));
    const { data, error } = await supabase
      .from('bookings')
      .insert(mapBookingToDbRow(booking))
      .select('id')
      .single();

    if (error) {
      console.error('Supabase booking insert failed:', error.message, error.details, error.hint, error.code);
      return;
    }

    console.log('Supabase booking insert response:', data);

    if (data?.id) {
      const bookings: Booking[] = JSON.parse(localStorage.getItem("miapet_staff_bookings") || "[]");
      const index = bookings.findIndex((b) => b.id === localId);
      if (index !== -1) {
        bookings[index].backendId = data.id;
        localStorage.setItem("miapet_staff_bookings", JSON.stringify(bookings));
      }
    }
  } catch (error) {
    console.error('Supabase booking insert error:', error);
  }
};

const updateBookingOnSupabase = async (booking: Booking) => {
  try {
    if (!booking.backendId) {
      console.log('Booking has no backendId, inserting new row to Supabase');
      await insertBookingToSupabase(booking, booking.id);
      return;
    }

    console.log('Supabase update payload:', mapBookingToDbRow(booking), 'backendId:', booking.backendId);
    const { data, error } = await supabase
      .from('bookings')
      .update(mapBookingToDbRow(booking))
      .eq('id', booking.backendId)
      .select('id')
      .single();

    if (error) {
      console.error('Supabase booking update failed:', error.message, error.details, error.hint, error.code);
      return;
    }

    console.log('Supabase booking update response:', data);
  } catch (error) {
    console.error('Supabase booking update error:', error);
  }
};

// ============================================
// TODO: REPLACE WITH API ENDPOINT
// POST /api/bookings
// ============================================
export const createBooking = async (booking: Omit<Booking, "id" | "createdAt">): Promise<Booking> => {
  // TEMPORARY: localStorage implementation
  const bookings: Booking[] = JSON.parse(localStorage.getItem("miapet_staff_bookings") || "[]");
  
  const newBooking: Booking = {
    id: Date.now(),
    ...booking,
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  localStorage.setItem("miapet_staff_bookings", JSON.stringify(bookings));
  
  await insertBookingToSupabase(booking, newBooking.id);
  
  return newBooking;
  
  /* 
  // FUTURE: API implementation
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(booking)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create booking');
  }
  
  return await response.json();
  */
};

// ============================================
// TODO: REPLACE WITH API ENDPOINT
// GET /api/bookings
// Optional query params: ?date=YYYY-MM-DD&status=pending
// ============================================
export const getAllBookings = (): Booking[] => {
  // TEMPORARY: localStorage implementation
  return JSON.parse(localStorage.getItem("miapet_staff_bookings") || "[]");
  
  /*
  // FUTURE: API implementation
  const response = await fetch('/api/bookings', {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  
  return await response.json();
  */
};

// ============================================
// TODO: REPLACE WITH API ENDPOINT
// GET /api/bookings/count?date=YYYY-MM-DD&time=HH:MM
// This is a critical business logic query that should be optimized at DB level
// ============================================
export const getTimeSlotBookingCount = (date: string, time: string): number => {
  if (!date) return 0;
  
  // TEMPORARY: localStorage implementation
  const bookings = getAllBookings();
  
  // Count active bookings (not cancelled) for specific date and time slot
  return bookings.filter((booking) => 
    booking.appointmentDate === date && 
    booking.appointmentTime === time &&
    booking.status !== "cancelled"
  ).length;
  
  /*
  // FUTURE: API implementation
  const response = await fetch(
    `/api/bookings/count?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`,
    {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch booking count');
  }
  
  const data = await response.json();
  return data.count;
  */
};

// Business rule: Maximum bookings per time slot
export const MAX_BOOKINGS_PER_SLOT = 4;

// Helper function to check if a time slot is fully booked
export const isTimeSlotFull = (date: string, time: string): boolean => {
  return getTimeSlotBookingCount(date, time) >= MAX_BOOKINGS_PER_SLOT;
};

// ============================================
// TODO: REPLACE WITH API ENDPOINT
// PUT /api/bookings/:id
// ============================================
export const updateBooking = (id: number, updates: Partial<Booking>): Booking | null => {
  // TEMPORARY: localStorage implementation
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);
  
  if (index === -1) return null;
  
  bookings[index] = { ...bookings[index], ...updates };
  localStorage.setItem("miapet_staff_bookings", JSON.stringify(bookings));
  
  const updatedBooking = bookings[index];
  void updateBookingOnSupabase(updatedBooking);
  
  return updatedBooking;
  
  /*
  // FUTURE: API implementation
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(updates)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update booking');
  }
  
  return await response.json();
  */
};

// ============================================
// TODO: REPLACE WITH API ENDPOINT
// DELETE /api/bookings/:id (soft delete - sets status to 'cancelled')
// ============================================
export const cancelBooking = (id: number): boolean => {
  // TEMPORARY: localStorage implementation
  const result = updateBooking(id, { status: "cancelled" });
  return result !== null;
  
  /*
  // FUTURE: API implementation
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  
  return response.ok;
  */
};

// ============================================
// FUTURE: Database Schema Reference (PostgreSQL)
// ============================================
/*
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  pet_name VARCHAR(255),
  pet_type VARCHAR(10) CHECK (pet_type IN ('dog', 'cat')),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  end_date DATE,
  notes TEXT,
  service_category_id VARCHAR(50) NOT NULL,
  service_category VARCHAR(100) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_price VARCHAR(100) NOT NULL,
  service_price_value INTEGER NOT NULL,
  total_days INTEGER,
  total_price INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_appointment (appointment_date, appointment_time),
  INDEX idx_status (status)
);

-- Query to count bookings for a specific time slot (optimized)
SELECT COUNT(*) as count 
FROM bookings 
WHERE appointment_date = $1 
  AND appointment_time = $2 
  AND status != 'cancelled';
*/