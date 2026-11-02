// 결과 화면을 저장용 이미지(1080×1350, 인스타 세로 비율)로 그립니다.
// 브라우저 기본 기능(Canvas)만 사용합니다.
import type { DailyFashion } from "./fortune";

const W = 1080;
const H = 1350;
const C = {
  bg: "#fffbfc",
  text: "#563b35",
  muted: "#a7847e",
  line: "#f1d9dc",
  pink: "#f4afc5",
  pinkSoft: "#fff0f5",
  pinkDeep: "#d9849f",
};

// 페이지에서 쓰는 글꼴 이름을 그대로 가져옵니다.
function fontVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

// 4갈래 반짝이
function sparkle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(r * 0.12, -r * 0.12, r, 0);
  ctx.quadraticCurveTo(r * 0.12, r * 0.12, 0, r);
  ctx.quadraticCurveTo(-r * 0.12, r * 0.12, -r, 0);
  ctx.quadraticCurveTo(-r * 0.12, -r * 0.12, 0, -r);
  ctx.fill();
  ctx.restore();
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string, ring = 0) {
  if (ring) {
    ctx.beginPath();
    ctx.arc(x, y, r + ring, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// 한국어 문장을 띄어쓰기 기준으로 줄바꿈
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function makeResultImage(r: DailyFashion): Promise<Blob> {
  const ko = fontVar("--font-ko", "sans-serif");
  const en = fontVar("--font-playfair", "Georgia, serif");
  const script = fontVar("--font-pinyon", "cursive");
  const symbol = fontVar("--font-zodiac", "serif");

  // 글꼴이 다 준비된 뒤에 그립니다.
  await Promise.all([
    document.fonts.load(`400 40px ${script}`),
    document.fonts.load(`500 40px ${en}`),
    document.fonts.load(`700 40px ${ko}`, r.item.name + r.sign.name),
    document.fonts.load(`400 40px ${symbol}`, r.sign.symbol),
  ]).catch(() => undefined);
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  // 배경 + 얇은 테두리
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  // 머리말
  ctx.fillStyle = C.muted;
  ctx.font = `400 26px ${en}`;
  ctx.textAlign = "left";
  ctx.fillText("DAILY FASHION FORTUNE", 96, 128);
  ctx.textAlign = "right";
  ctx.fillText(r.dateLabel, W - 96, 128);

  // 필기체 제목
  ctx.textAlign = "center";
  ctx.fillStyle = C.text;
  ctx.font = `400 104px ${script}`;
  ctx.fillText("Today's Fashion Fortune", W / 2, 268);
  sparkle(ctx, 150, 190, 18, C.pink);
  sparkle(ctx, 940, 300, 13, "#cbbbe9");

  // 별자리
  ctx.font = `400 44px ${symbol}`;
  const signText = `${r.sign.name}`;
  ctx.font = `700 40px ${ko}`;
  const signWidth = ctx.measureText(signText).width;
  ctx.font = `400 44px ${symbol}`;
  const symWidth = ctx.measureText(r.sign.symbol).width;
  const total = symWidth + 16 + signWidth;
  const sx = W / 2 - total / 2;
  ctx.textAlign = "left";
  ctx.fillText(r.sign.symbol, sx, 356);
  ctx.font = `700 40px ${ko}`;
  ctx.fillText(signText, sx + symWidth + 16, 354);
  ctx.textAlign = "center";
  ctx.fillStyle = C.pinkDeep;
  ctx.font = `italic 400 30px ${en}`;
  ctx.fillText(r.theme.en, W / 2, 406);

  // 오늘의 컬러
  circle(ctx, 300, 590, 130, r.color.hex, 12);
  sparkle(ctx, 420, 712, 20, "#e9c76a");
  ctx.textAlign = "left";
  ctx.fillStyle = C.muted;
  ctx.font = `400 22px ${en}`;
  ctx.fillText("TODAY'S COLOR", 500, 526);
  ctx.fillStyle = C.text;
  ctx.font = `500 ${r.color.en.length > 9 ? 46 : 56}px ${en}`;
  ctx.fillText(r.color.en.toUpperCase(), 500, 592);
  ctx.fillStyle = C.muted;
  ctx.font = `400 26px ${ko}`;
  ctx.fillText(r.color.name, 500, 634);

  // 오늘의 아이템
  ctx.fillStyle = C.muted;
  ctx.font = `400 22px ${en}`;
  ctx.fillText("TODAY'S ITEM", 500, 722);
  ctx.fillStyle = C.text;
  ctx.font = `700 44px ${ko}`;
  ctx.fillText(r.item.name, 500, 780);
  const itemW = ctx.measureText(r.item.name).width;
  ctx.fillStyle = C.pinkDeep;
  ctx.font = `400 38px ${script}`;
  if (500 + itemW + 20 + ctx.measureText(r.item.en).width < W - 96) {
    ctx.fillText(r.item.en, 500 + itemW + 20, 778);
  }

  // 구분선
  ctx.strokeStyle = C.line;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(96, 860);
  ctx.lineTo(W - 96, 860);
  ctx.stroke();
  ctx.setLineDash([]);

  // 오늘의 별자리 이야기
  ctx.fillStyle = C.text;
  ctx.font = `400 32px ${ko}`;
  const lines = wrap(ctx, r.story, W - 192).slice(0, 5);
  lines.forEach((l, i) => ctx.fillText(l, 96, 922 + i * 50));
  let y = 922 + lines.length * 50 + 6;
  ctx.fillStyle = C.muted;
  ctx.font = `400 24px ${en}`;
  ctx.fillText(`☾ Moon in ${r.basis.moonSign.en}`, 96, y);

  // 함께 쓰기 좋은 컬러
  y = Math.max(y + 70, 1180);
  ctx.fillStyle = C.muted;
  ctx.font = `400 24px ${en}`;
  ctx.fillText("COLOR PALETTE", 96, y);
  r.pairColors.forEach((c, i) => {
    const cx = 380 + i * 170;
    circle(ctx, cx, y - 8, 26, c.hex);
    ctx.fillStyle = C.text;
    ctx.font = `400 24px ${ko}`;
    ctx.textAlign = "left";
    ctx.fillText(c.name, cx + 38, y);
  });

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("이미지를 만들 수 없습니다."))), "image/png"),
  );
}
