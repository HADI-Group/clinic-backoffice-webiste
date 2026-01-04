export type QueueStatus = "waiting" | "in_progress" | "done" | "no_show";
export type QueueType = "registration" | "checkup" | "followup";

export interface QueueEntry {
  id: string;
  patientId: string;
  patientName: string;
  medicalRecordNumber: string;
  queueNumber: number;
  queueType: QueueType;
  status: QueueStatus;
  checkInTime?: string; // ISO datetime
  startTime?: string; // When doctor started seeing patient
  endTime?: string; // When consultation ended
  doctorId?: string;
  notes?: string;
  priority: "normal" | "urgent" | "vip";
  createdAt: string;
}

export interface QueueStats {
  total: number;
  waiting: number;
  inProgress: number;
  done: number;
  noShow: number;
  averageWaitTime: number; // in minutes
}
