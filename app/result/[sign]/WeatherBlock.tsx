"use client";

// 오늘의 날씨 (간단 표시)
import { useEffect, useState } from "react";
import { getTodayWeather, type TodayWeather, type WeatherKind } from "@/lib/weather";

// 날씨 아이콘 (직접 그린 선 아이콘이라 어느 기기에서나 같게 보입니다)
function WeatherIcon({ kind }: { kind: WeatherKind }) {
  const line = { fill: "none", stroke: "#563b35", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const sun = (cx: number, cy: number, r: number) => (
    <g {...line} stroke="#e9b949">
      <circle cx={cx} cy={cy} r={r} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={cx + Math.cos(rad) * (r + 2.5)} y1={cy + Math.sin(rad) * (r + 2.5)} x2={cx + Math.cos(rad) * (r + 5)} y2={cy + Math.sin(rad) * (r + 5)} />;
      })}
    </g>
  );
  const cloud = <path {...line} fill="#fffefe" d="M11 30 H29 a6 6 0 0 0 0 -12 a8 8 0 0 0 -15 -2 a6 6 0 0 0 -3 14 Z" />;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {kind === "sun" && sun(20, 20, 7)}
      {kind === "partly" && (<>{sun(14, 14, 5)}{cloud}</>)}
      {(kind === "cloud" || kind === "rain" || kind === "snow" || kind === "storm") && cloud}
      {kind === "fog" && (
        <g {...line}><path d="M8 15 H32 M6 21 H30 M10 27 H34" /></g>
      )}
      {kind === "rain" && <g {...line} stroke="#8fb3d9"><path d="M15 33 l-1.5 4 M21 33 l-1.5 4 M27 33 l-1.5 4" /></g>}
      {kind === "snow" && <g fill="#a7c4e0"><circle cx="15" cy="35" r="1.4" /><circle cx="21" cy="37" r="1.4" /><circle cx="27" cy="35" r="1.4" /></g>}
      {kind === "storm" && <path d="M21 31 l-3 5 h4 l-2 4" {...line} stroke="#e9b949" />}
    </svg>
  );
}

export default function WeatherBlock() {
  const [weather, setWeather] = useState<TodayWeather | null>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    getTodayWeather().then((w) => {
      setWeather(w);
      setStatus(w ? "done" : "error");
    });
  }, []);

  return (
    <section className="block">
      <p className="pill-label">Weather</p>
      {status === "loading" && <p className="weather-msg">날씨를 불러오고 있습니다…</p>}
      {status === "error" && <p className="weather-msg">지금은 날씨 정보를 불러올 수 없습니다.</p>}
      {status === "done" && weather && (
        <div className="weather">
          <WeatherIcon kind={weather.kind} />
          <div className="weather-main">
            <p className="weather-now">
              {weather.temp}° <span>{weather.label}</span>
            </p>
            <p className="weather-sub">
              최저 {weather.min}° / 최고 {weather.max}° · 강수 {weather.rainChance}%
            </p>
          </div>
          <span className="weather-place">{weather.place}</span>
        </div>
      )}
    </section>
  );
}
