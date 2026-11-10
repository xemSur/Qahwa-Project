type Props = {
  size?: number;
  className?: string;
  variant?: "amber" | "emerald";
};

export default function Logo({ size = 40, className = "", variant = "amber" }: Props) {
  const gradient = variant === "emerald" ? "from-emerald-500 to-teal-600" : "from-amber-500 to-orange-700";
  return (
    <div
      className={`grid place-items-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-amber-900/40 shrink-0 overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        className="text-stone-900"
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        aria-hidden="true"
      >
        {/* lid */}
        <path fill="currentColor" d="M28 11h8l1.4 6.5h-10.8z" />
        <circle cx="32" cy="9.5" r="2.6" fill="currentColor" />
        {/* body */}
        <path
          fill="currentColor"
          d="M30 18.5h4c5 1.5 8.5 4.5 11 9.5 2.5 4.8 3.5 9.5 3.5 14.5 0 5.5-2.5 10.5-7 13.5h-19c-4.5-3-7-8-7-13.5 0-5 1-9.7 3.5-14.5 2.5-5 6-8 11-9.5z"
        />
        {/* spout */}
        <path
          fill="currentColor"
          d="M19.5 24l-6.6 3.4c-1.2 2.7-0.4 5.3 1.3 7.3l6-1.7c0.5-1.2 0.9-2.5 1.1-3.8z"
        />
        {/* handle */}
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          d="M46 24c7 0 10 5.2 10 10.4 0 5.2-3 10.4-10 10.4"
        />
      </svg>
    </div>
  );
}
