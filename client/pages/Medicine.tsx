import { useState, useMemo } from "react";
import { AlertTriangle, Plus, TrendingDown, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mockMedicines,
  getMedicinesWithLowStock,
  addStockMovement,
  updateMedicinePrice,
} from "@/data/mockMedicine";
import { Medicine, StockMovement } from "@/types/medicine";

export default function Medicine() {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [stockAction, setStockAction] = useState<"in" | "out" | null>(null);
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockReason, setStockReason] = useState("");

  const filteredMedicines = useMemo(() => {
    return medicines.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [medicines, searchTerm]);

  const lowStockMedicines = useMemo(() => {
    return medicines.filter((m) => m.stock <= m.minimumStock);
  }, [medicines]);

  const handleStockMovement = () => {
    if (!selectedMedicine || !stockAction || !stockQuantity || !stockReason) {
      return;
    }

    const movement: StockMovement = {
      id: `sm-${Date.now()}`,
      medicineId: selectedMedicine.id,
      type: stockAction,
      quantity: parseInt(stockQuantity),
      reason: stockReason,
      createdAt: new Date().toISOString(),
      createdBy: "Current User",
    };

    addStockMovement(movement);

    // Update medicines list
    const updatedMedicines = medicines.map((m) => {
      if (m.id === selectedMedicine.id) {
        const newStock =
          stockAction === "in"
            ? m.stock + parseInt(stockQuantity)
            : Math.max(0, m.stock - parseInt(stockQuantity));
        return {
          ...m,
          stock: newStock,
          lastRestocked:
            stockAction === "in"
              ? new Date().toISOString().split("T")[0]
              : m.lastRestocked,
        };
      }
      return m;
    });

    setMedicines(updatedMedicines);
    setSelectedMedicine(null);
    setStockAction(null);
    setStockQuantity("");
    setStockReason("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-border bg-white px-8 py-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">Manajemen Obat</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola stok obat dan data master obat
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Total Obat</p>
            <p className="text-3xl font-bold text-blue-900">{medicines.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600 font-medium">Total Stok</p>
            <p className="text-3xl font-bold text-green-900">
              {medicines.reduce((sum, m) => sum + m.stock, 0)}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-600 font-medium">Stok Rendah</p>
            <p className="text-3xl font-bold text-red-900">
              {lowStockMedicines.length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">Total Nilai Stok</p>
            <p className="text-3xl font-bold text-purple-900">
              Rp {(medicines.reduce((sum, m) => sum + m.stock * m.pricePerUnit, 0) / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-7xl">
          {/* Low Stock Alert */}
          {lowStockMedicines.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">
                    {lowStockMedicines.length} Obat Stok Rendah
                  </h3>
                  <p className="text-sm text-red-800">
                    {lowStockMedicines.map((m) => m.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Search and Actions */}
          <div className="bg-white rounded-lg border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-2">
                  Cari Obat
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Nama atau bahan aktif..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button
                onClick={() => setIsAddingMedicine(!isAddingMedicine)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Obat
              </Button>
            </div>
          </div>

          {/* Add Medicine Form */}
          {isAddingMedicine && (
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Tambah Obat Baru
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama Obat"
                  className="px-3 py-2 border border-border rounded-md text-foreground"
                />
                <input
                  type="text"
                  placeholder="Bahan Aktif"
                  className="px-3 py-2 border border-border rounded-md text-foreground"
                />
                <select className="px-3 py-2 border border-border rounded-md text-foreground bg-white">
                  <option>-- Jenis --</option>
                  <option value="tablet">Tablet</option>
                  <option value="syrup">Syrup</option>
                  <option value="injection">Injection</option>
                  <option value="capsule">Capsule</option>
                </select>
                <input
                  type="number"
                  placeholder="Harga per Unit"
                  className="px-3 py-2 border border-border rounded-md text-foreground"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Tambah
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingMedicine(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {/* Stock Movement Modal */}
          {selectedMedicine && stockAction && (
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {stockAction === "in" ? "Masuk Stok" : "Keluar Stok"} - {selectedMedicine.name}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Stok Saat Ini
                    </label>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedMedicine.stock}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Jumlah *
                    </label>
                    <input
                      type="number"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md text-foreground"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Alasan *
                  </label>
                  <select
                    value={stockReason}
                    onChange={(e) => setStockReason(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-foreground bg-white"
                  >
                    <option value="">-- Pilih Alasan --</option>
                    {stockAction === "in" ? (
                      <>
                        <option value="Restock">Restock</option>
                        <option value="Return">Return</option>
                        <option value="Adjustment">Penyesuaian</option>
                      </>
                    ) : (
                      <>
                        <option value="Patient usage">Penggunaan Pasien</option>
                        <option value="Expired">Kadaluarsa</option>
                        <option value="Damage">Rusak</option>
                        <option value="Loss">Hilang</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-foreground">
                    Stok Baru: <span className="font-bold">
                      {stockAction === "in"
                        ? selectedMedicine.stock + parseInt(stockQuantity || 0)
                        : Math.max(0, selectedMedicine.stock - parseInt(stockQuantity || 0))}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleStockMovement}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Simpan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedMedicine(null);
                      setStockAction(null);
                      setStockQuantity("");
                      setStockReason("");
                    }}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Medicines Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Nama Obat
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Bahan Aktif
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Jenis
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">
                    Harga
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Stok
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Min. Stok
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 text-foreground font-medium">
                      {medicine.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {medicine.activeIngredient}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {medicine.type}
                    </td>
                    <td className="px-4 py-3 text-right text-foreground font-medium">
                      Rp {medicine.pricePerUnit.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded font-medium">
                        {medicine.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {medicine.minimumStock}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {medicine.stock <= medicine.minimumStock ? (
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                          ⚠️ Rendah
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          ✓ OK
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedMedicine(medicine);
                          setStockAction("in");
                        }}
                        className="text-xs"
                      >
                        <TrendingUp className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedMedicine(medicine);
                          setStockAction("out");
                        }}
                        className="text-xs"
                      >
                        <TrendingDown className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-muted-foreground">Obat tidak ditemukan</p>
            </div>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
