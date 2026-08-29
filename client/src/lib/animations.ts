import { gsap, ScrollTrigger } from "./gsap-setup";
import { SplitTextResult } from "./split-text";

export const easings = {
  smooth: "power3.out",
  snappy: "back.out(1.7)",
  cinematic: "expo.out",
  elastic: "elastic.out(1, 0.5)",
  gentle: "power2.inOut",
} as const;

export const durations = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  cinematic: 1.6,
} as const;

export function revealOnScroll(
  elements: gsap.TweenTarget,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    once?: boolean;
  }
) {
  const {
    y = 40,
    opacity = 0,
    duration = durations.normal,
    stagger = 0.1,
    ease = easings.smooth,
    start = "top 85%",
    once = true,
  } = options || {};

  return gsap.from(elements, {
    y,
    opacity,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: elements instanceof HTMLElement ? elements : undefined,
      start,
      once,
    },
  });
}

export function staggerReveal(
  container: HTMLElement,
  childSelector: string,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  }
) {
  const { y = 40, stagger = 0.08, duration = durations.normal, start = "top 85%" } = options || {};
  const children = container.querySelectorAll(childSelector);

  return gsap.from(children, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: container,
      start,
      once: true,
    },
  });
}

export function textReveal(
  split: SplitTextResult,
  options?: {
    duration?: number;
    stagger?: number;
    ease?: string;
    y?: number;
    from?: "chars" | "words" | "lines";
  }
) {
  const {
    duration = durations.normal,
    stagger = 0.03,
    ease = easings.cinematic,
    y = 30,
    from = "chars",
  } = options || {};

  const elements = from === "chars" ? split.chars : from === "words" ? split.words : split.lines;

  return gsap.from(elements, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease,
  });
}

export function parallax(
  element: HTMLElement,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
  }
) {
  const { speed = 0.3, start = "top bottom", end = "bottom top" } = options || {};

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

export function magneticElement(
  element: HTMLElement,
  options?: {
    strength?: number;
    duration?: number;
  }
) {
  const { strength = 0.3, duration = 0.4 } = options || {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: duration * 1.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

export function scrollSkew(
  element: HTMLElement,
  options?: {
    maxSkew?: number;
    duration?: number;
  }
) {
  const { maxSkew = 2, duration = 0.5 } = options || {};

  let lastScrollTop = 0;
  let rafId: number;

  const update = () => {
    const scrollTop = window.scrollY;
    const velocity = scrollTop - lastScrollTop;
    lastScrollTop = scrollTop;

    const skew = gsap.utils.clamp(-maxSkew, maxSkew, velocity * 0.1);

    gsap.to(element, {
      skewY: skew,
      duration,
      ease: "power2.out",
      overwrite: "auto",
    });

    rafId = requestAnimationFrame(update);
  };

  rafId = requestAnimationFrame(update);

  return () => cancelAnimationFrame(rafId);
}
