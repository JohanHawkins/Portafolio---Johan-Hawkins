import axios from 'axios'
import type { Project } from '../types/project'
import type { Skill } from '../types/skill'
import type { ContactForm } from '../types/message'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
})

export const getProjects = () => api.get<Project[]>('/projects').then((r) => r.data)

export const getSkills = () => api.get<Skill[]>('/skills').then((r) => r.data)

export const sendContactMessage = (data: ContactForm) => api.post('/contact', data)
