import { useEffect, useRef } from "react";

interface SnowParticlesProps {
  className?: string;
  count?: number;
}

function SnowParticles({ className, count = 40 }: SnowParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const flake = document.createElement("div");
      const size = Math.random() * 3 + 2; // 2-5px (larger)
      const duration = Math.random() * 6 + 6; // 6-12s
      const delay = Math.random() * 6; // 0-6s
      const left = Math.random() * 100; // vw percent
      flake.style.position = "absolute";
      flake.style.left = `${left}%`;
      flake.style.top = `${-Math.random() * 20}%`;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.borderRadius = "9999px";
      flake.style.background = "rgba(180,180,180,0.7)";
      flake.style.boxShadow = "0 0 6px rgba(180,180,180,0.5)";
      flake.style.animation = `snow-fall ${duration}s linear ${delay}s infinite`;
      container.appendChild(flake);
      particles.push(flake);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count]);

  return <div ref={containerRef} className={className} aria-hidden />;
}

export default SnowParticles;
