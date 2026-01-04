export type TransactionType = "income" | "expense";
export type TransactionCategory = 
  | "patient_fee" // Income
  | "medicine_sale" // Income
  | "consultation_fee" // Income
  | "medicine_purchase" // Expense
  | "operational" // Expense
  | "salary" // Expense
  | "utilities" // Expense
  | "equipment" // Expense
  | "other"; // Both

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  currency: string; // e.g., "IDR"
  referenceType?: "medical_record" | "medicine" | "invoice"; // What this transaction is for
  referenceId?: string; // ID of related medical record, medicine purchase, etc.
  patientId?: string; // If related to a patient
  paymentMethod?: "cash" | "credit_card" | "bank_transfer" | "check";
  notes?: string;
  attachments?: string[]; // File paths/URLs
  createdAt: string;
  createdBy: string;
  status: "pending" | "completed" | "cancelled";
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  date: string; // ISO date
}

export interface TransactionFilter {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  category?: TransactionCategory;
  patientId?: string;
  minAmount?: number;
  maxAmount?: number;
}
