import { useState } from "react";
import { Plus, Edit, Trash2, Users, Stethoscope, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockDoctors, mockDiagnosisCategories, mockMedicineFormulas } from "@/data/mockDoctor";
import { mockMedicines } from "@/data/mockMedicine";
import { Doctor, DiagnosisCategory, MedicineFormula } from "@/types/doctor";

type TabType = "doctors" | "diagnosis" | "formulas";

export default function MasterData() {
  const [activeTab, setActiveTab] = useState<TabType>("doctors");
  const [doctors, setDoctors] = useState(mockDoctors);
  const [diagnosis, setDiagnosis] = useState(mockDiagnosisCategories);
  const [formulas, setFormulas] = useState(mockMedicineFormulas);

  // Form states
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState(false);
  const [isAddingFormula, setIsAddingFormula] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground">Master Data</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola data referensi: Dokter, Diagnosis, dan Formula Obat
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab("doctors")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "doctors"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Dokter
            </button>
            <button
              onClick={() => setActiveTab("diagnosis")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "diagnosis"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Stethoscope className="w-4 h-4 inline mr-2" />
              Diagnosis
            </button>
            <button
              onClick={() => setActiveTab("formulas")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "formulas"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Pill className="w-4 h-4 inline mr-2" />
              Formula Obat
            </button>
          </div>

          {/* Doctors Tab */}
          {activeTab === "doctors" && (
            <div>
              <div className="mb-6">
                <Button
                  onClick={() => setIsAddingDoctor(!isAddingDoctor)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Dokter
                </Button>
              </div>

              {isAddingDoctor && (
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Tambah Dokter Baru
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <select className="px-3 py-2 border border-border rounded-md bg-white">
                      <option>-- Spesialisasi --</option>
                      <option value="umum">Umum</option>
                      <option value="gigi">Gigi</option>
                      <option value="anak">Anak</option>
                      <option value="kandungan">Kandungan</option>
                    </select>
                    <input
                      type="text"
                      placeholder="No. Lisensi (STR)"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <input
                      type="tel"
                      placeholder="Nomor Telepon"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Alamat"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingDoctor(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-gray-50">
                      <th className="text-left px-6 py-3 font-semibold">
                        Nama Dokter
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Spesialisasi
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        No. STR
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Telepon
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Status
                      </th>
                      <th className="text-center px-6 py-3 font-semibold">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doc) => (
                      <tr key={doc.id} className="border-b border-border hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-foreground">
                          {doc.name}
                        </td>
                        <td className="px-6 py-3 text-foreground">
                          {doc.specialization === "umum"
                            ? "Umum"
                            : doc.specialization === "gigi"
                              ? "Gigi"
                              : doc.specialization === "anak"
                                ? "Anak"
                                : "Kandungan"}
                        </td>
                        <td className="px-6 py-3 text-muted-foreground font-mono text-sm">
                          {doc.licenseNumber}
                        </td>
                        <td className="px-6 py-3 text-muted-foreground">
                          {doc.phone}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              doc.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {doc.isActive ? "✓ Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Diagnosis Tab */}
          {activeTab === "diagnosis" && (
            <div>
              <div className="mb-6">
                <Button
                  onClick={() => setIsAddingDiagnosis(!isAddingDiagnosis)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Diagnosis
                </Button>
              </div>

              {isAddingDiagnosis && (
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Tambah Diagnosis Baru
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nama Diagnosis"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Kode (ICD-10)"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <textarea
                      placeholder="Deskripsi"
                      rows={3}
                      className="px-3 py-2 border border-border rounded-md col-span-1 md:col-span-2"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingDiagnosis(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diagnosis.map((diag) => (
                  <div
                    key={diag.id}
                    className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">
                          {diag.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-mono">
                          {diag.code}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {diag.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {diag.description}
                      </p>
                    )}
                    {diag.relatedMedicines && diag.relatedMedicines.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Obat Terkait:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {diag.relatedMedicines.map((medId) => {
                            const med = mockMedicines.find((m) => m.id === medId);
                            return (
                              <span
                                key={medId}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                              >
                                {med?.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medicine Formulas Tab */}
          {activeTab === "formulas" && (
            <div>
              <div className="mb-6">
                <Button
                  onClick={() => setIsAddingFormula(!isAddingFormula)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Formula
                </Button>
              </div>

              {isAddingFormula && (
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Tambah Formula Obat Baru
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nama Formula"
                      className="px-3 py-2 border border-border rounded-md col-span-1 md:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="Indikasi"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Cara Pakai"
                      className="px-3 py-2 border border-border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Durasi"
                      className="px-3 py-2 border border-border rounded-md col-span-1 md:col-span-2"
                    />
                    <textarea
                      placeholder="Catatan"
                      rows={3}
                      className="px-3 py-2 border border-border rounded-md col-span-1 md:col-span-2"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingFormula(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {formulas.map((formula) => (
                  <div
                    key={formula.id}
                    className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">
                          {formula.name}
                        </h3>
                        {formula.indication && (
                          <p className="text-sm text-muted-foreground">
                            Indikasi: {formula.indication}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    {/* Medicines in formula */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-2">
                        Obat dalam Formula:
                      </p>
                      <ul className="space-y-1">
                        {formula.medicines.map((med, idx) => (
                          <li key={idx} className="text-sm text-blue-800">
                            • {med.medicineName} {med.dosage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Usage and duration */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Cara Pakai
                        </p>
                        <p className="text-foreground">{formula.usage}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Durasi
                        </p>
                        <p className="text-foreground">{formula.duration}</p>
                      </div>
                    </div>

                    {formula.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-muted-foreground">
                        <strong>Catatan:</strong> {formula.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
