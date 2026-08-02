import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ImageCarouselProps {
  images: string[]
  alt: string
}

const AUTOPLAY_MS = 4000

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = images.length

  useEffect(() => {
    if (count <= 1 || paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [count, paused])

  if (count === 0) return null

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count)

  return (
    <div
      className="relative h-48 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -48 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-slate-100 opacity-0 transition-opacity hover:bg-black/60 focus:opacity-100 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-slate-100 opacity-0 transition-opacity hover:bg-black/60 focus:opacity-100 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? 'w-4 bg-primary-400'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
