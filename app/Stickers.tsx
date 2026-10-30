// 화면 곳곳에 붙이는 장식 스티커 (별, 반짝이, 리본, 하트)
// 그림 파일 없이 코드로 그린 SVG라 가볍습니다.
import type { CSSProperties } from "react";

type Props = { size?: number; color?: string; style?: CSSProperties; className?: string };

// 네 갈래 반짝이 ✦
export function Sparkle({ size = 20, color = "#f0b8c8", style, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill={color} />
    </svg>
  );
}

// 손그림 느낌의 별 ☆
export function Star({ size = 26, color = "#8a6a55", style, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path
        d="M12 2.5 L14.6 9.2 L21.6 9.5 L16.1 13.9 L18 20.8 L12 16.8 L6 20.8 L7.9 13.9 L2.4 9.5 L9.4 9.2 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 리본 🎀
export function Bow({ size = 44, color = "#f2a9bd", style, className }: Props) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 50 40" style={style} className={className} aria-hidden="true">
      <path d="M25 16 C18 4 4 2 5 13 C6 22 18 21 25 16Z" fill={color} opacity="0.85" />
      <path d="M25 16 C32 4 46 2 45 13 C44 22 32 21 25 16Z" fill={color} opacity="0.85" />
      <path d="M23 18 C20 26 15 32 11 38 M27 18 C30 26 35 32 39 38" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="16.5" r="3.6" fill={color} />
    </svg>
  );
}

// 하트 ♡
export function Heart({ size = 18, color = "#e48aa6", style, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path
        d="M12 20.5 C5 15.5 2.5 12 2.5 8.5 C2.5 5.6 4.8 3.5 7.4 3.5 C9.4 3.5 11 4.6 12 6.3 C13 4.6 14.6 3.5 16.6 3.5 C19.2 3.5 21.5 5.6 21.5 8.5 C21.5 12 19 15.5 12 20.5Z"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
