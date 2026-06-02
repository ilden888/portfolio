import { cn } from "@/lib/utils";

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({ opacity = 0.03, className }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10 overflow-hidden", className)}
    >
      <div
        className="absolute inset-[-100%] h-[300%] w-[300%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity,
          animation: "noise 0.5s steps(2) infinite",
        }}
      />
    </div>
  );
}
