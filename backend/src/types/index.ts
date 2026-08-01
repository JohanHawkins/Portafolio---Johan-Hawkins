export interface Project {
  id: number
  title: string
  description: string
  image: string | null
  images: string[]
  tags: string[]
  githubUrl: string | null
  liveUrl: string | null
  createdAt: Date
}

export interface Skill {
  id: number
  name: string
  category: string
  icon: string | null
  order: number
}

export interface Message {
  id: number
  name: string
  email: string
  message: string
  createdAt: Date
}
