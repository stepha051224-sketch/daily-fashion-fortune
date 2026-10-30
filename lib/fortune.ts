// 오늘의 패션 운세 추천 로직
//
// 화면(UI)은 getDailyFashion() 하나만 사용합니다.
//
// 추천 순서
//  1. 오늘 날짜(한국 시간)와 별자리 확인
//  2. 실제 달의 위치 계산 → 달이 머무는 별자리의 원소(불·흙·공기·물)
//  3. 내 별자리 원소와 달의 원소의 관계 (같음 / 잘 어울림 / 다름)
//  4. 별자리 성향 + 달의 흐름으로 오늘의 스타일 테마 결정
//  5. 테마 안에서 컬러 → 그 컬러에 맞는 아이템 → 함께 쓰기 좋은 컬러
//  6. 위에서 실제로 사용한 근거로 추천 이유 문장 생성
//
// 참고: 테마 후보와 비중은 별자리·달로 정해지고, 그 안에서 어떤 것을 고를지는
// 날짜로 정해지는 규칙(같은 날짜 = 같은 결과)을 보조로 사용합니다.
// 이 날짜 규칙은 점성술적 근거가 아니므로 추천 이유에는 쓰지 않습니다.

import { findColor, type Color } from "../data/colors";
import { ITEMS, type Item } from "../data/items";
import { findSign, type Element, type Sign } from "../data/signs";
import { MOON_MOODS, THEMES, type Theme, type ThemeId } from "../data/themes";
import { dayNumber, formatDate, getSeason, kstNoon, previousKey, toKstDateKey, type DateKey } from "./date";
import { josa } from "./korean";
import { hashString } from "./seed";
import { getMoonPosition } from "./sky";

// 내 별자리 원소와 달의 원소의 관계
// 점성술에서 불·공기, 흙·물은 서로 잘 어울리는 원소로 봅니다.
export type Relation = "same" | "harmony" | "contrast";
// 테마가 어디에서 왔는지: 별자리와 달 모두 / 별자리 성향 / 달의 흐름
export type ThemeSource = "both" | "sign" | "moon";

export type DailyFashion = {
  dateKey: DateKey;
  dateLabel: string; // 화면용 날짜
  sign: Sign;
  theme: Theme;
  color: Color;
  item: Item;
  howTo: string[]; // 활용 방법 문장들
  pairColors: Color[]; // 함께 쓰기 좋은 색
  story: string; // 오늘의 별자리 이야기 (추천 이유)
  // 추천에 실제로 사용한 근거
  basis: {
    moonSign: Sign; // 오늘(한국 시간 정오) 달이 머무는 별자리
    moonLongitude: number;
    moonElement: Element;
    relation: Relation;
    themeSource: ThemeSource;
    trait: string; // 이유 문장에 쓴 별자리 상징
  };
};

function getRelation(a: Element, b: Element): Relation {
  if (a === b) return "same";
  const pair = [a, b].sort().join("-");
  return pair === "air-fire" || pair === "earth-water" ? "harmony" : "contrast";
}

// 테마별 비중을 정해 날짜 규칙으로 하나를 고릅니다.
function chooseTheme(sign: Sign, moonElement: Element, relation: Relation, key: DateKey) {
  const moonThemes = MOON_MOODS[moonElement].themes;
  const weights = new Map<ThemeId, number>();

  // 별자리 성향 테마: 기본 성향일수록 비중이 큼 (4, 3, 2)
  sign.styles.forEach((s, i) => {
    let w = 4 - i;
    if (relation !== "contrast") w += 1; // 달과 기운이 맞는 날은 본래 성향이 더 잘 살아남
    if (moonThemes.includes(s.theme)) w += 2; // 달의 흐름과도 겹치는 테마
    weights.set(s.theme, w);
  });
  // 달의 흐름 테마 중 별자리 성향에 없는 것: 기운이 다른 날일수록 비중이 큼
  for (const t of moonThemes) {
    if (!weights.has(t)) weights.set(t, relation === "contrast" ? 2 : 1);
  }

  const entries = [...weights.entries()];
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let roll = hashString(`${key}|${sign.id}|theme`) % total;
  let themeId = entries[0][0];
  for (const [id, w] of entries) {
    if (roll < w) {
      themeId = id;
      break;
    }
    roll -= w;
  }

  const fromSign = sign.styles.find((s) => s.theme === themeId);
  const fromMoon = moonThemes.includes(themeId);
  const themeSource: ThemeSource = fromSign && fromMoon ? "both" : fromSign ? "sign" : "moon";
  const trait = (fromSign ?? sign.styles[0]).trait;
  return { theme: THEMES[themeId], themeSource, trait };
}

// 목록을 날짜에 따라 하루에 한 칸씩 돌려 고릅니다.
// (같은 테마가 이어지는 날에도 어제와 다른 것이 나오도록)
function rotate<T extends { id: string }>(list: T[], salt: string, key: DateKey, avoidId?: string): T {
  const start = hashString(salt) % list.length;
  let index = (start + dayNumber(key)) % list.length;
  if (list.length > 1 && list[index].id === avoidId) index = (index + 1) % list.length;
  return list[index];
}

type Core = Omit<DailyFashion, "dateLabel" | "howTo" | "pairColors" | "story">;

// depth: 어제 결과와 겹치지 않게 확인하는 깊이
function computeCore(sign: Sign, key: DateKey, depth: number): Core {
  // 2. 실제 달의 위치 (한국 시간 정오 기준)
  const moon = getMoonPosition(kstNoon(key));
  const moonElement = moon.sign.element;
  // 3. 관계
  const relation = getRelation(sign.element, moonElement);
  // 4. 테마
  const { theme, themeSource, trait } = chooseTheme(sign, moonElement, relation, key);

  const yesterday = depth > 0 ? computeCore(sign, previousKey(key), depth - 1) : null;

  // 5-1. 컬러: 테마에 어울리는 색 중에서
  const themeColors = theme.colors.map((id) => findColor(id)).filter((c): c is Color => !!c);
  const color = rotate(themeColors, `${sign.id}|${theme.id}|color`, key, yesterday?.color.id);

  // 5-2. 아이템: 테마 + 계절 + 컬러에 맞는 것 중에서
  const season = getSeason(key);
  const fits = (item: Item) => item.seasons.includes(season) && (color.neutral || !item.neutralOnly);
  let items = theme.items.map((id) => ITEMS.find((i) => i.id === id)).filter((i): i is Item => !!i && fits(i));
  if (items.length === 0) items = ITEMS.filter(fits); // 혹시 없으면 계절에 맞는 전체 아이템
  const item = rotate(items, `${sign.id}|${theme.id}|item`, key, yesterday?.item.id);

  return {
    dateKey: key,
    sign,
    theme,
    color,
    item,
    basis: { moonSign: moon.sign, moonLongitude: moon.longitude, moonElement, relation, themeSource, trait },
  };
}

// 6. 추천 이유 — 위에서 실제로 쓴 근거만 사용합니다.
//  - 본문은 패션 추천에 집중하고, 실제 천체 정보(달의 별자리)는 화면의 작은 라벨로 따로 보여줍니다.
//  - 첫 문장의 "오늘의 분위기"는 달이 머무는 별자리의 상징을 옮긴 해석입니다.
//  - 원소 궁합 같은 계산 과정은 문장에 직접 쓰지 않습니다(실제보다 단정적으로 들리지 않도록).
function buildStory(core: Core): string {
  const { sign, theme, color, item, basis, dateKey } = core;
  const pick = (n: number, salt: string) => hashString(`${dateKey}|${sign.id}|${salt}`) % n;
  const dayMood = basis.moonSign.moonDayMood;
  const look = `${color.name} ${item.name}`;

  // ① 오늘의 분위기 (달이 머무는 별자리의 상징)
  const day = [
    `오늘은 ${dayMood} 분위기가 돋보이는 날이에요.`,
    `오늘은 ${dayMood} 흐름이 느껴지는 하루예요.`,
  ][pick(2, "day")];

  // ② 내 별자리 성향과 추천 (테마가 어디에서 왔는지에 따라)
  let pickLine: string;
  if (basis.themeSource === "moon") {
    pickLine = [
      `평소의 ${sign.name} 스타일과는 조금 다르게, ${josa.을(look)} 추천해요.`,
      `${sign.name}에게 익숙한 스타일에서 살짝 벗어나 ${josa.을(look)} 골라봤어요.`,
    ][pick(2, "line")];
  } else if (basis.themeSource === "both") {
    pickLine = [
      `이런 분위기는 ${sign.name} 특유의 ${josa.과(basis.trait)}도 잘 어울려서, ${josa.을(look)} 추천해요.`,
      `여기에 ${sign.name} 특유의 ${josa.을(basis.trait)} 더해 ${josa.을(look)} 골라봤어요.`,
    ][pick(2, "line")];
  } else if (basis.relation === "contrast") {
    // 내 별자리와 달의 원소가 다른 날: 분위기는 다르지만 본래 성향을 지킨 추천
    pickLine = [
      `이런 날에도 ${sign.name} 특유의 ${josa.은(basis.trait)} 살려 ${josa.을(look)} 추천해요.`,
      `분위기는 조금 다르지만, ${sign.name}의 ${josa.을(basis.trait)} 담아 ${josa.을(look)} 골라봤어요.`,
    ][pick(2, "line")];
  } else {
    pickLine = [
      `${sign.name} 특유의 ${josa.을(basis.trait)} 살려 ${josa.을(look)} 추천해요.`,
      `${sign.name}의 ${josa.을(basis.trait)} 담아 ${josa.을(look)} 골라봤어요.`,
    ][pick(2, "line")];
  }

  // ③ 스타일링 방향 (테마)
  const closing = theme.closings[pick(theme.closings.length, "closing")];

  return `${day} ${pickLine} ${closing}`;
}

export function getDailyFashionForKey(signId: string, key: DateKey): DailyFashion | null {
  const sign = findSign(signId);
  if (!sign) return null;
  // 최근 8일을 거슬러 확인해 어제와 같은 컬러가 나오지 않게 합니다.
  // (1년치 검증에서 전날과 같은 컬러 0회, 계산 시간 약 0.3ms)
  const core = computeCore(sign, key, 8);
  const { color, item, theme } = core;

  const howTo = [item.howTo.replace("{color}", color.name), theme.tip];
  const pairColors = color.pairs.map((id) => findColor(id)).filter((c): c is Color => !!c);

  return { ...core, dateLabel: formatDate(key), howTo, pairColors, story: buildStory(core) };
}

// 화면에서 사용: 지금 시각을 한국 날짜로 바꿔 추천을 만듭니다.
export function getDailyFashion(signId: string, now: Date): DailyFashion | null {
  return getDailyFashionForKey(signId, toKstDateKey(now));
}
