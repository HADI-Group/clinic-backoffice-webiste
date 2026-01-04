import { MedicalRecord } from "@/types/medicalRecord";
import { Calendar, Stethoscope, AlertCircle, Pill, Activity } from "lucide-react";
import {
  interpretBloodPressure,
  interpretTemperature,
} from "@/utils/medicalRecord";

interface MedicalRecordTimelineProps {
  records: MedicalRecord[];
  onSelectRecord?: (record: MedicalRecord) => void;
}

export default function MedicalRecordTimeline({
  records,
  onSelectRecord,
}: MedicalRecordTimelineProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">Belum ada rekam medis untuk pasien ini</p>
      </div>
    );
  }

  // Sort records by date (newest first)
  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(b.consultationDate).getTime() -
      new Date(a.consultationDate).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedRecords.map((record, index) => {
        const bpStatus = interpretBloodPressure(
          record.vitalSigns.bloodPressureSystolic,
          record.vitalSigns.bloodPressureDiastolic
        );
        const tempStatus = interpretTemperature(record.vitalSigns.temperature);
        const consultationDate = new Date(record.consultationDate);
        const formattedDate = consultationDate.toLocaleDateString("id-ID", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div
            key={record.id}
            className="relative border-l-4 border-primary pb-6 pl-6 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
            onClick={() => onSelectRecord?.(record)}
          >
            {/* Timeline dot */}
            <div className="absolute -left-3 top-4 w-6 h-6 bg-primary rounded-full border-4 border-white" />

            {/* Date and status */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">{formattedDate}</h3>
              </div>
              <div className="flex gap-2">
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
              </div>
            </div>

            {/* Doctor and MRN */}
            <p className="text-sm text-muted-foreground mb-3">
              Dokter: <span className="font-medium">{record.createdBy}</span>
            </p>

            {/* Main Complaint and Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 flex items-center gap-2 mb-1">
                  <AlertCircle className="w-3 h-3" />
                  Keluhan Utama
                </p>
                <p className="text-sm text-foreground">
                  {record.anamnesis.mainComplaint}
                </p>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-xs font-semibold text-purple-900 flex items-center gap-2 mb-1">
                  <Stethoscope className="w-3 h-3" />
                  Diagnosis
                </p>
                <p className="text-sm text-foreground font-medium">
                  {record.diagnosis}
                </p>
                {record.diagnosisNotes && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    {record.diagnosisNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200 mb-4">
              <p className="text-xs font-semibold text-orange-900 flex items-center gap-2 mb-3">
                <Activity className="w-3 h-3" />
                Tanda Vital
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Tekanan Darah</p>
                  <p className={`font-semibold ${bpStatus.color}`}>
                    {record.vitalSigns.bloodPressureSystolic}/
                    {record.vitalSigns.bloodPressureDiastolic} mmHg
                  </p>
                  <p className={`text-xs ${bpStatus.color}`}>
                    {bpStatus.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nadi</p>
                  <p className="font-semibold text-foreground">
                    {record.vitalSigns.pulse} bpm
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">SpO2</p>
                  <p className="font-semibold text-foreground">
                    {record.vitalSigns.spO2}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Suhu</p>
                  <p className={`font-semibold ${tempStatus.color}`}>
                    {record.vitalSigns.temperature}°C
                  </p>
                  <p className={`text-xs ${tempStatus.color}`}>
                    {tempStatus.status}
                  </p>
                </div>
              </div>
            </div>

            {/* History details */}
            <div className="space-y-3">
              {record.anamnesis.pastIllnessHistory && (
                <div className="bg-gray-50 p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    Riwayat Penyakit Lalu
                  </p>
                  <p className="text-sm text-foreground">
                    {record.anamnesis.pastIllnessHistory}
                  </p>
                </div>
              )}

              {record.anamnesis.familyIllnessHistory && (
                <div className="bg-gray-50 p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    Riwayat Penyakit Keluarga
                  </p>
                  <p className="text-sm text-foreground">
                    {record.anamnesis.familyIllnessHistory}
                  </p>
                </div>
              )}

              {record.physicalExamination.examination && (
                <div className="bg-gray-50 p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    Pemeriksaan Fisik
                  </p>
                  <p className="text-sm text-foreground">
                    {record.physicalExamination.examination}
                  </p>
                </div>
              )}
            </div>

            {/* Therapy */}
            {record.therapies && record.therapies.length > 0 && (
              <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-xs font-semibold text-green-900 flex items-center gap-2 mb-2">
                  <Pill className="w-3 h-3" />
                  Terapi ({record.therapies.length} obat)
                </p>
                <div className="space-y-1">
                  {record.therapies.map((therapy, idx) => (
                    <p key={idx} className="text-xs text-foreground">
                      <span className="font-medium">{therapy.medicineName}</span>{" "}
                      {therapy.dosage} - {therapy.frequency} ({therapy.duration})
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Medical Actions */}
            {record.medicalActions && record.medicalActions.length > 0 && (
              <div className="mt-4 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <p className="text-xs font-semibold text-indigo-900 mb-2">
                  Tindakan Medis ({record.medicalActions.length})
                </p>
                <div className="space-y-1">
                  {record.medicalActions.map((action, idx) => (
                    <p key={idx} className="text-xs text-foreground">
                      <span className="font-medium">• {action.action}</span>
                      {action.notes && ` - ${action.notes}`}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
