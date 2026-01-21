const PALETTE = [
  { name: "red", hex: "#FFACAC" },
  { name: "green", hex: "#D8E9AB" },
  { name: "blue", hex: "#D3D2FF" },
  { name: "pink", hex: "#E1A7D9" },
  { name: "yellow", hex: "#FFE284" },
  { name: "cyan", hex: "#AAE6E5" },
  { name: "purple", hex: "#DAABF5" },
  { name: "orange", hex: "#FFB98E" },
];

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): RgbColor {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) throw new Error(`Invalid hex color: ${hex}`);

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  return { r, g, b };
}

function rgbDistance(a: RgbColor, b: RgbColor) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function closestColor(hex: string) {
  const rgb = hexToRgb(hex);
  let best = null;
  let bestDist = Infinity;
  for (const p of PALETTE) {
    const prgb = hexToRgb(p.hex);
    const dist = rgbDistance(rgb, prgb);

    if (dist < bestDist) {
      bestDist = dist;
      best = p.hex;
    }
  }
  return best;
}
