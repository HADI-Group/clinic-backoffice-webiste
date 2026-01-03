import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types/patient";
import {
  calculateAge,
  calculateBMI,
  getBMICategory,
  formatDateForInput,
  generateMedicalRecordNumber,
} from "@/utils/patient";
import { getNextSequentialNumber } from "@/data/mockPatients";

interface PatientFormProps {
  patient?: Patient;
  allPatients: Patient[];
  onSave: (patient: Patient) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function PatientForm({
  patient,
  allPatients,
  onSave,
  onCancel,
  isOpen,
}: PatientFormProps) {
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with patient data or empty
  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        gender: "male",
        bloodType: "O",
        treatmentCategory: "umum",
      });
    }
    setErrors({});
  }, [patient, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Nama harus diisi";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Tanggal lahir harus diisi";
    }
    if (!formData.address?.trim()) {
      newErrors.address = "Alamat harus diisi";
    }
    if (!formData.occupation?.trim()) {
      newErrors.occupation = "Pekerjaan harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Generate MRN if this is a new patient
    let medicalRecordNumber = formData.medicalRecordNumber;
    if (!patient) {
      const category = (formData.treatmentCategory ||
        "umum") as "umum" | "sirkumsisi";
      const seqNum = getNextSequentialNumber(category, allPatients);
      medicalRecordNumber = generateMedicalRecordNumber(category, seqNum);
    }

    const savedPatient: Patient = {
      id: formData.id || String(Date.now()),
      medicalRecordNumber: medicalRecordNumber || "",
      name: formData.name || "",
      dateOfBirth: formData.dateOfBirth || "",
      gender: (formData.gender as "male" | "female") || "male",
      address: formData.address || "",
      bloodType: (formData.bloodType as "O" | "A" | "B" | "AB") || "O",
      occupation: formData.occupation || "",
      phone: formData.phone,
      email: formData.email,
      weight: formData.weight,
      height: formData.height,
      treatmentCategory:
        (formData.treatmentCategory as "umum" | "sirkumsisi") || "umum",
      diagnosis: formData.diagnosis,
      createdAt: formData.createdAt || new Date().toISOString().split("T")[0],
      lastConsultationDate: formData.lastConsultationDate,
    };

    onSave(savedPatient);
  };

  if (!isOpen) return null;

  const age = formData.dateOfBirth
    ? calculateAge(formData.dateOfBirth)
    : null;
  const bmi =
    formData.weight && formData.height
      ? calculateBMI(formData.weight, formData.height)
      : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-foreground">
            {patient ? "Edit Pasien" : "Tambah Pasien Baru"}
          </h2>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Medical Record Number - Read Only */}
          {patient && (
            <div className="bg-gray-50 p-4 rounded-lg border border-border">
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                No. Rekam Medis
              </label>
              <p className="text-foreground font-mono font-semibold text-lg">
                {formData.medicalRecordNumber}
              </p>
            </div>
          )}

          {/* Personal Data Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Data Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Tanggal Lahir *
                </label>
                <input
                  type="date"
                  value={
                    formData.dateOfBirth
                      ? formatDateForInput(formData.dateOfBirth)
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.dateOfBirth ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.dateOfBirth}
                  </p>
                )}
                {age !== null && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Umur: {age} tahun
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.gender || "male"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as "male" | "female",
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>

              {/* Blood Type */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Golongan Darah
                </label>
                <select
                  value={formData.bloodType || "O"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bloodType: e.target.value as "O" | "A" | "B" | "AB",
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="O">O</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                </select>
              </div>

              {/* Occupation */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Pekerjaan *
                </label>
                <input
                  type="text"
                  value={formData.occupation || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.occupation ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Contoh: Guru, Dokter, Pedagang"
                />
                {errors.occupation && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.occupation}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Contoh: pasien@email.com"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground block mb-2">
                  Alamat *
                </label>
                <textarea
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.address ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Masukkan alamat lengkap"
                />
                {errors.address && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Physical Measurements Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Pengukuran Fisik
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Weight */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Berat Badan (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: parseFloat(e.target.value) || undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Contoh: 65"
                />
              </div>

              {/* Height */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Tinggi Badan (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.height || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      height: parseFloat(e.target.value) || undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Contoh: 170"
                />
              </div>
            </div>

            {/* BMI Display */}
            {bmi && bmiCategory && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-border">
                <div className="grid grid-cols-2 gap-4 mb-3">
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
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bmiCategory.color}`}
                    >
                      {bmiCategory.category}
                    </div>
                  </div>
                </div>
                <div className={`p-2 rounded ${bmiCategory.color} text-sm`}>
                  📋 {bmiCategory.recommendation}
                </div>
              </div>
            )}
          </div>

          {/* Medical Information Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Informasi Medis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Diagnosis */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  value={formData.diagnosis || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Contoh: Hipertensi"
                />
              </div>

              {/* Treatment Category */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Kategori Perawatan
                </label>
                <select
                  value={formData.treatmentCategory || "umum"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      treatmentCategory: e.target.value as "umum" | "sirkumsisi",
                    })
                  }
                  disabled={!!patient}
                  className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="umum">Umum</option>
                  <option value="sirkumsisi">Sirkumsisi</option>
                </select>
                {patient && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Tidak dapat diubah setelah pendaftaran
                  </p>
                )}
              </div>
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
            {patient ? "Simpan Perubahan" : "Tambah Pasien"}
          </Button>
        </div>
      </div>
    </div>
  );
}
