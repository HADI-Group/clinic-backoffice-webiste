import { VitalSigns } from "@/types/medicalRecord";

/**
 * Interpret blood pressure readings
 */
export function interpretBloodPressure(
  systolic: number,
  diastolic: number
): { status: string; color: string; recommendation: string } {
  if (systolic < 120 && diastolic < 80) {
    return {
      status: "Normal",
      color: "text-green-700",
      recommendation: "Tekanan darah normal, pertahankan gaya hidup sehat",
    };
  } else if (systolic < 130 && diastolic < 80) {
    return {
      status: "Elevated",
      color: "text-yellow-700",
      recommendation:
        "Tekanan darah meningkat, perlu monitoring lebih ketat",
    };
  } else if (systolic < 140 && diastolic < 90) {
    return {
      status: "Hypertension Stage 1",
      color: "text-orange-700",
      recommendation: "Hipertensi tahap 1, mulai pertimbangkan obat",
    };
  } else {
    return {
      status: "Hypertension Stage 2",
      color: "text-red-700",
      recommendation: "Hipertensi tahap 2, perlu treatment segera",
    };
  }
}

/**
 * Interpret pulse/heart rate
 */
export function interpretPulse(pulse: number): {
  status: string;
  color: string;
} {
  if (pulse < 60) {
    return { status: "Bradycardia (Lambat)", color: "text-blue-700" };
  } else if (pulse <= 100) {
    return { status: "Normal", color: "text-green-700" };
  } else {
    return { status: "Tachycardia (Cepat)", color: "text-red-700" };
  }
}

/**
 * Interpret SpO2 (Oxygen Saturation)
 */
export function interpretSpO2(spO2: number): {
  status: string;
  color: string;
  recommendation?: string;
} {
  if (spO2 >= 95) {
    return { status: "Normal", color: "text-green-700" };
  } else if (spO2 >= 90) {
    return {
      status: "Low",
      color: "text-yellow-700",
      recommendation: "Oksigen sedikit rendah, perlu monitoring",
    };
  } else {
    return {
      status: "Very Low",
      color: "text-red-700",
      recommendation: "Oksigen sangat rendah, perlu perhatian segera",
    };
  }
}

/**
 * Interpret body temperature
 */
export function interpretTemperature(temp: number): {
  status: string;
  color: string;
  recommendation?: string;
} {
  if (temp < 36.5) {
    return {
      status: "Hypothermia (Rendah)",
      color: "text-blue-700",
      recommendation: "Suhu tubuh terlalu rendah",
    };
  } else if (temp <= 37.2) {
    return { status: "Normal", color: "text-green-700" };
  } else if (temp <= 37.9) {
    return {
      status: "Slight Fever (Demam Ringan)",
      color: "text-yellow-700",
    };
  } else if (temp <= 38.9) {
    return {
      status: "Moderate Fever (Demam Sedang)",
      color: "text-orange-700",
      recommendation: "Demam sedang, perlu treatment",
    };
  } else {
    return {
      status: "High Fever (Demam Tinggi)",
      color: "text-red-700",
      recommendation: "Demam tinggi, perlu perhatian segera",
    };
  }
}

/**
 * Get vital signs summary
 */
export function getVitalSignsSummary(vitalSigns: VitalSigns): {
  status: string;
  alerts: string[];
} {
  const alerts: string[] = [];

  const bpStatus = interpretBloodPressure(
    vitalSigns.bloodPressureSystolic,
    vitalSigns.bloodPressureDiastolic
  );
  if (bpStatus.status !== "Normal") {
    alerts.push(`Tekanan Darah: ${bpStatus.status}`);
  }

  const pulseStatus = interpretPulse(vitalSigns.pulse);
  if (pulseStatus.status !== "Normal") {
    alerts.push(`Nadi: ${pulseStatus.status}`);
  }

  const spO2Status = interpretSpO2(vitalSigns.spO2);
  if (spO2Status.status !== "Normal") {
    alerts.push(`SpO2: ${spO2Status.status}`);
  }

  const tempStatus = interpretTemperature(vitalSigns.temperature);
  if (tempStatus.status !== "Normal") {
    alerts.push(`Suhu: ${tempStatus.status}`);
  }

  return {
    status: alerts.length === 0 ? "All Normal" : "Has Alerts",
    alerts,
  };
}

/**
 * Format vital signs for display
 */
export function formatVitalSigns(vitalSigns: VitalSigns): string {
  return `${vitalSigns.bloodPressureSystolic}/${vitalSigns.bloodPressureDiastolic} mmHg, Nadi: ${vitalSigns.pulse} bpm, SpO2: ${vitalSigns.spO2}%, Suhu: ${vitalSigns.temperature}°C`;
}
