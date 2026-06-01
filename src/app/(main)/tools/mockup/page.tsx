"use client";

import { useState, useRef, useCallback } from "react";

const frames = [
  { id: "iphone", label: "iPhone", w: 375, h: 812, radius: 44, bezel: 16 },
  { id: "android", label: "Android", w: 360, h: 780, radius: 24, bezel: 12 },
  { id: "laptop", label: "Laptop", w: 1280, h: 800, radius: 12, bezel: 24 },
  { id: "tablet", label: "Tablet", w: 820, h: 1180, radius: 20, bezel: 20 },
  { id: "browser", label: "Browser", w: 1280, h: 800, radius: 12, bezel: 0 },
];

const backgrounds = [
  { id: "dark", label: "Dark", color: "#080808" },
  { id: "gold", label: "Gold", color: "#C47A00" },
  { id: "teal", label: "Teal", color: "#00BFA6" },
  { id: "cream", label: "Cream", color: "#F2EDE4" },
  { id: "gradient", label: "Gradient", color: "gradient" },
];

export default function MockupPage() {
  const [image, setImage] = useState<string | null>(null);
  const [frame, setFrame] = useState("iphone");
  const [bg, setBg] = useState("dark");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  function generateMockup() {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = 1200;
    const ch = 900;
    canvas.width = cw;
    canvas.height = ch;

    const bgOption = backgrounds.find((b) => b.id === bg)!;
    if (bgOption.color === "gradient") {
      const grad = ctx.createLinearGradient(0, 0, cw, ch);
      grad.addColorStop(0, "#080808");
      grad.addColorStop(0.5, "#1a1a1a");
      grad.addColorStop(1, "#080808");
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bgOption.color;
    }
    ctx.fillRect(0, 0, cw, ch);

    const f = frames.find((fr) => fr.id === frame)!;
    const scale = Math.min(
      (cw * 0.6) / (f.w + f.bezel * 2),
      (ch * 0.75) / (f.h + f.bezel * 2)
    );
    const fw = (f.w + f.bezel * 2) * scale;
    const fh = (f.h + f.bezel * 2) * scale;
    const fx = (cw - fw) / 2;
    const fy = (ch - fh) / 2;

    ctx.fillStyle = "#1a1a1a";
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    const r = f.radius * scale;

    ctx.beginPath();
    ctx.roundRect(fx, fy, fw, fh, r);
    ctx.fill();
    ctx.stroke();

    if (frame === "browser") {
      const barH = 36 * scale;
      ctx.fillStyle = "#2a2a2a";
      ctx.beginPath();
      ctx.roundRect(fx, fy, fw, barH, [r, r, 0, 0]);
      ctx.fill();
      const dotY = fy + barH / 2;
      const dotR = 5 * scale;
      ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(fx + 20 * scale + i * 18 * scale, dotY, dotR, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    const img = new Image();
    img.onload = () => {
      const bz = f.bezel * scale;
      const barOffset = frame === "browser" ? 36 * scale : 0;
      const iw = fw - bz * 2;
      const ih = fh - bz * 2 - barOffset;
      const ix = fx + bz;
      const iy = fy + bz + barOffset;

      ctx.save();
      ctx.beginPath();
      const ir = Math.max(0, r - bz);
      ctx.roundRect(ix, iy, iw, ih, frame === "browser" ? 0 : ir);
      ctx.clip();
      ctx.drawImage(img, ix, iy, iw, ih);
      ctx.restore();

      ctx.fillStyle = bg === "cream" ? "rgba(0,0,0,0.3)" : "rgba(196,122,0,0.4)";
      ctx.font = `${14 * (cw / 1200)}px monospace`;
      ctx.textAlign = "right";
      ctx.fillText("lawrencenwuzor.com", cw - 30, ch - 20);

      setGenerated(true);
    };
    img.src = image;
  }

  function downloadMockup() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `mockup-${frame}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-4">
            Free Tool
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-warm-off-white mb-4">
            Mockup
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Upload a screenshot. Pick a device. Get a clean mockup.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-line rounded-xl p-8 text-center hover:border-solar-gold/30 transition-colors cursor-pointer"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="screenshot-upload"
              />
              <label htmlFor="screenshot-upload" className="cursor-pointer">
                {image ? (
                  <p className="text-electric-teal text-sm font-mono">
                    Image loaded ✓
                  </p>
                ) : (
                  <div>
                    <p className="text-mute text-sm mb-1">
                      Drop a screenshot or click to upload
                    </p>
                    <p className="text-mute/60 text-xs font-mono">
                      PNG, JPG, WebP
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                DEVICE FRAME
              </label>
              <div className="flex flex-wrap gap-2">
                {frames.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrame(f.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors ${
                      frame === f.id
                        ? "bg-solar-gold text-foundation"
                        : "bg-surface text-mute hover:text-warm-off-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                BACKGROUND
              </label>
              <div className="flex gap-2">
                {backgrounds.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBg(b.id)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      bg === b.id ? "border-solar-gold scale-110" : "border-line"
                    }`}
                    style={{
                      background:
                        b.color === "gradient"
                          ? "linear-gradient(135deg, #080808, #1a1a1a)"
                          : b.color,
                    }}
                    title={b.label}
                    aria-label={b.label}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={generateMockup}
              disabled={!image}
              className="w-full bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate Mockup
            </button>
            {generated && (
              <button
                onClick={downloadMockup}
                className="w-full border border-solar-gold/30 text-solar-gold font-display font-bold px-8 py-4 rounded-xl hover:bg-solar-gold/10 transition-colors"
              >
                Download PNG
              </button>
            )}
          </div>

          <div className="flex items-start justify-center">
            <canvas
              ref={canvasRef}
              className="w-full rounded-xl border border-line bg-surface/60"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
