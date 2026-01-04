import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowUpRight,
  Calendar,
  Stethoscope,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockMedicalRecords } from "@/data/mockMedicalRecords";
import { mockPatients } from "@/data/mockPatients";
import { formatDateID } from "@/utils/patient";
import {
  interpretBloodPressure,
  interpretTemperature,
} from "@/utils/medicalRecord";

type FilterStatus = "all" | "completed" | "draft" | "archived";

export default function MedicalRecordsList() {
  const navigate = useNavigate();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // Get patient map for quick lookup
  const patientMap = useMemo(
    () => new Map(mockPatients.map((p) => [p.id, p])),
    []
  );

  // Filter records
  const filteredRecords = useMemo(() => {
    let records = [...mockMedicalRecords];

    // Sort by date (newest first)
    records.sort(
      (a, b) =>
        new Date(b.consultationDate).getTime() -
        new Date(a.consultationDate).getTime()
    );

    // Filter by status
    if (filterStatus !== "all") {
      records = records.filter((r) => r.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      records = records.filter((r) => {
        const patient = patientMap.get(r.patientId);
        return (
          r.diagnosis.toLowerCase().includes(term) ||
          r.anamnesis.mainComplaint.toLowerCase().includes(term) ||
          r.createdBy.toLowerCase().includes(term) ||
          patient?.name.toLowerCase().includes(term) ||
          r.medicalRecordNumber.toLowerCase().includes(term)
        );
      });
    }

    return records;
  }, [searchTerm, filterStatus, patientMap]);

  const completedCount = mockMedicalRecords.filter(
    (r) => r.status === "completed"
  ).length;
  const draftCount = mockMedicalRecords.filter(
    (r) => r.status === "draft"
  ).length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">Rekam Medis</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola dan lihat semua rekam medis pasien
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-bold text-foreground">
              {mockMedicalRecords.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Selesai:</span>
            <span className="font-bold text-green-700">{completedCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Draft:</span>
            <span className="font-bold text-yellow-700">{draftCount}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-6xl">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari pasien, diagnosis, keluhan, atau dokter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                  className="px-4 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Semua Status</option>
                  <option value="completed">Selesai</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Arsip</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results info */}
          {filteredRecords.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              Menampilkan {filteredRecords.length} dari{" "}
              {mockMedicalRecords.length} rekam medis
            </p>
          )}

          {/* Records List */}
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-lg border border-dashed border-border p-12 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Tidak ada rekam medis yang sesuai dengan kriteria pencarian"
                  : "Belum ada rekam medis"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
              >
                Hapus Filter
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((record) => {
                const patient = patientMap.get(record.patientId);
                const bpStatus = interpretBloodPressure(
                  record.vitalSigns.bloodPressureSystolic,
                  record.vitalSigns.bloodPressureDiastolic
                );

                return (
                  <button
                    key={record.id}
                    onClick={() =>
                      navigate(`/medical-records/${record.patientId}`)
                    }
                    className="w-full bg-white rounded-lg border border-border p-4 hover:border-primary hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {patient?.name || "Pasien Tidak Ditemukan"}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            ({record.medicalRecordNumber})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDateID(record.consultationDate)}
                          <span className="mx-1">•</span>
                          <Stethoscope className="w-3 h-3" />
                          {record.createdBy}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            record.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : record.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {record.status === "completed"
                            ? "Selesai"
                            : record.status === "draft"
                              ? "Draft"
                              : "Arsip"}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Main Complaint */}
                      <div className="bg-blue-50 p-2 rounded border border-blue-200">
                        <p className="text-xs font-medium text-blue-900 mb-1">
                          Keluhan
                        </p>
                        <p className="text-sm text-foreground line-clamp-2">
                          {record.anamnesis.mainComplaint}
                        </p>
                      </div>

                      {/* Diagnosis */}
                      <div className="bg-purple-50 p-2 rounded border border-purple-200">
                        <p className="text-xs font-medium text-purple-900 mb-1">
                          Diagnosis
                        </p>
                        <p className="text-sm text-foreground font-medium">
                          {record.diagnosis}
                        </p>
                      </div>

                      {/* Vital Signs */}
                      <div className={`p-2 rounded border ${bpStatus.color === "text-green-700" ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
                        <p className={`text-xs font-medium mb-1 ${bpStatus.color}`}>
                          Tekanan Darah
                        </p>
                        <p className={`text-sm font-semibold ${bpStatus.color}`}>
                          {record.vitalSigns.bloodPressureSystolic}/
                          {record.vitalSigns.bloodPressureDiastolic} mmHg
                        </p>
                        <p className={`text-xs ${bpStatus.color}`}>
                          {bpStatus.status}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
