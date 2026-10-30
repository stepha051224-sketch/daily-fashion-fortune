// ① Landing: 서비스 소개 + 별자리 선택
import Link from "next/link";
import { SIGNS } from "@/data/signs";
import { Bow, Sparkle, Star } from "./Stickers";

export default function LandingPage() {
  return (
    <>
      <header className="intro">
        <div className="topbar">
          <p className="eyebrow">
            Daily
            <br />
            Fashion
            <br />
            Fortune
          </p>
          <Star size={26} />
        </div>

        <div className="hero">
          <Sparkle size={16} className="deco" style={{ left: -4, top: 8 }} />
          <Bow size={70} className="deco" style={{ right: 4, top: -6, transform: "rotate(12deg)" }} />
          <h1 className="script-title">
            What&apos;s
            <br />
            <span className="indent">my style today?</span>
          </h1>
          <p className="hero-ko">오늘 입는 별자리</p>
          <Star size={22} className="deco" style={{ right: 20, bottom: 40 }} />
          <Sparkle size={14} className="deco" style={{ left: 22, bottom: 30 }} color="#d9c6ee" />
        </div>

        <p className="lead">
          매일 달라지는 별자리의 흐름을
          <br />
          오늘 입을 수 있는 색과 옷차림으로 전해드립니다 ✧
        </p>
      </header>

      <section aria-label="별자리 선택">
        <ul className="sign-grid">
          {SIGNS.map((sign) => (
            <li key={sign.id}>
              <Link href={`/result/${sign.id}`} className="sign-card">
                <span className="sign-symbol" aria-hidden="true">
                  {sign.symbol}
                </span>
                <span className="sign-name">{sign.name}</span>
                <span className="sign-period">{sign.period}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="footer-deco" aria-hidden="true">
        <Sparkle size={22} />
        <Star size={16} color="#c7a98f" />
        <Sparkle size={16} color="#cbbbe9" />
        <Sparkle size={20} />
      </div>
    </>
  );
}
