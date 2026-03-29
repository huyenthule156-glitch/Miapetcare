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
}

// ============================================
// TODO: REPLACE WITH API ENDPOINT
// POST /api/bookings
// ============================================
export const createBooking = (booking: Omit<Booking, "id" | "createdAt">): Booking => {
  // TEMPORARY: localStorage implementation
  const bookings = JSON.parse(localStorage.getItem("miapet_staff_bookings") || "[]");
  
  const newBooking: Booking = {
    id: Date.now(),
    ...booking,
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  localStorage.setItem("miapet_staff_bookings", JSON.stringify(bookings));
  
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
  
  return bookings[index];
  
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