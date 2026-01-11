import { useState } from "react";
import { Heart, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBackOfficeLogin } from "@/hooks/use-backoffice-login";

export default function Login() {
  const { login, demoLogin, isLoading } = useBackOfficeLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email adalah wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!password) {
      newErrors.password = "Password adalah wajib diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-lg p-3">
                <Heart className="w-8 h-8 text-blue-600 fill-current" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white text-center">
              MediCare
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm">
              Sistem Manajemen Klinik
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-6 py-8 space-y-6"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                disabled={isLoading}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                disabled={isLoading}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.password
                    ? "border-destructive"
                    : "border-border"
                }`}
              />
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sedang masuk...
                </>
              ) : (
                "Masuk"
              )}
            </Button>

            {/* Demo Login */}
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={demoLogin}
              className="w-full"
            >
              Coba Mode Demo
            </Button>
          </form>

          {/* Footer */}
          <div className="px-6 py-6 bg-gray-50 border-t text-center">
            <p className="text-xs text-muted-foreground mb-3">
              Akun Demo
            </p>
            <div className="text-xs bg-blue-50 rounded-lg p-3 border">
              <div>
                <b>Email:</b> demo@medicare.local
              </div>
              <div>
                <b>Password:</b> demo123
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          © 2026 MediCare
        </div>
      </div>
    </div>
  );
}
