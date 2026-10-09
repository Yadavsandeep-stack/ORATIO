"use client";

import { useLayoutEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface OratioSplashLoaderProps {
  message?: string;
  className?: string;
}

export const oratio_SPLASH_MIN_DURATION_MS = 3000;

const SPLASH_ANIMATION_MS = 2600;

let splashSessionStartedAt: number | null = null;

function markSplashSessionStart(): number {
  if (splashSessionStartedAt === null) {
    splashSessionStartedAt = Date.now();
  }
  return splashSessionStartedAt;
}

function getSplashAnimationDelayMs(): number {
  const elapsed = Date.now() - markSplashSessionStart();
  return -Math.min(elapsed, SPLASH_ANIMATION_MS);
}

export function OratioSplashLoader({
  message = "Preparing your workspace",
  className,
}: OratioSplashLoaderProps) {
  const [animationDelayMs, setAnimationDelayMs] = useState(0);

  useLayoutEffect(() => {
    setAnimationDelayMs(getSplashAnimationDelayMs());
  }, []);

  const containerStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 2147483000,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#ffffff",
  };

  const surfaceStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "142vmax",
    height: "142vmax",
    borderRadius: "50%",
    background: "#7a5af8",
    transform: "translate3d(-50%, -50%, 0) scale(0.001)",
    animation: `oratio-splash-surface-grow ${SPLASH_ANIMATION_MS}ms linear ${animationDelayMs}ms both`,
    willChange: "transform",
    backfaceVisibility: "hidden",
  };

  const textStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    fontSize: "4.5rem",
    fontWeight: 800,
    fontFamily: "var(--font-unbounded), sans-serif",
    letterSpacing: "-0.05em",
    textAlign: "center",
    userSelect: "none",
  };

  return (
    <main
      aria-busy="true"
      aria-label={message}
      className={cn("oratio-splash-loader", className)}
      role="status"
      style={containerStyle}
    >
      <div
        className="oratio-splash-surface"
        aria-hidden="true"
        style={surfaceStyle}
      />
      <div style={textStyle}>
        <span
          style={{
            color: "#7a5af8",
            position: "absolute",
            left: 0,
            right: 0,
            margin: "auto",
          }}
        >
          ORATIO
        </span>
        <span
          style={{
            color: "#ffffff",
            position: "relative",
            clipPath: "circle(0 at 50% 50%)",
            animation: `oratio-splash-text-reveal ${SPLASH_ANIMATION_MS}ms linear ${animationDelayMs}ms both`,
            willChange: "clip-path",
            display: "block",
          }}
        >
          ORATIO
        </span>
      </div>
    </main>
  );
}

export const oratioSplashLoader = OratioSplashLoader;
