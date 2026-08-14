"use client";

import { motion } from "motion/react";
import { Avatar } from "@/components/ui/Avatar";
import { UsersIcon, RocketIcon } from "@/components/ui/icons";
import { team } from "@/content/team";
import { residents } from "@/content/portfolio";

const pathSteps = [
  { label: "Идея", done: true },
  { label: "MVP", done: true },
  { label: "Продукт", done: false },
];

const previewMembers = team.slice(0, 4);

export function HeroVisual() {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
      <motion.div
        className="glass-panel absolute inset-x-6 top-6 rounded-2xl p-5 shadow-2xl shadow-black/30"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Путь стартапа
          </span>
          <span className="flex h-2 w-2">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
          </span>
        </div>

        <div className="mt-5 space-y-3.5">
          {pathSteps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${
                    step.done
                      ? "w-full bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)]"
                      : "w-1/4 bg-white/20"
                  }`}
                />
              </div>
              <span className="w-16 shrink-0 text-xs text-[color:var(--color-text-muted)]">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[color:var(--color-border)] pt-4">
          <div className="flex -space-x-2">
            {previewMembers.map((member) => (
              <Avatar key={member.slug} name={member.name} className="h-7 w-7 rounded-full text-xs ring-2 ring-[color:var(--color-bg-elevated)]" />
            ))}
          </div>
          <span className="text-xs text-[color:var(--color-text-muted)]">эксперты уже на связи</span>
        </div>
      </motion.div>

      <motion.div
        className="glass-panel absolute -right-2 top-[46%] flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl shadow-black/30"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 0.3 },
          x: { duration: 0.7, delay: 0.3 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-accent-2)]">
          <UsersIcon className="h-5 w-5 text-white" />
        </span>
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold leading-none">{team.length}</p>
          <p className="mt-1 text-[10px] text-[color:var(--color-text-muted)]">экспертов в штате</p>
        </div>
      </motion.div>

      <motion.div
        className="glass-panel absolute -left-4 bottom-16 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl shadow-black/30"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 0.45 },
          x: { duration: 0.7, delay: 0.45 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--color-accent-3)] to-[color:var(--color-accent)]">
          <RocketIcon className="h-5 w-5 text-white" />
        </span>
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold leading-none">{residents.length}+</p>
          <p className="mt-1 text-[10px] text-[color:var(--color-text-muted)]">проектов-резидентов</p>
        </div>
      </motion.div>

      <motion.div
        className="glass-panel absolute bottom-0 right-8 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-emerald-300 shadow-xl shadow-black/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Заявка принята
      </motion.div>
    </div>
  );
}
