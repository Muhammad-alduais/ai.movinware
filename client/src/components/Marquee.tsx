import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  reverse?: boolean;
}

const Marquee = ({ items, speed = 40, className = "", reverse = false }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const totalWidth = inner.scrollWidth / 2;

    gsap.set(inner, { x: reverse ? -totalWidth : 0 });

    const anim = gsap.to(inner, {
      x: reverse ? 0 : -totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, [speed, reverse]);

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex whitespace-nowrap">
        {repeatedItems.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 select-none flex-shrink-0"
          >
            <span>{item}</span>
            <span className="w-2 h-2 rounded-full bg-pulse-400 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
