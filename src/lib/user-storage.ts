// User Storage Service - Quản lý users trong localStorage

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  password: string; // Hashed in production
  full_name: string;
  role: "admin" | "staff" | "vet" | "user";
  specialization?: string;
  phone?: string;
  address?: string;
  created_at: string;
  avatar_url?: string;
}

const USERS_STORAGE_KEY = "miapet_users";

// Initialize with demo users
const INITIAL_USERS: StoredUser[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@miapet.com",
    password: "admin123",
    full_name: "Quản trị viên",
    role: "admin",
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    username: "nhanvien1",
    email: "staff1@miapet.com",
    password: "123456",
    full_name: "Nguyễn Thị Hoa",
    role: "staff",
    phone: "0912345678",
    created_at: "2026-01-20T08:30:00Z",
  },
  {
    id: "3",
    username: "nhanvien2",
    email: "staff2@miapet.com",
    password: "123456",
    full_name: "Lê Văn Nam",
    role: "staff",
    phone: "0987654321",
    created_at: "2026-01-25T09:00:00Z",
  },
  {
    id: "4",
    username: "bsty1",
    email: "bsty1@miapet.com",
    password: "123456",
    full_name: "BS. Nguyễn Văn A",
    role: "vet",
    specialization: "Chó mèo tổng quát",
    phone: "0901234567",
    created_at: "2026-02-01T09:00:00Z",
  },
  {
    id: "5",
    username: "bsty2",
    email: "bsty2@miapet.com",
    password: "123456",
    full_name: "BS. Trần Thị B",
    role: "vet",
    specialization: "Ngoại khoa",
    phone: "0909876543",
    created_at: "2026-02-01T09:00:00Z",
  },
  {
    id: "6",
    username: "bsty3",
    email: "bsty3@miapet.com",
    password: "123456",
    full_name: "BS. Lê Văn C",
    role: "vet",
    specialization: "Da liễu",
    phone: "0903456789",
    created_at: "2026-02-05T10:00:00Z",
  },
  {
    id: "7",
    username: "bsty4",
    email: "bsty4@miapet.com",
    password: "123456",
    full_name: "BS. Phạm Thị D",
    role: "vet",
    specialization: "Nội khoa",
    phone: "0904567890",
    created_at: "2026-02-07T09:00:00Z",
  },
  {
    id: "8",
    username: "nguyenvana",
    email: "nguyenvana@email.com",
    password: "user123",
    full_name: "Nguyễn Văn A",
    role: "user",
    phone: "0911111111",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    created_at: "2026-03-10T14:30:00Z",
  },
  {
    id: "9",
    username: "tranthib",
    email: "tranthib@email.com",
    password: "user123",
    full_name: "Trần Thị B",
    role: "user",
    phone: "0922222222",
    address: "456 Lê Lợi, Quận 3, TP.HCM",
    created_at: "2026-03-12T16:45:00Z",
  },
  {
    id: "10",
    username: "phamthic",
    email: "phamthic@email.com",
    password: "user123",
    full_name: "Phạm Thị C",
    role: "user",
    phone: "0933333333",
    address: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
    created_at: "2026-03-15T11:20:00Z",
  },
];

// Get all users
export function getAllUsers(): StoredUser[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    // Initialize with default users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  return JSON.parse(stored);
}

// Get user by username or email
export function getUserByLogin(usernameOrEmail: string): StoredUser | null {
  const users = getAllUsers();
  return users.find(
    u => u.username === usernameOrEmail || u.email === usernameOrEmail
  ) || null;
}

// Get user by ID
export function getUserById(id: string): StoredUser | null {
  const users = getAllUsers();
  return users.find(u => u.id === id) || null;
}

// Check if username exists
export function usernameExists(username: string): boolean {
  const users = getAllUsers();
  return users.some(u => u.username === username);
}

// Check if email exists
export function emailExists(email: string): boolean {
  const users = getAllUsers();
  return users.some(u => u.email === email);
}

// Create new user (for registration)
export function createUser(userData: {
  username: string;
  email: string;
  password: string;
  full_name: string;
}): StoredUser {
  const users = getAllUsers();
  
  // Check duplicates
  if (usernameExists(userData.username)) {
    throw new Error("Tên đăng nhập đã tồn tại");
  }
  if (emailExists(userData.email)) {
    throw new Error("Email đã được sử dụng");
  }
  
  // Create new user with role "user" (khách hàng)
  const newUser: StoredUser = {
    id: Date.now().toString(), // Simple ID generation
    username: userData.username,
    email: userData.email,
    password: userData.password, // In production: hash this!
    full_name: userData.full_name,
    role: "user", // Default role for new registrations
    created_at: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  return newUser;
}

// Update user
export function updateUser(id: string, updates: Partial<StoredUser>): StoredUser | null {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return null;
  }
  
  users[index] = { ...users[index], ...updates };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  return users[index];
}

// Delete user
export function deleteUser(id: string): boolean {
  const users = getAllUsers();
  const filtered = users.filter(u => u.id !== id);
  
  if (filtered.length === users.length) {
    return false; // User not found
  }
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Authenticate user
export function authenticateUser(usernameOrEmail: string, password: string): StoredUser | null {
  const user = getUserByLogin(usernameOrEmail);
  
  if (user && user.password === password) {
    return user;
  }
  
  return null;
}

// Get users by role
export function getUsersByRole(role: "admin" | "staff" | "vet" | "user"): StoredUser[] {
  const users = getAllUsers();
  return users.filter(u => u.role === role);
}

// Force reset to initial users (for development/testing)
export function resetUsersToInitial(): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
  console.log('✅ Users database reset to initial data');
}

// Check if users need update (compare count)
export function checkAndUpdateUsers(): void {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    console.log('✅ Initialized users database');
    return;
  }
  
  const currentUsers = JSON.parse(stored);
  // If count is different, merge new users (keep existing ones)
  if (currentUsers.length < INITIAL_USERS.length) {
    const existingIds = currentUsers.map((u: StoredUser) => u.id);
    const newUsers = INITIAL_USERS.filter(u => !existingIds.includes(u.id));
    const merged = [...currentUsers, ...newUsers];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
    console.log(`✅ Added ${newUsers.length} new users to database`);
  }
}