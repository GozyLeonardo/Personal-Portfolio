interface EmpireMapDirection {
  n: string;
  code: string;
  title: string;
  status: string;
  active: boolean;
}

interface EmpireMapProps {
  directions: EmpireMapDirection[];
  className?: string;
}

const POSITIONS = [
  { cx: 300, cy: 96 }, // top
  { cx: 504, cy: 300 }, // right
  { cx: 300, cy: 504 }, // bottom
  { cx: 96, cy: 300 }, // left
];

const LABEL_ANCHOR = ["middle", "start", "middle", "end"] as const;
const LABEL_DX = [0, 14, 0, -14] as const;

export function EmpireMap({ directions, className }: EmpireMapProps) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="The four directions of the empire radiating from a single line"
    >
      {/* Interlacing orbital rings */}
      <circle
        cx="300" cy="300" r="204"
        fill="none" stroke="var(--color-line)" strokeWidth="1"
      />
      <circle
        cx="300" cy="300" r="108"
        fill="none" stroke="var(--color-solar-gold)" strokeWidth="1" opacity="0.5"
      />

      {/* Radial connectors — the line that carries each direction */}
      {directions.map((d, i) => {
        const p = POSITIONS[i];
        return (
          <line
            key={`line-${d.n}`}
            x1="300" y1="300" x2={p.cx} y2={p.cy}
            stroke={d.active ? "var(--color-solar-gold)" : "var(--color-line)"}
            strokeWidth="1"
            strokeDasharray={d.active ? undefined : "3 5"}
          />
        );
      })}

      {/* Center — chi */}
      <circle cx="300" cy="300" r="44" fill="var(--color-foundation)" stroke="var(--color-solar-gold)" strokeWidth="1" />
      <circle cx="300" cy="300" r="4" fill="var(--color-solar-gold)" />
      <text
        x="300" y="296" textAnchor="middle"
        fill="var(--color-warm-off-white)"
        style={{ font: "600 13px var(--font-mono)", letterSpacing: "0.18em" }}
      >
        CHI
      </text>
      <text
        x="300" y="314" textAnchor="middle"
        fill="var(--color-mute)"
        style={{ font: "400 8px var(--font-mono)", letterSpacing: "0.14em" }}
      >
        ONE LINE
      </text>

      {/* Four direction nodes */}
      {directions.map((d, i) => {
        const p = POSITIONS[i];
        const anchor = LABEL_ANCHOR[i];
        const dx = LABEL_DX[i];
        return (
          <g key={d.n}>
            <circle
              cx={p.cx} cy={p.cy} r="16"
              fill="var(--color-foundation)"
              stroke={d.active ? "var(--color-solar-gold)" : "var(--color-electric-teal)"}
              strokeWidth="1.5"
            />
            <text
              x={p.cx} y={p.cy + 3}
              textAnchor="middle"
              fill={d.active ? "var(--color-solar-gold)" : "var(--color-electric-teal)"}
              style={{ font: "600 11px var(--font-mono)", letterSpacing: "0.1em" }}
            >
              {d.n}
            </text>
            <text
              x={p.cx + dx} y={p.cy - 26}
              textAnchor={anchor}
              fill="var(--color-warm-off-white)"
              style={{ font: "600 14px var(--font-display)" }}
            >
              {d.title}
            </text>
            <text
              x={p.cx + dx} y={p.cy - 8}
              textAnchor={anchor}
              fill="var(--color-mute)"
              style={{ font: "400 9px var(--font-mono)", letterSpacing: "0.16em" }}
            >
              {d.code} · {d.status.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
