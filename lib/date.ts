// 날짜 처리 — 모든 계산은 한국 시간(Asia/Seoul) 기준입니다.
// 기기의 시간대가 달라도(예: 해외) 한국 날짜로 결과가 정해집니다.
import type { Season } from "../data/items";

// 날짜 열쇠: "2026-10-30" 형태의 한국 날짜
export type DateKey = string;

// 지금 시각 → 한국 날짜
export function toKstDateKey(now: Date): DateKey {
  // en-CA 형식은 "YYYY-MM-DD"로 나옵니다.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function parts(key: DateKey) {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d };
}

// 1970-01-01부터 며칠째인지 (날짜별 순환에 사용)
export function dayNumber(key: DateKey): number {
  const { y, m, d } = parts(key);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

// 하루 전 날짜
export function previousKey(key: DateKey): DateKey {
  const { y, m, d } = parts(key);
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
}

// 그날 한국 시간 정오의 순간 (달 위치 계산 기준)
export function kstNoon(key: DateKey): Date {
  const { y, m, d } = parts(key);
  return new Date(Date.UTC(y, m - 1, d, 3)); // 한국 12:00 = 세계표준시 03:00
}

// 화면에 보여줄 날짜 (예: 2026. 10. 30 (FRI))
export function formatDate(key: DateKey): string {
  const { y, m, d } = parts(key);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return `${y}. ${m}. ${d} (${days[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]})`;
}

// 한국 기준 계절: 봄 3~5월, 여름 6~8월, 가을 9~11월, 겨울 12~2월
export function getSeason(key: DateKey): Season {
  const { m } = parts(key);
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "autumn";
  return "winter";
}
