import { Users, UserPlus, DollarSign, TrendingDown } from "lucide-react";

export default function DashboardSummaryCards() {
  const summaryCards = [
    {
      title: "Pasien Hari Ini",
      value: "24",
      subtitle: "↓ 30% dari kemarin",
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Pasien Bulan Ini",
      value: "487",
      subtitle: "↑ 30% dari bulan lalu",
      icon: UserPlus,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Pendapatan Hari Ini",
      value: "Rp 4.2jt",
      subtitle: "↑ 30% dari kemarin",
      icon: DollarSign,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Pengeluaran Hari Ini",
      value: "Rp 850rb",
      subtitle: "↑ 10% dari kemarin",
      icon: TrendingDown,
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-6">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {card.value}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {card.subtitle}
                </p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
