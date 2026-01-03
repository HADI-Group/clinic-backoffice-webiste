export interface VitalSigns {
  bloodPressureSystolic: number; // mmHg
  bloodPressureDiastolic: number; // mmHg
  pulse: number; // bpm (beats per minute / Nadi)
  spO2: number; // % (oxygen saturation)
  temperature: number; // Celsius
  measuredAt: string; // ISO date time
}

export interface Anamnesis {
  mainComplaint: string;
  pastIllnessHistory: string;
  familyIllnessHistory: string;
  treatmentHistory: string;
}

export interface PhysicalExamination {
  examination: string; // text description
  examinationDate: string; // ISO date
}

export interface MedicalAction {
  action: string;
  description?: string;
  notes?: string;
}

export interface Therapy {
  medicineName: string;
  dosage: string; // e.g., "500mg"
  frequency: string; // e.g., "3x sehari"
  duration: string; // e.g., "7 hari"
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  medicalRecordNumber: string; // Linked from patient
  consultationDate: string; // ISO date (today's consultation)
  lastConsultationDate?: string; // Previous consultation date
  reservationDate?: string; // Reservation-based consultation date

  // Vital Signs
  vitalSigns: VitalSigns;

  // Anamnesis
  anamnesis: Anamnesis;

  // Physical Examination
  physicalExamination: PhysicalExamination;

  // Diagnosis
  diagnosis: string; // Selected from master diagnosis list
  diagnosisNotes?: string;

  // Therapy
  therapies: Therapy[];

  // Medical Actions
  medicalActions: MedicalAction[];

  // Metadata
  createdAt: string; // ISO date
  createdBy: string; // Doctor name
  updatedAt?: string;
  updatedBy?: string;
  status: "draft" | "completed" | "archived";
}

export interface MedicalRecordInput extends Omit<MedicalRecord, "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy"> {
  // Allow partial creation
}
