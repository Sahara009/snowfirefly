import type { Metadata, Viewport } from "next";
import { Caveat, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snowfirefly — ароматические свечи ручной работы",
  description:
    "Мастерская ароматических свечей Snowfirefly. Свечи ручной работы из натуральных материалов, без парафина. Доставка по всему миру.",
  openGraph: {
    title: "Snowfirefly — ароматические свечи ручной работы",
    description:
      "Свечи-пионы, розы, яблоки и другие. Натуральные материалы, никакого парафина.",
    images: ["/img/peony-lit.jpg"],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff1f5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable} ${caveat.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
