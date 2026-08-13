"use client";

import { motion, useReducedMotion } from "motion/react";

const orbs = [
  { className: "left-[8%] top-[10%] h-72 w-72 bg-[color:var(--color-accent)]/40", duration: 22, delay: 0 },
  { className: "right-[10%] top-[18%] h-96 w-96 bg-[color:var(--color-accent-2)]/30", duration: 26, delay: 2 },
  { className: "left-[30%] bottom-[-10%] h-80 w-80 bg-[color:var(--color-accent-3)]/25", duration: 30, delay: 4 },
];

export function HeroBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-overlay absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--color-bg)]" />
    </div>
  );
}
