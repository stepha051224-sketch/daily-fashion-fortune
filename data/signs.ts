// 12개 별자리 목록
//
// element·keywords·styles는 점성술의 전통적인 상징을 패션으로 해석한 것입니다.
// (과학적으로 검증된 성격 특성이 아닙니다.)
import type { ThemeId } from "./themes";

export type Element = "fire" | "earth" | "air" | "water";

export type Sign = {
  id: string; // 주소에 쓰이는 영문 이름 (예: /result/aries)
  name: string; // 화면에 보이는 이름
  symbol: string;
  period: string;
  element: Element; // 점성술의 4원소
  keywords: string; // 상징 키워드
  en: string; // 영문 이름
  // 달이 이 별자리에 머무는 날의 분위기 (점성술 상징을 옮긴 표현, 추천 이유 첫 문장에 쓰임)
  moonDayMood: string;
  // 이 별자리가 잘 어울리는 스타일 테마 3가지 (앞쪽일수록 기본 성향에 가까움)
  // trait: 그 테마와 연결되는 별자리의 상징 (추천 이유 문장에 쓰임)
  styles: { theme: ThemeId; trait: string }[];
};

export const SIGNS: Sign[] = [
  {
    id: "aries", name: "양자리", symbol: "♈︎", period: "3.21 – 4.19",
    element: "fire", keywords: "활동적 · 대담함 · 에너지",
    en: "Aries", moonDayMood: "활기차고 적극적인",
    styles: [
      { theme: "active", trait: "활동적인 에너지" },
      { theme: "bold", trait: "대담함" },
      { theme: "unique", trait: "새로운 것에 먼저 뛰어드는 기질" },
    ],
  },
  {
    id: "taurus", name: "황소자리", symbol: "♉︎", period: "4.20 – 5.20",
    element: "earth", keywords: "안정감 · 편안함 · 소재의 질감",
    en: "Taurus", moonDayMood: "느긋하고 편안한",
    styles: [
      { theme: "soft", trait: "편안함을 아끼는 감각" },
      { theme: "classic", trait: "안정감" },
      { theme: "deep", trait: "소재의 질감을 즐기는 감각" },
    ],
  },
  {
    id: "gemini", name: "쌍둥이자리", symbol: "♊︎", period: "5.21 – 6.21",
    element: "air", keywords: "변화 · 다양성 · 레이어링",
    en: "Gemini", moonDayMood: "가볍고 경쾌한",
    styles: [
      { theme: "layered", trait: "다양함을 즐기는 감각" },
      { theme: "unique", trait: "변화를 즐기는 기질" },
      { theme: "active", trait: "가벼운 발걸음" },
    ],
  },
  {
    id: "cancer", name: "게자리", symbol: "♋︎", period: "6.22 – 7.22",
    element: "water", keywords: "감성 · 부드러움 · 로맨틱",
    en: "Cancer", moonDayMood: "다정하고 포근한",
    styles: [
      { theme: "romantic", trait: "로맨틱한 감성" },
      { theme: "soft", trait: "부드러운 섬세함" },
      { theme: "dreamy", trait: "풍부한 감수성" },
    ],
  },
  {
    id: "leo", name: "사자자리", symbol: "♌︎", period: "7.23 – 8.22",
    element: "fire", keywords: "자신감 · 존재감 · 포인트",
    en: "Leo", moonDayMood: "밝고 자신감 있는",
    styles: [
      { theme: "bold", trait: "존재감" },
      { theme: "chic", trait: "자신감" },
      { theme: "active", trait: "밝은 에너지" },
    ],
  },
  {
    id: "virgo", name: "처녀자리", symbol: "♍︎", period: "8.23 – 9.23",
    element: "earth", keywords: "정돈 · 섬세함 · 단정함",
    en: "Virgo", moonDayMood: "차분하고 섬세한",
    styles: [
      { theme: "classic", trait: "단정함" },
      { theme: "chic", trait: "정돈된 감각" },
      { theme: "soft", trait: "섬세함" },
    ],
  },
  {
    id: "libra", name: "천칭자리", symbol: "♎︎", period: "9.24 – 10.22",
    element: "air", keywords: "균형 · 조화 · 세련됨",
    en: "Libra", moonDayMood: "부드럽고 조화로운",
    styles: [
      { theme: "chic", trait: "균형 감각" },
      { theme: "romantic", trait: "조화로움" },
      { theme: "classic", trait: "세련된 안목" },
    ],
  },
  {
    id: "scorpio", name: "전갈자리", symbol: "♏︎", period: "10.23 – 11.22",
    element: "water", keywords: "깊이 · 신비로움 · 강렬함",
    en: "Scorpio", moonDayMood: "깊고 집중된",
    styles: [
      { theme: "deep", trait: "깊이" },
      { theme: "bold", trait: "강렬함" },
      { theme: "chic", trait: "신비로운 분위기" },
    ],
  },
  {
    id: "sagittarius", name: "사수자리", symbol: "♐︎", period: "11.23 – 12.24",
    element: "fire", keywords: "자유 · 활동성 · 캐주얼",
    en: "Sagittarius", moonDayMood: "자유롭고 여유로운",
    styles: [
      { theme: "active", trait: "자유로운 에너지" },
      { theme: "soft", trait: "여유로움" },
      { theme: "layered", trait: "활동성" },
    ],
  },
  {
    id: "capricorn", name: "염소자리", symbol: "♑︎", period: "12.25 – 1.19",
    element: "earth", keywords: "실용성 · 클래식 · 구조적인 실루엣",
    en: "Capricorn", moonDayMood: "단단하고 차분한",
    styles: [
      { theme: "classic", trait: "클래식한 취향" },
      { theme: "deep", trait: "단단함" },
      { theme: "chic", trait: "구조적인 실루엣을 좋아하는 감각" },
    ],
  },
  {
    id: "aquarius", name: "물병자리", symbol: "♒︎", period: "1.20 – 2.18",
    element: "air", keywords: "독창성 · 개성 · 실험적인 스타일",
    en: "Aquarius", moonDayMood: "새롭고 산뜻한",
    styles: [
      { theme: "unique", trait: "독창성" },
      { theme: "layered", trait: "실험적인 감각" },
      { theme: "dreamy", trait: "자유로운 상상력" },
    ],
  },
  {
    id: "pisces", name: "물고기자리", symbol: "♓︎", period: "2.19 – 3.20",
    element: "water", keywords: "몽환적 · 부드러움 · 유연한 실루엣",
    en: "Pisces", moonDayMood: "몽환적이고 부드러운",
    styles: [
      { theme: "dreamy", trait: "몽환적인 분위기" },
      { theme: "romantic", trait: "부드러움" },
      { theme: "soft", trait: "유연함" },
    ],
  },
];

export const ELEMENT_NAMES: Record<Element, string> = {
  fire: "불",
  earth: "흙",
  air: "공기",
  water: "물",
};

export function findSign(id: string): Sign | undefined {
  return SIGNS.find((sign) => sign.id === id);
}
