import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { TechIconInfo } from '../../data/techIcons'

const MAX_TILT = 26

interface TechIcon3DProps {
  tech: TechIconInfo
}

export default function TechIcon3D({ tech }: TechIcon3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(50)
  const py = useMotionValue(50)

  const rotateX = useSpring(useTransform(py, [0, 100], [MAX_TILT, -MAX_TILT]), {
    stiffness: 200,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(px, [0, 100], [-MAX_TILT, MAX_TILT]), {
    stiffness: 200,
    damping: 22,
  })
  const glare = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.16) 0%, transparent 55%)`

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set(((e.clientX - rect.left) / rect.width) * 100)
    py.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const resetTilt = () => {
    px.set(50)
    py.set(50)
  }

  const Icon = tech.Icon

  return (
    <motion.div
      className="relative aspect-square cursor-pointer [perspective:900px]"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        role="img"
        aria-label={tech.name}
        className="group relative h-full w-full rounded-2xl border border-surface-100 bg-surface-50 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-40 transition-opacity group-hover:opacity-70"
          style={{
            background: `linear-gradient(135deg, ${tech.color}26 0%, transparent 55%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: glare }}
        />
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
          <Icon
            style={{ transform: 'translateZ(44px)', color: tech.color }}
            className="text-4xl sm:text-5xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
          />
          <span
            style={{ transform: 'translateZ(28px)' }}
            className="text-center text-xs font-medium text-slate-300"
          >
            {tech.name}
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ boxShadow: `inset 0 1px 0 ${tech.color}3d, inset 0 -1px 0 rgba(0,0,0,0.6)` }}
        />
      </motion.div>
    </motion.div>
  )
}
