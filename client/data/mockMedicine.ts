import { Medicine, StockMovement } from "@/types/medicine";

export const mockMedicines: Medicine[] = [
  {
    id: "med-1",
    name: "Amlodipine",
    activeIngredient: "Amlodipine Besylate",
    type: "tablet",
    pricePerUnit: 5000,
    stock: 150,
    minimumStock: 50,
    unit: "mg",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2027-12-31",
    createdAt: "2025-01-01",
    lastRestocked: "2026-01-10",
  },
  {
    id: "med-2",
    name: "Lisinopril",
    activeIngredient: "Lisinopril Dihydrate",
    type: "tablet",
    pricePerUnit: 7500,
    stock: 80,
    minimumStock: 50,
    unit: "mg",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2027-08-15",
    createdAt: "2025-01-01",
    lastRestocked: "2026-01-05",
  },
  {
    id: "med-3",
    name: "Metformin",
    activeIngredient: "Metformin Hydrochloride",
    type: "tablet",
    pricePerUnit: 3500,
    stock: 200,
    minimumStock: 75,
    unit: "mg",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2027-06-30",
    createdAt: "2025-01-01",
    lastRestocked: "2026-01-12",
  },
  {
    id: "med-4",
    name: "Paracetamol",
    activeIngredient: "Paracetamol",
    type: "tablet",
    pricePerUnit: 2000,
    stock: 30,
    minimumStock: 100,
    unit: "mg",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2027-03-20",
    createdAt: "2025-01-01",
    lastRestocked: "2025-12-01",
  },
  {
    id: "med-5",
    name: "Amoxicillin Syrup",
    activeIngredient: "Amoxicillin Trihydrate",
    type: "syrup",
    pricePerUnit: 45000,
    stock: 12,
    minimumStock: 20,
    unit: "ml",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2026-09-10",
    createdAt: "2025-01-01",
    lastRestocked: "2025-11-15",
  },
  {
    id: "med-6",
    name: "Cough Syrup",
    activeIngredient: "DXM + Guaifenesin",
    type: "syrup",
    pricePerUnit: 25000,
    stock: 25,
    minimumStock: 30,
    unit: "ml",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2027-02-14",
    createdAt: "2025-01-01",
    lastRestocked: "2026-01-08",
  },
  {
    id: "med-7",
    name: "Insulin Injection",
    activeIngredient: "Insulin Glargine",
    type: "injection",
    pricePerUnit: 150000,
    stock: 10,
    minimumStock: 15,
    unit: "unit",
    manufacturer: "Pharma International",
    expiryDate: "2026-06-30",
    createdAt: "2025-01-01",
    lastRestocked: "2025-12-20",
  },
  {
    id: "med-8",
    name: "Vitamin C",
    activeIngredient: "Ascorbic Acid",
    type: "tablet",
    pricePerUnit: 3000,
    stock: 500,
    minimumStock: 200,
    unit: "mg",
    manufacturer: "Pharma Indonesia",
    expiryDate: "2027-12-31",
    createdAt: "2025-01-01",
    lastRestocked: "2026-01-10",
  },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: "sm-1",
    medicineId: "med-1",
    type: "in",
    quantity: 100,
    reason: "Restock",
    createdAt: "2026-01-10",
    createdBy: "Admin",
  },
  {
    id: "sm-2",
    medicineId: "med-1",
    type: "out",
    quantity: 5,
    reason: "Patient usage",
    referenceId: "mr-1",
    createdAt: "2026-01-15",
    createdBy: "Dr. Ahmad Fauzi",
  },
  {
    id: "sm-3",
    medicineId: "med-3",
    type: "in",
    quantity: 150,
    reason: "Restock",
    createdAt: "2026-01-12",
    createdBy: "Admin",
  },
  {
    id: "sm-4",
    medicineId: "med-4",
    type: "out",
    quantity: 10,
    reason: "Patient usage",
    referenceId: "mr-2",
    createdAt: "2026-01-14",
    createdBy: "Dr. Ahmad Fauzi",
  },
];

export function getMedicineById(id: string): Medicine | undefined {
  return mockMedicines.find((m) => m.id === id);
}

export function getMedicinesWithLowStock(): Medicine[] {
  return mockMedicines.filter((m) => m.stock <= m.minimumStock);
}

export function addStockMovement(movement: StockMovement): void {
  const medicine = getMedicineById(movement.medicineId);
  if (medicine) {
    if (movement.type === "in") {
      medicine.stock += movement.quantity;
      medicine.lastRestocked = new Date().toISOString().split("T")[0];
    } else {
      medicine.stock = Math.max(0, medicine.stock - movement.quantity);
    }
  }
  mockStockMovements.push(movement);
}

export function updateMedicinePrice(
  medicineId: string,
  newPrice: number
): void {
  const medicine = getMedicineById(medicineId);
  if (medicine) {
    medicine.pricePerUnit = newPrice;
  }
}
