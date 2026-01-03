import { UserPlus, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardQuickActions() {
  const actions = [
    {
      title: "Tambah Pasien",
      description: "Daftarkan pasien baru ke sistem",
      icon: UserPlus,
      bgColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Daftar Antrian",
      description: "Registrasi antrian pasien baru",
      icon: Clock,
      bgColor: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Buat Rekam Medis",
      description: "Input data pemeriksaan pasien",
      icon: FileText,
      bgColor: "bg-emerald-500 hover:bg-emerald-600",
    },
  ];

  return (
    <div className="mx-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              className={`${action.bgColor} h-auto p-6 text-white rounded-lg flex items-center gap-4 justify-start text-left transition-all`}
            >
              <div className="bg-white/20 p-4 rounded-lg flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">{action.title}</p>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
