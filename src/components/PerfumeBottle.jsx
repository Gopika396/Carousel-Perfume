import { useState } from 'react'

export default function PerfumeBottle({ perfume }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="bottle" style={{ '--s': perfume.scale }}>
      {failed ? (
        <div className="bottle-fallback" role="img" aria-label={perfume.collection}>
          <span>{perfume.collection}</span>
        </div>
      ) : (
        <img
          src={perfume.image}
          alt={`${perfume.collection} perfume bottle`}
          draggable="false"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}