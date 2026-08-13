import type { SVGProps } from "react";

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function YandexMonogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <rect width="24" height="24" rx="6" fill="#FC3F1D" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="Arial, sans-serif">
        Я
      </text>
    </svg>
  );
}

export function VkMonogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <rect width="24" height="24" rx="6" fill="#0077FF" />
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Arial, sans-serif">
        VK
      </text>
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.5 3.5 2.7 10.9c-1.1.44-1.1 1.06-.2 1.34l4.8 1.5 11.1-7c.53-.32 1.01-.15.61.2l-9 8.13h-.01l.01.01-.35 4.99c.5 0 .72-.23 1-.5l2.4-2.33 5 3.66c.92.51 1.58.25 1.82-.85l3.29-15.5c.36-1.35-.5-1.96-1.67-1.35Z" />
    </svg>
  );
}

export function VkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.9 17.4c-5.7 0-9-3.9-9.1-10.4h2.9c.1 4.7 2.1 6.7 3.7 7.1V7h2.7v4.1c1.6-.2 3.2-2 3.8-4.1h2.7c-.5 2.6-2.4 4.5-3.7 5.3 1.3.6 3.5 2.2 4.3 5.1h-3c-.6-2-2.2-3.6-4.1-3.8v3.8h-.2Z" />
    </svg>
  );
}
