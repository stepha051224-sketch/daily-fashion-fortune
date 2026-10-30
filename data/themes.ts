// 오늘의 스타일 테마
//
// 추천은 "테마 → 컬러 → 아이템" 순서로 정해집니다.
// 컬러와 아이템은 테마 안에서만 고르기 때문에 서로 같은 분위기로 연결됩니다.
import type { Element } from "./signs";

export type ThemeId =
  | "active" | "bold" | "soft" | "romantic" | "classic"
  | "layered" | "deep" | "dreamy" | "chic" | "unique";

export type Theme = {
  id: ThemeId;
  en: string; // 화면 표시용 영문 이름
  ko: string; // 추천 이유 문장용 한글 이름
  feel: string; // 이 테마의 분위기 (문장용)
  tip: string; // 스타일링 팁
  searchWord: string; // 코디 검색어에 붙는 단어
  colors: string[]; // 이 테마에 어울리는 색 id
  items: string[]; // 이 테마에 어울리는 아이템 id
};

export const THEMES: Record<ThemeId, Theme> = {
  active: {
    id: "active", en: "Active Casual", ko: "액티브 캐주얼", feel: "가볍고 활기찬",
    tip: "움직이기 편한 핏을 기본으로 하고, 색은 한 곳에 또렷하게 두세요.",
    searchWord: "캐주얼",
    colors: ["navy", "white", "skyblue", "mustard", "khaki", "gray"],
    items: ["tshirt", "sweatshirt", "cap", "sneakers", "shorts", "jacket", "socks", "padding"],
  },
  bold: {
    id: "bold", en: "Bold Point", ko: "볼드 포인트", feel: "또렷하고 당당한",
    tip: "포인트는 한 곳에만 두고 나머지는 덜어내면 더 세련돼 보여요.",
    searchWord: "포인트",
    colors: ["burgundy", "mustard", "terracotta", "black", "forest"],
    items: ["socks", "bag", "cap", "scarf", "muffler", "hairacc", "knit", "shirt"],
  },
  soft: {
    id: "soft", en: "Soft Natural", ko: "소프트 내추럴", feel: "편안하고 자연스러운",
    tip: "여유 있는 핏과 부드러운 소재로 힘을 빼고 입어보세요.",
    searchWord: "내추럴",
    colors: ["ivory", "beige", "camel", "khaki", "brown", "mint"],
    items: ["knit", "cardigan", "shirt", "slacks", "scarf", "muffler", "coat", "bag"],
  },
  romantic: {
    id: "romantic", en: "Romantic Soft", ko: "로맨틱 소프트", feel: "부드럽고 사랑스러운",
    tip: "부드러운 소재나 곡선이 있는 아이템을 하나 곁들여보세요.",
    searchWord: "로맨틱",
    colors: ["pink", "lavender", "ivory", "skyblue", "white", "mint"],
    items: ["cardigan", "knit", "skirt", "scarf", "hairacc", "shirt", "muffler", "bag"],
  },
  classic: {
    id: "classic", en: "Classic Neat", ko: "클래식", feel: "단정하고 믿음직한",
    tip: "직선적인 실루엣과 기본색을 중심으로 깔끔하게 맞춰보세요.",
    searchWord: "클래식",
    colors: ["navy", "charcoal", "white", "black", "camel", "gray", "beige"],
    items: ["shirt", "slacks", "jacket", "coat", "knit", "skirt", "bag"],
  },
  layered: {
    id: "layered", en: "Layered Mix", ko: "레이어드 믹스", feel: "가볍고 다채로운",
    tip: "얇은 옷을 겹쳐 입어 색이 살짝씩 보이게 해보세요.",
    searchWord: "레이어드",
    colors: ["gray", "khaki", "skyblue", "mustard", "white", "navy", "lavender"],
    items: ["shirt", "cardigan", "tshirt", "sweatshirt", "jacket", "socks", "scarf"],
  },
  deep: {
    id: "deep", en: "Deep Mood", ko: "딥 무드", feel: "깊고 차분한",
    tip: "어두운 톤을 바탕으로 질감이 있는 소재를 더해보세요.",
    searchWord: "무드",
    colors: ["burgundy", "charcoal", "black", "forest", "navy", "brown"],
    items: ["knit", "coat", "jacket", "slacks", "muffler", "bag", "shirt"],
  },
  dreamy: {
    id: "dreamy", en: "Dreamy Flow", ko: "드리미", feel: "은은하고 몽환적인",
    tip: "옅은 색끼리 이어지게 맞추고, 흐르는 듯한 실루엣을 골라보세요.",
    searchWord: "파스텔",
    colors: ["lavender", "skyblue", "mint", "pink", "white", "gray"],
    items: ["cardigan", "skirt", "shirt", "scarf", "hairacc", "knit", "tshirt"],
  },
  chic: {
    id: "chic", en: "Balanced Chic", ko: "밸런스 시크", feel: "균형 잡히고 세련된",
    tip: "상의와 하의의 색과 핏의 무게를 비슷하게 맞춰보세요.",
    searchWord: "미니멀",
    colors: ["gray", "beige", "navy", "white", "black", "lavender", "camel"],
    items: ["shirt", "slacks", "skirt", "jacket", "knit", "bag", "coat"],
  },
  unique: {
    id: "unique", en: "Unexpected Mix", ko: "의외의 믹스", feel: "새롭고 개성 있는",
    tip: "평소 잘 고르지 않던 색을 작은 아이템으로 시도해보세요.",
    searchWord: "유니크",
    colors: ["mint", "skyblue", "mustard", "terracotta", "lavender", "forest"],
    items: ["socks", "cap", "hairacc", "tshirt", "sweatshirt", "bag", "scarf", "sneakers"],
  },
};

// 오늘 달이 머무는 별자리의 원소 → 패션 해석
// (점성술에서 원소가 가진 상징을 옷의 분위기로 옮긴 것입니다.)
export const MOON_MOODS: Record<Element, { mood: string; themes: ThemeId[] }> = {
  fire: { mood: "활기", themes: ["active", "bold", "unique"] },
  earth: { mood: "안정감", themes: ["classic", "soft", "deep"] },
  air: { mood: "가벼운 환기", themes: ["layered", "chic", "unique"] },
  water: { mood: "부드러운 감성", themes: ["romantic", "dreamy", "deep"] },
};
