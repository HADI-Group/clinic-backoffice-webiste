import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Clock,
  Pill,
  CreditCard,
  BarChart3,
  UserCheck,
  Stethoscope,
  Settings,
  LogOut,
  Heart,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  currentPath?: string;
}

const mainMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Pasien",
    icon: Users,
    path: "/patients",
  },
  {
    label: "Rekam Medis",
    icon: FileText,
    path: "/medical-records",
  },
  {
    label: "Antrian",
    icon: Clock,
    path: "/queue",
  },
  {
    label: "Obat",
    icon: Pill,
    path: "/medicine",
  },
  {
    label: "Transaksi",
    icon: CreditCard,
    path: "/transactions",
  },
  {
    label: "Laporan",
    icon: BarChart3,
    path: "/reports",
  },
];

const masterDataItems = [
  {
    label: "Data Dokter",
    icon: UserCheck,
    path: "/master-data/doctors",
  },
  {
    label: "Diagnosis",
    icon: Stethoscope,
    path: "/master-data/diagnosis",
  },
  {
    label: "Pengaturan",
    icon: Settings,
    path: "/master-data/settings",
  },
];

export default function Sidebar({ currentPath = "/" }: SidebarProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground fill-current" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">
              MediCare
            </h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Main Menu */}
        <div className="mb-8">
          <h2 className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Menu Utama
          </h2>
          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {active && (
                      <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Master Data */}
        <div>
          <h2 className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Master Data
          </h2>
          <div className="space-y-1">
            {masterDataItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {active && (
                      <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
            AF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Dr. Ahmad Fauzi
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              Dokter Umum
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
