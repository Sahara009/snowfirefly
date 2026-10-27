import type { NextConfig } from "next";

// Netlify (рекомендуется): обычная сборка, Netlify сам запускает Next.js.
// Cloudflare Pages / любой статический хостинг: STATIC_EXPORT=1 npm run build → папка out/
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, trailingSlash: true } : {}),
  images: staticExport
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
