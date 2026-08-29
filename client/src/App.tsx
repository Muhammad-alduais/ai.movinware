import { useEffect, useRef } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import ErrorBoundary from "./components/ErrorBoundary";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] origin-left [dir='rtl']:origin-right bg-pulse-500 z-[70]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const PageTransitionInner = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      if (coverRef.current) gsap.set(coverRef.current, { yPercent: -100 });
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

const App = () => {
  return (
    <ErrorBoundary>
      <ScrollProgress />
      <CustomCursor />
      <GrainOverlay />
      <SmoothScroll>
        <BrowserRouter>
          <PageTransitionInner>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<Index />} />
            </Routes>
          </PageTransitionInner>
        </BrowserRouter>
      </SmoothScroll>
    </ErrorBoundary>
  );
};

export default App;
