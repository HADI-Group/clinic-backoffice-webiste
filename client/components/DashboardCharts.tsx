import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlyPatientData = [
  { month: "Jan", patients: 240 },
  { month: "Feb", patients: 300 },
  { month: "Mar", patients: 320 },
  { month: "Apr", patients: 380 },
  { month: "May", patients: 420 },
  { month: "Jun", patients: 450 },
  { month: "Jul", patients: 480 },
  { month: "Aug", patients: 500 },
  { month: "Sep", patients: 520 },
  { month: "Oct", patients: 540 },
  { month: "Nov", patients: 580 },
  { month: "Dec", patients: 600 },
];

const incomeExpenseData = [
  { day: "5", income: 4000, expense: 1200 },
  { day: "10", income: 4200, expense: 1100 },
  { day: "15", income: 4100, expense: 1300 },
  { day: "20", income: 4500, expense: 1400 },
  { day: "25", income: 4800, expense: 1100 },
  { day: "30", income: 4600, expense: 1000 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 py-6">
      {/* Monthly Patient Recap */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Rekap Pasien Bulanan</h3>
          <select className="text-sm border border-border rounded px-3 py-1.5 text-foreground bg-white">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyPatientData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
              }}
            />
            <Bar dataKey="patients" fill="#0066cc" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income vs Expense */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">
            Pendapatan vs Pengeluaran
          </h3>
          <select className="text-sm border border-border rounded px-3 py-1.5 text-foreground bg-white">
            <option>Bulan ini</option>
            <option>Bulan lalu</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
