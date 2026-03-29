import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/auth-context';
import { 
  getPetsByUserId, 
  createPet as createPetInStorage,
  updatePet as updatePetInStorage,
  deletePet as deletePetFromStorage,
  Pet as StoredPet
} from '../../lib/pet-storage';

export interface Pet {
  id: number;
  name: string;
  type?: string; // Keep for backward compatibility
  species?: string; // New field
  breed: string;
  age?: number; // Keep for backward compatibility
  gender?: "male" | "female";
  birthday?: string;
  weight?: string;
  image: string;
  color?: string;
  microchipId?: string;
}

export interface Appointment {
  id: number;
  petName: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface ServiceRequest {
  id: number;
  service: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  date: string;
  price: number;
  appointmentDate: string;
  appointmentTime: string;
  locationType: 'store' | 'home';
  address: string;
  paymentMethod: 'bank' | 'cod';
  note?: string;
  vetId?: string; // ID of the vet who accepted this appointment
  vetName?: string; // Name of the vet
  completedAt?: string; // When the service was completed
}

export interface Bill {
  id: number;
  description: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: 'appointment' | 'pet' | 'vaccination' | 'order' | 'bill';
}

interface DashboardContextType {
  pets: Pet[];
  appointments: Appointment[];
  requests: ServiceRequest[];
  bills: Bill[];
  activities: Activity[];
  addPet: (pet: Pet) => void;
  updatePet: (id: number, pet: Pet) => void;
  removePet: (id: number) => void;
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: number) => void;
  addRequest: (request: ServiceRequest) => void;
  removeRequest: (id: number) => void;
  updateRequestStatus: (id: number, status: ServiceRequest['status']) => void;
  assignVetToRequest: (requestId: number, vetId: string, vetName: string) => void;
  markAsCompleted: (requestId: number) => void;
  addBill: (bill: Bill) => void;
  updateBillStatus: (id: number, status: Bill['status']) => void;
  addActivity: (activity: Activity) => void;
  getTotalPets: () => number;
  getUpcomingAppointments: () => number;
  getActiveRequests: () => number;
  getPendingBills: () => number;
  getPendingBillsTotal: () => number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Get user-specific storage key
  const getStorageKey = () => {
    if (!user) return 'miapet_dashboard_data';
    return `miapet_dashboard_${user.email}`;
  };

  useEffect(() => {
    if (!user) return;
    
    // Load pets từ pet-storage (database chung)
    const storedPets = getPetsByUserId(user.id);
    const convertedPets: Pet[] = storedPets.map(p => ({
      id: parseInt(p.id.replace('pet', '')) || Date.now(),
      name: p.name,
      species: p.species,
      breed: p.breed,
      age: parseInt(p.age) || undefined,
      gender: p.gender === "Đực" ? "male" : p.gender === "Cái" ? "female" : undefined,
      birthday: p.dateOfBirth,
      weight: p.weight,
      image: p.image,
      color: p.color,
      microchipId: p.microchipId
    }));
    setPets(convertedPets);
    
    // Load other data from user-specific storage
    const storageKey = getStorageKey();
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Validate requests have the new format
        const validRequests = (data.requests || []).filter((req: any) => 
          req.price !== undefined && 
          req.appointmentDate !== undefined && 
          req.appointmentTime !== undefined
        );
        setAppointments(data.appointments || []);
        setRequests(validRequests);
        setBills(data.bills || []);
        setActivities(data.activities || []);
      } catch (e) {
        // If parse error, start fresh
        setAppointments([]);
        setRequests([]);
        setBills([]);
        setActivities([]);
      }
    } else {
      // First time user - start with empty data
      setAppointments([]);
      setRequests([]);
      setBills([]);
      setActivities([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify({
      pets,
      appointments,
      requests,
      bills,
      activities
    }));
  }, [pets, appointments, requests, bills, activities, user]);

  const addPet = (pet: Pet) => {
    if (!user) return;
    
    // Save to pet-storage (database chung)
    const storedPet: Omit<StoredPet, 'id' | 'created_at'> = {
      userId: user.id,
      name: pet.name,
      species: (pet.species as any) || "Khác",
      breed: pet.breed,
      age: pet.age ? `${pet.age} tuổi` : "Chưa rõ",
      dateOfBirth: pet.birthday,
      weight: pet.weight,
      gender: pet.gender === "male" ? "Đực" : pet.gender === "female" ? "Cái" : undefined,
      status: "healthy",
      image: pet.image,
      color: pet.color,
      microchipId: pet.microchipId
    };
    
    createPetInStorage(storedPet);
    
    // Update local state
    setPets([...pets, pet]);
    addActivity({
      id: Date.now(),
      title: 'Thêm thú cưng mới',
      description: `${pet.name} đã được thêm vào danh sách`,
      timestamp: new Date().toISOString(),
      type: 'pet'
    });
  };

  const updatePet = (id: number, pet: Pet) => {
    if (!user) return;
    
    // Update in pet-storage
    const petId = `pet${id}`;
    updatePetInStorage(petId, {
      name: pet.name,
      species: (pet.species as any) || "Khác",
      breed: pet.breed,
      age: pet.age ? `${pet.age} tuổi` : "Chưa rõ",
      dateOfBirth: pet.birthday,
      weight: pet.weight,
      gender: pet.gender === "male" ? "Đực" : pet.gender === "female" ? "Cái" : undefined,
      image: pet.image,
      color: pet.color,
      microchipId: pet.microchipId
    });
    
    // Update local state
    setPets(pets.map(p => p.id === id ? pet : p));
  };

  const removePet = (id: number) => {
    if (!user) return;
    
    // Delete from pet-storage
    const petId = `pet${id}`;
    deletePetFromStorage(petId);
    
    // Update local state
    setPets(pets.filter(pet => pet.id !== id));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
    addActivity({
      id: Date.now(),
      title: 'Đã đặt lịch hẹn',
      description: `${appointment.service} cho ${appointment.petName} - ${appointment.date} lúc ${appointment.time}`,
      timestamp: new Date().toISOString(),
      type: 'appointment'
    });
  };

  const removeAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const addRequest = (request: ServiceRequest) => {
    setRequests([...requests, request]);
  };

  const removeRequest = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const updateRequestStatus = (id: number, status: ServiceRequest['status']) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const assignVetToRequest = (requestId: number, vetId: string, vetName: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, vetId, vetName } : req
    ));
  };

  const markAsCompleted = (requestId: number) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'completed', completedAt: new Date().toISOString() } : req
    ));
  };

  const addBill = (bill: Bill) => {
    setBills([...bills, bill]);
    addActivity({
      id: Date.now(),
      title: 'Hóa đơn mới',
      description: bill.description,
      timestamp: new Date().toISOString(),
      type: 'bill'
    });
  };

  const updateBillStatus = (id: number, status: Bill['status']) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, status } : bill
    ));
  };

  const addActivity = (activity: Activity) => {
    setActivities(prev => [activity, ...prev].slice(0, 10));
  };

  const getTotalPets = () => pets.length;
  
  const getUpcomingAppointments = () => 
    appointments.filter(apt => apt.status === 'upcoming').length;
  
  const getActiveRequests = () => 
    requests.filter(req => req.status === 'pending').length;
  
  const getPendingBills = () => 
    bills.filter(bill => bill.status === 'pending').length;
  
  const getPendingBillsTotal = () => 
    bills
      .filter(bill => bill.status === 'pending')
      .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <DashboardContext.Provider
      value={{
        pets,
        appointments,
        requests,
        bills,
        activities,
        addPet,
        updatePet,
        removePet,
        addAppointment,
        removeAppointment,
        addRequest,
        removeRequest,
        updateRequestStatus,
        assignVetToRequest,
        markAsCompleted,
        addBill,
        updateBillStatus,
        addActivity,
        getTotalPets,
        getUpcomingAppointments,
        getActiveRequests,
        getPendingBills,
        getPendingBillsTotal
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}