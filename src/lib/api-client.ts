import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b09aa6ec`;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  experience_years: number;
  status: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchDoctorById(doctorId: string): Promise<Doctor | null> {
  try {
    console.log(`[API] Fetching doctor with ID: ${doctorId}`);
    
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`[API] Response status for doctor ${doctorId}:`, response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch doctor ${doctorId}:`, response.statusText, errorText);
      return null;
    }

    const data = await response.json();
    console.log(`[API] Doctor data received:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching doctor ${doctorId}:`, error);
    return null;
  }
}

export async function fetchAllDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch doctors:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}