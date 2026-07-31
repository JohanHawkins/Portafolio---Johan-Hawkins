interface TagProps {
  label: string
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium text-primary-300 bg-primary-900/40 rounded-full">
      {label}
    </span>
  )
}
