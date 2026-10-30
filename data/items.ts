// 추천에 쓰이는 기본 아이템 목록
// - seasons: 추천해도 되는 계절
// - neutralOnly: true면 기본색(무채색 등)일 때만 추천합니다.
//   (예: 버건디 코트는 가지고 있는 사람이 많지 않기 때문)
// - howTo: 활용 방법 문장. {color} 자리에 오늘의 색 이름이 들어갑니다.
export type Season = "spring" | "summer" | "autumn" | "winter";

export type Item = {
  id: string;
  name: string;
  en: string; // 영문 이름
  seasons: Season[];
  neutralOnly: boolean;
  howTo: string;
};

const ALL: Season[] = ["spring", "summer", "autumn", "winter"];

export const ITEMS: Item[] = [
  {
    id: "shirt",
    name: "셔츠",
    en: "Shirt",
    seasons: ["spring", "summer", "autumn"],
    neutralOnly: false,
    howTo: "{color} 셔츠를 입고, 하의는 차분한 색으로 맞춰 셔츠가 자연스럽게 보이도록 해보세요.",
  },
  {
    id: "tshirt",
    name: "티셔츠",
    en: "T-shirt",
    seasons: ["spring", "summer", "autumn"],
    neutralOnly: false,
    howTo: "{color} 티셔츠 하나로 가볍게 입거나, 겉옷 안에 받쳐 입어 살짝 보이게 해보세요.",
  },
  {
    id: "knit",
    name: "니트",
    en: "Knit",
    seasons: ["autumn", "winter", "spring"],
    neutralOnly: false,
    howTo: "{color} 니트를 입고, 나머지는 기본색으로 정리하면 니트의 색과 질감이 잘 살아납니다.",
  },
  {
    id: "cardigan",
    name: "가디건",
    en: "Cardigan",
    seasons: ["spring", "autumn"],
    neutralOnly: false,
    howTo: "{color} 가디건을 걸치거나 어깨에 둘러서, 기본 상의 위에 색을 더해보세요.",
  },
  {
    id: "sweatshirt",
    name: "맨투맨",
    en: "Sweatshirt",
    seasons: ["spring", "autumn", "winter"],
    neutralOnly: false,
    howTo: "{color} 맨투맨에 슬랙스나 단정한 하의를 맞추면 편하면서도 정돈된 느낌이 납니다.",
  },
  {
    id: "socks",
    name: "양말",
    en: "Socks",
    seasons: ALL,
    neutralOnly: false,
    howTo: "{color} 양말처럼 발목에서 살짝 보이는 정도로만 색을 더해도 충분합니다.",
  },
  {
    id: "bag",
    name: "가방",
    en: "Bag",
    seasons: ALL,
    neutralOnly: false,
    howTo: "옷은 평소처럼 입고, {color} 계열의 가방으로 오늘의 색을 챙겨보세요.",
  },
  {
    id: "cap",
    name: "모자",
    en: "Cap",
    seasons: ALL,
    neutralOnly: false,
    howTo: "{color} 모자를 더해 얼굴 가까이에 오늘의 색을 두어보세요.",
  },
  {
    id: "scarf",
    name: "스카프",
    en: "Scarf",
    seasons: ["spring", "autumn"],
    neutralOnly: false,
    howTo: "{color} 스카프를 목에 가볍게 두르거나 가방에 묶어 작게 활용해보세요.",
  },
  {
    id: "muffler",
    name: "머플러",
    en: "Muffler",
    seasons: ["winter"],
    neutralOnly: false,
    howTo: "{color} 머플러를 두르면 겉옷이 어두워도 얼굴 주변이 환해 보입니다.",
  },
  {
    id: "hairacc",
    name: "헤어 액세서리",
    en: "Hair Accessory",
    seasons: ALL,
    neutralOnly: false,
    howTo: "{color} 머리끈이나 핀처럼 아주 작은 소품으로도 오늘의 색을 담을 수 있습니다.",
  },
  {
    id: "slacks",
    name: "슬랙스",
    en: "Slacks",
    seasons: ALL,
    neutralOnly: true,
    howTo: "{color} 슬랙스를 기본으로 두고, 상의는 편하게 골라 단정한 하루를 시작해보세요.",
  },
  {
    id: "skirt",
    name: "스커트",
    en: "Skirt",
    seasons: ALL,
    neutralOnly: true,
    howTo: "{color} 스커트에 기본 상의를 맞춰, 하의에 오늘의 색을 담아보세요.",
  },
  {
    id: "shorts",
    name: "반바지",
    en: "Shorts",
    seasons: ["summer"],
    neutralOnly: true,
    howTo: "{color} 반바지에 밝은 상의를 맞추면 시원하고 가벼운 인상이 됩니다.",
  },
  {
    id: "sneakers",
    name: "운동화",
    en: "Sneakers",
    seasons: ALL,
    neutralOnly: true,
    howTo: "{color} 운동화로 발끝에 오늘의 색을 두고, 옷은 편하게 골라보세요.",
  },
  {
    id: "jacket",
    name: "재킷",
    en: "Jacket",
    seasons: ["spring", "autumn"],
    neutralOnly: true,
    howTo: "{color} 재킷을 걸치면 안에 무엇을 입어도 정돈된 인상이 됩니다.",
  },
  {
    id: "coat",
    name: "코트",
    en: "Coat",
    seasons: ["winter"],
    neutralOnly: true,
    howTo: "{color} 코트를 입는 날에는 안쪽 옷을 비슷한 톤으로 맞추면 깔끔하게 이어집니다.",
  },
  {
    id: "padding",
    name: "패딩",
    en: "Padding",
    seasons: ["winter"],
    neutralOnly: true,
    howTo: "{color} 패딩에 머플러나 모자 같은 소품을 더하면 단조롭지 않게 입을 수 있습니다.",
  },
];
