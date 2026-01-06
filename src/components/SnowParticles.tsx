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
      const size = 2 + Math.random() * 3; // 2-5px
      const opacity = 0.15 + Math.random() * 0.25; // 0.15-0.4
      const duration = Math.random() * 10 + 8; // 8-18s
      const delay = Math.random() * 8; // 0-8s
      const left = Math.random() * 100; // vw percent
      const drift = (Math.random() - 0.5) * 30; // horizontal drift

      flake.style.position = "absolute";
      flake.style.left = `${left}%`;
      flake.style.top = `${-Math.random() * 15}%`;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.borderRadius = "50%";
      flake.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      flake.style.animation = `snow-fall ${duration}s linear ${delay}s infinite`;
      flake.style.transform = `translateX(${drift}px)`;
      flake.style.pointerEvents = "none";

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
