import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      onComplete();
      return;
    }

    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => {
            onComplete();
          },
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(counter.value));
      },
    });

    if (progressRef.current) {
      tl.to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-gray-950 flex flex-col items-center justify-center"
    >
      <div className="relative">
        <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white tabular-nums font-brockmann">
          {count}
        </span>
        <span className="absolute top-2 sm:top-4 text-xl sm:text-2xl text-pulse-400 font-medium">
          %
        </span>
      </div>

      <div className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-pulse-500 to-purple-500 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <p className="mt-6 text-sm text-white/40 tracking-[0.3em] uppercase">
        MovinWare AI
      </p>
    </div>
  );
};

export default Preloader;
