import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pill, Plus, LogOut, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getMedicines, deleteMedicine, checkAuthMock, logoutMock, Medicine } from "@/lib/mockStore";

const Admin = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!checkAuthMock()) {
      navigate("/admin/login");
      return;
    }
    fetchMedicines();
  }, [navigate]);

  const fetchMedicines = () => {
    setLoading(true);
    setTimeout(() => {
      setMedicines(getMedicines());
      setLoading(false);
    }, 300);
  };

  const handleDelete = (id: string) => {
    deleteMedicine(id);
    toast({ title: "Đã xoá thuốc" });
    fetchMedicines();
  };

  const handleLogout = () => {
    logoutMock();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Pill className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Quản lý thuốc</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Xem trang chủ
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Danh sách thuốc ({medicines.length})
          </h2>
          <Button onClick={() => navigate("/admin/medicine/new")}>
            <Plus className="h-4 w-4 mr-1" /> Thêm thuốc mới
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-10">Đang tải...</p>
        ) : medicines.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Pill className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-lg font-medium">Chưa có thuốc nào</p>
            <p className="text-sm mt-1">Nhấn "Thêm thuốc mới" để bắt đầu</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Tên thuốc</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Nồng độ</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Nhà SX</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Ngày tạo</th>
                  <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((m) => (
                  <tr key={m.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{m.name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{m.concentration}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{m.manufacturer}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                      {new Date(m.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/medicine/${m.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xoá thuốc?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc muốn xoá "{m.name}"? Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Huỷ</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(m.id)}>
                                Xoá
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
