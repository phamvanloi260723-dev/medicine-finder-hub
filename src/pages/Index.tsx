import { useState, useMemo } from "react";
import { Pill } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import MedicineSearch from "@/components/MedicineSearch";
import MedicineCard from "@/components/MedicineCard";
import MedicineDetail from "@/components/MedicineDetail";
import { getMedicines, Medicine } from "@/lib/mockStore";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      // Giả lập delay mạng (mock network request)
      return new Promise<Medicine[]>((resolve) => {
        setTimeout(() => {
          resolve(getMedicines());
        }, 500);
      });
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return medicines;
    const q = search.toLowerCase();
    return medicines.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.active_ingredients.some((a) => a.toLowerCase().includes(q)) ||
        m.dosage_form.toLowerCase().includes(q)
    );
  }, [search, medicines]);

  if (selectedMedicine) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <MedicineDetail medicine={selectedMedicine} onBack={() => setSelectedMedicine(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Pill className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Tra cứu thông tin thuốc</h1>
            <p className="text-sm text-muted-foreground">Tổ Dược Lâm Sàng — Khoa Dược — Bệnh viện Đa khoa tỉnh Tuyên Quang</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <MedicineSearch value={search} onChange={setSearch} />
        </div>

        {isLoading ? (
          <p className="text-center py-16 text-muted-foreground">Đang tải dữ liệu...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Pill className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-lg font-medium">Không tìm thấy thuốc nào</p>
            <p className="text-sm mt-1">Thử tìm với từ khoá khác</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} onClick={setSelectedMedicine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
