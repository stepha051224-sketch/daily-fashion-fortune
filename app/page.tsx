// ① Landing: 서비스 소개 + 별자리 선택
import SignGrid from "./SignGrid";
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
          <Sparkle size={14} color="#F4AFC5" style={{ marginTop: 18, marginRight: 30 }} />
        </div>

        <div className="hero">
          {/* 장식은 리본 1개 + 반짝이 몇 개만 */}
          <Bow size={62} className="deco hero-bow" />
          <h1 className="script-title hero-title">
            <span className="line">What&apos;s</span>
            <span className="line indent">my style today?</span>
          </h1>
          <Sparkle size={11} color="#cbbbe9" className="deco" style={{ left: 6, top: "48%" }} />
          <p className="hero-ko">오늘 입는 별자리</p>
          <Star size={15} color="#c9a99a" className="deco" style={{ right: 18, bottom: 6 }} />
        </div>

        <p className="lead">
          매일 달라지는 별자리의 흐름을
          <br />
          오늘 입을 수 있는 색과 옷차림으로 전해드립니다.
        </p>
      </header>

      <section aria-labelledby="select-sign">
        <h2 id="select-sign" className="section-label">
          Select your sign
        </h2>
        <SignGrid />
      </section>
    </>
  );
}
