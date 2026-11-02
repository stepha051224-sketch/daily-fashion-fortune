"use client";

// ② Reveal(약 1초) → ③ Result
// 결과는 한국 시간 날짜 기준이며, 페이지를 열 때 브라우저에서 계산합니다.
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDailyFashion, type DailyFashion } from "@/lib/fortune";
import { makeResultImage } from "@/lib/shareImage";
import { Heart, Sparkle, Star } from "../../Stickers";
import WeatherBlock from "./WeatherBlock";

const REVEAL_MS = 1000;

export default function ResultView({ signId }: { signId: string }) {
  const [result, setResult] = useState<DailyFashion | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState(""); // 저장·공유 후 짧은 안내
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setResult(getDailyFashion(signId, new Date()));
    const timer = setTimeout(() => setRevealed(true), REVEAL_MS);
    return () => clearTimeout(timer);
  }, [signId]);

  // ② Reveal
  if (!result || !revealed) {
    return (
      <div className="reveal">
        <div className="reveal-stage">
          <Sparkle size={22} className="twinkle" style={{ left: 6, top: 14 }} />
          <Sparkle size={14} className="twinkle delay" color="#cbbbe9" style={{ right: 10, top: 0 }} />
          <Star size={20} className="twinkle delay" style={{ right: 0, bottom: 18 }} />
          <div className="reveal-orb" style={{ background: result ? result.color.hex : "transparent" }} />
        </div>
        <p className="reveal-script">Today&apos;s Fashion Fortune</p>
        <p className="reveal-text">오늘의 흐름을 살펴보고 있습니다</p>
      </div>
    );
  }

  const { dateLabel, sign, color, item, howTo, pairColors, theme, story, basis } = result;
  const signEn = sign.id.charAt(0).toUpperCase() + sign.id.slice(1);
  const searchUrl =
    "https://www.pinterest.com/search/pins/?q=" + encodeURIComponent(`${color.name} ${item.name} ${theme.searchWord} 코디`);

  const shareUrl = `${window.location.origin}/result/${sign.id}`;
  const shareText = `오늘 ${sign.name}의 컬러는 ${color.name}, 아이템은 ${item.name}이에요.`;

  function showNotice(text: string) {
    setNotice(text);
    setTimeout(() => setNotice(""), 2500);
  }

  // 이미지 저장: 휴대폰은 공유 창(→ "이미지 저장"), 그 외에는 바로 다운로드
  async function saveImage() {
    if (!result) return;
    setSaving(true);
    try {
      const blob = await makeResultImage(result);
      const fileName = `today-style-${result.dateKey}-${sign.id}.png`;
      const file = new File([blob], fileName, { type: "image/png" });
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showNotice("이미지를 저장했어요.");
      }
    } catch (e) {
      // 사용자가 공유 창을 닫은 경우는 안내하지 않습니다.
      if (!(e instanceof DOMException && e.name === "AbortError")) showNotice("이미지를 만들지 못했어요. 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  }

  // 공유하기: 휴대폰 공유 창, 없으면 링크 복사
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "오늘 입는 별자리", text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        showNotice("링크를 복사했어요.");
      }
    } catch (e) {
      if (!(e instanceof DOMException && e.name === "AbortError")) showNotice("공유하지 못했어요. 다시 시도해 주세요.");
    }
  }

  // ③ Result
  return (
    <div className="result">
      <nav className="result-nav">
        <Link href="/" className="nav-back" aria-label="별자리 다시 고르기">
          ‹
        </Link>
        <p className="date">{dateLabel}</p>
        <span className="nav-space" />
      </nav>

      <header className="result-hero">
        <Star size={30} className="deco" style={{ left: 0, top: 6 }} />
        <Sparkle size={16} className="deco" style={{ right: 6, top: 0 }} />
        <h1 className="script-title result-title">
          Today&apos;s
          <br />
          <span className="indent">Fashion Fortune</span>
        </h1>
        <p className="for-sign">for {signEn}</p>
        <div className="sign-pill">
          <span className="sign-pill-symbol" aria-hidden="true">
            {sign.symbol}
          </span>
          <span>
            <strong>{sign.name}</strong>
            <small>{sign.period}</small>
          </span>
        </div>
      </header>

      {/* 오늘의 별자리 이야기: 추천 이유 */}
      <section className="block story">
        <p className="pill-label">Today&apos;s Story</p>
        <p className="story-theme">{theme.en}</p>
        <p className="body-text">{story}</p>
        <p className="story-moon">
          ☾ Moon in {basis.moonSign.en} · 달이 {basis.moonSign.name}에 머무는 날
        </p>
        <p className="note">
          달의 위치는 한국 시간 정오 기준으로 계산했어요. 별자리의 상징에서 영감을 얻은 패션 추천입니다.
        </p>
      </section>

      <section className="block">
        <p className="pill-label">Today&apos;s Color</p>
        <div className="color-row">
          <div>
            <p className="en-title">{color.en}</p>
            <p className="ko-sub">{color.name}</p>
          </div>
          <span className="swatch-wrap">
            <span className="swatch swatch-lg" style={{ background: color.hex }} />
            <Sparkle size={18} className="deco" color="#e9c76a" style={{ right: -6, bottom: -2 }} />
          </span>
        </div>
        <p className="body-text">{color.tip}</p>
      </section>

      <section className="block">
        <p className="pill-label">Today&apos;s Item</p>
        <div className="item-row">
          <p className="item-name">{item.name}</p>
          <p className="item-en">
            {item.en} <Heart size={14} />
          </p>
        </div>
        <p className="body-text">{howTo[0]}</p>
        <p className="body-text">{howTo[1]}</p>
        <p className="note">같은 색이 없다면 비슷한 톤의 아이템으로 대신해도 좋습니다.</p>
      </section>

      <section className="block">
        <p className="pill-label">Color Palette</p>
        <p className="block-desc">함께 사용하기 좋은 컬러</p>
        <ul className="pair-list">
          {pairColors.map((c) => (
            <li key={c.id}>
              <span className="swatch swatch-md" style={{ background: c.hex }} />
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <WeatherBlock />

      <div className="actions">
        <a className="btn btn-secondary" href={searchUrl} target="_blank" rel="noopener noreferrer">
          코디 참고하기 <span aria-hidden="true">↗</span>
        </a>
        <div className="actions-row">
          <button className="btn btn-primary" type="button" onClick={saveImage} disabled={saving}>
            {saving ? "만드는 중…" : "이미지 저장"}
          </button>
          <button className="btn btn-secondary" type="button" onClick={share}>
            공유하기
          </button>
        </div>
      </div>

      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}

      <Link href="/" className="back-link">
        다른 별자리 보기
      </Link>
    </div>
  );
}
