// 추천에 쓰이는 색 목록
// - neutral: 무채색·기본색이면 true. 코트·바지처럼 큰 아이템은 이런 색일 때만 추천합니다.
// - tip: 이 색을 옷에 어떻게 쓰면 좋은지 한 문장
// - pairs: 함께 쓰기 좋은 색의 id
export type Color = {
  id: string;
  name: string;
  en: string; // 영문 이름
  hex: string;
  neutral: boolean;
  tip: string;
  pairs: string[];
};

export const COLORS: Color[] = [
  {
    id: "ivory",
    name: "아이보리",
    en: "Ivory",
    hex: "#F1EBDD",
    neutral: true,
    tip: "새하얀 색보다 부드러워서 어디에 두어도 인상이 한결 편안해 보입니다.",
    pairs: ["camel", "navy", "brown"],
  },
  {
    id: "beige",
    name: "베이지",
    en: "Beige",
    hex: "#D8C6A6",
    neutral: true,
    tip: "비슷한 밝기의 색끼리 겹쳐 입으면 단정하고 차분한 분위기가 납니다.",
    pairs: ["ivory", "brown", "khaki"],
  },
  {
    id: "camel",
    name: "카멜",
    en: "Camel",
    hex: "#B8854F",
    neutral: true,
    tip: "따뜻한 기운이 있는 색이라 무채색 옷차림에 하나만 더해도 온기가 느껴집니다.",
    pairs: ["ivory", "charcoal", "navy"],
  },
  {
    id: "brown",
    name: "브라운",
    en: "Brown",
    hex: "#6B4A35",
    neutral: true,
    tip: "블랙 대신 쓰면 같은 차분함 속에서도 조금 더 부드러운 인상을 줍니다.",
    pairs: ["beige", "ivory", "mustard"],
  },
  {
    id: "khaki",
    name: "카키",
    en: "Khaki",
    hex: "#6E6B48",
    neutral: true,
    tip: "자연스러운 색이라 밝은 색 옷과 함께 입으면 균형이 잘 맞습니다.",
    pairs: ["ivory", "beige", "brown"],
  },
  {
    id: "charcoal",
    name: "차콜",
    en: "Charcoal",
    hex: "#44464B",
    neutral: true,
    tip: "블랙보다 가벼워 보여서 전체를 어둡게 입어도 답답해 보이지 않습니다.",
    pairs: ["ivory", "skyblue", "burgundy"],
  },
  {
    id: "gray",
    name: "그레이",
    en: "Gray",
    hex: "#A3A3A3",
    neutral: true,
    tip: "어떤 색과도 잘 어울리니, 오늘은 다른 옷의 색을 조용히 받쳐주는 역할로 써보세요.",
    pairs: ["navy", "lavender", "white"],
  },
  {
    id: "navy",
    name: "네이비",
    en: "Navy",
    hex: "#27324F",
    neutral: true,
    tip: "단정하고 믿음직한 인상을 주는 색이라 중요한 약속이 있는 날에 잘 어울립니다.",
    pairs: ["white", "camel", "skyblue"],
  },
  {
    id: "white",
    name: "화이트",
    en: "White",
    hex: "#FAFAF8",
    neutral: true,
    tip: "밝은 색을 한 곳에 두면 옷차림 전체가 깔끔하고 가벼워 보입니다.",
    pairs: ["navy", "black", "skyblue"],
  },
  {
    id: "black",
    name: "블랙",
    en: "Black",
    hex: "#1F1F1F",
    neutral: true,
    tip: "익숙한 색일수록 소재와 실루엣이 잘 드러나니, 오늘은 질감이 좋은 옷에 조금 더 눈길을 줘보세요.",
    pairs: ["white", "gray", "burgundy"],
  },
  {
    id: "burgundy",
    name: "버건디",
    en: "Burgundy",
    hex: "#7A2333",
    neutral: false,
    tip: "깊이 있는 색이라 작은 면적으로만 써도 옷차림에 무게감이 생깁니다.",
    pairs: ["charcoal", "beige", "navy"],
  },
  {
    id: "mustard",
    name: "머스터드",
    en: "Mustard",
    hex: "#C9A13A",
    neutral: false,
    tip: "밝은 기운을 주는 색이니, 나머지는 무채색으로 정리하면 자연스럽게 눈에 띕니다.",
    pairs: ["brown", "navy", "charcoal"],
  },
  {
    id: "terracotta",
    name: "테라코타",
    en: "Terracotta",
    hex: "#BF6640",
    neutral: false,
    tip: "흙빛이 도는 따뜻한 색이라 베이지나 브라운 계열과 함께하면 편안하게 어우러집니다.",
    pairs: ["beige", "ivory", "khaki"],
  },
  {
    id: "forest",
    name: "포레스트 그린",
    en: "Forest Green",
    hex: "#2F5444",
    neutral: false,
    tip: "차분한 초록은 생각보다 다른 색과 잘 어울리니, 평소 옷차림에 하나만 더해보세요.",
    pairs: ["beige", "camel", "ivory"],
  },
  {
    id: "skyblue",
    name: "스카이블루",
    en: "Sky Blue",
    hex: "#A9C7E4",
    neutral: false,
    tip: "맑고 가벼운 색이라 옷차림 전체를 산뜻하게 만들어줍니다.",
    pairs: ["white", "navy", "gray"],
  },
  {
    id: "lavender",
    name: "라벤더",
    en: "Lavender",
    hex: "#BDB3D6",
    neutral: false,
    tip: "은은한 색이라 그레이나 화이트와 함께 쓰면 부드러운 분위기가 납니다.",
    pairs: ["gray", "white", "charcoal"],
  },
  {
    id: "pink",
    name: "연핑크",
    en: "Pale Pink",
    hex: "#EAC4C4",
    neutral: false,
    tip: "채도가 낮은 핑크는 부담 없이 쓸 수 있어서, 무채색 옷차림에 온기를 더해줍니다.",
    pairs: ["gray", "ivory", "charcoal"],
  },
  {
    id: "mint",
    name: "민트",
    en: "Mint",
    hex: "#A8D5C3",
    neutral: false,
    tip: "산뜻한 색이라 작은 면적으로 더해도 옷차림에 생기가 돕니다.",
    pairs: ["white", "beige", "gray"],
  },
];

export function findColor(id: string): Color | undefined {
  return COLORS.find((color) => color.id === id);
}
