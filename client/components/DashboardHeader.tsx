import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const timeStr = today.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white border-b border-border px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Selamat datang kembali!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari pasien..."
              className="pl-10 w-60"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full"></span>
          </Button>
          <div className="text-right text-sm">
            <p className="text-foreground font-medium">{dateStr}</p>
            <p className="text-muted-foreground text-xs">{timeStr} WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
