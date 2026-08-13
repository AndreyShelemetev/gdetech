"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { animate } from "motion";

export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(latest);
      },
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
