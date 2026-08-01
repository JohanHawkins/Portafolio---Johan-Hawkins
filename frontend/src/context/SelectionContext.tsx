import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface SelectionContextValue {
  selectedSkills: string[]
  toggleSkill: (name: string) => void
  clearSkills: () => void
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = useCallback((name: string) => {
    setSelectedSkills((current) =>
      current.includes(name)
        ? current.filter((skill) => skill !== name)
        : [...current, name],
    )
  }, [])

  const clearSkills = useCallback(() => setSelectedSkills([]), [])

  return (
    <SelectionContext.Provider value={{ selectedSkills, toggleSkill, clearSkills }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const ctx = useContext(SelectionContext)
  if (!ctx) {
    throw new Error('useSelection must be used within SelectionProvider')
  }
  return ctx
}
