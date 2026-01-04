import { useState, useMemo } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Upload,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mockTransactions,
  getTransactionsByDateRange,
  getMonthlyTransactionSummary,
  addTransaction,
} from "@/data/mockTransaction";
import { Transaction, TransactionType, TransactionCategory } from "@/types/transaction";

export default function Transaction() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-01-31");
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all");
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: "income" as TransactionType,
    category: "consultation_fee" as TransactionCategory,
    description: "",
    amount: "",
    paymentMethod: "cash" as const,
  });

  const filteredTransactions = useMemo(() => {
    let filtered = getTransactionsByDateRange(startDate, endDate);

    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [startDate, endDate, filterType]);

  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === "income" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter((t) => t.type === "expense" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      profit: income - expense,
    };
  }, [filteredTransactions]);

  const handleAddTransaction = () => {
    if (!formData.description || !formData.amount) return;

    const newTransaction: Transaction = {
      id: `t-${Date.now()}`,
      type: formData.type,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: "IDR",
      paymentMethod: formData.paymentMethod,
      createdAt: new Date().toISOString(),
      createdBy: "Current User",
      status: "completed",
    };

    addTransaction(newTransaction);
    setTransactions([...transactions, newTransaction]);
    setIsAddingTransaction(false);
    setFormData({
      type: "income",
      category: "consultation_fee",
      description: "",
      amount: "",
      paymentMethod: "cash",
    });
  };

  const incomeCategories: TransactionCategory[] = [
    "patient_fee",
    "medicine_sale",
    "consultation_fee",
  ];
  const expenseCategories: TransactionCategory[] = [
    "medicine_purchase",
    "operational",
    "salary",
    "utilities",
    "equipment",
    "other",
  ];

  const categoryLabels: Record<TransactionCategory, string> = {
    patient_fee: "Biaya Pasien",
    medicine_sale: "Penjualan Obat",
    consultation_fee: "Biaya Konsultasi",
    medicine_purchase: "Pembelian Obat",
    operational: "Operasional",
    salary: "Gaji",
    utilities: "Utilitas",
    equipment: "Peralatan",
    other: "Lainnya",
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Manajemen Transaksi
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Catat pendapatan dan pengeluaran klinik
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600 font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Pendapatan
            </p>
            <p className="text-3xl font-bold text-green-900 mt-2">
              Rp {(summary.income / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-600 font-medium flex items-center gap-2">
              <TrendingDown className="w-4 h-4" /> Pengeluaran
            </p>
            <p className="text-3xl font-bold text-red-900 mt-2">
              Rp {(summary.expense / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className={`p-4 rounded-lg border-2 ${
            summary.profit >= 0
              ? "bg-blue-50 border-blue-200"
              : "bg-orange-50 border-orange-200"
          }`}>
            <p className={`text-sm font-medium flex items-center gap-2 ${
              summary.profit >= 0 ? "text-blue-600" : "text-orange-600"
            }`}>
              💰 Keuntungan
            </p>
            <p className={`text-3xl font-bold mt-2 ${
              summary.profit >= 0 ? "text-blue-900" : "text-orange-900"
            }`}>
              Rp {(summary.profit / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">
              Total Transaksi
            </p>
            <p className="text-3xl font-bold text-purple-900 mt-2">
              {filteredTransactions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-7xl">
          {/* Filters and Actions */}
          <div className="bg-white rounded-lg border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Dari Tanggal
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Sampai Tanggal
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Tipe
                </label>
                <select
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(e.target.value as "all" | TransactionType)
                  }
                  className="px-3 py-2 border border-border rounded-md text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Semua</option>
                  <option value="income">Pendapatan</option>
                  <option value="expense">Pengeluaran</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <Button
              onClick={() => setIsAddingTransaction(!isAddingTransaction)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Transaksi
            </Button>
          </div>

          {/* Add Transaction Form */}
          {isAddingTransaction && (
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Tambah Transaksi Baru
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Tipe *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      const newType = e.target.value as TransactionType;
                      setFormData({
                        ...formData,
                        type: newType,
                        category: newType === "income"
                          ? "consultation_fee"
                          : "medicine_purchase",
                      });
                    }}
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white"
                  >
                    <option value="income">Pendapatan</option>
                    <option value="expense">Pengeluaran</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as TransactionCategory,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white"
                  >
                    {(formData.type === "income"
                      ? incomeCategories
                      : expenseCategories
                    ).map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Deskripsi *
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                    placeholder="Deskripsi transaksi"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Jumlah (Rp) *
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Metode Pembayaran
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white"
                  >
                    <option value="cash">Tunai</option>
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="credit_card">Kartu Kredit</option>
                    <option value="check">Cek</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddTransaction}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingTransaction(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="bg-white rounded-lg border border-dashed border-border p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Tidak ada transaksi untuk periode ini
                </p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "income"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <TrendingUp
                              className={`w-5 h-5 ${
                                transaction.type === "income"
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-700" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {transaction.description}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {categoryLabels[transaction.category]} •{" "}
                            {new Date(transaction.createdAt).toLocaleDateString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "income"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"} Rp{" "}
                        {transaction.amount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.paymentMethod === "cash"
                          ? "Tunai"
                          : transaction.paymentMethod === "bank_transfer"
                            ? "Transfer"
                            : transaction.paymentMethod === "credit_card"
                              ? "Kartu"
                              : "Cek"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
