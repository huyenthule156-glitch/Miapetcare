import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";
import { authenticateUser, createUser, StoredUser } from "../../lib/user-storage";

export type UserRole = "user" | "admin" | "vet" | "staff";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName?: string;
  specialization?: string; // For vet role
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string, fullName: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Convert StoredUser to User (remove password)
function toUser(storedUser: StoredUser): User {
  return {
    id: storedUser.id,
    username: storedUser.username,
    email: storedUser.email,
    role: storedUser.role,
    fullName: storedUser.full_name,
    specialization: storedUser.specialization,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const storedUser = authenticateUser(username, password);

    if (storedUser) {
      const userData = toUser(storedUser);
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("username", storedUser.username); // Keep for backward compatibility
      return true;
    }

    return false;
  };

  const register = (username: string, email: string, password: string, fullName: string) => {
    try {
      const newUser = createUser({
        username,
        email,
        password,
        full_name: fullName,
      });
      
      // Auto login after registration
      const userData = toUser(newUser);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("username", newUser.username);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Đăng ký thất bại" 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Gracefully handle missing provider during hot reload or initial render
    // This is expected behavior during development hot reload
    return {
      user: null,
      isAuthenticated: false,
      login: () => false,
      register: () => ({ success: false, error: "Auth not initialized" }),
      logout: () => {},
    } as AuthContextType;
  }
  return context;
}