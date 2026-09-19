import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface ShimmerCtaProps extends ComponentPropsWithoutRef<"a"> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  background?: string;
  spread?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerCta = React.forwardRef<
  HTMLAnchorElement,
  ShimmerCtaProps
>(
  (
    {
      shimmerColor = "#c7c9ff",
      shimmerSize = "0.06em",
      shimmerDuration = "3.2s",
      background = "#4942E4",
      spread = "90deg",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <a
        style={
          {
            "--spread": spread,
            "--shimmer-color": shimmerColor,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 inline-flex overflow-hidden rounded-full [background:var(--bg)] shadow-[0_10px_30px_-8px_rgba(73,66,228,0.7)] transition-transform duration-300 active:translate-y-px",
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "[container-type:size] absolute inset-0 overflow-visible",
          )}
        >
          {/* spark */}
          <div className="animate-shimmer-slide absolute inset-0 aspect-square h-[100cqh] rounded-none [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>

        {/* cut layer */}
        <div className="absolute inset-[var(--cut)] -z-20 rounded-full [background:var(--bg)]" />

        {/* button content */}
        <span
          className="relative z-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
        >
          {children}
        </span>
      </a>
    );
  },
);

ShimmerCta.displayName = "ShimmerCta";