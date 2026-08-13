"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Частые вопросы" align="center" />

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-[color:var(--color-border)] overflow-hidden rounded-2xl border border-[color:var(--color-border)]">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 0.04}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 bg-[color:var(--color-surface)] px-5 py-4 text-left text-sm font-medium text-white hover:bg-white/5 sm:text-base"
                  >
                    {item.question}
                    <span
                      className={`shrink-0 text-[color:var(--color-text-faint)] transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-[color:var(--color-bg-elevated)]"
                      >
                        <p className="px-5 py-4 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
