// ① Landing: 서비스 소개 + 별자리 선택
import Link from "next/link";
import { SIGNS } from "@/data/signs";

export default function LandingPage() {
  return (
    <>
      <header className="intro">
        <p className="eyebrow">Daily Fashion Fortune</p>
        <h1>오늘 입는 별자리</h1>
        <p className="lead">
          매일 달라지는 별자리의 흐름을
          <br />
          오늘 입을 수 있는 색과 옷차림으로 전해드립니다.
        </p>
        <p className="sub">가지고 있는 옷 중에서 오늘 무엇을 입을지 고르는 데 참고해보세요.</p>
      </header>

      <section>
        <h2 className="section-title">별자리를 선택해주세요</h2>
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
    </>
  );
}
