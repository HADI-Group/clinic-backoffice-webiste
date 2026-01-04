import { Transaction, TransactionSummary } from "@/types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: "t-1",
    type: "income",
    category: "consultation_fee",
    description: "Konsultasi pasien - Budi Santoso",
    amount: 100000,
    currency: "IDR",
    patientId: "1",
    paymentMethod: "cash",
    createdAt: "2026-01-15T09:30:00",
    createdBy: "Dr. Ahmad Fauzi",
    status: "completed",
  },
  {
    id: "t-2",
    type: "income",
    category: "medicine_sale",
    description: "Penjualan obat - Amlodipine",
    amount: 75000,
    currency: "IDR",
    referenceType: "medicine",
    referenceId: "med-1",
    patientId: "1",
    paymentMethod: "cash",
    createdAt: "2026-01-15T09:45:00",
    createdBy: "Apoteker",
    status: "completed",
  },
  {
    id: "t-3",
    type: "income",
    category: "consultation_fee",
    description: "Konsultasi pasien - Siti Nurhaliza",
    amount: 100000,
    currency: "IDR",
    patientId: "2",
    paymentMethod: "bank_transfer",
    createdAt: "2026-01-15T10:30:00",
    createdBy: "Dr. Ahmad Fauzi",
    status: "completed",
  },
  {
    id: "t-4",
    type: "expense",
    category: "medicine_purchase",
    description: "Pembelian stok obat dari supplier",
    amount: 2000000,
    currency: "IDR",
    paymentMethod: "bank_transfer",
    notes: "Pembelian rutin bulanan",
    createdAt: "2026-01-14T14:00:00",
    createdBy: "Admin",
    status: "completed",
  },
  {
    id: "t-5",
    type: "expense",
    category: "operational",
    description: "Biaya operasional - Listrik",
    amount: 500000,
    currency: "IDR",
    paymentMethod: "bank_transfer",
    createdAt: "2026-01-15T08:00:00",
    createdBy: "Admin",
    status: "completed",
  },
  {
    id: "t-6",
    type: "expense",
    category: "salary",
    description: "Gaji staf bulan Januari",
    amount: 5000000,
    currency: "IDR",
    paymentMethod: "bank_transfer",
    createdAt: "2026-01-01T10:00:00",
    createdBy: "Admin",
    status: "completed",
  },
  {
    id: "t-7",
    type: "income",
    category: "patient_fee",
    description: "Pendaftaran pasien baru - Ahmad Hidayat",
    amount: 50000,
    currency: "IDR",
    patientId: "3",
    paymentMethod: "cash",
    createdAt: "2026-01-15T08:20:00",
    createdBy: "Admin",
    status: "completed",
  },
  {
    id: "t-8",
    type: "expense",
    category: "equipment",
    description: "Pembelian alat medis - Thermometer digital",
    amount: 250000,
    currency: "IDR",
    paymentMethod: "cash",
    createdAt: "2026-01-12T11:30:00",
    createdBy: "Admin",
    status: "completed",
  },
  {
    id: "t-9",
    type: "income",
    category: "consultation_fee",
    description: "Konsultasi pasien - Rini Wijaya",
    amount: 100000,
    currency: "IDR",
    patientId: "4",
    paymentMethod: "cash",
    createdAt: "2026-01-15T11:00:00",
    createdBy: "Dr. Ahmad Fauzi",
    status: "completed",
  },
  {
    id: "t-10",
    type: "income",
    category: "medicine_sale",
    description: "Penjualan obat - Paracetamol, Vitamin C",
    amount: 120000,
    currency: "IDR",
    patientId: "2",
    paymentMethod: "cash",
    createdAt: "2026-01-15T10:50:00",
    createdBy: "Apoteker",
    status: "completed",
  },
];

export function getTransactionSummary(date: string): TransactionSummary {
  const transactions = mockTransactions.filter((t) =>
    t.createdAt.startsWith(date)
  );

  const income = transactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome: income,
    totalExpense: expense,
    netProfit: income - expense,
    date,
  };
}

export function getTransactionsByDateRange(
  startDate: string,
  endDate: string
): Transaction[] {
  return mockTransactions.filter((t) => {
    const transDate = t.createdAt.split("T")[0];
    return transDate >= startDate && transDate <= endDate;
  });
}

export function getMonthlyTransactionSummary(year: number, month: number) {
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  // Calculate end date
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const endDate = new Date(nextYear, nextMonth - 1, 1);
  endDate.setDate(endDate.getDate() - 1);

  const endDateStr = endDate.toISOString().split("T")[0];

  const transactions = getTransactionsByDateRange(startDate, endDateStr);

  const income = transactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    month,
    year,
    totalIncome: income,
    totalExpense: expense,
    netProfit: income - expense,
    transactionCount: transactions.length,
  };
}

export function addTransaction(transaction: Transaction): void {
  mockTransactions.push(transaction);
}

export function updateTransactionStatus(
  id: string,
  status: "pending" | "completed" | "cancelled"
): void {
  const transaction = mockTransactions.find((t) => t.id === id);
  if (transaction) {
    transaction.status = status;
  }
}
