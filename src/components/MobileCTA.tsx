import { WhatsAppIcon } from "./ui/Icons";

type Props = { onBook: () => void };

export default function MobileCTA({ onBook }: Props) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-page/95 backdrop-blur-lg shadow-lg">
      <div className="h-px bg-gradient-to-l from-transparent via-gold-500/70 to-transparent" />
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href="https://wa.me/966500129783"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          className="size-11 shrink-0 grid place-items-center rounded-full gold-frame text-accent-600 dark:text-accent-400 active:scale-95 transition"
        >
          <WhatsAppIcon size={20} />
        </a>
        <button
          onClick={onBook}
          className="flex-1 rounded-full bg-gradient-brand bg-[length:200%_auto] animate-gold-shine py-3 text-sm font-bold text-brand-ink shadow-gold active:scale-[0.98] transition"
        >
          احجز قهوجي الآن
        </button>
      </div>
    </div>
  );
}
