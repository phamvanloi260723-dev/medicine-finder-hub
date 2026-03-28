import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loginMock, checkAuthMock } from "@/lib/mockStore";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (checkAuthMock()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const success = loginMock(email, password);
      setLoading(false);
      
      if (!success) {
        toast({ title: "Đăng nhập thất bại", description: "Sai email hoặc mật khẩu. Gợi ý: admin@gmail.com / 123456", variant: "destructive" });
      } else {
        navigate("/admin");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-2xl bg-primary/10 w-fit mb-2">
            <Pill className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">Đăng nhập quản trị</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Dùng tài khoản: admin@gmail.com / 123456</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
