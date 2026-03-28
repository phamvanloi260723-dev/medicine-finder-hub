export type Medicine = {
  id: string;
  name: string;
  active_ingredients: string[];
  concentration: string;
  dosage_form: string;
  packaging: string;
  manufacturer: string;
  address: string;
  contraindications: string;
  side_effects: string;
  usage_instructions: string;
  storage: string;
  shelf_life: string;
  payment_condition: string;
  prepared_by: string;
  prepared_date: string;
  created_at: string;
  updated_at: string;
  images: { id: string; file_name: string; url: string }[];
  documents: { id: string; file_name: string; url: string }[];
};

const INITIAL_MEDICINES: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    active_ingredients: ["Paracetamol"],
    concentration: "500mg",
    dosage_form: "Viên nén",
    packaging: "Hộp 10 vỉ x 10 viên",
    manufacturer: "Dược Hậu Giang",
    address: "Tủ A, Ngăn 1",
    contraindications: "Mẫn cảm với thành phần của thuốc.",
    side_effects: "Ít gặp: ban da.",
    usage_instructions: "Người lớn: 1-2 viên/lần. Tối đa 4000mg/ngày.",
    storage: "Nơi khô ráo, nhiệt độ dưới 30 độ C.",
    shelf_life: "36 tháng",
    payment_condition: "BHYT",
    prepared_by: "Dược sĩ A",
    prepared_date: "2023-10-01",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [],
    documents: [],
  },
  {
    id: "2",
    name: "Cefuroxim 500mg",
    active_ingredients: ["Cefuroxim"],
    concentration: "500mg",
    dosage_form: "Viên nén bao phim",
    packaging: "Hộp 2 vỉ x 10 viên",
    manufacturer: "Dược Trung Ương 1",
    address: "Tủ B, Ngăn 2",
    contraindications: "Mẫn cảm với cephalosporin.",
    side_effects: "Tiêu chảy, ban da.",
    usage_instructions: "Theo hướng dẫn của bác sĩ.",
    storage: "Nơi khô ráo, nhiệt độ dưới 30 độ C.",
    shelf_life: "24 tháng",
    payment_condition: "Tự nguyện",
    prepared_by: "Dược sĩ B",
    prepared_date: "2023-10-05",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [],
    documents: [],
  }
];

export const getMedicines = (): Medicine[] => {
  const stored = localStorage.getItem("mock_medicines");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("mock_medicines", JSON.stringify(INITIAL_MEDICINES));
  return INITIAL_MEDICINES;
};

export const saveMedicines = (medicines: Medicine[]) => {
  localStorage.setItem("mock_medicines", JSON.stringify(medicines));
};

export const getMedicineById = (id: string): Medicine | undefined => {
  return getMedicines().find((m) => m.id === id);
};

export const addMedicine = (medicine: Omit<Medicine, "id" | "created_at" | "updated_at" | "images" | "documents">) => {
  const medicines = getMedicines();
  const newMed: Medicine = {
    ...medicine,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [],
    documents: [],
  };
  medicines.push(newMed);
  saveMedicines(medicines);
  return newMed;
};

export const updateMedicine = (id: string, updates: Partial<Medicine>) => {
  const medicines = getMedicines();
  const index = medicines.findIndex(m => m.id === id);
  if (index > -1) {
    medicines[index] = { ...medicines[index], ...updates, updated_at: new Date().toISOString() };
    saveMedicines(medicines);
    return medicines[index];
  }
  return null;
};

export const deleteMedicine = (id: string) => {
  const medicines = getMedicines().filter((m) => m.id !== id);
  saveMedicines(medicines);
};

// Auth Mock
export const loginMock = (email: string, pass: string) => {
  if (email === "admin@gmail.com" && pass === "123456") {
    localStorage.setItem("mock_admin", "true");
    return true;
  }
  return false;
};

export const checkAuthMock = () => {
  return localStorage.getItem("mock_admin") === "true";
};

export const logoutMock = () => {
  localStorage.removeItem("mock_admin");
};
