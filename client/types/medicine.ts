export type MedicineType = "tablet" | "syrup" | "injection" | "capsule" | "cream" | "powder" | "liquid";

export interface Medicine {
  id: string;
  name: string;
  activeIngredient: string; // e.g., "Ibuprofen", "Amoxicillin"
  type: MedicineType;
  pricePerUnit: number; // in currency (e.g., IDR)
  stock: number;
  minimumStock: number; // Stock alert threshold
  unit: string; // e.g., "mg", "ml", "pcs"
  expiryDate?: string; // ISO date
  manufacturer?: string;
  batchNumber?: string;
  createdAt: string;
  lastRestocked?: string;
}

export interface StockMovement {
  id: string;
  medicineId: string;
  type: "in" | "out"; // stock in or stock out
  quantity: number;
  reason: string; // e.g., "Restock", "Patient usage", "Expired", "Damage"
  referenceId?: string; // Transaction ID or Medical Record ID
  notes?: string;
  createdAt: string;
  createdBy: string; // User who recorded the movement
}

export interface MedicinePrice {
  medicineId: string;
  pricePerUnit: number;
  dateChanged: string;
  changedBy: string;
}
