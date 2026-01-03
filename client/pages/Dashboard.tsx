import DashboardHeader from "@/components/DashboardHeader";
import DashboardSummaryCards from "@/components/DashboardSummaryCards";
import DashboardQuickActions from "@/components/DashboardQuickActions";
import DashboardCharts from "@/components/DashboardCharts";
import DashboardLists from "@/components/DashboardLists";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <DashboardHeader />
      <div className="flex-1 overflow-auto">
        <DashboardSummaryCards />
        <DashboardQuickActions />
        <DashboardCharts />
        <DashboardLists />
        <div className="h-8" />
      </div>
    </div>
  );
}
