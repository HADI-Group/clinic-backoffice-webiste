import { Button } from "@/components/ui/button";
import { Eye, AlertCircle } from "lucide-react";

export default function DashboardLists() {
  const admissions = [
    {
      id: 1,
      name: "Siti Nurhaliza",
      medicalNo: "RM-2020/603-001",
      status: "Menunggu",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 2,
      name: "Budi Santoso",
      medicalNo: "RM-2020/603-002",
      status: "Proses",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      name: "Dewi Lestari",
      medicalNo: "RM-2020/603-003",
      status: "Menunggu",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 4,
      name: "Andi Wijaya",
      medicalNo: "RM-2020/603-004",
      status: "Menunggu",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      type: "Tablet",
      stock: 12,
      alert: true,
    },
    {
      id: 2,
      name: "Amoxicillin 500mg",
      type: "Kapsul",
      stock: 25,
      alert: false,
    },
    {
      id: 3,
      name: "OBH Combi Sirup",
      type: "Sirup",
      stock: 18,
      alert: false,
    },
    {
      id: 4,
      name: "Vitamin C 1000mg",
      type: "Tablet",
      stock: 8,
      alert: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 py-6">
      {/* Antrian Hari Ini */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-6">Antrian Hari Ini</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Daftar pasien yang menunggu
        </p>
        <div className="space-y-3">
          {admissions.map((admission, index) => (
            <div
              key={admission.id}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {admission.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {admission.medicalNo}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded whitespace-nowrap flex-shrink-0 ${admission.statusColor}`}
              >
                {admission.status}
              </span>
            </div>
          ))}
        </div>
        <Button variant="link" className="w-full mt-4 text-primary">
          Lihat Semua Antrian
        </Button>
      </div>

      {/* Stok Obat Mempipis */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-6">Stok Obat Mempipis</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Obat yang perlu direstok
        </p>
        <div className="space-y-3">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div
                className={`p-2 rounded-lg flex-shrink-0 ${
                  medicine.alert ? "bg-red-50" : "bg-yellow-50"
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${
                    medicine.alert ? "text-red-500" : "text-yellow-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">
                  {medicine.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {medicine.type}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-foreground text-sm">
                  {medicine.stock}
                </p>
                <p className="text-xs text-muted-foreground">Stok</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" className="w-full mt-4 text-primary">
          Kelola Stok Obat
        </Button>
      </div>
    </div>
  );
}
