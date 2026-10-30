"use client";

// ② Reveal(약 1초) → ③ Result
// 날짜는 사용자 기기 기준이라 브라우저에서 계산합니다.
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDailyFashion, type DailyFashion } from "@/lib/fortune";
import { Bow, Heart, Sparkle, Star } from "../../Stickers";

const REVEAL_MS = 1000;

export default function ResultView({ signId }: { signId: string }) {
  const [result, setResult] = useState<DailyFashion | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [wearing, setWearing] = useState(false);

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

  const { dateLabel, sign, color, item, howTo, pairColors } = result;
  const signEn = sign.id.charAt(0).toUpperCase() + sign.id.slice(1);
  const searchUrl =
    "https://www.pinterest.com/search/pins/?q=" + encodeURIComponent(`${color.name} ${item.name} 코디`);

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

      {/* 인물 사진 대신 오늘의 색을 담은 폴라로이드 */}
      <figure className="polaroid">
        <span className="tape" aria-hidden="true" />
        <div className="polaroid-color" style={{ background: color.hex }} />
        <figcaption className="polaroid-caption">a little style fortune for today</figcaption>
        <Bow size={46} className="deco" style={{ right: -14, top: -18, transform: "rotate(18deg)" }} />
      </figure>

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

      <div className="actions">
        <a className="btn btn-secondary" href={searchUrl} target="_blank" rel="noopener noreferrer">
          코디 참고하기 <span aria-hidden="true">↗</span>
        </a>
        <button className="btn btn-primary" type="button" onClick={() => setWearing(true)} disabled={wearing}>
          오늘 입어볼게요 <Heart size={16} color="#ffffff" />
        </button>
      </div>

      {wearing && (
        <p className="bubble" role="status">
          좋은 하루 보내세요.
          <br />
          내일은 또 다른 색으로 찾아오겠습니다 ✧
        </p>
      )}

      <Link href="/" className="back-link">
        다른 별자리 보기
      </Link>
    </div>
  );
}
