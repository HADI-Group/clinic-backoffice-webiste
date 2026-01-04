import { useState, useMemo } from "react";
import {
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPatients } from "@/data/mockPatients";
import { mockMedicalRecords } from "@/data/mockMedicalRecords";
import {
  mockTransactions,
  getMonthlyTransactionSummary,
  getTransactionsByDateRange,
} from "@/data/mockTransaction";
import { mockQueueEntries } from "@/data/mockQueue";
import { calculateAge } from "@/utils/patient";

export default function Reports() {
  const [reportType, setReportType] = useState<"daily" | "monthly">("monthly");
  const [selectedDate, setSelectedDate] = useState("2026-01-15");
  const [selectedMonth, setSelectedMonth] = useState("2026-01");

  // Parse month
  const [year, month] = selectedMonth.split("-").map(Number);

  // Daily Report Data
  const dailyPatients = useMemo(() => {
    const dateStr = selectedDate;
    return mockQueueEntries.filter((q) =>
      q.checkInTime?.startsWith(dateStr)
    );
  }, [selectedDate]);

  const dailyRecords = useMemo(() => {
    const dateStr = selectedDate;
    return mockMedicalRecords.filter((r) =>
      r.consultationDate.startsWith(dateStr)
    );
  }, [selectedDate]);

  const dailyTransactions = useMemo(() => {
    const dateStr = selectedDate;
    return mockTransactions.filter((t) =>
      t.createdAt.startsWith(dateStr)
    );
  }, [selectedDate]);

  const dailySummary = useMemo(() => {
    const income = dailyTransactions
      .filter((t) => t.type === "income" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = dailyTransactions
      .filter((t) => t.type === "expense" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      patientCount: dailyPatients.length,
      recordCount: dailyRecords.length,
      income,
      expense,
      profit: income - expense,
    };
  }, [dailyPatients, dailyRecords, dailyTransactions]);

  // Monthly Report Data
  const monthlyPatients = useMemo(() => {
    const monthStr = selectedMonth;
    return mockQueueEntries.filter((q) =>
      q.checkInTime?.startsWith(monthStr)
    );
  }, [selectedMonth]);

  const monthlyRecords = useMemo(() => {
    const monthStr = selectedMonth;
    return mockMedicalRecords.filter((r) =>
      r.consultationDate.startsWith(monthStr)
    );
  }, [selectedMonth]);

  // Gender distribution
  const genderDistribution = useMemo(() => {
    const maleCount = mockPatients.filter((p) => p.gender === "male").length;
    const femaleCount = mockPatients.filter((p) => p.gender === "female").length;
    return {
      male: maleCount,
      female: femaleCount,
      malePercent: ((maleCount / mockPatients.length) * 100).toFixed(1),
      femalePercent: ((femaleCount / mockPatients.length) * 100).toFixed(1),
    };
  }, []);

  // Age distribution
  const ageDistribution = useMemo(() => {
    let child = 0, adult = 0, elderly = 0;
    mockPatients.forEach((p) => {
      const age = calculateAge(p.dateOfBirth);
      if (age < 12) child++;
      else if (age < 60) adult++;
      else elderly++;
    });
    const total = mockPatients.length;
    return {
      child: { count: child, percent: ((child / total) * 100).toFixed(1) },
      adult: { count: adult, percent: ((adult / total) * 100).toFixed(1) },
      elderly: { count: elderly, percent: ((elderly / total) * 100).toFixed(1) },
    };
  }, []);

  // Monthly financial summary
  const monthlySummary = useMemo(() => {
    return getMonthlyTransactionSummary(year, month);
  }, [year, month]);

  // New vs Returning patients (in current month)
  const patientStats = useMemo(() => {
    const monthStr = selectedMonth;
    const newPatients = mockPatients.filter((p) =>
      p.createdAt.startsWith(monthStr)
    ).length;
    const total = monthlyPatients.length || mockPatients.length;
    return {
      newPatients,
      returningPatients: total - newPatients,
    };
  }, [selectedMonth, monthlyPatients]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">Laporan</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Laporan harian, bulanan, dan analisis data pasien
          </p>
        </div>

        {/* Report Type Selection */}
        <div className="flex gap-2">
          <Button
            variant={reportType === "daily" ? "default" : "outline"}
            onClick={() => setReportType("daily")}
            className={
              reportType === "daily"
                ? "bg-primary text-primary-foreground"
                : ""
            }
          >
            Laporan Harian
          </Button>
          <Button
            variant={reportType === "monthly" ? "default" : "outline"}
            onClick={() => setReportType("monthly")}
            className={
              reportType === "monthly"
                ? "bg-primary text-primary-foreground"
                : ""
            }
          >
            Laporan Bulanan
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-7xl">
          {reportType === "daily" ? (
            <>
              {/* Daily Report */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground block mb-2">
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Daily Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">
                    Total Pasien
                  </p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">
                    {dailySummary.patientCount}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600 font-medium">
                    Rekam Medis
                  </p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">
                    {dailySummary.recordCount}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium">Pendapatan</p>
                  <p className="text-3xl font-bold text-green-900 mt-2">
                    Rp {(dailySummary.income / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600 font-medium">Pengeluaran</p>
                  <p className="text-3xl font-bold text-red-900 mt-2">
                    Rp {(dailySummary.expense / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>

              {/* Daily Patients List */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Daftar Pasien {new Date(selectedDate).toLocaleDateString("id-ID")}
                </h2>
                {dailyPatients.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Tidak ada pasien pada tanggal ini
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-gray-50">
                          <th className="text-left px-4 py-2 font-semibold">
                            No Antrian
                          </th>
                          <th className="text-left px-4 py-2 font-semibold">
                            Nama Pasien
                          </th>
                          <th className="text-left px-4 py-2 font-semibold">
                            No. Rekam Medis
                          </th>
                          <th className="text-center px-4 py-2 font-semibold">
                            Status
                          </th>
                          <th className="text-left px-4 py-2 font-semibold">
                            Tipe
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyPatients.map((q) => (
                          <tr key={q.id} className="border-b border-border">
                            <td className="px-4 py-2 font-bold">
                              #{q.queueNumber}
                            </td>
                            <td className="px-4 py-2">{q.patientName}</td>
                            <td className="px-4 py-2 font-mono text-xs">
                              {q.medicalRecordNumber}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span
                                className={`text-xs px-2 py-1 rounded font-medium ${
                                  q.status === "done"
                                    ? "bg-green-100 text-green-800"
                                    : q.status === "in_progress"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {q.status === "done"
                                  ? "Selesai"
                                  : q.status === "in_progress"
                                    ? "Sedang Dilayani"
                                    : "Menunggu"}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-xs">
                              {q.queueType === "registration"
                                ? "Pendaftaran"
                                : q.queueType === "checkup"
                                  ? "Pemeriksaan"
                                  : "Follow-up"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Monthly Report */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground block mb-2">
                  Pilih Bulan
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Monthly Summary */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">
                    Total Pasien
                  </p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">
                    {monthlyPatients.length || mockPatients.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium">
                    Pasien Baru
                  </p>
                  <p className="text-3xl font-bold text-green-900 mt-2">
                    {patientStats.newPatients}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600 font-medium">
                    Pengulang
                  </p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">
                    {patientStats.returningPatients}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-600 font-medium">
                    Pendapatan
                  </p>
                  <p className="text-3xl font-bold text-orange-900 mt-2">
                    Rp {(monthlySummary.totalIncome / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600 font-medium">Pengeluaran</p>
                  <p className="text-3xl font-bold text-red-900 mt-2">
                    Rp {(monthlySummary.totalExpense / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Gender Distribution */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Distribusi Jenis Kelamin
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">
                          Laki-laki
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {genderDistribution.male} ({genderDistribution.malePercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${genderDistribution.malePercent}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">
                          Perempuan
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {genderDistribution.female} ({genderDistribution.femalePercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-600 h-2 rounded-full"
                          style={{
                            width: `${genderDistribution.femalePercent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Age Distribution */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Distribusi Kelompok Usia
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">
                          Anak-anak (&lt;12 tahun)
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {ageDistribution.child.count} ({ageDistribution.child.percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{
                            width: `${ageDistribution.child.percent}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">
                          Dewasa (12-59 tahun)
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {ageDistribution.adult.count} ({ageDistribution.adult.percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${ageDistribution.adult.percent}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">
                          Lansia (≥60 tahun)
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {ageDistribution.elderly.count} ({ageDistribution.elderly.percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${ageDistribution.elderly.percent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white rounded-lg border border-border p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Ringkasan Keuangan
                  </h2>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Total Pendapatan
                    </p>
                    <p className="text-2xl font-bold text-green-900 mt-2">
                      Rp {(monthlySummary.totalIncome / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-600 font-medium flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" /> Total Pengeluaran
                    </p>
                    <p className="text-2xl font-bold text-red-900 mt-2">
                      Rp {(monthlySummary.totalExpense / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-2 ${
                    monthlySummary.netProfit >= 0
                      ? "bg-blue-50 border-blue-200"
                      : "bg-orange-50 border-orange-200"
                  }`}>
                    <p className={`text-sm font-medium flex items-center gap-2 ${
                      monthlySummary.netProfit >= 0
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}>
                      💰 Keuntungan Bersih
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${
                      monthlySummary.netProfit >= 0
                        ? "text-blue-900"
                        : "text-orange-900"
                    }`}>
                      Rp {(monthlySummary.netProfit / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
