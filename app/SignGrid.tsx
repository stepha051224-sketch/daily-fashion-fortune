"use client";

// 별자리 카드 12개
// 카드를 누르면 잠깐(0.18초) 선택된 모습을 보여준 뒤 결과 페이지로 이동합니다.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { SIGNS } from "@/data/signs";
import { Sparkle } from "./Stickers";

const SELECT_DELAY_MS = 180;

export default function SignGrid() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    // 새 탭 열기(⌘/Ctrl 클릭)는 원래대로 동작하게 둡니다.
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setSelectedId(id);
    setTimeout(() => router.push(`/result/${id}`), SELECT_DELAY_MS);
  }

  return (
    <ul className="sign-grid">
      {SIGNS.map((sign) => {
        const selected = sign.id === selectedId;
        return (
          <li key={sign.id}>
            <Link
              href={`/result/${sign.id}`}
              className={selected ? "sign-card is-selected" : "sign-card"}
              aria-current={selected ? "true" : undefined}
              onClick={(e) => handleClick(e, sign.id)}
            >
              {selected && <Sparkle size={12} color="#F4AFC5" className="card-sparkle" />}
              <span className="sign-symbol" aria-hidden="true">
                {sign.symbol}
              </span>
              <span className="sign-name">{sign.name}</span>
              <span className="sign-period">{sign.period}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
