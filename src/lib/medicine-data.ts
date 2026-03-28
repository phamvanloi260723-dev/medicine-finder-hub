export interface Medicine {
  id: string;
  name: string;
  concentration: string;
  activeIngredients: string[];
  dosageForm: string;
  usage: string;
  contraindications: string;
  sideEffects: string;
  storage: string;
  shelfLife: string;
  packaging: string;
  manufacturer: string;
  images: string[];
  documents: { name: string; url: string }[];
  paymentCondition: string;
  address: string;
  preparedBy: string;
  preparedDate: string;
}

export const sampleMedicines: Medicine[] = [
  {
    id: "1",
    name: "Claminat 600",
    concentration: "500mg/100mg",
    activeIngredients: ["Amoxicilin", "Acid clavulanic"],
    dosageForm: "Thuốc bột pha tiêm",
    usage: "Tiêm tĩnh mạch chậm hoặc truyền tĩnh mạch. Liều dùng tuỳ theo chỉ định của bác sĩ.",
    contraindications: "Quá mẫn với penicillin hoặc cephalosporin. Tiền sử vàng da/suy gan do amoxicilin/acid clavulanic.",
    sideEffects: "Tiêu chảy, buồn nôn, nôn, phát ban da, ngứa. Hiếm gặp: phản ứng phản vệ.",
    storage: "Không quá 30°C, tránh ẩm và ánh sáng.",
    shelfLife: "24 tháng kể từ ngày sản xuất",
    packaging: "Hộp 10 lọ",
    manufacturer: "IMEXPHARM",
    images: [],
    documents: [],
    paymentCondition: "",
    address: "C",
    preparedBy: "DSĐH. Nguyễn Triệu Thu Nhung - DSĐH. Nguyễn Ngọc Anh",
    preparedDate: "17/06/2025",
  },
  {
    id: "2",
    name: "Amoxicillin 500mg",
    concentration: "500mg",
    activeIngredients: ["Amoxicillin trihydrate"],
    dosageForm: "Viên nang cứng",
    usage: "Uống 250-500mg mỗi 8 giờ hoặc theo chỉ định của bác sĩ.",
    contraindications: "Quá mẫn với penicillin.",
    sideEffects: "Tiêu chảy, buồn nôn, phát ban da.",
    storage: "Dưới 30°C, nơi khô ráo.",
    shelfLife: "36 tháng",
    packaging: "Hộp 10 vỉ x 10 viên",
    manufacturer: "Domesco",
    images: [],
    documents: [],
    paymentCondition: "BHYT",
    address: "B",
    preparedBy: "DSĐH. Nguyễn Triệu Thu Nhung",
    preparedDate: "10/06/2025",
  },
  {
    id: "3",
    name: "Ceftriaxone 1g",
    concentration: "1g",
    activeIngredients: ["Ceftriaxone natri"],
    dosageForm: "Thuốc bột pha tiêm",
    usage: "Tiêm bắp hoặc tiêm tĩnh mạch 1-2g/ngày.",
    contraindications: "Quá mẫn với cephalosporin. Trẻ sơ sinh vàng da.",
    sideEffects: "Đau tại chỗ tiêm, tiêu chảy, phát ban.",
    storage: "Dưới 25°C, tránh ánh sáng.",
    shelfLife: "24 tháng",
    packaging: "Hộp 1 lọ + 1 ống dung môi",
    manufacturer: "Bidiphar",
    images: [],
    documents: [],
    paymentCondition: "BHYT",
    address: "A",
    preparedBy: "DSĐH. Nguyễn Ngọc Anh",
    preparedDate: "15/06/2025",
  },
];
