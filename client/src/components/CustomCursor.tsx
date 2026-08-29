import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHovering = useRef(false);
  const isHidden = useRef(false);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
  }, []);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !isVisible) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const quickDotX = gsap.quickTo(dot, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    const quickDotY = gsap.quickTo(dot, "y", {
      duration: 0.15,
      ease: "power2.out",
    });
    const quickRingX = gsap.quickTo(ring, "x", {
      duration: 0.4,
      ease: "power2.out",
    });
    const quickRingY = gsap.quickTo(ring, "y", {
      duration: 0.4,
      ease: "power2.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      quickRingX(e.clientX);
      quickRingY(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      ring.style.width = "60px";
      ring.style.height = "60px";
    };
    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      ring.style.width = "40px";
      ring.style.height = "40px";
    };
    const onMouseLeaveWindow = () => {
      isHidden.current = true;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onMouseEnterWindow = () => {
      isHidden.current = false;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    const addInteractiveListeners = () => {
      const els = document.querySelectorAll(
        "a, button, [data-cursor], input, textarea"
      );
      els.forEach((el) => {
        (el as HTMLElement)._cursorEnter ||
          el.addEventListener("mouseenter", onMouseEnterInteractive);
        (el as HTMLElement)._cursorLeave ||
          el.addEventListener("mouseleave", onMouseLeaveInteractive);
        (el as HTMLElement)._cursorEnter = true;
        (el as HTMLElement)._cursorLeave = true;
      });
    };

    addInteractiveListeners();
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99997] pointer-events-none mix-blend-difference"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.8)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s",
        }}
      />
    </>
  );
};

export default CustomCursor;
