import { useState, useEffect } from "react";
import { X, Plus, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalRecord, Therapy, MedicalAction } from "@/types/medicalRecord";
import { formatDateForInput } from "@/utils/patient";
import {
  interpretBloodPressure,
  interpretPulse,
  interpretSpO2,
  interpretTemperature,
  formatVitalSigns,
} from "@/utils/medicalRecord";
import { masterDiagnoses } from "@/data/mockMedicalRecords";

interface MedicalRecordFormProps {
  record?: MedicalRecord;
  patientName: string;
  patientMRN: string;
  onSave: (record: Partial<MedicalRecord>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function MedicalRecordForm({
  record,
  patientName,
  patientMRN,
  onSave,
  onCancel,
  isOpen,
}: MedicalRecordFormProps) {
  const [formData, setFormData] = useState<Partial<MedicalRecord>>({});
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [medicalActions, setMedicalActions] = useState<MedicalAction[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTherapy, setNewTherapy] = useState<Partial<Therapy>>({});
  const [newAction, setNewAction] = useState<Partial<MedicalAction>>({});

  useEffect(() => {
    if (record) {
      setFormData(record);
      setTherapies(record.therapies || []);
      setMedicalActions(record.medicalActions || []);
    } else {
      setFormData({
        consultationDate: new Date().toISOString().split("T")[0],
        vitalSigns: {
          bloodPressureSystolic: 0,
          bloodPressureDiastolic: 0,
          pulse: 0,
          spO2: 0,
          temperature: 0,
          measuredAt: new Date().toISOString(),
        },
        anamnesis: {
          mainComplaint: "",
          pastIllnessHistory: "",
          familyIllnessHistory: "",
          treatmentHistory: "",
        },
        physicalExamination: {
          examination: "",
          examinationDate: new Date().toISOString().split("T")[0],
        },
        diagnosis: "",
        therapies: [],
        medicalActions: [],
        status: "draft",
      });
      setTherapies([]);
      setMedicalActions([]);
    }
    setErrors({});
    setNewTherapy({});
    setNewAction({});
  }, [record, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.consultationDate) {
      newErrors.consultationDate = "Tanggal konsultasi harus diisi";
    }
    if (
      !formData.vitalSigns?.bloodPressureSystolic ||
      !formData.vitalSigns?.bloodPressureDiastolic
    ) {
      newErrors.vitalSigns = "Tekanan darah harus diisi";
    }
    if (!formData.anamnesis?.mainComplaint) {
      newErrors.mainComplaint = "Keluhan utama harus diisi";
    }
    if (!formData.diagnosis) {
      newErrors.diagnosis = "Diagnosis harus dipilih";
    }
    if (!formData.physicalExamination?.examination) {
      newErrors.examination = "Pemeriksaan fisik harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTherapy = () => {
    if (newTherapy.medicineName && newTherapy.dosage && newTherapy.frequency) {
      setTherapies([
        ...therapies,
        {
          medicineName: newTherapy.medicineName || "",
          dosage: newTherapy.dosage || "",
          frequency: newTherapy.frequency || "",
          duration: newTherapy.duration || "",
          notes: newTherapy.notes,
        },
      ]);
      setNewTherapy({});
    }
  };

  const handleRemoveTherapy = (index: number) => {
    setTherapies(therapies.filter((_, i) => i !== index));
  };

  const handleAddAction = () => {
    if (newAction.action) {
      setMedicalActions([
        ...medicalActions,
        {
          action: newAction.action || "",
          description: newAction.description,
          notes: newAction.notes,
        },
      ]);
      setNewAction({});
    }
  };

  const handleRemoveAction = (index: number) => {
    setMedicalActions(medicalActions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const savedRecord: Partial<MedicalRecord> = {
      ...formData,
      therapies,
      medicalActions,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onSave(savedRecord);
  };

  if (!isOpen) return null;

  const bpStatus = interpretBloodPressure(
    formData.vitalSigns?.bloodPressureSystolic || 0,
    formData.vitalSigns?.bloodPressureDiastolic || 0
  );
  const pulseStatus = interpretPulse(formData.vitalSigns?.pulse || 0);
  const spO2Status = interpretSpO2(formData.vitalSigns?.spO2 || 0);
  const tempStatus = interpretTemperature(formData.vitalSigns?.temperature || 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {record ? "Edit Rekam Medis" : "Buat Rekam Medis Baru"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {patientName} ({patientMRN})
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Consultation Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Tanggal Konsultasi *
              </label>
              <input
                type="date"
                value={
                  formData.consultationDate
                    ? formatDateForInput(formData.consultationDate)
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    consultationDate: e.target.value,
                  })
                }
                className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.consultationDate ? "border-destructive" : "border-border"
                }`}
              />
              {errors.consultationDate && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.consultationDate}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Tanggal Konsultasi Terakhir
              </label>
              <input
                type="date"
                value={
                  formData.lastConsultationDate
                    ? formatDateForInput(formData.lastConsultationDate)
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastConsultationDate: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Tanggal Reservasi
              </label>
              <input
                type="date"
                value={
                  formData.reservationDate
                    ? formatDateForInput(formData.reservationDate)
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reservationDate: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Vital Signs */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tanda Vital</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Blood Pressure */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Tekanan Darah (mmHg) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Sistol"
                    value={formData.vitalSigns?.bloodPressureSystolic || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vitalSigns: {
                          ...formData.vitalSigns!,
                          bloodPressureSystolic: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className={`flex-1 px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.vitalSigns ? "border-destructive" : "border-border"
                    }`}
                  />
                  <span className="flex items-center text-foreground">/</span>
                  <input
                    type="number"
                    placeholder="Diastol"
                    value={formData.vitalSigns?.bloodPressureDiastolic || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vitalSigns: {
                          ...formData.vitalSigns!,
                          bloodPressureDiastolic: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className={`flex-1 px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.vitalSigns ? "border-destructive" : "border-border"
                    }`}
                  />
                </div>
                {errors.vitalSigns && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.vitalSigns}
                  </p>
                )}
                {formData.vitalSigns?.bloodPressureSystolic && (
                  <p className={`text-xs mt-1 ${bpStatus.color}`}>
                    {bpStatus.status}: {bpStatus.recommendation}
                  </p>
                )}
              </div>

              {/* Pulse */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Nadi (bpm)
                </label>
                <input
                  type="number"
                  value={formData.vitalSigns?.pulse || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vitalSigns: {
                        ...formData.vitalSigns!,
                        pulse: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {formData.vitalSigns?.pulse && (
                  <p className={`text-xs mt-1 ${pulseStatus.color}`}>
                    {pulseStatus.status}
                  </p>
                )}
              </div>

              {/* SpO2 */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.vitalSigns?.spO2 || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vitalSigns: {
                        ...formData.vitalSigns!,
                        spO2: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {formData.vitalSigns?.spO2 && (
                  <p className={`text-xs mt-1 ${spO2Status.color}`}>
                    {spO2Status.status}
                    {spO2Status.recommendation &&
                      `: ${spO2Status.recommendation}`}
                  </p>
                )}
              </div>

              {/* Temperature */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Suhu Tubuh (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.vitalSigns?.temperature || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vitalSigns: {
                        ...formData.vitalSigns!,
                        temperature: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {formData.vitalSigns?.temperature && (
                  <p className={`text-xs mt-1 ${tempStatus.color}`}>
                    {tempStatus.status}
                    {tempStatus.recommendation && `: ${tempStatus.recommendation}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Anamnesis */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Anamnesis</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Keluhan Utama *
                </label>
                <textarea
                  value={formData.anamnesis?.mainComplaint || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anamnesis: {
                        ...formData.anamnesis!,
                        mainComplaint: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.mainComplaint ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Apa keluhan pasien?"
                />
                {errors.mainComplaint && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.mainComplaint}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  placeholder="Riwayat penyakit masa lalu"
                  value={formData.anamnesis?.pastIllnessHistory || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anamnesis: {
                        ...formData.anamnesis!,
                        pastIllnessHistory: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Riwayat penyakit keluarga"
                  value={formData.anamnesis?.familyIllnessHistory || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anamnesis: {
                        ...formData.anamnesis!,
                        familyIllnessHistory: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <textarea
                placeholder="Riwayat pengobatan"
                value={formData.anamnesis?.treatmentHistory || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    anamnesis: {
                      ...formData.anamnesis!,
                      treatmentHistory: e.target.value,
                    },
                  })
                }
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Physical Examination */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Pemeriksaan Fisik
            </h3>
            <textarea
              placeholder="Hasil pemeriksaan fisik..."
              value={formData.physicalExamination?.examination || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  physicalExamination: {
                    ...formData.physicalExamination!,
                    examination: e.target.value,
                  },
                })
              }
              rows={4}
              className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.examination ? "border-destructive" : "border-border"
              }`}
            />
            {errors.examination && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.examination}
              </p>
            )}
          </div>

          {/* Diagnosis */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Diagnosis</h3>
            <select
              value={formData.diagnosis || ""}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary mb-4 ${
                errors.diagnosis ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">Pilih diagnosis...</option>
              {masterDiagnoses.map((diag) => (
                <option key={diag} value={diag}>
                  {diag}
                </option>
              ))}
            </select>
            {errors.diagnosis && (
              <p className="text-xs text-destructive mb-4 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.diagnosis}
              </p>
            )}

            <textarea
              placeholder="Catatan diagnosis"
              value={formData.diagnosisNotes || ""}
              onChange={(e) =>
                setFormData({ ...formData, diagnosisNotes: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Therapies */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Terapi/Obat</h3>
            {therapies.length > 0 && (
              <div className="space-y-2 mb-4">
                {therapies.map((therapy, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-3 rounded-lg border border-border flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {therapy.medicineName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {therapy.dosage} - {therapy.frequency} - {therapy.duration}
                      </p>
                      {therapy.notes && (
                        <p className="text-xs text-muted-foreground italic">
                          Catatan: {therapy.notes}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveTherapy(idx)}
                      className="text-destructive hover:text-destructive/80 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 p-4 border-2 border-dashed border-border rounded-lg bg-gray-50">
              <input
                type="text"
                placeholder="Nama obat"
                value={newTherapy.medicineName || ""}
                onChange={(e) =>
                  setNewTherapy({ ...newTherapy, medicineName: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Dosis (e.g., 500mg)"
                  value={newTherapy.dosage || ""}
                  onChange={(e) =>
                    setNewTherapy({ ...newTherapy, dosage: e.target.value })
                  }
                  className="px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Frekuensi (e.g., 3x sehari)"
                  value={newTherapy.frequency || ""}
                  onChange={(e) =>
                    setNewTherapy({ ...newTherapy, frequency: e.target.value })
                  }
                  className="px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Durasi (e.g., 7 hari)"
                  value={newTherapy.duration || ""}
                  onChange={(e) =>
                    setNewTherapy({ ...newTherapy, duration: e.target.value })
                  }
                  className="px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="text"
                placeholder="Catatan (opsional)"
                value={newTherapy.notes || ""}
                onChange={(e) =>
                  setNewTherapy({ ...newTherapy, notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddTherapy}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Obat
              </Button>
            </div>
          </div>

          {/* Medical Actions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Tindakan Medis
            </h3>
            {medicalActions.length > 0 && (
              <div className="space-y-2 mb-4">
                {medicalActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-3 rounded-lg border border-border flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {action.action}
                      </p>
                      {action.description && (
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      )}
                      {action.notes && (
                        <p className="text-xs text-muted-foreground italic">
                          Catatan: {action.notes}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveAction(idx)}
                      className="text-destructive hover:text-destructive/80 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 p-4 border-2 border-dashed border-border rounded-lg bg-gray-50">
              <input
                type="text"
                placeholder="Nama tindakan (e.g., Injeksi)"
                value={newAction.action || ""}
                onChange={(e) =>
                  setNewAction({ ...newAction, action: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Deskripsi tindakan (opsional)"
                value={newAction.description || ""}
                onChange={(e) =>
                  setNewAction({ ...newAction, description: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Catatan (opsional)"
                value={newAction.notes || ""}
                onChange={(e) =>
                  setNewAction({ ...newAction, notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddAction}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Tindakan
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-6 border-t border-border sticky bottom-0 bg-white">
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {record ? "Simpan Perubahan" : "Buat Rekam Medis"}
          </Button>
        </div>
      </div>
    </div>
  );
}
