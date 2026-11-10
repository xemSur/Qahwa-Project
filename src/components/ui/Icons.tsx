import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function Svg({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>
);

export const StarIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3 7 9 6 9-6" /></Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.7a2 2 0 0 1 1.6 1.9z" />
  </Svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Svg {...p} strokeWidth={0} fill="currentColor">
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.09.81.83-3.01-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
  </Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="4.5" width="18" height="17" rx="2.5" /><path d="M8 2.5v4M16 2.5v4M3 10h18" /></Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5.5l3.5 2" /></Svg>
);

export const UsersIcon = (p: IconProps) => (
  <Svg {...p}><path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="9" cy="7.5" r="3.5" /><path d="M22 20v-1.5a4 4 0 0 0-3-3.9M16.5 4.1a4 4 0 0 1 0 6.8" /></Svg>
);

export const MapPinIcon = (p: IconProps) => (
  <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.8" /></Svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 22s8-4 8-10V5.5l-8-3-8 3V12c0 6 8 10 8 10z" /><path d="m8.8 12.3 2.2 2.2 4.2-4.4" /></Svg>
);

export const CreditCardIcon = (p: IconProps) => (
  <Svg {...p}><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19" /></Svg>
);

export const LockIcon = (p: IconProps) => (
  <Svg {...p}><rect x="4" y="10.5" width="16" height="11" rx="2.5" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></Svg>
);

export const SunIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8" /></Svg>
);

export const MoonIcon = (p: IconProps) => (
  <Svg {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></Svg>
);

export const SparklesIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M18.5 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8zM5 15l.6 1.7 1.7.6-1.7.6L5 19.6l-.6-1.7L2.7 17.3l1.7-.6z" /></Svg>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Svg {...p} className={`${p.className ?? ""} rtl:-scale-x-100`}><path d="M19 12H5M11 6l-6 6 6 6" /></Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p} className={`${p.className ?? ""} rtl:-scale-x-100`}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);

export const TrashIcon = (p: IconProps) => (
  <Svg {...p}><path d="M3.5 6.5h17M8.5 6.5V4.5h7v2M5.5 6.5l1 14h11l1-14" /></Svg>
);

export const EditIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></Svg>
);

export const LogOutIcon = (p: IconProps) => (
  <Svg {...p} className={`${p.className ?? ""} rtl:-scale-x-100`}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Svg>
);

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>
);

export const AlertCircleIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M12 8v4.5M12 16.2v.1" /></Svg>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="m8.5 12.2 2.4 2.4 4.6-4.8" /></Svg>
);

export const InfoIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9.5" /><path d="M12 11v5M12 7.8v.1" /></Svg>
);

export const QuoteIcon = (p: IconProps) => (
  <Svg {...p} fill="currentColor" strokeWidth={0}>
    <path d="M7.5 5C5 5 3 7 3 9.5S5 14 7.5 14c.3 0 .6 0 .9-.1C7.7 16 6 17.2 4 17.5c-.5.1-.8.6-.7 1.1.1.5.5.8 1 .8h.2C8.6 18.7 12 15.5 12 10.5V9.5C12 7 10 5 7.5 5zm12 0C17 5 15 7 15 9.5s2 4.5 4.5 4.5c.3 0 .6 0 .9-.1c-.7 2.1-2.4 3.3-4.4 3.6-.5.1-.8.6-.7 1.1.1.5.5.8 1 .8h.2c3.9-.7 7.3-3.9 7.3-8.9V9.5C21 7 19 5 19.5 5z" />
  </Svg>
);

export const GiftIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="8.5" width="18" height="12.5" rx="2" /><path d="M12 8.5V21M3 12.5h18" /><path d="M12 8.5S10.5 4 7.8 4.5 6 8 12 8.5zm0 0s1.5-4.5 4.2-4S18 8 12 8.5z" /></Svg>
);

export const DashboardIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="3" width="7.5" height="8.5" rx="1.8" /><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.8" /><rect x="3" y="14.5" width="7.5" height="6.5" rx="1.8" /><rect x="13.5" y="11.5" width="7.5" height="9.5" rx="1.8" /></Svg>
);

export const CalendarDaysIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="4.5" width="18" height="17" rx="2.5" /><path d="M8 2.5v4M16 2.5v4M3 10h18M8 14h3M8 17.5h6" /></Svg>
);

export const UserCircleIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9.5" /><circle cx="12" cy="10" r="3.2" /><path d="M5.8 19a4.7 4.7 0 0 1 12.4 0" /></Svg>
);
