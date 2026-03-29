// Pet Storage Service - Quản lý thú cưng trong localStorage
// Liên kết với users qua userId

export interface Pet {
  id: string;
  userId: string; // ID của chủ nhân
  name: string;
  species: "Chó" | "Mèo" | "Chim" | "Hamster" | "Thỏ" | "Khác";
  breed: string;
  age: string;
  dateOfBirth?: string;
  weight?: string;
  gender?: "Đực" | "Cái";
  status: "healthy" | "treatment" | "monitoring";
  lastCheckup?: string;
  image: string;
  color?: string;
  microchipId?: string;
  medicalHistory?: Array<{
    date: string;
    diagnosis: string;
    treatment: string;
    vet?: string;
  }>;
  vaccinations?: Array<{
    name: string;
    date: string;
    nextDue?: string;
  }>;
  allergies?: string[];
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }>;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

const PETS_STORAGE_KEY = "miapet_pets";

// Initialize with demo pets linked to users
const INITIAL_PETS: Pet[] = [
  {
    id: "pet1",
    userId: "7", // Nguyễn Văn A (updated ID)
    name: "Bobby",
    species: "Chó",
    breed: "Golden Retriever",
    age: "3 tuổi",
    dateOfBirth: "2023-03-15",
    weight: "30 kg",
    gender: "Đực",
    status: "healthy",
    lastCheckup: "2026-03-15",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    color: "Vàng",
    vaccinations: [
      { name: "Dại", date: "2026-01-10", nextDue: "2027-01-10" },
      { name: "Parvo", date: "2026-02-15", nextDue: "2027-02-15" }
    ],
    notes: "Rất năng động và thân thiện",
    created_at: "2026-01-20T10:00:00Z",
  },
  {
    id: "pet2",
    userId: "8", // Trần Thị B (updated ID)
    name: "Miu Miu",
    species: "Mèo",
    breed: "British Shorthair",
    age: "2 tuổi",
    dateOfBirth: "2024-05-20",
    weight: "4.5 kg",
    gender: "Cái",
    status: "healthy",
    lastCheckup: "2026-03-10",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    color: "Xám xanh",
    vaccinations: [
      { name: "Dại", date: "2026-01-05", nextDue: "2027-01-05" },
      { name: "FPV", date: "2026-02-10", nextDue: "2027-02-10" }
    ],
    notes: "Ưa thích ngủ và yên tĩnh",
    created_at: "2026-02-01T14:30:00Z",
  },
  {
    id: "pet3",
    userId: "7", // Nguyễn Văn A (có 2 thú cưng) (updated ID)
    name: "Max",
    species: "Chó",
    breed: "Husky",
    age: "4 tuổi",
    dateOfBirth: "2022-07-10",
    weight: "28 kg",
    gender: "Đực",
    status: "treatment",
    lastCheckup: "2026-03-18",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400",
    color: "Xám trắng",
    medicalHistory: [
      {
        date: "2026-03-18",
        diagnosis: "Viêm da",
        treatment: "Thuốc bôi và kháng sinh",
        vet: "BS. Lê Thị Mai"
      }
    ],
    medications: [
      {
        name: "Kháng sinh Amoxicillin",
        dosage: "500mg",
        frequency: "2 lần/ngày",
        startDate: "2026-03-18",
        endDate: "2026-03-28"
      }
    ],
    vaccinations: [
      { name: "Dại", date: "2025-12-15", nextDue: "2026-12-15" }
    ],
    notes: "Đang trong quá trình điều trị viêm da",
    created_at: "2026-01-15T09:00:00Z",
  },
  {
    id: "pet4",
    userId: "8", // Trần Thị B (có 2 thú cưng) (updated ID)
    name: "Kitty",
    species: "Mèo",
    breed: "Persian",
    age: "1 tuổi",
    dateOfBirth: "2025-02-14",
    weight: "3.2 kg",
    gender: "Cái",
    status: "monitoring",
    lastCheckup: "2026-03-05",
    image: "https://images.unsplash.com/photo-1573865526739-10c1dd1b6b33?w=400",
    color: "Trắng",
    allergies: ["Phấn hoa", "Một số loại thức ăn khô"],
    medicalHistory: [
      {
        date: "2026-03-05",
        diagnosis: "Dị ứng thức ăn nhẹ",
        treatment: "Thay đổi chế độ ăn",
        vet: "BS. Trần Minh Tuấn"
      }
    ],
    vaccinations: [
      { name: "Dại", date: "2025-11-20", nextDue: "2026-11-20" }
    ],
    notes: "Cần theo dõi chế độ ăn đặc biệt",
    created_at: "2026-02-20T11:15:00Z",
  },
  {
    id: "pet5",
    userId: "7", // Nguyễn Văn A (có 3 thú cưng) (updated ID)
    name: "Rocky",
    species: "Chó",
    breed: "Poodle",
    age: "5 tuổi",
    dateOfBirth: "2021-04-25",
    weight: "15 kg",
    gender: "Đực",
    status: "healthy",
    lastCheckup: "2026-03-12",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400",
    color: "Nâu",
    microchipId: "982000123456789",
    vaccinations: [
      { name: "Dại", date: "2026-01-08", nextDue: "2027-01-08" },
      { name: "Distemper", date: "2026-02-12", nextDue: "2027-02-12" }
    ],
    notes: "Đã được huấn luyện cơ bản",
    created_at: "2025-12-10T08:30:00Z",
  },
];

// Get all pets
export function getAllPets(): Pet[] {
  const stored = localStorage.getItem(PETS_STORAGE_KEY);
  if (!stored) {
    // Initialize with default pets
    localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(INITIAL_PETS));
    return INITIAL_PETS;
  }
  return JSON.parse(stored);
}

// Get pet by ID
export function getPetById(id: string): Pet | null {
  const pets = getAllPets();
  return pets.find(p => p.id === id) || null;
}

// Get pets by user ID (lấy thú cưng của 1 user cụ thể)
export function getPetsByUserId(userId: string): Pet[] {
  const pets = getAllPets();
  return pets.filter(p => p.userId === userId);
}

// Get pets with owner info (for admin view)
export function getPetsWithOwnerInfo() {
  // Import getAllUsers from user-storage dynamically to avoid circular dependency
  const pets = getAllPets();
  const usersJson = localStorage.getItem("miapet_users");
  const users = usersJson ? JSON.parse(usersJson) : [];
  
  return pets.map(pet => {
    const owner = users.find((u: any) => u.id === pet.userId);
    return {
      ...pet,
      ownerName: owner?.full_name || "Không xác định",
      ownerEmail: owner?.email || "",
      ownerPhone: owner?.phone || ""
    };
  });
}

// Create new pet
export function createPet(petData: Omit<Pet, "id" | "created_at">): Pet {
  const pets = getAllPets();
  
  const newPet: Pet = {
    ...petData,
    id: `pet${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  
  pets.push(newPet);
  localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(pets));
  
  return newPet;
}

// Update pet
export function updatePet(id: string, updates: Partial<Pet>): Pet | null {
  const pets = getAllPets();
  const index = pets.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }
  
  pets[index] = { 
    ...pets[index], 
    ...updates,
    updated_at: new Date().toISOString()
  };
  localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(pets));
  
  return pets[index];
}

// Delete pet
export function deletePet(id: string): boolean {
  const pets = getAllPets();
  const filtered = pets.filter(p => p.id !== id);
  
  if (filtered.length === pets.length) {
    return false; // Pet not found
  }
  
  localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Get pets by status
export function getPetsByStatus(status: "healthy" | "treatment" | "monitoring"): Pet[] {
  const pets = getAllPets();
  return pets.filter(p => p.status === status);
}

// Get pets by species
export function getPetsBySpecies(species: Pet["species"]): Pet[] {
  const pets = getAllPets();
  return pets.filter(p => p.species === species);
}

// Search pets (by name, breed, owner name, etc.)
export function searchPets(query: string): Pet[] {
  const petsWithOwner = getPetsWithOwnerInfo();
  const lowerQuery = query.toLowerCase();
  
  return petsWithOwner.filter(pet => 
    pet.name.toLowerCase().includes(lowerQuery) ||
    pet.breed.toLowerCase().includes(lowerQuery) ||
    pet.species.toLowerCase().includes(lowerQuery) ||
    (pet as any).ownerName.toLowerCase().includes(lowerQuery) ||
    (pet as any).ownerEmail.toLowerCase().includes(lowerQuery)
  );
}

// Get stats for admin dashboard
export function getPetStats() {
  const pets = getAllPets();
  return {
    total: pets.length,
    healthy: pets.filter(p => p.status === "healthy").length,
    treatment: pets.filter(p => p.status === "treatment").length,
    monitoring: pets.filter(p => p.status === "monitoring").length,
    bySpecies: {
      dogs: pets.filter(p => p.species === "Chó").length,
      cats: pets.filter(p => p.species === "Mèo").length,
      birds: pets.filter(p => p.species === "Chim").length,
      hamsters: pets.filter(p => p.species === "Hamster").length,
      rabbits: pets.filter(p => p.species === "Thỏ").length,
      others: pets.filter(p => p.species === "Khác").length,
    }
  };
}

// Add medical history entry
export function addMedicalHistory(
  petId: string, 
  entry: { date: string; diagnosis: string; treatment: string; vet?: string }
): Pet | null {
  const pet = getPetById(petId);
  if (!pet) return null;
  
  const medicalHistory = pet.medicalHistory || [];
  medicalHistory.push(entry);
  
  return updatePet(petId, { medicalHistory });
}

// Add vaccination record
export function addVaccination(
  petId: string,
  vaccination: { name: string; date: string; nextDue?: string }
): Pet | null {
  const pet = getPetById(petId);
  if (!pet) return null;
  
  const vaccinations = pet.vaccinations || [];
  vaccinations.push(vaccination);
  
  return updatePet(petId, { vaccinations });
}