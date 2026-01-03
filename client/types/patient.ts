export interface Patient {
  id: string;
  medicalRecordNumber: string;
  name: string;
  dateOfBirth: string; // YYYY-MM-DD format
  gender: "male" | "female";
  address: string;
  bloodType: "O" | "A" | "B" | "AB";
  occupation: string;
  phone?: string;
  email?: string;
  weight?: number; // kg
  height?: number; // cm
  treatmentCategory: "umum" | "sirkumsisi";
  diagnosis?: string;
  createdAt: string;
  lastConsultationDate?: string;
}

export interface PatientFilter {
  search?: string;
  gender?: string;
  ageRange?: [number, number];
  diagnosis?: string;
  treatmentCategory?: string;
}

export type SortField = "name" | "age" | "createdAt" | "medicalRecordNumber";
export type SortOrder = "asc" | "desc";
