/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date | string): number {
  const dob = typeof dateOfBirth === "string" ? new Date(dateOfBirth) : dateOfBirth;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * Calculate BMI from height (cm) and weight (kg)
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * Get BMI category and recommendation
 */
export function getBMICategory(bmi: number): {
  category: string;
  recommendation: string;
  color: string;
} {
  if (bmi < 18.5) {
    return {
      category: "Underweight",
      recommendation: "Tingkatkan asupan nutrisi dan konsultasi dengan dokter",
      color: "bg-blue-50 text-blue-700",
    };
  } else if (bmi < 25) {
    return {
      category: "Normal",
      recommendation: "Pertahankan gaya hidup sehat",
      color: "bg-green-50 text-green-700",
    };
  } else if (bmi < 30) {
    return {
      category: "Overweight",
      recommendation: "Tingkatkan aktivitas fisik dan atur pola makan",
      color: "bg-yellow-50 text-yellow-700",
    };
  } else {
    return {
      category: "Obese",
      recommendation: "Konsultasi dengan ahli gizi dan dokter",
      color: "bg-red-50 text-red-700",
    };
  }
}

/**
 * Generate Medical Record Number
 * Format: RM-YYYY/CAT/NNN
 * CAT = UMM (Umum/General) or SRK (Sirkumsisi)
 * NNN = Sequential number
 */
export function generateMedicalRecordNumber(
  treatmentCategory: "umum" | "sirkumsisi",
  sequentialNumber: number
): string {
  const year = new Date().getFullYear();
  const categoryCode = treatmentCategory === "umum" ? "UMM" : "SRK";
  const paddedNumber = String(sequentialNumber).padStart(3, "0");
  return `RM-${year}/${categoryCode}/${paddedNumber}`;
}

/**
 * Format date to Indonesian format
 */
export function formatDateID(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date to YYYY-MM-DD for input fields
 */
export function formatDateForInput(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse date from YYYY-MM-DD format
 */
export function parseDateInput(dateString: string): Date {
  return new Date(dateString + "T00:00:00");
}
