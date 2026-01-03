import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2, Download, Upload, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Patient, PatientFilter } from "@/types/patient";
import { calculateAge, formatDateID } from "@/utils/patient";
import { getUniqueDiagnoses, groupPatientsByDiagnosis } from "@/data/mockPatients";

interface PatientListProps {
  patients: Patient[];
  onEdit?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
  onImport?: () => void;
  groupByDiagnosis?: boolean;
}

export default function PatientList({
  patients,
  onEdit,
  onDelete,
  onImport,
  groupByDiagnosis = false,
}: PatientListProps) {
  const [filters, setFilters] = useState<PatientFilter>({});
  const [sortField, setSortField] = useState<"name" | "age" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);

  const diagnoses = useMemo(
    () => getUniqueDiagnoses(patients),
    [patients]
  );

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !patient.name.toLowerCase().includes(searchLower) &&
          !patient.medicalRecordNumber.includes(filters.search)
        ) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender && patient.gender !== filters.gender) {
        return false;
      }

      // Diagnosis filter
      if (filters.diagnosis && patient.diagnosis !== filters.diagnosis) {
        return false;
      }

      // Age range filter
      if (filters.ageRange) {
        const age = calculateAge(patient.dateOfBirth);
        if (age < filters.ageRange[0] || age > filters.ageRange[1]) {
          return false;
        }
      }

      // Treatment category filter
      if (
        filters.treatmentCategory &&
        patient.treatmentCategory !== filters.treatmentCategory
      ) {
        return false;
      }

      return true;
    });
  }, [patients, filters]);

  // Sort patients
  const sortedPatients = useMemo(() => {
    const sorted = [...filteredPatients].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      if (sortField === "name") {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else if (sortField === "age") {
        aVal = calculateAge(a.dateOfBirth);
        bVal = calculateAge(b.dateOfBirth);
      } else {
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredPatients, sortField, sortOrder]);

  // Group patients if needed
  const displayPatients = useMemo(() => {
    if (!groupByDiagnosis) {
      return { "Semua Pasien": sortedPatients };
    }
    return groupPatientsByDiagnosis(sortedPatients);
  }, [sortedPatients, groupByDiagnosis]);

  return (
    <div className="bg-white rounded-lg border border-border">
      {/* Header with controls */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Cari nama pasien atau no. rekam medis..."
            value={filters.search || ""}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value || undefined })
            }
            className="w-full"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter {Object.values(filters).filter(Boolean).length > 0 && "(aktif)"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onImport}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Jenis Kelamin
              </label>
              <Select
                value={filters.gender || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    gender: value || undefined,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua</SelectItem>
                  <SelectItem value="male">Laki-laki</SelectItem>
                  <SelectItem value="female">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Diagnosis
              </label>
              <Select
                value={filters.diagnosis || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    diagnosis: value || undefined,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Diagnosis</SelectItem>
                  {diagnoses.map((diagnosis) => (
                    <SelectItem key={diagnosis} value={diagnosis}>
                      {diagnosis}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Kategori Perawatan
              </label>
              <Select
                value={filters.treatmentCategory || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    treatmentCategory: value || undefined,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua</SelectItem>
                  <SelectItem value="umum">Umum</SelectItem>
                  <SelectItem value="sirkumsisi">Sirkumsisi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tipe Golongan Darah
              </label>
              <Select
                value={filters.diagnosis || ""}
                onValueChange={() => {}}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:col-span-4"
              onClick={() => setFilters({})}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>

      {/* Patient tables grouped by diagnosis */}
      <div className="divide-y divide-border">
        {Object.entries(displayPatients).map(([diagnosis, groupPatients]) => (
          <div key={diagnosis}>
            {groupByDiagnosis && (
              <div className="px-6 py-3 bg-gray-50 border-b border-border">
                <h3 className="font-semibold text-foreground text-sm">
                  {diagnosis} ({groupPatients.length})
                </h3>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      <button
                        onClick={() => {
                          if (sortField === "name") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          } else {
                            setSortField("name");
                            setSortOrder("asc");
                          }
                        }}
                        className="hover:text-primary transition-colors"
                      >
                        No. Rekam Medis / Nama {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                      </button>
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Umur
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Jenis Kelamin
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Diagnosis
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Tgl. Terakhir Konsultasi
                    </th>
                    <th className="text-center px-6 py-3 font-semibold text-foreground">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupPatients.length > 0 ? (
                    groupPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="border-b border-border hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">
                              {patient.medicalRecordNumber}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {patient.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {calculateAge(patient.dateOfBirth)} tahun
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          {patient.gender === "male" ? "Laki-laki" : "Perempuan"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            {patient.diagnosis || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-foreground text-xs">
                          {patient.lastConsultationDate
                            ? formatDateID(patient.lastConsultationDate)
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link to={`/patients/${patient.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Lihat detail"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit?.(patient)}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete?.(patient.id)}
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center">
                        <p className="text-muted-foreground">
                          Tidak ada pasien ditemukan
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-gray-50 border-t border-border text-sm text-muted-foreground">
        Total: {sortedPatients.length} pasien
        {groupByDiagnosis && ` (${Object.keys(displayPatients).length} diagnosis)`}
      </div>
    </div>
  );
}
