// 글자를 항상 같은 숫자로 바꿔주는 함수입니다.
// 같은 글자를 넣으면 언제나 같은 숫자가 나오기 때문에
// "같은 날짜 + 같은 별자리 = 같은 결과"가 보장됩니다.
export function hashString(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0; // 0 이상의 정수로 맞춤
}

// 목록에서 seed 글자에 해당하는 항목 하나를 고릅니다.
export function pick<T>(list: T[], seedText: string): T {
  return list[hashString(seedText) % list.length];
}
