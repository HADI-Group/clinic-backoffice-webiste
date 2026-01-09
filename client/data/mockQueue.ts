import { QueueEntry, QueueStats } from "@/types/queue";

export const mockQueueEntries: QueueEntry[] = [
  {
    id: "q-1",
    patientId: "1",
    patientName: "Budi Santoso",
    medicalRecordNumber: "RM-2026/UMM/001",
    queueNumber: 1,
    queueType: "checkup",
    status: "in_progress",
    checkInTime: "2026-01-15T08:00:00",
    startTime: "2026-01-15T08:10:00",
    doctorId: "doc-1",
    priority: "normal",
    createdAt: "2026-01-15T08:00:00",
    medicalRecordId: "mr-1",
  },
  {
    id: "q-2",
    patientId: "2",
    patientName: "Siti Nurhaliza",
    medicalRecordNumber: "RM-2026/UMM/002",
    queueNumber: 2,
    queueType: "checkup",
    status: "waiting",
    checkInTime: "2026-01-15T08:15:00",
    priority: "normal",
    createdAt: "2026-01-15T08:15:00",
  },
  {
    id: "q-3",
    patientId: "3",
    patientName: "Ahmad Hidayat",
    medicalRecordNumber: "RM-2026/UMM/003",
    queueNumber: 3,
    queueType: "checkup",
    status: "waiting",
    checkInTime: "2026-01-15T08:20:00",
    priority: "urgent",
    notes: "Demam tinggi",
    createdAt: "2026-01-15T08:20:00",
  },
  {
    id: "q-4",
    patientId: "4",
    patientName: "Rini Wijaya",
    medicalRecordNumber: "RM-2026/UMM/004",
    queueNumber: 4,
    queueType: "followup",
    status: "waiting",
    checkInTime: "2026-01-15T08:30:00",
    priority: "normal",
    createdAt: "2026-01-15T08:30:00",
  },
  {
    id: "q-5",
    patientId: "1",
    patientName: "Budi Santoso",
    medicalRecordNumber: "RM-2026/UMM/001",
    queueNumber: 5,
    queueType: "registration",
    status: "done",
    checkInTime: "2026-01-15T07:00:00",
    startTime: "2026-01-15T07:05:00",
    endTime: "2026-01-15T07:20:00",
    priority: "normal",
    createdAt: "2026-01-15T07:00:00",
  },
];

export function getQueueStats(): QueueStats {
  const stats = {
    total: mockQueueEntries.length,
    waiting: mockQueueEntries.filter((q) => q.status === "waiting").length,
    inProgress: mockQueueEntries.filter((q) => q.status === "in_progress")
      .length,
    done: mockQueueEntries.filter((q) => q.status === "done").length,
    noShow: mockQueueEntries.filter((q) => q.status === "no_show").length,
    averageWaitTime: 15, // Mock value in minutes
  };

  return stats;
}

export function getNextQueueNumber(): number {
  const max = Math.max(
    ...mockQueueEntries.map((q) => q.queueNumber),
    0
  );
  return max + 1;
}

export function addQueueEntry(entry: QueueEntry): void {
  mockQueueEntries.push(entry);
}

export function updateQueueEntryStatus(
  id: string,
  status: QueueEntry["status"]
): void {
  const entry = mockQueueEntries.find((q) => q.id === id);
  if (entry) {
    entry.status = status;
    if (status === "in_progress" && !entry.startTime) {
      entry.startTime = new Date().toISOString();
    }
    if (status === "done" && !entry.endTime) {
      entry.endTime = new Date().toISOString();
    }
  }
}
