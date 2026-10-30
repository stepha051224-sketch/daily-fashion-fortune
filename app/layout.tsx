import type { Metadata, Viewport } from "next";
import { Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

// 영문 제목·필기체 글꼴은 앱 안에 함께 담아 둡니다 (Next.js 기본 기능).
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-playfair" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon" });

export const metadata: Metadata = {
  title: "오늘 입는 별자리",
  description: "매일 달라지는 별자리의 흐름을 오늘 입을 수 있는 색과 옷차림으로 전해드립니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF5F3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${playfair.variable} ${pinyon.variable}`}>
      <head>
        {/* 한글 본문 글꼴: Pretendard */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
