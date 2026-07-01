import { cn } from "@/lib/utils";

interface TrafficLightBadgeProps {
  color: "green" | "yellow" | "red" | null | undefined;
}

const CONFIG = {
  green: {
    bg: "bg-green-500",
    shadow: "shadow-green-500/30",
    label: "Interes alto",
  },
  yellow: {
    bg: "bg-yellow-500",
    shadow: "shadow-yellow-500/30",
    label: "En duda",
  },
  red: {
    bg: "bg-red-500",
    shadow: "shadow-red-500/30",
    label: "No interesado",
  },
} as const;

export function TrafficLightBadge({ color }: TrafficLightBadgeProps) {
  if (!color) return null;

  const config = CONFIG[color];

  return (
    <span className="group relative inline-flex items-center">
      <span
        className={cn(
          "inline-block w-3 h-3 rounded-full shadow-sm",
          config.bg,
          config.shadow,
        )}
      />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-popover text-xs font-medium text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {config.label}
      </span>
    </span>
  );
}
