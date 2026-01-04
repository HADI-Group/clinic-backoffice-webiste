import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import MedicalRecords from "./pages/MedicalRecords";
import MedicalRecordsList from "./pages/MedicalRecordsList";
import Queue from "./pages/Queue";
import Medicine from "./pages/Medicine";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import MasterData from "./pages/MasterData";
import AppLayout from "./components/AppLayout";
import PagePlaceholder from "./components/PagePlaceholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/patients"
            element={
              <AppLayout>
                <Patients />
              </AppLayout>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <AppLayout>
                <PatientDetail />
              </AppLayout>
            }
          />
          <Route
            path="/medical-records"
            element={
              <AppLayout>
                <MedicalRecordsList />
              </AppLayout>
            }
          />
          <Route
            path="/medical-records/:patientId"
            element={
              <AppLayout>
                <MedicalRecords />
              </AppLayout>
            }
          />
          <Route
            path="/queue"
            element={
              <AppLayout>
                <Queue />
              </AppLayout>
            }
          />
          <Route
            path="/medicine"
            element={
              <AppLayout>
                <PagePlaceholder
                  title="Obat"
                  description="Kelola stok obat, catat obat masuk dan keluar, serta atur peringatan stok rendah."
                />
              </AppLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <AppLayout>
                <PagePlaceholder
                  title="Transaksi"
                  description="Catat pendapatan dan pengeluaran, kelola transaksi keuangan klinik."
                />
              </AppLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AppLayout>
                <PagePlaceholder
                  title="Laporan"
                  description="Lihat laporan harian, bulanan, dan analisis data pasien, keuangan, dan operasional."
                />
              </AppLayout>
            }
          />
          <Route
            path="/master-data/doctors"
            element={
              <AppLayout>
                <PagePlaceholder
                  title="Data Dokter"
                  description="Kelola data dokter dan spesialisasi."
                />
              </AppLayout>
            }
          />
          <Route
            path="/master-data/diagnosis"
            element={
              <AppLayout>
                <PagePlaceholder
                  title="Diagnosis"
                  description="Kelola daftar diagnosis medis."
                />
              </AppLayout>
            }
          />
          <Route
            path="/master-data/settings"
            element={
              <AppLayout>
                <PagePlaceholder
                  title="Pengaturan"
                  description="Kelola pengaturan sistem klinik."
                />
              </AppLayout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
