import { useState, useRef } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientList from "@/components/PatientList";
import PatientForm from "@/components/PatientForm";
import { mockPatients } from "@/data/mockPatients";
import { Patient } from "@/types/patient";

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [groupByDiagnosis, setGroupByDiagnosis] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPatient = () => {
    setEditingPatient(undefined);
    setIsFormOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsFormOpen(true);
  };

  const handleSavePatient = (patient: Patient) => {
    if (editingPatient) {
      // Update existing patient
      setPatients(
        patients.map((p) => (p.id === patient.id ? patient : p))
      );
    } else {
      // Add new patient
      setPatients([...patients, patient]);
    }
    setIsFormOpen(false);
    setEditingPatient(undefined);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPatient(undefined);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would parse the Excel file here
      console.log("Selected file:", file.name);
      // For now, we'll just show an alert
      alert(
        `File "${file.name}" selected. Excel import functionality can be implemented with libraries like "xlsx" or "papaparse".`
      );
    }
  };

  const handleDeletePatient = (patientId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pasien ini?")) {
      setPatients(patients.filter((p) => p.id !== patientId));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manajemen Pasien</h1>
            <p className="text-sm text-muted-foreground">
              Kelola daftar pasien dan informasi medis mereka
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddPatient}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Pasien
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Button
            variant={groupByDiagnosis ? "default" : "outline"}
            size="sm"
            onClick={() => setGroupByDiagnosis(!groupByDiagnosis)}
            className={groupByDiagnosis ? "bg-primary text-primary-foreground" : ""}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            {groupByDiagnosis ? "Kelompok: Diagnosis" : "Tampilan Biasa"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <PatientList
          patients={patients}
          onDelete={handleDeletePatient}
          onImport={handleImportClick}
          groupByDiagnosis={groupByDiagnosis}
        />
        <div className="h-8" />
      </div>

      {/* Hidden file input for Excel import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
