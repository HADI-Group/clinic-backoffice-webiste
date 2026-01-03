import { Patient } from "@/types/patient";

export const mockPatients: Patient[] = [
  {
    id: "1",
    medicalRecordNumber: "RM-2026/UMM/001",
    name: "Siti Nurhaliza",
    dateOfBirth: "1990-05-15",
    gender: "female",
    address: "Jl. Merdeka No. 45, Jakarta Pusat",
    bloodType: "O",
    occupation: "Guru",
    phone: "081234567890",
    email: "siti@email.com",
    weight: 60,
    height: 160,
    treatmentCategory: "umum",
    diagnosis: "Hipertensi",
    createdAt: "2026-01-10",
    lastConsultationDate: "2026-01-15",
  },
  {
    id: "2",
    medicalRecordNumber: "RM-2026/UMM/002",
    name: "Budi Santoso",
    dateOfBirth: "1985-08-22",
    gender: "male",
    address: "Jl. Gatot Subroto No. 12, Jakarta Selatan",
    bloodType: "A",
    occupation: "Akuntan",
    phone: "081234567891",
    email: "budi@email.com",
    weight: 75,
    height: 175,
    treatmentCategory: "umum",
    diagnosis: "Diabetes Melitus",
    createdAt: "2026-01-05",
    lastConsultationDate: "2026-01-14",
  },
  {
    id: "3",
    medicalRecordNumber: "RM-2026/SRK/001",
    name: "Andi Wijaya",
    dateOfBirth: "2008-03-10",
    gender: "male",
    address: "Jl. Sudirman No. 78, Jakarta Barat",
    bloodType: "B",
    occupation: "Pelajar",
    phone: "081234567892",
    email: "andi@email.com",
    weight: 65,
    height: 170,
    treatmentCategory: "sirkumsisi",
    diagnosis: "Medis Umum",
    createdAt: "2026-01-12",
  },
  {
    id: "4",
    medicalRecordNumber: "RM-2026/UMM/003",
    name: "Dewi Lestari",
    dateOfBirth: "1992-11-08",
    gender: "female",
    address: "Jl. Ahmad Yani No. 34, Bandung",
    bloodType: "AB",
    occupation: "Perawat",
    phone: "081234567893",
    email: "dewi@email.com",
    weight: 55,
    height: 158,
    treatmentCategory: "umum",
    diagnosis: "Asma",
    createdAt: "2026-01-08",
    lastConsultationDate: "2026-01-12",
  },
  {
    id: "5",
    medicalRecordNumber: "RM-2026/UMM/004",
    name: "Rudi Hartono",
    dateOfBirth: "1988-07-19",
    gender: "male",
    address: "Jl. Diponegoro No. 56, Surabaya",
    bloodType: "O",
    occupation: "Pengusaha",
    phone: "081234567894",
    email: "rudi@email.com",
    weight: 80,
    height: 180,
    treatmentCategory: "umum",
    diagnosis: "Kolesterol Tinggi",
    createdAt: "2026-01-03",
    lastConsultationDate: "2026-01-13",
  },
  {
    id: "6",
    medicalRecordNumber: "RM-2026/SRK/002",
    name: "Fajar Pratama",
    dateOfBirth: "2007-09-25",
    gender: "male",
    address: "Jl. Imam Bonjol No. 99, Medan",
    bloodType: "A",
    occupation: "Pelajar",
    phone: "081234567895",
    email: "fajar@email.com",
    weight: 70,
    height: 172,
    treatmentCategory: "sirkumsisi",
    diagnosis: "Medis Umum",
    createdAt: "2026-01-07",
  },
  {
    id: "7",
    medicalRecordNumber: "RM-2026/UMM/005",
    name: "Retno Wijaya",
    dateOfBirth: "1995-02-14",
    gender: "female",
    address: "Jl. Braga No. 23, Bandung",
    bloodType: "O",
    occupation: "Desainer",
    phone: "081234567896",
    email: "retno@email.com",
    weight: 58,
    height: 165,
    treatmentCategory: "umum",
    diagnosis: "Migren",
    createdAt: "2026-01-06",
    lastConsultationDate: "2026-01-11",
  },
  {
    id: "8",
    medicalRecordNumber: "RM-2026/UMM/006",
    name: "Hendra Gunawan",
    dateOfBirth: "1980-12-01",
    gender: "male",
    address: "Jl. Merpati No. 11, Yogyakarta",
    bloodType: "B",
    occupation: "Dokter",
    phone: "081234567897",
    email: "hendra@email.com",
    weight: 72,
    height: 176,
    treatmentCategory: "umum",
    diagnosis: "Flu",
    createdAt: "2026-01-02",
    lastConsultationDate: "2026-01-09",
  },
];

/**
 * Generate a unique sequential number for medical record
 */
export function getNextSequentialNumber(
  category: "umum" | "sirkumsisi",
  existingPatients: Patient[]
): number {
  const categoryPatients = existingPatients.filter(
    (p) => p.treatmentCategory === category
  );
  return categoryPatients.length + 1;
}

/**
 * Get unique diagnoses from all patients
 */
export function getUniqueDiagnoses(patients: Patient[]): string[] {
  const diagnoses = new Set(
    patients
      .map((p) => p.diagnosis)
      .filter((d): d is string => !!d && d !== "Medis Umum")
  );
  return Array.from(diagnoses).sort();
}

/**
 * Group patients by diagnosis
 */
export function groupPatientsByDiagnosis(
  patients: Patient[]
): Record<string, Patient[]> {
  const grouped: Record<string, Patient[]> = {};

  patients.forEach((patient) => {
    const diagnosis = patient.diagnosis || "Tanpa Diagnosis";
    if (!grouped[diagnosis]) {
      grouped[diagnosis] = [];
    }
    grouped[diagnosis].push(patient);
  });

  return grouped;
}
