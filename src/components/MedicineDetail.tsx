import { ArrowLeft, FileText, ImageIcon, Syringe, Pill, Tablets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Medicine } from "@/pages/Index";

interface MedicineDetailProps {
  medicine: Medicine;
  onBack: () => void;
}

const dosageIcon = (form: string) => {
  if (form.includes("tiêm")) return <Syringe className="h-10 w-10 text-primary" />;
  if (form.includes("viên")) return <Tablets className="h-10 w-10 text-primary" />;
  return <Pill className="h-10 w-10 text-primary" />;
};

interface InfoRowProps {
  label: string;
  value: string | string[];
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="grid grid-cols-[180px_1fr] gap-3 py-3">
      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm text-foreground leading-relaxed">
        {Array.isArray(value) ? value.join(", ") : value}
      </span>
    </div>
  );
};

const MedicineDetail = ({ medicine, onBack }: MedicineDetailProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại danh sách
      </Button>

      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-accent">
            {dosageIcon(medicine.dosage_form)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{medicine.name}</h1>
            <p className="text-muted-foreground mt-1">{medicine.dosage_form} — {medicine.concentration}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {medicine.active_ingredients.map((ing) => (
                <Badge key={ing} className="bg-primary/10 text-accent-foreground border-0">{ing}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3">Thông tin thuốc</h2>
        <Separator className="mb-2" />
        <InfoRow label="Nồng độ / Hàm lượng" value={medicine.concentration} />
        <InfoRow label="Hoạt chất" value={medicine.active_ingredients} />
        <InfoRow label="Dạng bào chế" value={medicine.dosage_form} />
        <InfoRow label="Hướng dẫn sử dụng" value={medicine.usage_instructions} />
        <InfoRow label="Chống chỉ định" value={medicine.contraindications} />
        <InfoRow label="Tác dụng phụ" value={medicine.side_effects} />
        <InfoRow label="Bảo quản" value={medicine.storage} />
        <InfoRow label="Hạn dùng" value={medicine.shelf_life} />
        <InfoRow label="Quy cách đóng gói" value={medicine.packaging} />
        <InfoRow label="Nhà sản xuất" value={medicine.manufacturer} />
        <InfoRow label="Điều kiện thanh toán" value={medicine.payment_condition} />
        <InfoRow label="Địa chỉ (Tủ)" value={medicine.address} />
        <Separator className="my-2" />
        <InfoRow label="Người thực hiện" value={medicine.prepared_by} />
        <InfoRow label="Ngày thực hiện" value={medicine.prepared_date} />
      </div>

      {/* Images */}
      {medicine.images.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <ImageIcon className="h-5 w-5 text-primary" /> Hình ảnh thuốc
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {medicine.images.map((img) => (
              <div key={img.id} className="rounded-xl overflow-hidden border border-border">
                <img src={img.url} alt={img.file_name} className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {medicine.documents.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" /> Giấy tờ / Tài liệu
          </h2>
          <div className="space-y-2">
            {medicine.documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-secondary rounded-lg px-4 py-3 hover:bg-secondary/80 transition-colors"
              >
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground truncate">{doc.file_name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineDetail;
