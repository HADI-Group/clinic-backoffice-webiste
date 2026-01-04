import { Doctor, DiagnosisCategory, MedicineFormula } from "@/types/doctor";

export const mockDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Ahmad Fauzi",
    specialization: "umum",
    licenseNumber: "STR.2019.001",
    phone: "0812-3456-7890",
    email: "ahmad.fauzi@clinic.com",
    address: "Jl. Merdeka No. 123, Jakarta",
    schedule: [
      {
        dayOfWeek: "monday",
        startTime: "08:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "tuesday",
        startTime: "08:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "wednesday",
        startTime: "08:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "thursday",
        startTime: "08:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "friday",
        startTime: "08:00",
        endTime: "16:00",
      },
      {
        dayOfWeek: "saturday",
        startTime: "08:00",
        endTime: "13:00",
      },
    ],
    isActive: true,
    createdAt: "2020-01-01",
  },
  {
    id: "doc-2",
    name: "Dr. Siti Kusumawardani",
    specialization: "kandungan",
    licenseNumber: "STR.2018.002",
    phone: "0812-3456-7891",
    email: "siti.kusumawardani@clinic.com",
    schedule: [
      {
        dayOfWeek: "monday",
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "wednesday",
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "friday",
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: "saturday",
        startTime: "09:00",
        endTime: "13:00",
      },
    ],
    isActive: true,
    createdAt: "2019-06-15",
  },
  {
    id: "doc-3",
    name: "Dr. Bambang Suryanto",
    specialization: "gigi",
    licenseNumber: "STR.2021.003",
    phone: "0812-3456-7892",
    email: "bambang.suryanto@clinic.com",
    schedule: [
      {
        dayOfWeek: "tuesday",
        startTime: "10:00",
        endTime: "18:00",
      },
      {
        dayOfWeek: "wednesday",
        startTime: "10:00",
        endTime: "18:00",
      },
      {
        dayOfWeek: "thursday",
        startTime: "10:00",
        endTime: "18:00",
      },
      {
        dayOfWeek: "friday",
        startTime: "10:00",
        endTime: "18:00",
      },
      {
        dayOfWeek: "saturday",
        startTime: "10:00",
        endTime: "15:00",
      },
    ],
    isActive: true,
    createdAt: "2021-03-20",
  },
];

export const mockDiagnosisCategories: DiagnosisCategory[] = [
  {
    id: "diag-1",
    name: "Hipertensi",
    code: "I10",
    description: "Tekanan darah tinggi",
    relatedMedicines: ["med-1", "med-2"],
  },
  {
    id: "diag-2",
    name: "Diabetes Melitus",
    code: "E11",
    description: "Penyakit diabetes tipe 2",
    relatedMedicines: ["med-3"],
  },
  {
    id: "diag-3",
    name: "Infeksi Saluran Pernapasan",
    code: "J06",
    description: "Infeksi pada saluran pernapasan atas",
    relatedMedicines: ["med-5", "med-6"],
  },
  {
    id: "diag-4",
    name: "Asma",
    code: "J45",
    description: "Penyakit asma/bronkitis asmatikus",
    relatedMedicines: ["med-6"],
  },
  {
    id: "diag-5",
    name: "Gastritis",
    code: "K29",
    description: "Peradangan pada lambung",
    relatedMedicines: ["med-4"],
  },
  {
    id: "diag-6",
    name: "Demam",
    code: "R50",
    description: "Peningkatan suhu tubuh",
    relatedMedicines: ["med-4", "med-8"],
  },
  {
    id: "diag-7",
    name: "Kolesterol Tinggi",
    code: "E78",
    description: "Kadar kolesterol dalam darah tinggi",
  },
  {
    id: "diag-8",
    name: "Migren",
    code: "G43",
    description: "Sakit kepala migrain",
    relatedMedicines: ["med-4"],
  },
];

export const mockMedicineFormulas: MedicineFormula[] = [
  {
    id: "formula-1",
    name: "Hipertensi - Terapi Awal",
    medicines: [
      {
        medicineId: "med-1",
        medicineName: "Amlodipine",
        dosage: "5mg",
      },
    ],
    usage: "1x sehari, malam hari",
    duration: "30 hari",
    indication: "Hipertensi tahap 1",
    createdAt: "2025-01-01",
    createdBy: "Dr. Ahmad Fauzi",
  },
  {
    id: "formula-2",
    name: "Hipertensi - Terapi Kombinasi",
    medicines: [
      {
        medicineId: "med-1",
        medicineName: "Amlodipine",
        dosage: "5mg",
      },
      {
        medicineId: "med-2",
        medicineName: "Lisinopril",
        dosage: "10mg",
      },
    ],
    usage: "1x sehari, pagi hari",
    duration: "30 hari",
    indication: "Hipertensi tahap 2",
    createdAt: "2025-01-01",
    createdBy: "Dr. Ahmad Fauzi",
  },
  {
    id: "formula-3",
    name: "Diabetes Melitus - Kontrol Gula Darah",
    medicines: [
      {
        medicineId: "med-3",
        medicineName: "Metformin",
        dosage: "500mg",
      },
    ],
    usage: "2x sehari, sesudah makan",
    duration: "30 hari",
    indication: "Diabetes melitus tipe 2",
    createdAt: "2025-01-01",
    createdBy: "Dr. Ahmad Fauzi",
  },
  {
    id: "formula-4",
    name: "Infeksi Saluran Pernapasan",
    medicines: [
      {
        medicineId: "med-5",
        medicineName: "Amoxicillin Syrup",
        dosage: "250mg/5ml",
      },
      {
        medicineId: "med-6",
        medicineName: "Cough Syrup",
        dosage: "5ml",
      },
    ],
    usage: "3x sehari, sesudah makan",
    duration: "7 hari",
    indication: "Infeksi saluran pernapasan",
    createdAt: "2025-01-01",
    createdBy: "Dr. Ahmad Fauzi",
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return mockDoctors.find((d) => d.id === id);
}

export function getActiveDoctors(): Doctor[] {
  return mockDoctors.filter((d) => d.isActive);
}

export function getDiagnosisByName(name: string): DiagnosisCategory | undefined {
  return mockDiagnosisCategories.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );
}

export function getFormulaByDiagnosis(
  diagnosisName: string
): MedicineFormula[] {
  return mockMedicineFormulas.filter((f) =>
    f.indication?.toLowerCase().includes(diagnosisName.toLowerCase())
  );
}
