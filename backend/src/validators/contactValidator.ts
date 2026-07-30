import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Correo inválido'),
  message: z.string().min(1, 'El mensaje es requerido').max(1000),
})
