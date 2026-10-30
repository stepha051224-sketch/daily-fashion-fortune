// 12개 별자리 목록
export type Sign = {
  id: string; // 주소에 쓰이는 영문 이름 (예: /result/aries)
  name: string; // 화면에 보이는 이름
  symbol: string;
  period: string;
};

export const SIGNS: Sign[] = [
  { id: "aries", name: "양자리", symbol: "♈︎", period: "3.21 – 4.19" },
  { id: "taurus", name: "황소자리", symbol: "♉︎", period: "4.20 – 5.20" },
  { id: "gemini", name: "쌍둥이자리", symbol: "♊︎", period: "5.21 – 6.21" },
  { id: "cancer", name: "게자리", symbol: "♋︎", period: "6.22 – 7.22" },
  { id: "leo", name: "사자자리", symbol: "♌︎", period: "7.23 – 8.22" },
  { id: "virgo", name: "처녀자리", symbol: "♍︎", period: "8.23 – 9.23" },
  { id: "libra", name: "천칭자리", symbol: "♎︎", period: "9.24 – 10.22" },
  { id: "scorpio", name: "전갈자리", symbol: "♏︎", period: "10.23 – 11.22" },
  { id: "sagittarius", name: "사수자리", symbol: "♐︎", period: "11.23 – 12.24" },
  { id: "capricorn", name: "염소자리", symbol: "♑︎", period: "12.25 – 1.19" },
  { id: "aquarius", name: "물병자리", symbol: "♒︎", period: "1.20 – 2.18" },
  { id: "pisces", name: "물고기자리", symbol: "♓︎", period: "2.19 – 3.20" },
];

export function findSign(id: string): Sign | undefined {
  return SIGNS.find((sign) => sign.id === id);
}
