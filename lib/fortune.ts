// 오늘의 패션 운세 추천 로직
//
// 화면(UI)은 getDailyFashion() 하나만 사용합니다.
// 나중에 실제 천체 데이터로 바꿀 때는 이 파일 안쪽만 고치면 됩니다.

import { COLORS, findColor, type Color } from "../data/colors";
import { ITEMS, type Item } from "../data/items";
import { findSign, type Sign } from "../data/signs";
import { formatDate, getSeason, toDateKey } from "./date";
import { pick } from "./seed";

export type DailyFashion = {
  dateLabel: string; // 화면용 날짜
  sign: Sign;
  color: Color;
  item: Item;
  howTo: string[]; // 활용 방법 문장들
  pairColors: Color[]; // 함께 쓰기 좋은 색
};

export function getDailyFashion(signId: string, date: Date): DailyFashion | null {
  const sign = findSign(signId);
  if (!sign) return null;

  // 예: "2026-10-30|aries"
  const seed = `${toDateKey(date)}|${sign.id}`;

  // 1. 오늘의 색
  const color = pick(COLORS, `${seed}|color`);

  // 2. 오늘의 아이템: 계절에 맞고, 색과도 어울리는 것 중에서 고릅니다.
  const season = getSeason(date);
  const items = ITEMS.filter(
    (item) => item.seasons.includes(season) && (color.neutral || !item.neutralOnly),
  );
  const item = pick(items, `${seed}|item`);

  // 3. 활용 방법
  const howTo = [item.howTo.replace("{color}", color.name), color.tip];

  // 4. 함께 쓰기 좋은 색
  const pairColors = color.pairs
    .map((id) => findColor(id))
    .filter((c): c is Color => c !== undefined);

  return { dateLabel: formatDate(date), sign, color, item, howTo, pairColors };
}
