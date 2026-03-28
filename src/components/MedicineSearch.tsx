import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MedicineSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MedicineSearch = ({ value, onChange }: MedicineSearchProps) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Tìm kiếm thuốc theo tên, hoạt chất..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-12 text-base rounded-xl border-border bg-card shadow-sm focus-visible:ring-primary"
      />
    </div>
  );
};

export default MedicineSearch;
