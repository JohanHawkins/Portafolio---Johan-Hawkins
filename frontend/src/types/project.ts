export interface Project {
  id: number
  title: string
  description: string
  image: string | null
  tags: string[]
  githubUrl: string | null
  liveUrl: string | null
  createdAt: string
}
