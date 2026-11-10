import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import MobileCTA from "./components/MobileCTA";
import { hostingExtras } from "./data/content";
import { useToast } from "./components/ui/Toast";
import type { Provider } from "./data/providers";

const ServicesSection = lazy(() => import("./components/ServicesSection"));
const PackagesSection = lazy(() => import("./components/PackagesSection"));
const ProvidersSection = lazy(() => import("./components/ProvidersSection"));
const DashboardSection = lazy(() => import("./components/DashboardSection"));
const HowItWorksSection = lazy(() => import("./components/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const CTASection = lazy(() => import("./components/CTASection"));
const Footer = lazy(() => import("./components/Footer"));
const BookingModal = lazy(() => import("./components/BookingModal"));
const ProviderRegistrationModal = lazy(() => import("./components/ProviderRegistrationModal"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

const isAdminRoute =
  typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

function SectionSkeleton() {
  return <div className="py-20 px-4"><div className="shimmer h-64 w-full rounded-2xl bg-elevated animate-shimmer" /></div>;
}

export default function App() {
  const { toast } = useToast();
  const [city, setCity] = useState("الرياض");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [duration, setDuration] = useState(4);
  const [gender, setGender] = useState<"الكل" | "قهوجي" | "قهوجية">("الكل");
  const [guests, setGuests] = useState(30);
  const [packageId, setPackageId] = useState("premium");
  const [showBooking, setShowBooking] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [details, setDetails] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [dashTab, setDashTab] = useState("حجز");

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);

  const showToast = (msg: string) => toast(msg, "success");

  if (isAdminRoute) {
    return (
      <div dir="rtl" lang="ar" className="grain min-h-screen bg-page text-strong">
        <Suspense fallback={<div className="min-h-screen bg-page" />}>
          <AdminApp />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="grain min-h-screen bg-page text-strong">
      <Navbar onBook={() => setShowBooking(true)} />

      <Hero
        city={city} setCity={setCity}
        date={date} setDate={setDate}
        time={time} setTime={setTime}
        duration={duration} setDuration={setDuration}
        gender={gender} setGender={setGender}
        guests={guests} setGuests={setGuests}
        setShowBooking={setShowBooking}
        showToast={showToast}
      />

      <TrustStrip />

      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PackagesSection setPackageId={setPackageId} setShowBooking={setShowBooking} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProvidersSection
          city={city} setCity={setCity}
          gender={gender} setGender={setGender}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          setShowBooking={setShowBooking}
        />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DashboardSection activeTab={dashTab} setActiveTab={setDashTab} onRegister={() => setShowRegistration(true)} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CTASection onBook={() => setShowBooking(true)} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Footer onRegister={() => setShowRegistration(true)} />
      </Suspense>

      <MobileCTA onBook={() => setShowBooking(true)} />

      <Suspense fallback={null}>
        <BookingModal
          visible={showBooking}
          onClose={() => setShowBooking(false)}
          city={city}
          date={date}
          time={time}
          duration={duration}
          gender={gender}
          guests={guests}
          packageId={packageId}
          selectedProvider={selectedProvider}
          details={details}
          setDetails={setDetails}
          extras={extras}
          setExtras={setExtras}
          onConfirm={(customer) => {
            setShowBooking(false);

            const selectedExtras = hostingExtras.filter((e) => extras.includes(e.id));
            const bookingDetails = `
تفاصيل الحجز:
- الاسم: ${customer.name}
- الجوال: ${customer.phone}
- المدينة: ${city}
- التاريخ: ${date || "يحدد لاحقاً"}
- الوقت: ${time}
- المدة: ${duration} ساعات
- الضيوف: ${guests}
- نوع مقدم الخدمة: ${gender}
${selectedProvider ? `- مقدم الخدمة: ${selectedProvider.name}` : ""}
${selectedExtras.length ? `- خدمات إضافية:\n${selectedExtras.map((e) => `   • ${e.label} (${e.price} ر.س)`).join("\n")}` : ""}
- التفاصيل: ${details}
`;

            const whatsappUrl = `https://wa.me/966500129783?text=${encodeURIComponent(bookingDetails.trim())}`;
            window.open(whatsappUrl, "_blank");

            showToast("تم تأكيد حجزك بنجاح! سيتواصل معك القهوجي قريباً ✅");
          }}
        />
      </Suspense>

      <Suspense fallback={null}>
        <ProviderRegistrationModal
          visible={showRegistration}
          onClose={() => setShowRegistration(false)}
          onSuccess={showToast}
        />
      </Suspense>
    </div>
  );
}
