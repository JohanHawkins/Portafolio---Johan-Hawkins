import { useQuery } from '@tanstack/react-query'
import { getSkills } from '../services/api'

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  })
}
