import { useEffect, useRef } from "react";

interface MountainLayersProps {
  className?: string;
}

function MountainLayers({ className }: MountainLayersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = Array.from(
      container.querySelectorAll("[data-depth]")
    ) as HTMLElement[];
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        const translateX = -dx * depth * 20;
        const translateY = -dy * depth * 10;
        el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      {/* Background sky gradient handled by parent */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        {/* Far mountains */}
        <g data-depth="0.2">
          <path
            d="M0,400 L200,300 L350,360 L500,280 L650,340 L800,300 L950,350 L1100,290 L1300,330 L1440,300 L1440,600 L0,600 Z"
            fill="#BFD7EA"
          />
        </g>
        {/* Mid mountains */}
        <g data-depth="0.5">
          <path
            d="M0,430 L180,350 L320,390 L470,320 L620,380 L780,340 L920,390 L1080,330 L1240,370 L1440,340 L1440,600 L0,600 Z"
            fill="#9EC3DA"
          />
        </g>
        {/* Foreground mountains with snowy caps */}
        <g data-depth="0.9">
          <path
            d="M0,470 L160,380 L280,420 L420,360 L560,420 L700,380 L840,430 L980,370 L1120,410 L1260,380 L1440,390 L1440,600 L0,600 Z"
            fill="#6FA8C9"
          />
          {/* simple snow caps as strokes */}
          <path
            d="M160,380 L200,395 L240,385"
            stroke="#F5FAFF"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M420,360 L460,375 L500,365"
            stroke="#F5FAFF"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M700,380 L740,395 L780,385"
            stroke="#F5FAFF"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M980,370 L1020,385 L1060,375"
            stroke="#F5FAFF"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

export default MountainLayers;
