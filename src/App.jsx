import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import perfumes from './data/perfumes'
import GlassObjects from './components/GlassObjects'
import PerfumeBottle from './components/PerfumeBottle'
import CarouselControls from './components/CarouselControls'
import './assets/style/style.css'

const ease = [0.22, 1, 0.36, 1]
const easeIn = [0.64, 0, 0.78, 0]

// dir = 1  : current slide leaves downward, next slide drops in from the top
// dir = -1 : the reverse
const bottleV = {
  enter: (d) => ({ y: `${-120 * d}%`, rotate: -6 * d, scale: 0.9, opacity: 0 }),
  center: { y: 0, rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.9, ease } },
  exit: (d) => ({ y: `${120 * d}%`, rotate: 6 * d, scale: 0.9, opacity: 0, transition: { duration: 0.7, ease: easeIn } }),
}
const textV = {
  enter: (d) => ({ y: `${-45 * d}%`, opacity: 0 }),
  center: { y: 0, opacity: 1, transition: { duration: 0.8, ease } },
  exit: (d) => ({ y: `${45 * d}%`, opacity: 0, transition: { duration: 0.55, ease: easeIn } }),
}

function Swap({ id, dir, variants, className, itemClass, children }) {
  return (
    <div className={`swap ${className || ''}`}>
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={id}
          className={itemClass}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [[index, dir], setState] = useState([0, 1])
  const lock = useRef(false)
  const touch = useRef(null)
  const p = perfumes[index]
  const t = p.theme

  const go = useCallback(
    (to, d) => {
      const n = (to + perfumes.length) % perfumes.length
      if (lock.current || n === index) return
      lock.current = true
      setTimeout(() => { lock.current = false }, 750)
      setState([n, d])
    },
    [index]
  )
  const next = () => go(index + 1, 1)
  const prev = () => go(index - 1, -1)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(index + 1, 1)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(index - 1, -1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  const onTouchStart = (e) => { touch.current = [e.touches[0].clientX, e.touches[0].clientY] }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current[0]
    const dy = e.changedTouches[0].clientY - touch.current[1]
    touch.current = null
    const v = Math.abs(dy) >= Math.abs(dx) ? dy : dx
    if (Math.abs(v) < 50) return
    v < 0 ? next() : prev()
  }

  return (
    <main className="app" style={{ '--ink': t.ink, '--tint': t.tint, '--deep': t.deep }}>
      <div className="bgs" aria-hidden="true">
        {perfumes.map((x, k) => (
          <div
            key={x.id}
            className={`bg${k === index ? ' on' : ''}`}
            style={{
              background: `radial-gradient(ellipse 46% 62% at 50% 54%, ${x.theme.glow}, transparent 72%), linear-gradient(160deg, ${x.theme.base}, ${x.theme.deep})`,
            }}
          />
        ))}
      </div>

      <header className="brand">
        <h2>SIGNATURE SCENTS</h2>
        <p>Find your scent. Leave your signature.</p>
      </header>

      <section className="left">
        <Swap id={p.id} dir={dir} variants={textV} itemClass="slide-text">
          <h1>{p.collection}</h1>
          <p>{p.blurb}</p>
          <span className="rule" />
        </Swap>
      </section>

      <section className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <GlassObjects index={index} />
        <div className="pedestal">
          <span className="floor" />
          <Swap id={p.id} dir={dir} variants={bottleV} className="bottle-swap">
            <PerfumeBottle perfume={p} />
          </Swap>
        </div>
      </section>

      <aside className="right">
        <Swap id={p.id} dir={dir} variants={textV} itemClass="slide-text">
          <h2>{p.name}</h2>
          <p>{p.notes}</p>
        </Swap>
        <div className="dots" role="tablist" aria-label="Choose a perfume">
          {perfumes.map((x, k) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={k === index}
              aria-label={x.collection}
              className={`dot${k === index ? ' on' : ''}`}
              style={{ '--c': x.theme.swatch }}
              onClick={() => go(k, k > index ? 1 : -1)}
            />
          ))}
        </div>
        <button className="pill">Discover</button>
      </aside>

      <footer className="bottom">
        <Swap id={p.id} dir={dir} variants={textV} className="price-swap">
          <span className="price">{p.price}</span>
        </Swap>
        <CarouselControls index={index} total={perfumes.length} onPrev={prev} onNext={next} />
      </footer>
    </main>
  )
}