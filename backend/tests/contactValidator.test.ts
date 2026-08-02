import { describe, expect, it } from 'vitest'
import { contactSchema } from '../src/validators/contactValidator'

describe('contactSchema', () => {
  it('acepta un payload válido', () => {
    const data = contactSchema.parse({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola',
    })
    expect(data).toEqual({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola',
    })
  })

  it('rechaza un email inválido', () => {
    const result = contactSchema.safeParse({
      name: 'Ana',
      email: 'no-es-un-email',
      message: 'Hola',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza un nombre vacío', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'ana@example.com',
      message: 'Hola',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza un mensaje vacío', () => {
    const result = contactSchema.safeParse({
      name: 'Ana',
      email: 'ana@example.com',
      message: '',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza un mensaje demasiado largo', () => {
    const result = contactSchema.safeParse({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'x'.repeat(1001),
    })
    expect(result.success).toBe(false)
  })
})
