export type DoctorSpecialization = "umum" | "gigi" | "anak" | "kandungan" | "lain";

export interface Doctor {
  id: string;
  name: string;
  specialization: DoctorSpecialization;
  licenseNumber: string; // STR (Surat Tanda Registrasi)
  phone?: string;
  email?: string;
  address?: string;
  schedule?: DoctorSchedule[];
  isActive: boolean;
  createdAt: string;
}

export interface DoctorSchedule {
  dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface MedicineFormula {
  id: string;
  name: string;
  medicines: MedicineFormulaItem[];
  usage: string; // e.g., "3x sehari, sesudah makan"
  duration: string; // e.g., "7 hari"
  indication?: string; // Diagnosis/indication for use
  notes?: string;
  createdAt: string;
  createdBy: string;
}

export interface MedicineFormulaItem {
  medicineId: string;
  medicineName: string;
  dosage: string; // e.g., "500mg"
  quantity?: number; // Total quantity for the formula
}

export interface DiagnosisCategory {
  id: string;
  name: string;
  code: string; // ICD-10 or similar code
  description?: string;
  relatedMedicines?: string[]; // Medicine IDs
}
