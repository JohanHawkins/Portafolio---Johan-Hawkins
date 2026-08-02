import { cloneElement, type ReactElement } from 'react'
import { motion } from 'framer-motion'

interface StackedPileProps {
  count: number
  children: ReactElement[]
  cardWidth?: number
  overlap?: number
  heightClass?: string
}

export default function StackedPile({
  count,
  children,
  cardWidth = 6,
  overlap = 32,
  heightClass = 'h-28',
}: StackedPileProps) {
  return (
    <motion.div
      initial={false}
      animate={{ height: count > 0 ? 'auto' : 0, opacity: count > 0 ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      className="relative overflow-hidden"
      aria-hidden={count === 0}
    >
      <div className={`${heightClass} flex items-center justify-center px-4`}>
        {children.map((child, i) =>
          cloneElement(child, {
            style: {
              ...child.props.style,
              width: `${cardWidth}rem`,
              zIndex: i,
              flexShrink: 0,
              marginLeft: i === 0 ? 0 : -overlap,
            },
          }),
        )}
      </div>
    </motion.div>
  )
}
