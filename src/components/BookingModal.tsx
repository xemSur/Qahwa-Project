import { useMemo, useState } from "react";
import type { Provider } from "../data/providers";
import { packages } from "../data/packages";
import { hostingExtras } from "../data/content";
import Modal from "./ui/Modal";
import { Input, Textarea } from "./ui/Field";
import Button from "./ui/Button";
import { cn } from "../utils/cn";
import { ArrowLeftIcon, CheckIcon, LockIcon, ShieldCheckIcon, WhatsAppIcon } from "./ui/Icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  city: string;
  date: string;
  time: string;
  duration: number;
  gender: string;
  guests: number;
  packageId: string;
  selectedProvider: Provider | null;
  details: string;
  setDetails: (details: string) => void;
  extras: string[];
  setExtras: (extras: string[]) => void;
  onConfirm: (customer: { name: string; phone: string }) => void;
};

const STEPS = ["بياناتك", "الإضافات", "المراجعة"] as const;

export default function BookingModal({
  visible,
  onClose,
  city,
  date,
  time,
  duration,
  gender,
  guests,
  packageId,
  selectedProvider,
  details,
  setDetails,
  extras,
  setExtras,
  onConfirm,
}: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);

  const totalEstimate = useMemo(() => {
    const pkg = packages.find((p) => p.id === packageId);
    const base = pkg?.priceValue || 500;
    const hourly = (selectedProvider?.pricePerHour || 220) * duration;
    return base + hourly + Math.round(guests * 5);
  }, [packageId, duration, guests, selectedProvider]);

  const extrasTotal = useMemo(
    () => hostingExtras.filter((e) => extras.includes(e.id)).reduce((sum, e) => sum + e.price, 0),
    [extras],
  );

  const selectedExtras = useMemo(
    () => hostingExtras.filter((e) => extras.includes(e.id)),
    [extras],
  );

  const nameError = touched && !name.trim() ? "الاسم مطلوب" : undefined;
  const phoneError = touched && !/^0?5\d{8}$/.test(phone.replace(/\s/g, "")) ? "رقم جوال غير صحيح (مثال: 05xxxxxxxx)" : undefined;

  const canProceed = step !== 0 || (!nameError && !phoneError);

  const toggleExtra = (id: string) => {
    setExtras(extras.includes(id) ? extras.filter((e) => e !== id) : [...extras, id]);
  };

  const handleNext = () => {
    if (step === 0) {
      setTouched(true);
      if (nameError || phoneError) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleConfirm = () => {
    onConfirm({ name: name.trim(), phone: phone.trim() });
    setStep(0);
    setTouched(false);
  };

  const summaryRows = [
    ["الاسم", name || "—"],
    ["الجوال", phone || "—"],
    ["المدينة", city],
    ["التاريخ", date || "يحدد لاحقاً"],
    ["الوقت", time],
    ["المدة", `${duration} ساعات`],
    ["الضيوف", String(guests)],
    ["النوع", gender],
  ];

  return (
    <Modal open={visible} onClose={onClose} title="تأكيد الحجز" size="lg">
      {/* Progress indicator */}
      <div className="px-4 sm:px-6 pt-5">
        <div className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-elevated overflow-hidden">
                <div
                  className={cn("h-full bg-gradient-brand transition-all duration-500", i <= step ? "w-full" : "w-0")}
                />
              </div>
              <span
                className={cn(
                  "size-6 shrink-0 grid place-items-center rounded-full text-[11px] font-bold transition",
                  i < step
                    ? "bg-accent-600 text-white"
                    : i === step
                      ? "bg-gradient-brand text-brand-ink"
                      : "bg-elevated text-faint",
                )}
              >
                {i < step ? <CheckIcon size={12} /> : i + 1}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted">
          {STEPS.map((label, i) => (
            <span key={label} className={cn(i === step && "text-brand font-bold")}>{label}</span>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 grid md:grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-6">
        <div className="space-y-4">
          {step === 0 && (
            <div className="space-y-4">
              <Input
                label="الاسم الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                placeholder="الاسم كما تود أن نناديك به"
              />
              <Input
                label="رقم الجوال"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
                placeholder="05xxxxxxxx"
                inputMode="tel"
                hint="نستخدمه لتأكيد الحجز عبر واتساب فقط"
              />
              {selectedProvider && (
                <div className="rounded-xl border border-brand/40 bg-brand/10 p-4 flex items-center gap-3">
                  <img
                    src={selectedProvider.image}
                    width={56}
                    height={56}
                    decoding="async"
                    className="size-14 rounded-xl object-cover"
                    alt=""
                  />
                  <div>
                    <div className="font-bold text-strong">{selectedProvider.name}</div>
                    <div className="text-xs text-brand-700 dark:text-brand-300">
                      {selectedProvider.gender} • {selectedProvider.city} • ★ {selectedProvider.rating}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted">خيارات الضيافة الشاملة</label>
                <div className="mt-1.5 space-y-2">
                  {hostingExtras.map((e) => {
                    const checked = extras.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => toggleExtra(e.id)}
                        className={cn(
                          "w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                          checked ? "border-brand bg-brand/10" : "border-line bg-input hover:border-brand/60",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "size-4 rounded grid place-items-center text-[10px] font-bold",
                              checked ? "bg-brand text-brand-ink" : "border border-line-strong",
                            )}
                          >
                            {checked && <CheckIcon size={11} />}
                          </span>
                          <span className="text-strong">{e.label}</span>
                        </span>
                        <span className="text-xs text-brand font-semibold">{e.price} ر.س</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <Textarea
                label="ملاحظات إضافية"
                placeholder="نوع القهوة المفضل، طلبات خاصة..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {step === 2 && (
            <div className="rounded-xl border border-line bg-card p-4">
              <div className="text-xs text-faint">ملخص الحجز</div>
              <div className="mt-2 space-y-1.5 text-sm">
                {summaryRows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span className="text-muted">{k}</span>
                    <span className="font-bold text-strong text-left" dir="auto">{v}</span>
                  </div>
                ))}
                {selectedExtras.length > 0 && (
                  <div className="border-t border-line my-2 pt-2">
                    <div className="text-muted text-xs mb-1">الإضافات:</div>
                    {selectedExtras.map((e) => (
                      <div key={e.id} className="flex justify-between text-brand">
                        <span>{e.label}</span>
                        <span>+{e.price} ر.س</span>
                      </div>
                    ))}
                  </div>
                )}
                {details && (
                  <div className="border-t border-line my-2 pt-2">
                    <div className="text-muted text-xs mb-1">ملاحظات:</div>
                    <div className="text-default">{details}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: price breakdown */}
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-card p-4">
            <div className="text-sm font-bold mb-3 text-strong">تفاصيل الحجز</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>ضيافة الضيوف (مباشر)</span>
                <span>100 ر.س</span>
              </div>
              {hostingExtras
                .filter((e) => extras.includes(e.id))
                .map((e) => (
                  <div key={e.id} className="flex justify-between text-brand">
                    <span>{e.label}</span>
                    <span>+{e.price} ر.س</span>
                  </div>
                ))}
              <div className="border-t border-line my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-strong">الإجمالي التقديري</span>
                <span className="text-brand">{(totalEstimate + extrasTotal).toLocaleString()} ر.س</span>
              </div>
            </div>
          </div>

          {step < STEPS.length - 1 ? (
            <Button fullWidth size="lg" onClick={handleNext} disabled={!canProceed}>
              التالي
              <ArrowLeftIcon size={16} />
            </Button>
          ) : (
            <Button fullWidth size="lg" onClick={handleConfirm} className="bg-gradient-brand">
              <WhatsAppIcon size={18} />
              تأكيد الحجز عبر واتساب
            </Button>
          )}

          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="w-full text-sm font-semibold text-muted hover:text-brand transition"
            >
              رجوع
            </button>
          )}

          <div className="text-[11px] text-center leading-5 text-faint">
            نتشرف بخدمتكم عبر واتساب لتأكيد الحجز وتفاصيل الدفع.
          </div>
          <div className="flex items-center justify-center gap-4 text-[10px] text-faint">
            <span className="inline-flex items-center gap-1"><LockIcon size={11} /> SSL</span>
            <span className="inline-flex items-center gap-1"><ShieldCheckIcon size={11} /> موثّق</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
