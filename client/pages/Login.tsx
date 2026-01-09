import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock login validation - accept any valid email/password combination
      // In production, this would call a real API endpoint
      if (email && password) {
        toast({
          title: "Berhasil masuk",
          description: `Selamat datang, ${email}!`,
        });

        // Store a mock auth token (in production, use secure methods)
        localStorage.setItem("authToken", "mock-token-" + Date.now());
        localStorage.setItem("userEmail", email);

        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Kesalahan Login",
        description: "Terjadi kesalahan saat login. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      // Demo login with preset credentials
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast({
        title: "Demo Mode",
        description: "Masuk dengan akun demo...",
      });

      localStorage.setItem("authToken", "demo-token-" + Date.now());
      localStorage.setItem("userEmail", "demo@medicare.local");

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Kesalahan",
        description: "Gagal masuk ke mode demo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-lg p-3 flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-600 fill-current" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
              MediCare
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm">
              Sistem Manajemen Klinik
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="px-6 py-8 sm:px-8 sm:py-10 space-y-6"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email atau Username
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
                placeholder="nama@medicare.local"
                className={`w-full px-4 py-2.5 border rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
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
                placeholder="Masukkan password Anda"
                className={`w-full px-4 py-2.5 border rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.password ? "border-destructive" : "border-border"
                }`}
                disabled={isLoading}
              />
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border cursor-pointer"
                disabled={isLoading}
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-muted-foreground cursor-pointer"
              >
                Ingat saya
              </label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
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

            {/* Demo Button */}
            <Button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full py-2.5 text-foreground border-border hover:bg-gray-50 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Memproses...
                </>
              ) : (
                "Coba Mode Demo"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 bg-gray-50 border-t border-border text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Akun Demo untuk Keperluan Testing
            </p>
            <div className="space-y-2 text-xs text-muted-foreground bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div>
                <span className="font-semibold">Email:</span>{" "}
                demo@medicare.local
              </div>
              <div>
                <span className="font-semibold">Password:</span> demo123
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2026 MediCare. Hak Cipta Terjaga.</p>
          <p className="mt-1 text-xs text-gray-500">
            Sistem Informasi Manajemen Klinik Terintegrasi
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
