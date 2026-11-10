import bcrypt from "bcryptjs";

const adminEmail = (process.env.ADMIN_EMAIL || "admin@qahwaji.com").toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "Qahwaji@2026";

const providersSeed = [
  { name: "أبو ناصر", gender: "قهوجي", city: "الرياض", rating: 4.9, reviews: 187, experience: "12 سنة خبرة", specialties: "قهوة شمالية، هيل فاخر، مجالس رسمية", pricePerHour: 250, verified: true, available: true },
  { name: "أم سارة", gender: "قهوجية", city: "جدة", rating: 4.8, reviews: 142, experience: "8 سنوات خبرة", specialties: "ضيافة نسائية، تمر محشي، شاي كرك", pricePerHour: 220, verified: true, available: true },
  { name: "سالم الحربي", gender: "قهوجي", city: "الدمام", rating: 4.7, reviews: 98, experience: "10 سنوات", specialties: "مخيمات، فعاليات شركات، قهوة جنوبية", pricePerHour: 200, verified: true, available: true },
  { name: "نورة العتيبي", gender: "قهوجية", city: "الرياض", rating: 5.0, reviews: 211, experience: "15 سنة", specialties: "أعراس فاخرة، زعفران أصلي، تنسيق ضيافة", pricePerHour: 350, verified: true, available: true },
  { name: "خالد القحطاني", gender: "قهوجي", city: "الخبر", rating: 4.6, reviews: 76, experience: "7 سنوات", specialties: "قهوة فرنسية، ضيافة فنادق، باريستا", pricePerHour: 280, verified: true, available: true },
  { name: "منى الشمري", gender: "قهوجية", city: "مكة", rating: 4.9, reviews: 163, experience: "11 سنة", specialties: "معارض، مؤتمرات، قهوة مختصة", pricePerHour: 260, verified: true, available: false },
  { name: "فيصل الدوسري", gender: "قهوجي", city: "الرياض", rating: 4.8, reviews: 134, experience: "9 سنوات", specialties: "مجالس حريم، مناسبات كبرى، قهوة سعودية", pricePerHour: 230, verified: true, available: true },
  { name: "هدى الزهراني", gender: "قهوجية", city: "أبها", rating: 4.7, reviews: 89, experience: "6 سنوات", specialties: "قهوة عسيرية، ضيافة جبلية، طبخ شعبي", pricePerHour: 190, verified: false, available: true },
  { name: "عبدالعزيز المالكي", gender: "قهوجي", city: "المدينة", rating: 4.5, reviews: 62, experience: "5 سنوات", specialties: "رحلات، مخيمات برية، قهوة عربية", pricePerHour: 180, verified: false, available: true },
  { name: "لطيفة الحارثي", gender: "قهوجية", city: "جدة", rating: 4.8, reviews: 117, experience: "10 سنوات", specialties: "أفراح كبرى، فناجين مخصصة، بخور وعطور", pricePerHour: 310, verified: true, available: true },
];

const packagesSeed = [
  { name: "باقة الضيافة الأساسية", price: "من 500 ر.س", popular: false, features: "قهوجي محترف 3 ساعات، دلال وفناجين فاخرة، بن وهيل ممتاز", includes: "تمر فاخر، ماء، مناديل", color: "from-amber-500 to-orange-600", priceValue: 500 },
  { name: "باقة المناسبات المميزة", price: "من 1,200 ر.س", popular: true, features: "قهوجي/قهوجية 5 ساعات، ركن ضيافة كامل، قهوة + شاي + أعشاب", includes: "تمر محشي، حلويات شعبية، مبخرة وعود، زي موحد", color: "from-emerald-600 to-teal-700", priceValue: 1200 },
  { name: "باقة كبار الشخصيات", price: "من 2,500 ر.س", popular: false, features: "فريق ضيافة متكامل، 8 ساعات خدمة، قهوة مختصة وخلطات خاصة", includes: "ضيافة VIP، تنسيق كامل للمجلس، تصوير توثيقي، مدير فعالية", color: "from-yellow-600 to-amber-700", priceValue: 2500 },
  { name: "باقة الأعراس الملكية", price: "من 4,000 ر.س", popular: false, features: "فريق قهوجيات 3+، تغطية كاملة 10 ساعات، دلال مذهبة مخصصة", includes: "بطاقة ضيافة اسمية، هدايا تذكارية للضيوف، فوتوبوث زاوية قهوة، منسقة ضيافة", color: "from-rose-600 to-pink-700", priceValue: 4000 },
  { name: "باقة الشركات والمؤتمرات", price: "من 3,000 ر.س", popular: false, features: "فريق محترف لكامل اليوم، ركنين ضيافة، تقارير إحصائية", includes: "شعار الشركة على الفناجين، مواد دعائية، تصوير احترافي، بوفيه ضيافة", color: "from-blue-700 to-indigo-800", priceValue: 3000 },
];

const testimonialsSeed = [
  { n: "محمد العتيبي", c: "زواج أخي", t: "خدمة راقية جداً، القهوجي وصل قبل الموعد وجهز كل شيء باحتراف. الضيوف انبهروا!" },
  { n: "سارة القحطاني", c: "استقبال ضيوف", t: "قهوجية مرتبة وأنيقة، القهوة موزونة والتمر فاخر. التجربة تستحق كل ريال." },
  { n: "شركة رواد", c: "فعالية شركات", t: "فريق متكامل، التزام بالوقت وتعامل راقي. سنعتمد عليهم دائماً." },
  { n: "أحمد البلوي", c: "مخيم بري", t: "القهوجي ضبط الجو بالكامل. قهوة ودفا ورحابة صدر. تجربة لا تنسى." },
  { n: "نورة الدوسري", c: "حفل تخرج", t: "أبدعت القهوجية في تنسيق ركن الضيافة. الكل صور وتفاعل. شكراً للقهوجية!" },
  { n: "مؤسسة البادي", c: "مؤتمر سنوي", t: "تعاقدنا شهرياً بعد التجربة الأولى. احترافية وثقة والتزام." },
];

export function buildSeed() {
  return {
    users: [
      {
        id: 1,
        name: "المدير",
        email: adminEmail,
        password: bcrypt.hashSync(adminPassword, 10),
        role: "admin",
      },
    ],
    providers: providersSeed.map((p, i) => ({ id: i + 1, ...p })),
    packages: packagesSeed.map((p, i) => ({ id: i + 1, ...p })),
    bookings: [],
    testimonials: testimonialsSeed.map((t, i) => ({ id: i + 1, ...t })),
    messages: [],
    nextIds: {
      users: 1,
      providers: providersSeed.length,
      packages: packagesSeed.length,
      bookings: 0,
      testimonials: testimonialsSeed.length,
    },
  };
}

export const defaultAdmin = { email: adminEmail, password: adminPassword };
