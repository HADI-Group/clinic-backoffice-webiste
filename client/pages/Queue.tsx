import { useState, useMemo } from "react";
import { Clock, CheckCircle2, AlertCircle, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockQueueEntries, getQueueStats, updateQueueEntryStatus, addQueueEntry, getNextQueueNumber } from "@/data/mockQueue";
import { mockPatients } from "@/data/mockPatients";
import { QueueEntry } from "@/types/queue";
import { formatDateID } from "@/utils/patient";

export default function Queue() {
  const [queueEntries, setQueueEntries] = useState(mockQueueEntries);
  const [isAddingQueue, setIsAddingQueue] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [queueType, setQueueType] = useState<"registration" | "checkup" | "followup">("registration");
  const [priority, setPriority] = useState<"normal" | "urgent" | "vip">("normal");

  const stats = useMemo(() => getQueueStats(), [queueEntries]);

  const queuesByStatus = useMemo(() => {
    return {
      waiting: queueEntries.filter((q) => q.status === "waiting"),
      inProgress: queueEntries.filter((q) => q.status === "in_progress"),
      done: queueEntries.filter((q) => q.status === "done"),
    };
  }, [queueEntries]);

  const handleAddToQueue = () => {
    if (!selectedPatientId) return;

    const patient = mockPatients.find((p) => p.id === selectedPatientId);
    if (!patient) return;

    const newEntry: QueueEntry = {
      id: `q-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      medicalRecordNumber: patient.medicalRecordNumber,
      queueNumber: getNextQueueNumber(),
      queueType,
      status: "waiting",
      checkInTime: new Date().toISOString(),
      priority,
      createdAt: new Date().toISOString(),
    };

    addQueueEntry(newEntry);
    setQueueEntries([...queueEntries, newEntry]);
    setIsAddingQueue(false);
    setSelectedPatientId("");
    setQueueType("registration");
    setPriority("normal");
  };

  const handleStatusChange = (id: string, newStatus: QueueEntry["status"]) => {
    updateQueueEntryStatus(id, newStatus);
    setQueueEntries(
      queueEntries.map((q) =>
        q.id === id ? { ...q, status: newStatus } : q
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Antrian & Pendaftaran</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola antrian pasien dan status konsultasi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Total Antrian</p>
            <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-600 font-medium">Menunggu</p>
            <p className="text-3xl font-bold text-yellow-900">{stats.waiting}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-600 font-medium">Sedang Dilayani</p>
            <p className="text-3xl font-bold text-orange-900">{stats.inProgress}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600 font-medium">Selesai</p>
            <p className="text-3xl font-bold text-green-900">{stats.done}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <p className="text-sm text-gray-600 font-medium">Rata-rata Tunggu</p>
            <p className="text-3xl font-bold text-gray-900">{stats.averageWaitTime} min</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-7xl">
          {/* Add to Queue Button */}
          <div className="mb-6">
            <Button
              onClick={() => setIsAddingQueue(!isAddingQueue)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah ke Antrian
            </Button>
          </div>

          {/* Add Queue Form */}
          {isAddingQueue && (
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Daftarkan Pasien ke Antrian
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Pilih Pasien *
                  </label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Pilih Pasien --</option>
                    {mockPatients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.medicalRecordNumber})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Jenis Antrian
                  </label>
                  <select
                    value={queueType}
                    onChange={(e) => setQueueType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="registration">Pendaftaran</option>
                    <option value="checkup">Pemeriksaan</option>
                    <option value="followup">Follow-up</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Prioritas
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddToQueue}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Tambah ke Antrian
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingQueue(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {/* Queue Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Waiting Column */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="bg-yellow-50 border-b border-yellow-200 p-4">
                <h2 className="text-lg font-semibold text-yellow-900 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Menunggu ({queuesByStatus.waiting.length})
                </h2>
              </div>
              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {queuesByStatus.waiting.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Tidak ada pasien menunggu
                  </p>
                ) : (
                  queuesByStatus.waiting.map((q) => (
                    <div key={q.id} className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-2xl font-bold text-yellow-900">
                            #{q.queueNumber}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {q.patientName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {q.medicalRecordNumber}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          q.priority === "urgent"
                            ? "bg-red-100 text-red-800"
                            : q.priority === "vip"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {q.priority === "urgent" ? "🔴 Urgent" : q.priority === "vip" ? "⭐ VIP" : "Normal"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {q.queueType === "registration" ? "Pendaftaran" : q.queueType === "checkup" ? "Pemeriksaan" : "Follow-up"}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(q.id, "in_progress")}
                        className="w-full text-xs"
                      >
                        Mulai Layani
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="bg-orange-50 border-b border-orange-200 p-4">
                <h2 className="text-lg font-semibold text-orange-900 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Sedang Dilayani ({queuesByStatus.inProgress.length})
                </h2>
              </div>
              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {queuesByStatus.inProgress.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Tidak ada pasien yang sedang dilayani
                  </p>
                ) : (
                  queuesByStatus.inProgress.map((q) => (
                    <div key={q.id} className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-2xl font-bold text-orange-900">
                            #{q.queueNumber}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {q.patientName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {q.medicalRecordNumber}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          q.priority === "urgent"
                            ? "bg-red-100 text-red-800"
                            : q.priority === "vip"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {q.priority === "urgent" ? "🔴 Urgent" : q.priority === "vip" ? "⭐ VIP" : "Normal"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Dimulai: {q.startTime ? new Date(q.startTime).toLocaleTimeString("id-ID") : "-"}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(q.id, "done")}
                        className="w-full text-xs"
                      >
                        Selesaikan
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="bg-green-50 border-b border-green-200 p-4">
                <h2 className="text-lg font-semibold text-green-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Selesai ({queuesByStatus.done.length})
                </h2>
              </div>
              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {queuesByStatus.done.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Belum ada pasien yang selesai
                  </p>
                ) : (
                  queuesByStatus.done.map((q) => (
                    <div key={q.id} className="bg-green-50 border border-green-200 p-3 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-2xl font-bold text-green-900">
                            #{q.queueNumber}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {q.patientName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {q.medicalRecordNumber}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Selesai: {q.endTime ? new Date(q.endTime).toLocaleTimeString("id-ID") : "-"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
