import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/split-text";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  from?: "chars" | "words" | "lines";
}

const TextReveal = ({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  from = "chars",
}: TextRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    try {
      const split = splitText(
        el,
        from === "lines" ? "words,lines" : "chars,words"
      );

      const elements =
        from === "chars"
          ? split.chars
          : from === "words"
            ? split.words
            : split.lines;

      if (!elements || elements.length === 0) return;

      gsap.set(elements, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          hasAnimated.current = true;
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: from === "chars" ? 0.02 : 0.06,
            ease: "expo.out",
            delay,
          });
        },
      });

      return () => {
        try {
          split.revert();
        } catch (e) {
          // Ignore revert errors
        }
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    } catch (e) {
      console.warn("TextReveal splitText failed:", e);
    }
  }, [delay, from]);

  return (
    <Tag ref={ref as React.Ref<any>} className={className}>
      {children}
    </Tag>
  );
};

export default TextReveal;
