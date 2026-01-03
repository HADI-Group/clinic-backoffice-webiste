import { MedicalRecord } from "@/types/medicalRecord";

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr-1",
    patientId: "1",
    medicalRecordNumber: "RM-2026/UMM/001",
    consultationDate: "2026-01-15",
    lastConsultationDate: "2026-01-08",
    reservationDate: "2026-01-14",
    vitalSigns: {
      bloodPressureSystolic: 140,
      bloodPressureDiastolic: 90,
      pulse: 78,
      spO2: 98,
      temperature: 36.8,
      measuredAt: "2026-01-15T09:30:00",
    },
    anamnesis: {
      mainComplaint: "Sakit kepala dan pusing",
      pastIllnessHistory: "Hipertensi sejak 5 tahun lalu",
      familyIllnessHistory: "Ayah punya penyakit jantung",
      treatmentHistory: "Minum obat tekanan darah setiap hari",
    },
    physicalExamination: {
      examination:
        "Kepala: tidak ada kelainan. Dada: simetris, bunyi napas normal. Abdomen: lembut, tidak ada nyeri.",
      examinationDate: "2026-01-15",
    },
    diagnosis: "Hipertensi",
    diagnosisNotes: "Tekanan darah masih tinggi, perlu review pengobatan",
    therapies: [
      {
        medicineName: "Amlodipine",
        dosage: "5mg",
        frequency: "1x sehari",
        duration: "30 hari",
        notes: "Diminum pada malam hari",
      },
      {
        medicineName: "Lisinopril",
        dosage: "10mg",
        frequency: "1x sehari",
        duration: "30 hari",
        notes: "Diminum pada pagi hari",
      },
    ],
    medicalActions: [
      {
        action: "Pemeriksaan Tekanan Darah",
        description: "Tekanan darah diukur dengan sphygmomanometer",
        notes: "Hasil: 140/90 mmHg",
      },
      {
        action: "Pemeriksaan Fisik Umum",
        description: "Pemeriksaan kesehatan umum",
      },
    ],
    createdAt: "2026-01-15",
    createdBy: "Dr. Ahmad Fauzi",
    status: "completed",
  },
  {
    id: "mr-2",
    patientId: "1",
    medicalRecordNumber: "RM-2026/UMM/001",
    consultationDate: "2026-01-08",
    reservationDate: "2026-01-07",
    vitalSigns: {
      bloodPressureSystolic: 145,
      bloodPressureDiastolic: 95,
      pulse: 82,
      spO2: 97,
      temperature: 37.0,
      measuredAt: "2026-01-08T10:00:00",
    },
    anamnesis: {
      mainComplaint: "Sakit kepala",
      pastIllnessHistory: "Hipertensi sejak 5 tahun lalu",
      familyIllnessHistory: "Ayah punya penyakit jantung",
      treatmentHistory: "Minum obat tekanan darah tidak teratur",
    },
    physicalExamination: {
      examination: "Kepala: ada tekanan pada temporal. Dada: normal.",
      examinationDate: "2026-01-08",
    },
    diagnosis: "Hipertensi",
    diagnosisNotes: "Perlu edukasi gaya hidup sehat",
    therapies: [
      {
        medicineName: "Amlodipine",
        dosage: "5mg",
        frequency: "1x sehari",
        duration: "30 hari",
      },
    ],
    medicalActions: [
      {
        action: "Pemeriksaan Tekanan Darah",
        notes: "Hasil: 145/95 mmHg",
      },
    ],
    createdAt: "2026-01-08",
    createdBy: "Dr. Ahmad Fauzi",
    status: "completed",
  },
  {
    id: "mr-3",
    patientId: "2",
    medicalRecordNumber: "RM-2026/UMM/002",
    consultationDate: "2026-01-14",
    reservationDate: "2026-01-13",
    vitalSigns: {
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      pulse: 72,
      spO2: 99,
      temperature: 36.5,
      measuredAt: "2026-01-14T11:30:00",
    },
    anamnesis: {
      mainComplaint: "Kontrol diabetes rutin",
      pastIllnessHistory: "Diabetes melitus tipe 2 sejak 3 tahun",
      familyIllnessHistory: "Ibu punya diabetes",
      treatmentHistory: "Minum metformin 500mg",
    },
    physicalExamination: {
      examination: "Kesehatan umum baik, tidak ada edema pada kaki.",
      examinationDate: "2026-01-14",
    },
    diagnosis: "Diabetes Melitus Tipe 2 - Terkontrol",
    diagnosisNotes: "Gula darah terkontrol dengan baik",
    therapies: [
      {
        medicineName: "Metformin",
        dosage: "500mg",
        frequency: "2x sehari",
        duration: "30 hari",
      },
    ],
    medicalActions: [
      {
        action: "Pemeriksaan Gula Darah",
        notes: "Gula darah puasa: 120 mg/dL (normal)",
      },
      {
        action: "Konsultasi Nutrisi",
        description: "Edukasi diet rendah gula",
      },
    ],
    createdAt: "2026-01-14",
    createdBy: "Dr. Ahmad Fauzi",
    status: "completed",
  },
];

/**
 * Get master diagnosis list
 */
export const masterDiagnoses = [
  "Hipertensi",
  "Diabetes Melitus",
  "Asma",
  "Infeksi Saluran Pernapasan Atas",
  "Gastritis",
  "Kolesterol Tinggi",
  "Migren",
  "Flu",
  "Batuk",
  "Diare",
  "Demam",
  "Nyeri Punggung",
  "Dermatitis",
  "Infeksi Saluran Kemih",
  "Radang Tenggorokan",
];

/**
 * Get medical records by patient ID
 */
export function getMedicalRecordsByPatientId(
  patientId: string
): MedicalRecord[] {
  return mockMedicalRecords
    .filter((mr) => mr.patientId === patientId)
    .sort(
      (a, b) =>
        new Date(b.consultationDate).getTime() -
        new Date(a.consultationDate).getTime()
    );
}

/**
 * Get latest medical record for a patient
 */
export function getLatestMedicalRecord(
  patientId: string
): MedicalRecord | undefined {
  const records = getMedicalRecordsByPatientId(patientId);
  return records[0];
}
