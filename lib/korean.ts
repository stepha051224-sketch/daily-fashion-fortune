// 한국어 조사 붙이기 (받침에 따라 을/를, 으로/로 등을 고릅니다)
function hasFinal(word: string): boolean {
  const code = word.charCodeAt(word.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function hasRieulFinal(word: string): boolean {
  const code = word.charCodeAt(word.length - 1);
  return code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 === 8;
}

export const josa = {
  을: (w: string) => w + (hasFinal(w) ? "을" : "를"),
  은: (w: string) => w + (hasFinal(w) ? "은" : "는"),
  이: (w: string) => w + (hasFinal(w) ? "이" : "가"),
  과: (w: string) => w + (hasFinal(w) ? "과" : "와"),
  // 받침이 ㄹ이면 "로" (예: 물로)
  으로: (w: string) => w + (hasFinal(w) && !hasRieulFinal(w) ? "으로" : "로"),
};
