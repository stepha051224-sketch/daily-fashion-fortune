import type { Season } from "../data/items";

// 사용자 기기의 날짜를 "2026-10-30" 형태로 바꿉니다.
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 화면에 보여줄 날짜 (예: 2026. 10. 30 (FRI))
export function formatDate(date: Date): string {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} (${days[date.getDay()]})`;
}

// 한국 기준 계절: 봄 3~5월, 여름 6~8월, 가을 9~11월, 겨울 12~2월
export function getSeason(date: Date): Season {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}
