import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "GdeTech — стартап-хаб в Йошкар-Оле",
  description:
    "Коворкинг и команда штатных экспертов — менеджмент, AI, SEO, юрист, DevOps, frontend. Помогаем превратить идею в IT-бизнес.",
  openGraph: {
    title: "GdeTech — стартап-хаб в Йошкар-Оле",
    description: "Пространство и команда экспертов, которые помогают запускать IT-проекты.",
    images: ["/images/og-share.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
