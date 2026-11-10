export type Package = {
  id: string;
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  includes: string[];
  color: string;
  priceValue: number;
};

export const packages: Package[] = [
  {
    id: "basic",
    name: "باقة الضيافة الأساسية",
    price: "من 500 ر.س",
    color: "from-amber-500 to-orange-600",
    features: ["قهوجي محترف 3 ساعات", "دلال وفناجين فاخرة", "بن وهيل ممتاز"],
    includes: ["تمر فاخر", "ماء", "مناديل"],
    priceValue: 500,
  },
  {
    id: "premium",
    name: "باقة المناسبات المميزة",
    price: "من 1,200 ر.س",
    popular: true,
    color: "from-emerald-600 to-teal-700",
    features: ["قهوجي/قهوجية 5 ساعات", "ركن ضيافة كامل", "قهوة + شاي + أعشاب"],
    includes: ["تمر محشي", "حلويات شعبية", "مبخرة وعود", "زي موحد"],
    priceValue: 1200,
  },
  {
    id: "gold",
    name: "باقة كبار الشخصيات",
    price: "من 2,500 ر.س",
    color: "from-yellow-600 to-amber-700",
    features: ["فريق ضيافة متكامل", "8 ساعات خدمة", "قهوة مختصة وخلطات خاصة"],
    includes: ["ضيافة VIP", "تنسيق كامل للمجلس", "تصوير توثيقي", "مدير فعالية"],
    priceValue: 2500,
  },
  {
    id: "wedding",
    name: "باقة الأعراس الملكية",
    price: "من 4,000 ر.س",
    color: "from-rose-600 to-pink-700",
    features: ["فريق قهوجيات 3+", "تغطية كاملة 10 ساعات", "دلال مذهبة مخصصة"],
    includes: ["بطاقة ضيافة اسمية", "هدايا تذكارية للضيوف", "فوتوبوث زاوية قهوة", "منسقة ضيافة"],
    priceValue: 4000,
  },
  {
    id: "corporate",
    name: "باقة الشركات والمؤتمرات",
    price: "من 3,000 ر.س",
    color: "from-blue-700 to-indigo-800",
    features: ["فريق محترف لكامل اليوم", "ركنين ضيافة", "تقارير إحصائية"],
    includes: ["شعار الشركة على الفناجين", "مواد دعائية", "تصوير احترافي", "بوفيه ضيافة"],
    priceValue: 3000,
  },
];
