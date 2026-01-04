import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicalRecordTimeline from "@/components/MedicalRecordTimeline";
import { mockPatients } from "@/data/mockPatients";
import { getMedicalRecordsByPatientId } from "@/data/mockMedicalRecords";
import {
  calculateAge,
  calculateBMI,
  getBMICategory,
  formatDateID,
  formatDateForInput,
} from "@/utils/patient";
import { Patient } from "@/types/patient";

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(
    () => mockPatients.find((p) => p.id === id) || null
  );
  const [formData, setFormData] = useState<Patient | null>(patient);

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

  const age = calculateAge(patient.dateOfBirth);
  const bmi =
    patient.weight && patient.height
      ? calculateBMI(patient.weight, patient.height)
      : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  const handleSave = () => {
    if (formData) {
      setPatient(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(patient);
    setIsEditing(false);
  };

  const displayData = isEditing ? formData : patient;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Detail Pasien
              </h1>
              <p className="text-sm text-muted-foreground">
                {patient.medicalRecordNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Simpan
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Batal
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-4xl">
          {/* Personal Data Section */}
          <div className="bg-white rounded-lg border border-border p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Data Pribadi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Nama Lengkap
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.name || ""}
                    onChange={(e) =>
                      setFormData(
                        formData ? { ...formData, name: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{displayData?.name}</p>
                )}
              </div>

              {/* Medical Record Number */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  No. Rekam Medis
                </label>
                <p className="text-foreground font-mono">
                  {displayData?.medicalRecordNumber}
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Tanggal Lahir
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={
                      formData?.dateOfBirth
                        ? formatDateForInput(formData.dateOfBirth)
                        : ""
                    }
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? {
                              ...formData,
                              dateOfBirth: e.target.value,
                            }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <p className="text-foreground">
                    {formatDateID(displayData?.dateOfBirth || "")}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Umur
                </label>
                <p className="text-foreground font-medium">
                  {age} tahun
                </p>
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Jenis Kelamin
                </label>
                {isEditing ? (
                  <select
                    value={formData?.gender || ""}
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? {
                              ...formData,
                              gender: e.target.value as "male" | "female",
                            }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                ) : (
                  <p className="text-foreground">
                    {displayData?.gender === "male" ? "Laki-laki" : "Perempuan"}
                  </p>
                )}
              </div>

              {/* Blood Type */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Golongan Darah
                </label>
                {isEditing ? (
                  <select
                    value={formData?.bloodType || ""}
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? {
                              ...formData,
                              bloodType: e.target.value as
                                | "O"
                                | "A"
                                | "B"
                                | "AB",
                            }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  >
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                  </select>
                ) : (
                  <p className="text-foreground font-semibold text-lg">
                    {displayData?.bloodType}
                  </p>
                )}
              </div>

              {/* Occupation */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Pekerjaan
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.occupation || ""}
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? { ...formData, occupation: e.target.value }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <p className="text-foreground">{displayData?.occupation}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Nomor Telepon
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData?.phone || ""}
                    onChange={(e) =>
                      setFormData(
                        formData ? { ...formData, phone: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <p className="text-foreground">{displayData?.phone || "-"}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData?.email || ""}
                    onChange={(e) =>
                      setFormData(
                        formData ? { ...formData, email: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <p className="text-foreground">{displayData?.email || "-"}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Alamat
                </label>
                {isEditing ? (
                  <textarea
                    value={formData?.address || ""}
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? { ...formData, address: e.target.value }
                          : null
                      )
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <p className="text-foreground">{displayData?.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Physical Measurements Section */}
          {(patient.weight || patient.height) && (
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Pengukuran Fisik
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">
                    Berat Badan (kg)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData?.weight || ""}
                      onChange={(e) =>
                        setFormData(
                          formData
                            ? {
                                ...formData,
                                weight: parseFloat(e.target.value) || 0,
                              }
                            : null
                        )
                      }
                      className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                    />
                  ) : (
                    <p className="text-foreground font-medium">
                      {displayData?.weight} kg
                    </p>
                  )}
                </div>

                {/* Height */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">
                    Tinggi Badan (cm)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData?.height || ""}
                      onChange={(e) =>
                        setFormData(
                          formData
                            ? {
                                ...formData,
                                height: parseFloat(e.target.value) || 0,
                              }
                            : null
                        )
                      }
                      className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                    />
                  ) : (
                    <p className="text-foreground font-medium">
                      {displayData?.height} cm
                    </p>
                  )}
                </div>
              </div>

              {/* BMI Section */}
              {bmi && bmiCategory && (
                <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-border">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        BMI (Indeks Massa Tubuh)
                      </p>
                      <p className="text-2xl font-bold text-foreground">{bmi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Kategori
                      </p>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bmiCategory.color}`}>
                        {bmiCategory.category}
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${bmiCategory.color}`}>
                    <p className="text-sm font-medium">
                      📋 {bmiCategory.recommendation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Medical Information Section */}
          <div className="bg-white rounded-lg border border-border p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Informasi Medis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diagnosis */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Diagnosis
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData?.diagnosis || ""}
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? { ...formData, diagnosis: e.target.value }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  />
                ) : (
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {displayData?.diagnosis || "-"}
                    </span>
                  </div>
                )}
              </div>

              {/* Treatment Category */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Kategori Perawatan
                </label>
                {isEditing ? (
                  <select
                    value={formData?.treatmentCategory || ""}
                    onChange={(e) =>
                      setFormData(
                        formData
                          ? {
                              ...formData,
                              treatmentCategory: e.target.value as
                                | "umum"
                                | "sirkumsisi",
                            }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                  >
                    <option value="umum">Umum</option>
                    <option value="sirkumsisi">Sirkumsisi</option>
                  </select>
                ) : (
                  <p className="text-foreground">
                    {displayData?.treatmentCategory === "umum"
                      ? "Umum"
                      : "Sirkumsisi"}
                  </p>
                )}
              </div>

              {/* Last Consultation */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Tanggal Konsultasi Terakhir
                </label>
                <p className="text-foreground">
                  {displayData?.lastConsultationDate
                    ? formatDateID(displayData.lastConsultationDate)
                    : "Belum ada"}
                </p>
              </div>

              {/* Registration Date */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Tanggal Pendaftaran
                </label>
                <p className="text-foreground">
                  {formatDateID(displayData?.createdAt || "")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
