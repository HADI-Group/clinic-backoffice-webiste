import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginBackOffice } from "@/api/back_office/auth.service";

export function useBackOfficeLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginBackOffice(email, password);

      toast({
        title: "Berhasil masuk",
        description: `Selamat datang, ${email}`,
      });

      navigate("/dashboard");
    } catch (e: any) {
      toast({
        title: "Kesalahan Login",
        description: e?.message ?? "Email atau password salah",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async () => {
    setIsLoading(true);
    try {
      await loginBackOffice("demo@medicare.local", "demo123");

      toast({
        title: "Demo Mode",
        description: "Masuk dengan akun demo",
      });

      navigate("/dashboard");
    } catch {
      toast({
        title: "Kesalahan",
        description: "Gagal masuk ke mode demo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, demoLogin, isLoading };
}
