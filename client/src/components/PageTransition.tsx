import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      gsap.set(coverRef.current, { yPercent: -100 });
      return;
    }

    const tl = gsap.timeline();

    tl.set(coverRef.current, { yPercent: 100 })
      .to(coverRef.current, {
        yPercent: 0,
        duration: 0.6,
        ease: "expo.inOut",
      })
      .set(contentRef.current, { opacity: 0 })
      .add(() => {
        window.scrollTo(0, 0);
      })
      .to(coverRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "expo.inOut",
        delay: 0.1,
      })
      .to(
        contentRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      <div
        ref={coverRef}
        className="fixed inset-0 z-[9998] bg-gray-950"
        style={{ transform: "translateY(-100%)" }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
};

export default PageTransition;
