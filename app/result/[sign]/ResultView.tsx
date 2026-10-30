"use client";

// ② Reveal(약 1초) → ③ Result
// 날짜는 사용자 기기 기준이라 브라우저에서 계산합니다.
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDailyFashion, type DailyFashion } from "@/lib/fortune";

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
        <div
          className="reveal-orb"
          style={{ background: result ? result.color.hex : "transparent" }}
        />
        <p className="reveal-text">오늘의 흐름을 살펴보고 있습니다</p>
      </div>
    );
  }

  const { dateLabel, sign, color, item, howTo, pairColors } = result;
  const searchUrl =
    "https://www.pinterest.com/search/pins/?q=" + encodeURIComponent(`${color.name} ${item.name} 코디`);

  // ③ Result
  return (
    <div className="result">
      <header className="result-head">
        <p className="date">{dateLabel}</p>
        <p className="sign-line">
          <span aria-hidden="true">{sign.symbol}</span> {sign.name}
        </p>
      </header>

      <section className="card">
        <p className="label">Today&apos;s Color</p>
        <div className="color-row">
          <span className="swatch swatch-lg" style={{ background: color.hex }} />
          <span className="big-text">{color.name}</span>
        </div>
      </section>

      <section className="card">
        <p className="label">Today&apos;s Item</p>
        <p className="big-text">{item.name}</p>
      </section>

      <section className="card">
        <p className="label">활용 방법</p>
        {howTo.map((line) => (
          <p key={line} className="body-text">
            {line}
          </p>
        ))}
        <p className="note">같은 색 옷이 없다면 비슷한 톤의 아이템으로 대신해도 좋습니다.</p>
      </section>

      <section className="card">
        <p className="label">함께 사용하기 좋은 컬러</p>
        <ul className="pair-list">
          {pairColors.map((c) => (
            <li key={c.id}>
              <span className="swatch" style={{ background: c.hex }} />
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="actions">
        <a className="btn btn-secondary" href={searchUrl} target="_blank" rel="noopener noreferrer">
          코디 참고하기
        </a>
        <button className="btn btn-primary" type="button" onClick={() => setWearing(true)} disabled={wearing}>
          오늘 입어볼게요
        </button>
      </div>

      {wearing && (
        <p className="closing" role="status">
          좋은 하루 보내세요. 내일은 또 다른 색으로 찾아오겠습니다.
        </p>
      )}

      <Link href="/" className="back-link">
        다른 별자리 보기
      </Link>
    </div>
  );
}
