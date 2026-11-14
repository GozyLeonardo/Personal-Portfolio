interface EmpireMapDirection {
  n: string;
  code: string;
  label: string;
  active: boolean;
}

interface EmpireMapProps {
  directions: EmpireMapDirection[];
  className?: string;
}

const CENTER = { x: 320, y: 320 };
const NODE_RADIUS = 210;
const NODE_R = 22;

const NODES = [
  { cx: 320, cy: 110 }, // top
  { cx: 530, cy: 320 }, // right
  { cx: 320, cy: 530 }, // bottom
  { cx: 110, cy: 320 }, // left
];

const TITLE_ANCHOR = ["middle", "start", "middle", "end"] as const;
const TITLE_DX = [0, 28, 0, -28] as const;
const TITLE_DY = [-44, -10, 44, -10] as const;

const CODE_ANCHOR = ["middle", "start", "middle", "end"] as const;
const CODE_DX = [0, 28, 0, -28] as const;
const CODE_DY = [-28, 6, 28, 6] as const;

export function EmpireMap({ directions, className }: EmpireMapProps) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={className}
      role="img"
      aria-label="The four directions of the empire radiating from a single line"
    >
      {/* Interlacing orbital rings */}
      <circle
        cx={CENTER.x} cy={CENTER.y} r={NODE_RADIUS}
        fill="none" stroke="var(--color-line)" strokeWidth="1"
      />
      <circle
        cx={CENTER.x} cy={CENTER.y} r={104}
        fill="none" stroke="var(--color-solar-gold)" strokeWidth="1" opacity="0.5"
      />

      {/* Radial connectors — the line that carries each direction */}
      {directions.map((d, i) => {
        const node = NODES[i];
        return (
          <line
            key={`line-${d.n}`}
            x1={CENTER.x} y1={CENTER.y} x2={node.cx} y2={node.cy}
            stroke={d.active ? "var(--color-solar-gold)" : "var(--color-line)"}
            strokeWidth="1"
            strokeDasharray={d.active ? undefined : "3 5"}
          />
        );
      })}

      {/* Center — chi */}
      <circle
        cx={CENTER.x} cy={CENTER.y} r={48}
        fill="var(--color-foundation)" stroke="var(--color-solar-gold)" strokeWidth="1"
      />
      <circle cx={CENTER.x} cy={CENTER.y} r={4} fill="var(--color-solar-gold)" />
      <text
        x={CENTER.x} y={CENTER.y - 2} textAnchor="middle"
        fill="var(--color-warm-off-white)"
        style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em" }}
      >
        CHI
      </text>
      <text
        x={CENTER.x} y={CENTER.y + 16} textAnchor="middle"
        fill="var(--color-mute)"
        style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em" }}
      >
        ONE LINE
      </text>

      {/* Four direction nodes */}
      {directions.map((d, i) => {
        const node = NODES[i];
        const color = d.active
          ? "var(--color-solar-gold)"
          : "var(--color-electric-teal)";
        return (
          <g key={d.n}>
            <circle
              cx={node.cx} cy={node.cy} r={NODE_R}
              fill="var(--color-foundation)" stroke={color} strokeWidth="1.5"
            />
            <text
              x={node.cx} y={node.cy + 4}
              textAnchor="middle"
              fill={color}
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em" }}
            >
              {d.n}
            </text>
            <text
              x={node.cx + TITLE_DX[i]} y={node.cy + TITLE_DY[i]}
              textAnchor={TITLE_ANCHOR[i]}
              fill="var(--color-warm-off-white)"
              style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700 }}
            >
              {d.label}
            </text>
            <text
              x={node.cx + CODE_DX[i]} y={node.cy + CODE_DY[i]}
              textAnchor={CODE_ANCHOR[i]}
              fill="var(--color-mute)"
              style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em" }}
            >
              {d.code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
