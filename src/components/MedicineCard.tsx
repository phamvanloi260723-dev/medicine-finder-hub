import { Pill, Syringe, Tablets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Medicine } from "@/pages/Index";

interface MedicineCardProps {
  medicine: Medicine;
  onClick: (medicine: Medicine) => void;
}

const dosageIcon = (form: string) => {
  if (form.includes("tiêm")) return <Syringe className="h-8 w-8 text-primary" />;
  if (form.includes("viên")) return <Tablets className="h-8 w-8 text-primary" />;
  return <Pill className="h-8 w-8 text-primary" />;
};

const MedicineCard = ({ medicine, onClick }: MedicineCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg hover:border-primary/40 transition-all duration-200 group"
      onClick={() => onClick(medicine)}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent flex-shrink-0 group-hover:bg-primary/10 transition-colors">
            {dosageIcon(medicine.dosage_form)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground truncate">{medicine.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{medicine.concentration}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {medicine.active_ingredients.map((ing) => (
                <Badge key={ing} variant="secondary" className="text-xs font-medium">
                  {ing}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{medicine.dosage_form}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
