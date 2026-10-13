import type { CSSProperties } from 'react'
import type { SeasonStage } from '@/lib/portal'

type Props = {
  stage: SeasonStage
  category?: 'crop' | 'livestock'
  className?: string
}

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

function Plant({ x, y, size = 1, fruit, fruitColors = ['#dc2626', '#f59e0b'], swayDelay = 0 }: {
  x: number
  y: number
  size?: number
  fruit?: boolean
  fruitColors?: string[]
  swayDelay?: number
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <g className="s8-sway" style={delay(swayDelay)}>
        <path d="M0 0 C 1 -14, -1 -26, 0 -40" stroke="#3f7d3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M0 -12 C -10 -14, -16 -22, -16 -26 C -8 -26, -2 -20, 0 -14Z" fill="#4caf50" />
        <path d="M0 -20 C 10 -22, 16 -30, 17 -34 C 8 -34, 2 -28, 0 -22Z" fill="#43a047" />
        <path d="M0 -30 C -8 -32, -12 -38, -12 -42 C -5 -42, -1 -37, 0 -33Z" fill="#66bb6a" />
        <path d="M0 -38 C 5 -42, 6 -47, 5 -50 C 1 -48, -1 -44, 0 -40Z" fill="#81c784" />
        {fruit && (
          <>
            <ellipse className="s8-pop" style={delay(0.2)} cx="-9" cy="-17" rx="3.4" ry="4.6" fill={fruitColors[0]} />
            <ellipse className="s8-pop" style={delay(0.8)} cx="10" cy="-26" rx="3.4" ry="4.6" fill={fruitColors[1] ?? fruitColors[0]} />
            <ellipse className="s8-pop" style={delay(1.3)} cx="-6" cy="-35" rx="3" ry="4" fill={fruitColors[0]} />
          </>
        )}
      </g>
    </g>
  )
}

function Sprout({ x, y, d = 0 }: { x: number; y: number; d?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="s8-grow" style={delay(d)}>
        <path d="M0 0 L0 -16" stroke="#3f7d3a" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 -12 C -7 -13, -10 -18, -10 -21 C -4 -21, -1 -17, 0 -14Z" fill="#66bb6a" />
        <path d="M0 -14 C 7 -15, 10 -20, 10 -23 C 4 -23, 1 -19, 0 -16Z" fill="#4caf50" />
      </g>
      <ellipse cx="0" cy="1" rx="3" ry="2" fill="#8d6e4a" />
    </g>
  )
}

function Ground({ color = '#7a5432' }: { color?: string }) {
  return (
    <>
      <rect x="0" y="118" width="240" height="32" fill={color} />
      <rect x="0" y="116" width="240" height="5" fill="#6aa84f" opacity="0.85" />
    </>
  )
}

function Greenhouse() {
  return (
    <g>
      <path d="M30 118 L30 70 Q120 18 210 70 L210 118" fill="#e0f2f1" fillOpacity="0.45" stroke="#90a4ae" strokeWidth="2" />
      <path d="M75 118 L75 50 M120 118 L120 42 M165 118 L165 50" stroke="#b0bec5" strokeWidth="1" />
      <path d="M30 88 Q120 40 210 88" stroke="#b0bec5" strokeWidth="1" fill="none" />
    </g>
  )
}

function Scene({ stage, category }: { stage: SeasonStage; category: 'crop' | 'livestock' }) {
  switch (stage) {
    case 'awaiting_start':
      return (
        <>
          <Ground />
          <g className="s8-bob">
            <rect x="96" y="66" width="48" height="52" rx="5" fill="#f5f0e1" stroke="#c8b98f" strokeWidth="2" />
            <rect x="96" y="66" width="48" height="12" rx="5" fill="#2e7d32" />
            <text x="120" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2e7d32">S8</text>
            <text x="120" y="110" textAnchor="middle" fontSize="6" fill="#6d5d3a">SEEDS</text>
          </g>
          <circle className="s8-pulse-ring" cx="178" cy="78" r="12" fill="none" stroke="#2e7d32" strokeWidth="2" />
          <circle cx="178" cy="78" r="10" fill="#fff" stroke="#2e7d32" strokeWidth="2" />
          <path d="M178 71 L178 78 L183 81" stroke="#2e7d32" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )
    case 'nursery':
      return (
        <>
          <Ground color="#8d6e4a" />
          <rect x="40" y="104" width="160" height="16" rx="3" fill="#37474f" />
          {[60, 100, 140, 180].map((x, i) => (
            <g key={x}>
              <rect x={x - 14} y="100" width="28" height="8" rx="2" fill="#5d4037" />
              <Sprout x={x} y={101} d={i * 0.45} />
            </g>
          ))}
          {[70, 120, 170].map((x, i) => (
            <path key={x} className="s8-drip" style={delay(i * 0.5)} d={`M${x} 52 q -3 5 0 8 q 3 -3 0 -8Z`} fill="#4fc3f7" />
          ))}
        </>
      )
    case 'transplanted':
      return (
        <>
          <Ground />
          <Greenhouse />
          <Plant x={80} y={118} size={0.7} swayDelay={0} />
          <Plant x={120} y={118} size={0.8} swayDelay={0.4} />
          <Plant x={160} y={118} size={0.7} swayDelay={0.8} />
        </>
      )
    case 'planted':
      return (
        <>
          <Ground />
          {[0, 1, 2].map((row) =>
            [40, 80, 120, 160, 200].map((x, i) => (
              <Sprout key={`${row}-${x}`} x={x + row * 6 - 6} y={120 + row * 10} d={(i + row) * 0.3} />
            )),
          )}
        </>
      )
    case 'growing':
      if (category === 'livestock') {
        return (
          <>
            <Ground color="#7cb342" />
            <path d="M150 118 L150 74 L180 56 L210 74 L210 118Z" fill="#b71c1c" />
            <rect x="170" y="90" width="20" height="28" fill="#5d4037" />
            <g className="s8-bob">
              <ellipse cx="90" cy="96" rx="24" ry="13" fill="#f5f5f5" stroke="#9e9e9e" />
              <circle cx="64" cy="86" r="8" fill="#f5f5f5" stroke="#9e9e9e" />
              <path d="M60 79 L56 70 M66 78 L68 69" stroke="#795548" strokeWidth="2" strokeLinecap="round" />
              <circle cx="62" cy="86" r="1.2" fill="#333" />
              {[74, 84, 98, 108].map((x) => (
                <rect key={x} x={x} y="106" width="3.5" height="12" fill="#9e9e9e" />
              ))}
            </g>
          </>
        )
      }
      return (
        <>
          <Ground />
          <Plant x={70} y={118} size={1.05} />
          <Plant x={120} y={118} size={1.2} swayDelay={0.5} />
          <Plant x={170} y={118} size={1.05} swayDelay={1} />
        </>
      )
    case 'harvesting':
      return (
        <>
          <Ground />
          <Plant x={60} y={118} size={1.1} fruit />
          <Plant x={110} y={118} size={1.2} fruit fruitColors={['#f59e0b', '#dc2626']} swayDelay={0.6} />
          <g>
            <rect x="150" y="96" width="56" height="22" rx="3" fill="#a1887f" stroke="#6d4c41" strokeWidth="2" />
            <path d="M150 104 H206 M150 111 H206" stroke="#6d4c41" strokeWidth="1" />
            {[160, 172, 184, 196].map((x, i) => (
              <circle key={x} className="s8-pop" style={delay(i * 0.35)} cx={x} cy="93" r="5" fill={i % 2 ? '#f59e0b' : '#dc2626'} />
            ))}
          </g>
        </>
      )
    case 'route_to_market':
      return (
        <>
          <rect x="0" y="116" width="240" height="34" fill="#546e7a" />
          <path d="M0 133 H240" stroke="#eceff1" strokeWidth="2" strokeDasharray="12 10" />
          <g className="s8-drive">
            <rect x="0" y="82" width="70" height="34" rx="3" fill="#2e7d32" />
            <text x="35" y="104" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">STEADERS8</text>
            <path d="M70 92 H88 L98 104 V116 H70Z" fill="#388e3c" />
            <rect x="76" y="95" width="12" height="9" fill="#b3e5fc" />
            <circle cx="18" cy="118" r="7" fill="#263238" />
            <circle cx="82" cy="118" r="7" fill="#263238" />
            <circle cx="18" cy="118" r="2.5" fill="#cfd8dc" />
            <circle cx="82" cy="118" r="2.5" fill="#cfd8dc" />
          </g>
        </>
      )
    case 'sold':
      return (
        <>
          <Ground color="#8d6e63" />
          <rect x="50" y="78" width="100" height="40" fill="#fff8e1" stroke="#bcaaa4" strokeWidth="2" />
          <path d="M44 78 L56 58 H144 L156 78Z" fill="#e53935" />
          <path d="M66 58 L62 78 M86 58 L84 78 M106 58 L106 78 M126 58 L128 78" stroke="#fff" strokeWidth="5" />
          {[66, 86, 106, 126].map((x, i) => (
            <circle key={x} cx={x + 4} cy="100" r="6" fill={i % 2 ? '#f59e0b' : '#dc2626'} />
          ))}
          <g className="s8-pop">
            <circle cx="190" cy="78" r="22" fill="#fbc02d" stroke="#f57f17" strokeWidth="3" />
            <text x="190" y="86" textAnchor="middle" fontSize="22" fontWeight="800" fill="#7a4f01">₦</text>
          </g>
        </>
      )
    case 'paid_out':
      return (
        <>
          <Ground color="#8d6e63" />
          <rect x="80" y="76" width="80" height="42" rx="8" fill="#2e7d32" />
          <rect x="132" y="88" width="28" height="18" rx="5" fill="#1b5e20" />
          <circle cx="146" cy="97" r="3.5" fill="#a5d6a7" />
          {[100, 120, 140].map((x, i) => (
            <g key={x} className="s8-float" style={delay(i * 0.7)}>
              <circle cx={x} cy="66" r="9" fill="#fbc02d" stroke="#f57f17" strokeWidth="2" />
              <text x={x} y="70" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7a4f01">₦</text>
            </g>
          ))}
        </>
      )
    case 'completed':
      return (
        <>
          <Ground />
          <circle className="s8-pulse-ring" cx="120" cy="72" r="26" fill="none" stroke="#2e7d32" strokeWidth="3" />
          <circle cx="120" cy="72" r="26" fill="#2e7d32" />
          <path d="M108 72 L117 81 L134 63" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[
            [60, 50, '#f59e0b'],
            [180, 44, '#dc2626'],
            [70, 92, '#4caf50'],
            [176, 96, '#29b6f6'],
          ].map(([x, y, c], i) => (
            <rect key={i} className="s8-float" style={delay(i * 0.5)} x={x as number} y={y as number} width="6" height="6" rx="1" fill={c as string} />
          ))}
        </>
      )
  }
}

export function GrowthStageAnimation({ stage, category = 'crop', className }: Props) {
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMax meet" className={className} role="img" aria-label={`Current stage: ${stage.replace(/_/g, ' ')}`}>
      <defs>
        <linearGradient id="s8-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e3f4ea" />
          <stop offset="100%" stopColor="#f7fbf4" />
        </linearGradient>
      </defs>
      <rect width="240" height="150" fill="url(#s8-sky)" />
      <g className="s8-spin-slow">
        <circle cx="212" cy="26" r="11" fill="#fdd835" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          return (
            <line
              key={i}
              x1={212 + Math.cos(a) * 15}
              y1={26 + Math.sin(a) * 15}
              x2={212 + Math.cos(a) * 20}
              y2={26 + Math.sin(a) * 20}
              stroke="#fdd835"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )
        })}
      </g>
      <Scene stage={stage} category={category} />
    </svg>
  )
}
