/**
 * Illustrative, generated villa floor plan (used when no plan image is
 * supplied in config). Purely decorative representation — not to scale.
 */

const ROW_A = { y: 60, h: 170 }
const ROW_B = { y: 230, h: 50 }
const ROW_C = { y: 280, h: 140 }

const LAYOUTS = {
  3: {
    width: 620,
    pool: false,
    rooms: [
      { x: 80, w: 260, row: 'A', label: 'Living & Dining', kind: 'living' },
      { x: 340, w: 140, row: 'A', label: 'Kitchen', kind: 'kitchen' },
      { x: 480, w: 140, row: 'A', label: "Maid's Room", kind: 'small' },
      { x: 80, w: 540, row: 'B', label: 'Hallway', kind: 'hall' },
      { x: 80, w: 160, row: 'C', label: 'Bedroom 2', kind: 'bed' },
      { x: 240, w: 60, row: 'C', label: 'Bath', kind: 'bath' },
      { x: 300, w: 150, row: 'C', label: 'Bedroom 3', kind: 'bed' },
      { x: 450, w: 170, row: 'C', label: 'Master Suite', kind: 'bed' },
    ],
  },
  4: {
    width: 640,
    pool: true,
    rooms: [
      { x: 80, w: 210, row: 'A', label: 'Living Room', kind: 'living' },
      { x: 290, w: 130, row: 'A', label: 'Dining', kind: 'dining' },
      { x: 420, w: 110, row: 'A', label: 'Kitchen', kind: 'kitchen' },
      { x: 530, w: 110, row: 'A', label: "Maid's", kind: 'small' },
      { x: 80, w: 560, row: 'B', label: 'Hallway', kind: 'hall' },
      { x: 80, w: 130, row: 'C', label: 'Bedroom 2', kind: 'bed' },
      { x: 210, w: 55, row: 'C', label: 'Bath', kind: 'bath' },
      { x: 265, w: 125, row: 'C', label: 'Bedroom 3', kind: 'bed' },
      { x: 390, w: 115, row: 'C', label: 'Bedroom 4', kind: 'bed' },
      { x: 505, w: 135, row: 'C', label: 'Master Suite', kind: 'bed' },
    ],
  },
  5: {
    width: 660,
    pool: true,
    rooms: [
      { x: 80, w: 130, row: 'A', label: 'Majlis', kind: 'living' },
      { x: 210, w: 170, row: 'A', label: 'Living Room', kind: 'living' },
      { x: 380, w: 110, row: 'A', label: 'Dining', kind: 'dining' },
      { x: 490, w: 90, row: 'A', label: 'Kitchen', kind: 'kitchen' },
      { x: 580, w: 80, row: 'A', label: "Maid's", kind: 'small' },
      { x: 80, w: 580, row: 'B', label: 'Hallway', kind: 'hall' },
      { x: 80, w: 105, row: 'C', label: 'Bedroom 2', kind: 'bed' },
      { x: 185, w: 105, row: 'C', label: 'Bedroom 3', kind: 'bed' },
      { x: 290, w: 50, row: 'C', label: 'Bath', kind: 'bath' },
      { x: 340, w: 105, row: 'C', label: 'Bedroom 4', kind: 'bed' },
      { x: 445, w: 100, row: 'C', label: 'Bedroom 5', kind: 'bed' },
      { x: 545, w: 115, row: 'C', label: 'Master Suite', kind: 'bed' },
    ],
  },
}

const ROWS = { A: ROW_A, B: ROW_B, C: ROW_C }

function Furniture({ kind, x, y, w, h }) {
  const cx = x + w / 2
  const cy = y + h / 2
  const stroke = '#9C8A6A'
  if (kind === 'bed') {
    const bw = Math.min(56, w - 30)
    const bh = Math.min(64, h - 50)
    const bx = cx - bw / 2
    const by = y + 14
    return (
      <g stroke={stroke} strokeWidth="1" fill="#fff">
        <rect x={bx} y={by} width={bw} height={bh} rx="4" />
        <rect x={bx + 5} y={by + 5} width={bw / 2 - 7} height="12" rx="3" fill="#EFE6D4" />
        <rect x={cx + 2} y={by + 5} width={bw / 2 - 7} height="12" rx="3" fill="#EFE6D4" />
      </g>
    )
  }
  if (kind === 'living') {
    const sw = Math.min(120, w - 40)
    return (
      <g stroke={stroke} strokeWidth="1" fill="#fff">
        <path d={`M${cx - sw / 2} ${y + 22} h${sw} v16 h-${sw - 18} v40 h-18 z`} />
        <rect x={cx - 22} y={y + 58} width="44" height="28" rx="4" fill="#EFE6D4" />
      </g>
    )
  }
  if (kind === 'dining') {
    return (
      <g stroke={stroke} strokeWidth="1" fill="#fff">
        <rect x={cx - 26} y={cy - 32} width="52" height="44" rx="5" fill="#EFE6D4" />
        {[-16, 0, 16].map((d) => (
          <g key={d}>
            <circle cx={cx + d} cy={cy - 40} r="5" />
            <circle cx={cx + d} cy={cy + 20} r="5" />
          </g>
        ))}
      </g>
    )
  }
  if (kind === 'kitchen') {
    return (
      <g stroke={stroke} strokeWidth="1" fill="#fff">
        <rect x={x + 8} y={y + 8} width={w - 16} height="16" />
        <rect x={cx - 24} y={cy - 18} width="48" height="22" rx="3" fill="#EFE6D4" />
      </g>
    )
  }
  if (kind === 'bath') {
    return <rect x={cx - 12} y={y + 12} width="24" height="42" rx="10" fill="#fff" stroke={stroke} strokeWidth="1" />
  }
  return null
}

export default function FloorPlanDiagram({ variant = 3, title }) {
  const layout = LAYOUTS[variant] ?? LAYOUTS[3]
  const poolX = layout.width + 28
  const vbWidth = layout.pool ? poolX + 140 : layout.width + 80

  const shrubs = []
  for (let x = 30; x < vbWidth - 24; x += 46) {
    shrubs.push([x, 26])
    if (x + 20 < vbWidth - 20) shrubs.push([x + 20, 456])
  }
  for (let y = 70; y < 440; y += 52) shrubs.push([30, y])

  return (
    <svg viewBox={`0 0 ${vbWidth} 480`} className="h-auto w-full" role="img" aria-label={`${title} illustrative floor plan`}>
      {/* Garden plot */}
      <rect x="6" y="6" width={vbWidth - 12} height="468" rx="18" fill="#E3EBD9" />
      <rect x="6" y="6" width={vbWidth - 12} height="468" rx="18" fill="none" stroke="#C9D8B8" strokeWidth="2" />
      {shrubs.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#9DBB84" />
          <circle cx={x - 4} cy={y - 3} r="6" fill="#B6CF9F" />
        </g>
      ))}

      {/* Pool & deck */}
      {layout.pool && (
        <g>
          <rect x={poolX - 10} y="80" width="128" height="330" rx="10" fill="#EFE6D4" stroke="#D8C9A8" />
          <rect x={poolX} y="96" width="108" height="298" rx="8" fill="#7FC4DB" />
          <rect x={poolX + 8} y="104" width="92" height="282" rx="6" fill="#A6DAEA" />
          <text x={poolX + 54} y="250" textAnchor="middle" className="fill-navy-800" fontSize="13" fontWeight="600" fontFamily="Manrope, sans-serif">
            Private Pool
          </text>
        </g>
      )}

      {/* House footprint */}
      <rect x="80" y="60" width={layout.width - 80} height="360" fill="#FAF6EE" />

      {layout.rooms.map((r) => {
        const row = ROWS[r.row]
        const isHall = r.kind === 'hall'
        return (
          <g key={r.label + r.x}>
            <rect x={r.x} y={row.y} width={r.w} height={row.h} fill={isHall ? '#F1E8D9' : '#FAF6EE'} stroke="#12274A" strokeWidth="3" />
            {!isHall && <Furniture kind={r.kind} x={r.x} y={row.y} w={r.w} h={row.h} />}
            <text
              x={r.x + r.w / 2}
              y={isHall ? row.y + row.h / 2 + 4 : row.y + row.h - 16}
              textAnchor="middle"
              fontSize={r.w < 70 ? 10 : 12}
              fontWeight="600"
              fontFamily="Manrope, sans-serif"
              letterSpacing={isHall ? '3' : '0.3'}
              fill={isHall ? '#94733A' : '#12274A'}
            >
              {isHall ? r.label.toUpperCase() : r.label}
            </text>
          </g>
        )
      })}

      {/* Entrance marker */}
      <g>
        <rect x="56" y="236" width="24" height="38" fill="#FAF6EE" />
        <path d="M40 255 h22 m-7 -7 l7 7 l-7 7" stroke="#B08D46" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="80" y="60" width={layout.width - 80} height="360" fill="none" stroke="#0B1B33" strokeWidth="6" />
      <rect x="77" y="236" width="6" height="38" fill="#FAF6EE" />
    </svg>
  )
}
