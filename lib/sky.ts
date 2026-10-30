// 실제 천체 위치 계산
//
// astronomy-engine(MIT 라이선스, https://github.com/cosinekitty/astronomy)으로
// 달의 위치를 계산합니다. 인터넷 연결이나 외부 API 없이 기기 안에서 계산됩니다.
//
// 점성술은 황도(태양이 지나가는 길)를 30도씩 12구역으로 나눠 별자리를 붙입니다.
// 달의 황경(황도 위의 각도)을 30으로 나누면 달이 머무는 별자리를 알 수 있습니다.
import { EclipticGeoMoon } from "astronomy-engine";
import { SIGNS, type Sign } from "../data/signs";

export type MoonPosition = {
  longitude: number; // 황경 (0~360도)
  sign: Sign; // 달이 머무는 별자리
};

// 주어진 순간의 달 위치
export function getMoonPosition(at: Date): MoonPosition {
  const longitude = EclipticGeoMoon(at).lon; // 그날의 춘분점 기준 황경
  const index = Math.floor((((longitude % 360) + 360) % 360) / 30); // 0 = 양자리 … 11 = 물고기자리
  return { longitude, sign: SIGNS[index] };
}
