import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘 입는 별자리",
  description: "매일 달라지는 별자리의 흐름을 오늘 입을 수 있는 색과 옷차림으로 전해드립니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F3EE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
