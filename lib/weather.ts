// 오늘의 날씨 가져오기
// Open-Meteo(https://open-meteo.com) — 무료, 회원가입·API 키 필요 없음
// 화면(UI)은 getTodayWeather() 하나만 사용합니다.

export type TodayWeather = {
  place: string; // "현재 위치" 또는 "서울"
  label: string; // 맑음, 흐림, 비 …
  kind: WeatherKind; // 아이콘 종류
  temp: number; // 지금 기온
  min: number;
  max: number;
  rainChance: number; // 강수 확률(%)
};

export type WeatherKind = "sun" | "partly" | "cloud" | "fog" | "rain" | "snow" | "storm";

const SEOUL = { lat: 37.5665, lon: 126.978 };

// 날씨 코드 → 한글 설명 (WMO 기준 코드)
function describe(code: number): { label: string; kind: WeatherKind } {
  if (code === 0) return { label: "맑음", kind: "sun" };
  if (code <= 2) return { label: "구름 조금", kind: "partly" };
  if (code === 3) return { label: "흐림", kind: "cloud" };
  if (code <= 48) return { label: "안개", kind: "fog" };
  if (code <= 67 || (code >= 80 && code <= 82)) return { label: "비", kind: "rain" };
  if (code <= 77 || code === 85 || code === 86) return { label: "눈", kind: "snow" };
  return { label: "뇌우", kind: "storm" };
}

// 휴대폰 위치를 물어보고, 안 되면 서울을 사용합니다.
function getPosition(): Promise<{ lat: number; lon: number; place: string }> {
  return new Promise((resolve) => {
    const fallback = () => resolve({ ...SEOUL, place: "서울" });
    if (!("geolocation" in navigator)) return fallback();
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude, place: "현재 위치" }),
      fallback,
      { timeout: 5000, maximumAge: 30 * 60 * 1000 },
    );
  });
}

export async function getTodayWeather(): Promise<TodayWeather | null> {
  try {
    const { lat, lon, place } = await getPosition();
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${lat.toFixed(3)}&longitude=${lon.toFixed(3)}` +
      "&current=temperature_2m,weather_code" +
      "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
      "&timezone=auto&forecast_days=1";
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const { label, kind } = describe(data.current.weather_code);
    return {
      place,
      label,
      kind,
      temp: Math.round(data.current.temperature_2m),
      min: Math.round(data.daily.temperature_2m_min[0]),
      max: Math.round(data.daily.temperature_2m_max[0]),
      rainChance: data.daily.precipitation_probability_max[0] ?? 0,
    };
  } catch {
    return null; // 실패하면 화면에 간단한 안내만 표시
  }
}
