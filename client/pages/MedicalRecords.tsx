import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicalRecordForm from "@/components/MedicalRecordForm";
import MedicalRecordTimeline from "@/components/MedicalRecordTimeline";
import { mockPatients } from "@/data/mockPatients";
import {
  mockMedicalRecords,
  getMedicalRecordsByPatientId,
} from "@/data/mockMedicalRecords";
import { MedicalRecord } from "@/types/medicalRecord";
import { formatDateID } from "@/utils/patient";

type FilterStatus = "all" | "completed" | "draft" | "archived";

export default function MedicalRecords() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  // Get patient data
  const patient = useMemo(
    () => mockPatients.find((p) => p.id === patientId),
    [patientId]
  );

  // Get medical records
  const medicalRecords = useMemo(
    () => (patientId ? getMedicalRecordsByPatientId(patientId) : []),
    [patientId]
  );

  // State management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter records
  const filteredRecords = useMemo(() => {
    let records = [...medicalRecords];

    // Filter by status
    if (filterStatus !== "all") {
      records = records.filter((r) => r.status === filterStatus);
    }

    // Filter by search term (diagnosis, main complaint)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      records = records.filter(
        (r) =>
          r.diagnosis.toLowerCase().includes(term) ||
          r.anamnesis.mainComplaint.toLowerCase().includes(term) ||
          r.createdBy.toLowerCase().includes(term)
      );
    }

    return records;
  }, [medicalRecords, filterStatus, searchTerm]);

  const handleCreateNew = () => {
    setSelectedRecord(null);
    setIsFormOpen(true);
  };

  const handleSelectRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleSaveRecord = (recordData: Partial<MedicalRecord>) => {
    if (selectedRecord) {
      // Edit existing record
      const index = mockMedicalRecords.findIndex(
        (r) => r.id === selectedRecord.id
      );
      if (index !== -1) {
        mockMedicalRecords[index] = {
          ...mockMedicalRecords[index],
          ...recordData,
          updatedAt: new Date().toISOString().split("T")[0],
          updatedBy: "Current User", // In real app, get from auth
        } as MedicalRecord;
      }
    } else {
      // Create new record
      const newRecord: MedicalRecord = {
        id: `mr-${Date.now()}`,
        patientId: patientId || "",
        medicalRecordNumber: patient?.medicalRecordNumber || "",
        consultationDate: recordData.consultationDate || "",
        lastConsultationDate: recordData.lastConsultationDate,
        reservationDate: recordData.reservationDate,
        vitalSigns: recordData.vitalSigns || {
          bloodPressureSystolic: 0,
          bloodPressureDiastolic: 0,
          pulse: 0,
          spO2: 0,
          temperature: 0,
          measuredAt: new Date().toISOString(),
        },
        anamnesis: recordData.anamnesis || {
          mainComplaint: "",
          pastIllnessHistory: "",
          familyIllnessHistory: "",
          treatmentHistory: "",
        },
        physicalExamination: recordData.physicalExamination || {
          examination: "",
          examinationDate: new Date().toISOString().split("T")[0],
        },
        diagnosis: recordData.diagnosis || "",
        diagnosisNotes: recordData.diagnosisNotes,
        therapies: recordData.therapies || [],
        medicalActions: recordData.medicalActions || [],
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: "Current User", // In real app, get from auth
        status: recordData.status || "completed",
      };
      mockMedicalRecords.push(newRecord);
    }

    setIsFormOpen(false);
    setSelectedRecord(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedRecord(null);
  };

  if (!patient) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="border-b border-border bg-white px-8 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Pasien tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const completedCount = medicalRecords.filter(
    (r) => r.status === "completed"
  ).length;
  const draftCount = medicalRecords.filter(
    (r) => r.status === "draft"
  ).length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Rekam Medis
              </h1>
              <p className="text-sm text-muted-foreground">
                {patient.name} ({patient.medicalRecordNumber})
              </p>
            </div>
          </div>
          <Button
            onClick={handleCreateNew}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Buat Rekam Medis Baru
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-bold text-foreground">
              {medicalRecords.length}
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
        <div className="max-w-4xl">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari diagnosis, keluhan, atau dokter..."
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
              Menampilkan {filteredRecords.length} dari {medicalRecords.length}{" "}
              rekam medis
            </p>
          )}

          {/* Timeline */}
          <MedicalRecordTimeline
            records={filteredRecords}
            onSelectRecord={handleSelectRecord}
          />
        </div>

        <div className="h-8" />
      </div>

      {/* Medical Record Form Modal */}
      {isFormOpen && (
        <MedicalRecordForm
          record={selectedRecord || undefined}
          patientName={patient.name}
          patientMRN={patient.medicalRecordNumber}
          onSave={handleSaveRecord}
          onCancel={handleCancel}
          isOpen={isFormOpen}
        />
      )}
    </div>
  );
}
