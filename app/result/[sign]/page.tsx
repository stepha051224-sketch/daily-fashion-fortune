// ②③ Reveal → Result 화면의 주소 (/result/aries 등)
import { notFound } from "next/navigation";
import { SIGNS, findSign } from "@/data/signs";
import ResultView from "./ResultView";

// 12개 별자리 주소를 미리 만들어 둡니다.
export function generateStaticParams() {
  return SIGNS.map((sign) => ({ sign: sign.id }));
}

export default async function ResultPage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  if (!findSign(sign)) notFound();
  return <ResultView signId={sign} />;
}
