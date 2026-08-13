"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export function CustomSelect({
  name,
  options,
  defaultValue,
  placeholder = "Выберите",
  required,
}: {
  name: string;
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  function openAndFocus() {
    setIsOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!isOpen && (event.key === "Enter" || event.key === " " || event.key === "ArrowDown")) {
      event.preventDefault();
      openAndFocus();
      return;
    }
    if (!isOpen) return;

    if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const opt = options[activeIndex];
      if (opt) {
        setValue(opt.value);
        setIsOpen(false);
      }
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : openAndFocus())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-xl border border-[color:var(--color-border)] bg-white/5 px-3.5 py-2.5 text-left text-sm outline-none transition focus:border-[color:var(--color-accent)]"
      >
        <span className={selected ? "text-white" : "text-[color:var(--color-text-faint)]"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className={`h-4 w-4 shrink-0 text-[color:var(--color-text-faint)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-1.5 shadow-2xl shadow-black/40"
          >
            {options.map((opt, index) => (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setValue(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    index === activeIndex ? "bg-white/10" : ""
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-medium text-white">{opt.label}</span>
                    {opt.description ? (
                      <span className="text-xs text-[color:var(--color-text-faint)]">{opt.description}</span>
                    ) : null}
                  </span>
                  {opt.value === value ? (
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-[color:var(--color-accent-3)]">
                      <path d="m4 10 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
