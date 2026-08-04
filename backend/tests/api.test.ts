import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/services/projectService', () => ({
  getAllProjects: vi.fn(),
}))
vi.mock('../src/services/skillService', () => ({
  getAllSkills: vi.fn(),
}))
vi.mock('../src/services/contactService', () => ({
  createMessage: vi.fn(),
}))
vi.mock('../src/services/emailService', () => ({
  sendContactEmail: vi.fn(),
}))
vi.mock('../src/middleware/rateLimiter', () => ({
  rateLimiter: () => (_req: unknown, _res: unknown, next: () => void) => next(),
}))

import request from 'supertest'
import { app } from '../src/app'
import { getAllProjects } from '../src/services/projectService'
import { getAllSkills } from '../src/services/skillService'
import { createMessage } from '../src/services/contactService'
import { sendContactEmail } from '../src/services/emailService'

const mockedGetAllProjects = vi.mocked(getAllProjects)
const mockedGetAllSkills = vi.mocked(getAllSkills)
const mockedCreateMessage = vi.mocked(createMessage)
const mockedSendContactEmail = vi.mocked(sendContactEmail)

const projects = [
  {
    id: 1,
    title: 'StockAdmin',
    image: '/projects/stockadmin/V1.png',
    images: [],
    tags: ['Angular'],
    githubUrl: null,
    liveUrl: null,
  },
]
const skills = [
  { id: 1, name: 'React', category: 'frontend', icon: 'react', order: 1 },
]

describe('API endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /api/projects devuelve 200 y la lista de proyectos', async () => {
    mockedGetAllProjects.mockResolvedValue(projects as never)
    const res = await request(app).get('/api/projects')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(projects)
    expect(mockedGetAllProjects).toHaveBeenCalled()
  })

  it('GET /api/skills devuelve 200 y la lista de habilidades', async () => {
    mockedGetAllSkills.mockResolvedValue(skills as never)
    const res = await request(app).get('/api/skills')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(skills)
  })

  it('POST /api/contact con payload válido devuelve 201', async () => {
    mockedCreateMessage.mockResolvedValue({ id: 1 } as never)
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Ana', email: 'ana@example.com', message: 'Hola' })

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ message: 'Mensaje enviado correctamente' })
    expect(mockedCreateMessage).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola',
    })
    expect(mockedSendContactEmail).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola',
    })
  })

  it('POST /api/contact con payload inválido devuelve 400', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: '', email: 'no-valid', message: '' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Datos inválidos')
  })

  it('GET /api/projects devuelve 500 cuando el servicio falla', async () => {
    mockedGetAllProjects.mockRejectedValue(new Error('boom'))
    const res = await request(app).get('/api/projects')

    expect(res.status).toBe(500)
    expect(res.body.error).toBe('Error interno del servidor')
  })
})
