import { useState } from "react";
import { ArrowLeft, FileText, ImageIcon, Syringe, Pill, Tablets, ExternalLink, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Medicine } from "@/lib/mockStore";

interface MedicineDetailProps {
  medicine: Medicine;
  onBack: () => void;
}

const dosageIcon = (form: string) => {
  if (form.toLowerCase().includes("tiêm")) return <Syringe className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />;
  if (form.toLowerCase().includes("viên")) return <Tablets className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />;
  return <Pill className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />;
};

interface InfoRowProps {
  label: string;
  value: string | string[];
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-3 py-3 border-b border-border/50 last:border-0">
      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm text-foreground leading-relaxed break-words">
        {Array.isArray(value) ? value.join(", ") : value}
      </span>
    </div>
  );
};

const MedicineDetail = ({ medicine, onBack }: MedicineDetailProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto w-full pb-8">
      <Button variant="ghost" onClick={onBack} className="mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại danh sách
      </Button>

      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="p-0 rounded-2xl bg-accent flex-shrink-0 overflow-hidden h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center">
            {medicine.images && medicine.images.length > 0 ? (
              <img 
                src={medicine.images[0].url} 
                alt={medicine.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-4">
                {dosageIcon(medicine.dosage_form)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{medicine.name}</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{medicine.dosage_form} — {medicine.concentration}</p>
            <div className="flex flex-wrap gap-1.5 mt-2sm:mt-3">
              {medicine.active_ingredients.map((ing) => (
                <Badge key={ing} className="bg-primary/10 text-accent-foreground border-0 text-xs sm:text-sm">{ing}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-bold text-foreground mb-3">Thông tin thuốc</h2>
        <Separator className="mb-2" />
        <div className="flex flex-col">
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
          
          {(medicine.prepared_by || medicine.prepared_date) && (
            <div className="mt-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Thông tin cập nhật</h3>
              <div className="flex flex-col gap-1">
                {medicine.prepared_by && <p className="text-sm text-foreground"><span className="text-muted-foreground">Người thực hiện:</span> {medicine.prepared_by}</p>}
                {medicine.prepared_date && <p className="text-sm text-foreground"><span className="text-muted-foreground">Ngày thực hiện:</span> {medicine.prepared_date}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Images */}
      {medicine.images && medicine.images.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <ImageIcon className="h-5 w-5 text-primary" /> Hình ảnh đính kèm
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {medicine.images.map((img) => (
              <button 
                key={img.id} 
                className="group relative rounded-xl overflow-hidden border border-border block hover:shadow-lg transition-all duration-300 w-full text-left"
                onClick={() => setPreviewImage(img.url)}
              >
                <img 
                  src={img.url} 
                  alt={img.file_name} 
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-background/90 text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 shadow-sm">
                    <ZoomIn className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {medicine.documents && medicine.documents.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" /> Tài liệu ngoại tuyến
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {medicine.documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-secondary/50 border border-transparent rounded-xl px-4 py-3 hover:bg-secondary hover:border-border hover:shadow-sm transition-all duration-300"
              >
                <div className="p-2.5 bg-background rounded-lg shadow-sm group-hover:shadow transition-all text-muted-foreground group-hover:text-primary shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate block line-clamp-1 group-hover:text-primary transition-colors">
                    {doc.file_name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 block">
                    Nhấn để xem
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl h-[85vh] md:h-[90vh] flex flex-col p-2 sm:p-4 gap-0">
          <DialogTitle className="sr-only">Xem chi tiết ảnh</DialogTitle>
          <DialogDescription className="sr-only">Phóng to hình ảnh của thuốc</DialogDescription>
          <div className="flex-1 w-full h-full overflow-hidden flex flex-col justify-center bg-black/5 rounded-md mt-6">
            {previewImage && (
              <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicineDetail;


