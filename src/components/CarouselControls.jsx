import { ChevronUp, ChevronDown } from 'lucide-react'

const pad = (n) => String(n + 1).padStart(2, '0')

export default function CarouselControls({ index, total, onPrev, onNext }) {
  return (
    <div className="controls">
      <button className="arrow" onClick={onPrev} aria-label="Previous perfume">
        <ChevronUp size={20} strokeWidth={1.5} />
      </button>
      <span className="count">{pad(index)} / {pad(total - 1)}</span>
      <button className="arrow" onClick={onNext} aria-label="Next perfume">
        <ChevronDown size={20} strokeWidth={1.5} />
      </button>
    </div>
  )
}