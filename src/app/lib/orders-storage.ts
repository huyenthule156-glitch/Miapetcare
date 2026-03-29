// Mock Orders Data Storage

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string; // Cached from users table
  customerName?: string; // Shipping name (can be different from userName)
  customerPhone?: string; // Shipping phone
  customerEmail?: string; // Shipping email
  shippingAddress?: string; // Full shipping address
  shippingCity?: string; // City
  shippingDistrict?: string; // District
  orderType: 'product' | 'service' | 'booking';
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'momo' | 'zalopay' | 'cod';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: number;
  serviceId?: number;
  serviceType?: 'main' | 'additional' | 'dye' | 'vip';
  itemName: string;
  itemPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string; // Cached from users table
  petId?: string;
  petName?: string; // Cached from pets table
  serviceId?: number;
  serviceType?: 'main' | 'additional' | 'dye' | 'vip';
  serviceName: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// LocalStorage keys
const ORDERS_STORAGE_KEY = 'miapet_orders';
const ORDER_ITEMS_STORAGE_KEY = 'miapet_order_items';
const BOOKINGS_STORAGE_KEY = 'miapet_bookings';

// Sản phẩm thật từ products-data.ts:
// id: 5 - Thức ăn chó chó Apro lon 20kg - 690000
// id: 18 - Pate mèo SC mix Tellme 40g - 45000
// id: 31 - Bộ chõi lắc bóng vàng đá - 20000
// id: 24 - Vòng cổ da cho chó 55x5cm - 20000
// id: 23 - Máy lọc nước cưng vật 2L - 250000

// Mock data from existing users (id: 4, 5 from user-storage.ts)
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD001',
    userId: '4',
    userName: 'Nguyễn Văn A',
    orderType: 'product',
    totalAmount: 690000,
    status: 'shipping',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '2026-03-15T08:30:00Z',
    updatedAt: '2026-03-15T08:30:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD002',
    userId: '5',
    userName: 'Trần Thị B',
    orderType: 'product',
    totalAmount: 180000,
    status: 'completed',
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    createdAt: '2026-03-14T14:20:00Z',
    updatedAt: '2026-03-14T16:00:00Z',
    completedAt: '2026-03-14T16:00:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD003',
    userId: '4',
    userName: 'Nguyễn Văn A',
    orderType: 'product',
    totalAmount: 40000,
    status: 'processing',
    paymentMethod: 'cash',
    paymentStatus: 'unpaid',
    createdAt: '2026-03-13T10:15:00Z',
    updatedAt: '2026-03-13T10:15:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD004',
    userId: '5',
    userName: 'Trần Thị B',
    orderType: 'product',
    totalAmount: 20000,
    status: 'shipping',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    createdAt: '2026-03-12T09:00:00Z',
    updatedAt: '2026-03-12T09:00:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD005',
    userId: '4',
    userName: 'Nguyễn Văn A',
    orderType: 'product',
    totalAmount: 250000,
    status: 'completed',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '2026-03-10T11:30:00Z',
    updatedAt: '2026-03-10T15:00:00Z',
    completedAt: '2026-03-10T15:00:00Z',
  },
];

const MOCK_ORDER_ITEMS: OrderItem[] = [
  {
    id: '1',
    orderId: '1',
    productId: 5,
    itemName: 'Thức ăn chó chó Apro lon 20kg',
    itemPrice: 690000,
    quantity: 1,
    subtotal: 690000,
  },
  {
    id: '2',
    orderId: '2',
    productId: 18,
    itemName: 'Pate mèo SC mix Tellme 40g',
    itemPrice: 45000,
    quantity: 4,
    subtotal: 180000,
  },
  {
    id: '3',
    orderId: '3',
    productId: 31,
    itemName: 'Bộ chõi lắc bóng vàng đá',
    itemPrice: 20000,
    quantity: 2,
    subtotal: 40000,
  },
  {
    id: '4',
    orderId: '4',
    productId: 24,
    itemName: 'Vòng cổ da cho chó 55x5cm',
    itemPrice: 20000,
    quantity: 1,
    subtotal: 20000,
  },
  {
    id: '5',
    orderId: '5',
    productId: 23,
    itemName: 'Máy lọc nước cưng vật 2L',
    itemPrice: 250000,
    quantity: 1,
    subtotal: 250000,
  },
];

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    userId: '4',
    userName: 'Nguyễn Văn A',
    petId: 'pet1',
    petName: 'Bobby',
    serviceId: 1,
    serviceType: 'main',
    serviceName: 'Tắm + Vệ sinh (Lông Ngắn)',
    bookingDate: '2026-03-21',
    bookingTime: '09:00',
    status: 'confirmed',
    totalPrice: 180000,
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-20T10:30:00Z',
  },
  {
    id: '2',
    userId: '5',
    userName: 'Trần Thị B',
    petId: 'pet3',
    petName: 'Luna',
    serviceId: 2,
    serviceType: 'main',
    serviceName: 'Tắm + VS (Lông dài)',
    bookingDate: '2026-03-21',
    bookingTime: '10:30',
    status: 'confirmed',
    totalPrice: 210000,
    createdAt: '2026-03-19T14:00:00Z',
    updatedAt: '2026-03-19T14:15:00Z',
  },
  {
    id: '3',
    userId: '4',
    userName: 'Nguyễn Văn A',
    petId: 'pet2',
    petName: 'Miu Miu',
    serviceId: 4,
    serviceType: 'main',
    serviceName: 'SPA Cắt tỉa 1',
    bookingDate: '2026-03-21',
    bookingTime: '14:00',
    status: 'pending',
    totalPrice: 360000,
    createdAt: '2026-03-21T08:00:00Z',
    updatedAt: '2026-03-21T08:00:00Z',
  },
  // More bookings for stats
  {
    id: '4',
    userId: '5',
    userName: 'Trần Thị B',
    petId: 'pet4',
    petName: 'Milo',
    serviceId: 1,
    serviceType: 'main',
    serviceName: 'Tắm + Vệ sinh (Lông Ngắn)',
    bookingDate: '2026-03-21',
    bookingTime: '11:00',
    status: 'confirmed',
    totalPrice: 140000,
    createdAt: '2026-03-20T16:00:00Z',
    updatedAt: '2026-03-20T16:15:00Z',
  },
];

// Initialize localStorage with mock data if not exists
function initializeStorage() {
  if (!localStorage.getItem(ORDERS_STORAGE_KEY)) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(MOCK_ORDERS));
  }
  if (!localStorage.getItem(ORDER_ITEMS_STORAGE_KEY)) {
    localStorage.setItem(ORDER_ITEMS_STORAGE_KEY, JSON.stringify(MOCK_ORDER_ITEMS));
  }
  if (!localStorage.getItem(BOOKINGS_STORAGE_KEY)) {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(MOCK_BOOKINGS));
  }
}

// Initialize on module load
initializeStorage();

// Storage functions (ready for Supabase migration)

export function getAllOrders(): Order[] {
  const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return orders ? JSON.parse(orders) : [];
}

export function getOrdersByUserId(userId: string): Order[] {
  return getAllOrders().filter((order) => order.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return getAllOrders().find((order) => order.id === id);
}

export function getOrderItems(orderId: string): OrderItem[] {
  const orderItems = localStorage.getItem(ORDER_ITEMS_STORAGE_KEY);
  return orderItems ? JSON.parse(orderItems).filter((item: OrderItem) => item.orderId === orderId) : [];
}

export function getAllOrderItems(): OrderItem[] {
  const orderItems = localStorage.getItem(ORDER_ITEMS_STORAGE_KEY);
  return orderItems ? JSON.parse(orderItems) : [];
}

export function getAllBookings(): Booking[] {
  const bookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return bookings ? JSON.parse(bookings) : [];
}

export function getBookingsByUserId(userId: string): Booking[] {
  return getAllBookings().filter((booking) => booking.userId === userId);
}

export function getBookingById(id: string): Booking | undefined {
  return getAllBookings().find((booking) => booking.id === id);
}

// Statistics functions (will use Supabase aggregation queries later)

export function getTodayOrders(): Order[] {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return getAllOrders().filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
    return orderDate === today;
  });
}

export function getThisMonthOrders(): Order[] {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  return getAllOrders().filter((order) => {
    const orderMonth = order.createdAt.substring(0, 7); // YYYY-MM
    return orderMonth === thisMonth;
  });
}

export function getLastMonthOrders(): Order[] {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
  
  return getAllOrders().filter((order) => {
    const orderMonth = order.createdAt.substring(0, 7); // YYYY-MM
    return orderMonth === lastMonthStr;
  });
}

export function getTodayBookings(): Booking[] {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return getAllBookings().filter((booking) => booking.bookingDate === today);
}

export function getThisMonthRevenue(): number {
  const thisMonthOrders = getThisMonthOrders();
  const completedOrders = thisMonthOrders.filter(
    (order) => order.status === 'completed' || order.paymentStatus === 'paid'
  );
  return completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
}

export function getLastMonthRevenue(): number {
  const lastMonthOrders = getLastMonthOrders();
  const completedOrders = lastMonthOrders.filter(
    (order) => order.status === 'completed' || order.paymentStatus === 'paid'
  );
  return completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
}

// Top selling products (aggregate from order_items)
export function getTopSellingProducts(limit: number = 5): Array<{
  productId: number;
  itemName: string;
  totalSold: number;
  totalRevenue: number;
}> {
  const productStats = new Map<number, { name: string; sold: number; revenue: number }>();

  getAllOrderItems().forEach((item) => {
    if (item.productId) {
      const existing = productStats.get(item.productId) || { name: item.itemName, sold: 0, revenue: 0 };
      existing.sold += item.quantity;
      existing.revenue += item.subtotal;
      productStats.set(item.productId, existing);
    }
  });

  return Array.from(productStats.entries())
    .map(([productId, stats]) => ({
      productId,
      itemName: stats.name,
      totalSold: stats.sold,
      totalRevenue: stats.revenue,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}

// Create new order - Returns order ID
export function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): string {
  const orders = getAllOrders();
  
  // Generate new ID
  const newId = (Math.max(0, ...orders.map(o => parseInt(o.id))) + 1).toString();
  
  // Generate order number (auto increment based on count)
  const orderCount = orders.length + 1;
  const orderNumber = `ORD${String(orderCount).padStart(3, '0')}`;
  
  // Create new order
  const now = new Date().toISOString();
  const newOrder: Order = {
    ...orderData,
    id: newId,
    orderNumber,
    createdAt: now,
    updatedAt: now,
  };
  
  // Save to localStorage
  orders.push(newOrder);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  
  return newId;
}

// Create order items
export function createOrderItems(items: Omit<OrderItem, 'id'>[]): void {
  const allItems = getAllOrderItems();
  
  const newItems = items.map((item, index) => {
    const newId = (Math.max(0, ...allItems.map(i => parseInt(i.id))) + index + 1).toString();
    return {
      ...item,
      id: newId,
    };
  });
  
  allItems.push(...newItems);
  localStorage.setItem(ORDER_ITEMS_STORAGE_KEY, JSON.stringify(allItems));
}

// Update order status
export function updateOrderStatus(orderId: string, status: Order['status']): boolean {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) return false;
  
  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();
  
  if (status === 'completed') {
    orders[orderIndex].completedAt = new Date().toISOString();
  }
  
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  return true;
}