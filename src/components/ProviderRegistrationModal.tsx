import { useState } from "react";
import Logo from "./Logo";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { Input, Select } from "./ui/Field";
import { CheckIcon } from "./ui/Icons";

type Props = { visible: boolean; onClose: () => void; onSuccess: (msg: string) => void };

const CITIES = ["الرياض", "جدة", "الدمام", "مكة", "المدينة", "الخبر", "أبها", "تبوك"];

export default function ProviderRegistrationModal({ visible, onClose, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", city: "", gender: "قهوجي" });

  const handleSubmit = () => {
    onSuccess("تم استلام طلبك بنجاح! سنتواصل معك خلال 24 ساعة ✅");
    setStep(1);
    setForm({ name: "", phone: "", city: "", gender: "قهوجي" });
    onClose();
  };

  return (
    <Modal open={visible} onClose={onClose} title="انضم كمزود خدمة" size="md" headerAccent="accent">
      <div className="p-6 space-y-5">
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="mx-auto"><Logo size={64} variant="emerald" /></div>
              <h3 className="mt-4 text-xl font-bold text-strong">انضم إلى أشهر قهوجيين المملكة</h3>
              <p className="text-sm mt-2 text-muted">آلاف العملاء يبحثون عن قهوجي محترف. كن واحداً منهم.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { n: "١٠٠+", d: "عميل جديد شهرياً" },
                { n: "٤.٩", d: "متوسط التقييم" },
                { n: "مدفوعات", d: "أسبوعية" },
                { n: "دعم", d: "فني 24/7" },
              ].map((s) => (
                <div key={s.n} className="rounded-xl border border-line bg-card p-3 text-center">
                  <div className="font-bold text-accent-600 dark:text-accent-400">{s.n}</div>
                  <div className="text-xs text-faint">{s.d}</div>
                </div>
              ))}
            </div>
            <Button variant="accent" fullWidth size="lg" onClick={() => setStep(2)}>
              ابدأ التسجيل
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-sm font-bold text-strong">معلومات أساسية</div>
            <Input
              label="الاسم الكامل"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="الاسم كما في الهوية"
            />
            <Input
              label="رقم الجوال"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="05xxxxxxxx"
              inputMode="tel"
            />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="المدينة"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              >
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </Select>
              <Select
                label="نوع الخدمة"
                value={form.gender}
                onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}
              >
                <option>قهوجي</option>
                <option>قهوجية</option>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-line-strong py-2.5 font-semibold text-default hover:border-brand hover:text-brand transition"
              >
                رجوع
              </button>
              <Button variant="accent" className="flex-1" onClick={handleSubmit}>
                <CheckIcon size={16} />
                إرسال الطلب
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
