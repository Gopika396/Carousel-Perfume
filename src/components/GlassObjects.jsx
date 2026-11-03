// x %, y %, size, blob shape, in front of bottle
const ORBS = [
  [18, 12, 3.2, 0, 0], [70, 8, 2.4, 0, 0], [82, 22, 4.0, 1, 1], [8, 30, 3.6, 1, 0],
  [90, 46, 2.0, 0, 1], [6, 58, 2.6, 0, 1], [76, 66, 4.4, 0, 1], [22, 76, 1.6, 0, 0],
  [60, 84, 3.0, 1, 1], [36, 5, 1.2, 0, 0], [93, 80, 2.2, 0, 0], [14, 88, 2.8, 0, 0],
]

export default function GlassObjects({ index }) {
  return (
    <div className="orbs" aria-hidden="true">
      {ORBS.map(([x, y, s, blob, front], i) => (
        <span
          key={i}
          className={`orb${blob ? ' blob' : ''}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            zIndex: front ? 3 : 1,
            '--s': s,
            '--dx': `${Math.round(Math.sin(index * 1.9 + i * 1.3) * 22)}px`,
            '--dy': `${Math.round(Math.cos(index * 1.5 + i * 0.9) * 20)}px`,
          }}
        >
          <i
            style={{
              '--dur': `${6 + (i % 5) * 1.3}s`,
              '--delay': `${-i * 0.9}s`,
              '--fx': `${(i % 2 ? 1 : -1) * (8 + (i % 4) * 4)}px`,
              '--fy': `${(i % 3 ? -1 : 1) * (10 + (i % 3) * 5)}px`,
            }}
          />
        </span>
      ))}
    </div>
  )
}