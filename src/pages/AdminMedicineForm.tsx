import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, X, FileText, ImageIcon, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkAuthMock, getMedicineById, addMedicine, updateMedicine, Medicine } from "@/lib/mockStore";

interface MedicineForm {
  name: string;
  concentration: string;
  active_ingredients: string;
  dosage_form: string;
  usage_instructions: string;
  contraindications: string;
  side_effects: string;
  storage: string;
  shelf_life: string;
  packaging: string;
  manufacturer: string;
  payment_condition: string;
  address: string;
  prepared_by: string;
  prepared_date: string;
}

const emptyForm: MedicineForm = {
  name: "",
  concentration: "",
  active_ingredients: "",
  dosage_form: "",
  usage_instructions: "",
  contraindications: "",
  side_effects: "",
  storage: "",
  shelf_life: "",
  packaging: "",
  manufacturer: "",
  payment_condition: "",
  address: "",
  prepared_by: "",
  prepared_date: "",
};

interface UploadedFile {
  id: string;
  file_name: string;
  file_path?: string;
  url: string;
}

const AdminMedicineForm = () => {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<MedicineForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [documents, setDocuments] = useState<UploadedFile[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingDocs, setUploadingDocs] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkAuthMock()) {
      navigate("/admin/login");
      return;
    }
    if (isEdit) loadMedicine();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  const loadMedicine = () => {
    const data = getMedicineById(id!);
    if (!data) {
      toast({ title: "Không tìm thấy thuốc", variant: "destructive" });
      navigate("/admin");
      return;
    }
    setForm({
      name: data.name,
      concentration: data.concentration,
      active_ingredients: data.active_ingredients.join(", "),
      dosage_form: data.dosage_form,
      usage_instructions: data.usage_instructions,
      contraindications: data.contraindications,
      side_effects: data.side_effects,
      storage: data.storage,
      shelf_life: data.shelf_life,
      packaging: data.packaging,
      manufacturer: data.manufacturer,
      payment_condition: data.payment_condition,
      address: data.address,
      prepared_by: data.prepared_by,
      prepared_date: data.prepared_date,
    });
    setImages(data.images || []);
    setDocuments(data.documents || []);
  };

  const handleChange = (field: keyof MedicineForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast({ title: "Vui lòng nhập tên thuốc", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload = {
      name: form.name.trim(),
      concentration: form.concentration.trim(),
      active_ingredients: form.active_ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      dosage_form: form.dosage_form.trim(),
      usage_instructions: form.usage_instructions.trim(),
      contraindications: form.contraindications.trim(),
      side_effects: form.side_effects.trim(),
      storage: form.storage.trim(),
      shelf_life: form.shelf_life.trim(),
      packaging: form.packaging.trim(),
      manufacturer: form.manufacturer.trim(),
      payment_condition: form.payment_condition.trim(),
      address: form.address.trim(),
      prepared_by: form.prepared_by.trim(),
      prepared_date: form.prepared_date.trim(),
    };

    setTimeout(() => {
      if (isEdit) {
        updateMedicine(id!, payload);
      } else {
        addMedicine(payload);
      }

      toast({ title: isEdit ? "Đã cập nhật thuốc" : "Đã thêm thuốc mới" });
      setSaving(false);
      navigate("/admin");
    }, 500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !isEdit) return;
    setUploadingImages(true);
    
    // Mock upload
    setTimeout(() => {
      const newImages = Array.from(e.target.files || []).map(file => ({
        id: Date.now().toString() + Math.random().toString(),
        file_name: file.name,
        file_path: "mock/" + file.name,
        // Tạo một object URL để hiển thị ngay ảnh
        url: URL.createObjectURL(file)
      }));
      
      const updatedImages = [...images, ...newImages];
      updateMedicine(id!, { images: updatedImages });
      setImages(updatedImages);
      setUploadingImages(false);
      if (e.target) e.target.value = "";
    }, 1000);
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !isEdit) return;
    setUploadingDocs(true);
    
    // Mock upload
    setTimeout(() => {
      const newDocs = Array.from(e.target.files || []).map(file => ({
        id: Date.now().toString() + Math.random().toString(),
        file_name: file.name,
        file_path: "mock/" + file.name,
        url: "#"
      }));
      
      const updatedDocs = [...documents, ...newDocs];
      updateMedicine(id!, { documents: updatedDocs });
      setDocuments(updatedDocs);
      setUploadingDocs(false);
      if (e.target) e.target.value = "";
    }, 1000);
  };

  const handleDeleteImage = (img: UploadedFile) => {
    const updated = images.filter((i) => i.id !== img.id);
    updateMedicine(id!, { images: updated });
    setImages(updated);
  };

  const handleDeleteDoc = (doc: UploadedFile) => {
    const updated = documents.filter((d) => d.id !== doc.id);
    updateMedicine(id!, { documents: updated });
    setDocuments(updated);
  };

  const fields: { key: keyof MedicineForm; label: string; type?: "textarea" }[] = [
    { key: "name", label: "Tên thuốc *" },
    { key: "concentration", label: "Nồng độ / Hàm lượng" },
    { key: "active_ingredients", label: "Hoạt chất (phân cách bằng dấu phẩy)" },
    { key: "dosage_form", label: "Dạng bào chế" },
    { key: "usage_instructions", label: "Hướng dẫn sử dụng", type: "textarea" },
    { key: "contraindications", label: "Chống chỉ định", type: "textarea" },
    { key: "side_effects", label: "Tác dụng phụ", type: "textarea" },
    { key: "storage", label: "Bảo quản" },
    { key: "shelf_life", label: "Hạn dùng" },
    { key: "packaging", label: "Quy cách đóng gói" },
    { key: "manufacturer", label: "Nhà sản xuất" },
    { key: "payment_condition", label: "Điều kiện thanh toán" },
    { key: "address", label: "Địa chỉ (Tủ)" },
    { key: "prepared_by", label: "Người thực hiện" },
    { key: "prepared_date", label: "Ngày thực hiện" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">
            {isEdit ? "Chỉnh sửa thuốc" : "Thêm thuốc mới"}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Medicine info form */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Thông tin thuốc</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <Label className="text-sm text-muted-foreground mb-1.5 block">{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea
                    value={form[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    value={form[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {saving ? "Đang lưu..." : "Lưu thuốc"}
            </Button>
          </div>
        </div>

        {/* Image uploads - only for existing medicines */}
        {isEdit && (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" /> Hình ảnh thuốc
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploadingImages}
              >
                {uploadingImages ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-1" />
                )}
                Tải ảnh lên
              </Button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </div>
            {images.length === 0 ? (
              <div
                className="border-2 border-dashed border-border rounded-xl p-10 text-center text-muted-foreground cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm">Nhấn để tải ảnh lên</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-border">
                    <img src={img.url} alt={img.file_name} className="w-full h-40 object-cover" />
                    <button
                      onClick={() => handleDeleteImage(img)}
                      className="absolute top-2 right-2 bg-foreground/70 text-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Document uploads */}
        {isEdit && (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Giấy tờ / Tài liệu
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => docInputRef.current?.click()}
                disabled={uploadingDocs}
              >
                {uploadingDocs ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-1" />
                )}
                Tải tài liệu lên
              </Button>
              <input
                ref={docInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                multiple
                hidden
                onChange={handleDocUpload}
              />
            </div>
            {documents.length === 0 ? (
              <div
                className="border-2 border-dashed border-border rounded-xl p-10 text-center text-muted-foreground cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() => docInputRef.current?.click()}
              >
                <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm">Nhấn để tải tài liệu lên</p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-secondary rounded-lg px-4 py-3">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground truncate max-w-xs">
                        {doc.file_name}
                      </span>
                    </a>
                    <button
                      onClick={() => handleDeleteDoc(doc)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!isEdit && (
          <p className="text-sm text-muted-foreground text-center">
            💡 Lưu thuốc trước, sau đó bạn có thể thêm hình ảnh và tài liệu.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminMedicineForm;
