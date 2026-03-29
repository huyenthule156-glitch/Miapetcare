import { AdminLayout } from "../../components/admin-layout";
import { useState, useEffect } from "react";
import { Search, UserPlus, Edit2, Trash2, Shield, User as UserIcon, Check, X, Stethoscope, Briefcase, PawPrint } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import { getAllUsers, updateUser, deleteUser as deleteStoredUser } from "../../../lib/user-storage";
import { getPetsByUserId } from "../../../lib/pet-storage";

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: "admin" | "staff" | "vet" | "user";
  specialization?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  created_at: string;
  is_online?: boolean;
  last_active?: string;
  petCount?: number;
}

export function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set()); // Track online users

  // Load users from localStorage
  useEffect(() => {
    loadUsers();
    
    // Real-time tracking of online users (simulate with currentUser)
    if (currentUser) {
      setOnlineUsers(new Set([currentUser.id]));
    }
  }, [currentUser]);

  const loadUsers = async () => {
    setLoading(true);
    
    // Load from localStorage
    const storedUsers = getAllUsers();
    setUsers(storedUsers.map(u => {
      // Count pets for each user
      const pets = getPetsByUserId(u.id);
      return {
        id: u.id,
        username: u.username,
        email: u.email,
        full_name: u.full_name,
        role: u.role,
        specialization: u.specialization,
        avatar_url: u.avatar_url,
        phone: u.phone,
        address: u.address,
        created_at: u.created_at,
        petCount: pets.length
      };
    }));
    setLoading(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async (userId: string, newRole: "admin" | "staff" | "vet" | "user") => {
    // Update in localStorage
    updateUser(userId, { role: newRole });
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers(users.filter(user => user.id !== userId));
      deleteStoredUser(userId);
    }
  };

  // Format last active time
  const formatLastActive = (userId: string) => {
    if (onlineUsers.has(userId)) {
      return <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>Đang hoạt động</span>;
    }
    return "Offline";
  };

  // Format role label
  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Quản trị viên",
      staff: "Nhân viên", 
      vet: "Bác sĩ thú y",
      user: "Khách hàng"
    };
    return labels[role] || role;
  };

  return (
    <AdminLayout title="Quản lý người dùng">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="staff">Nhân viên</option>
            <option value="vet">Bác sĩ thú y</option>
            <option value="user">Khách hàng</option>
          </select>

          <button className="bg-[#FF7B7B] text-white px-6 py-3 rounded-lg hover:bg-[#ff6565] transition-colors flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            <span>Thêm người dùng</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Nhân viên</p>
          <p className="text-2xl font-bold text-[#FF7B7B]">{users.filter(u => u.role === "staff").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Bác sĩ thú y</p>
          <p className="text-2xl font-bold text-blue-500">{users.filter(u => u.role === "vet").length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Khách hàng</p>
          <p className="text-2xl font-bold text-green-500">{users.filter(u => u.role === "user").length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thú cưng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngy tham gia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hoạt động
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF7B7B] to-[#ff6565] flex items-center justify-center text-white font-semibold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as "admin" | "staff" | "vet" | "user")}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border-2 ${
                        user.role === "staff"
                          ? "bg-[#FF7B7B]/10 text-[#FF7B7B] border-[#FF7B7B]"
                          : user.role === "vet"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : user.role === "admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      <option value="user">Khách hàng</option>
                      <option value="staff">Nhân viên</option>
                      <option value="vet">Bác sĩ thú y</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "user" && (
                      <div className="flex items-center gap-1 text-sm">
                        <PawPrint className="w-4 h-4 text-[#FF7B7B]" />
                        <span className="font-semibold text-gray-900">{user.petCount || 0}</span>
                        <span className="text-gray-500">thú cưng</span>
                      </div>
                    )}
                    {user.role !== "user" && (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatLastActive(user.id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Không tìm thấy người dùng</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}