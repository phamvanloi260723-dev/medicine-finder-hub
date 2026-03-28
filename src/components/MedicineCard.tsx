import { Pill, Syringe, Tablets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Medicine } from "@/lib/mockStore";

interface MedicineCardProps {
  medicine: Medicine;
  onClick: (medicine: Medicine) => void;
}

const dosageIcon = (form: string) => {
  if (form.toLowerCase().includes("tiêm")) return <Syringe className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />;
  if (form.toLowerCase().includes("viên")) return <Tablets className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />;
  return <Pill className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />;
};

const MedicineCard = ({ medicine, onClick }: MedicineCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg hover:border-primary/40 transition-all duration-200 group h-full"
      onClick={() => onClick(medicine)}
    >
      <CardContent className="p-4 sm:p-5 h-full flex flex-col">
        <div className="flex flex-col gap-3 flex-1">
          <div className="p-0 rounded-xl bg-accent flex-shrink-0 group-hover:bg-primary/10 transition-colors overflow-hidden h-40 sm:h-48 w-full flex items-center justify-center border border-border/50">
            {medicine.images && medicine.images.length > 0 ? (
              <img 
                src={medicine.images[0].url} 
                alt={medicine.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="p-4">
                {dosageIcon(medicine.dosage_form)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">{medicine.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-1">{medicine.concentration}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {medicine.active_ingredients.slice(0, 2).map((ing) => (
                <Badge key={ing} variant="secondary" className="text-[10px] sm:text-xs font-medium px-1.5 py-0 sm:px-2 sm:py-0.5">
                  {ing}
                </Badge>
              ))}
              {medicine.active_ingredients.length > 2 && (
                <Badge variant="secondary" className="text-[10px] sm:text-xs font-medium px-1.5 py-0 sm:px-2 sm:py-0.5">
                  +{medicine.active_ingredients.length - 2}
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">{medicine.dosage_form}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
