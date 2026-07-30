import { PrismaClient } from '@prisma/client'
import type { z } from 'zod'
import type { contactSchema } from '../validators/contactValidator'

const prisma = new PrismaClient()

export async function createMessage(data: z.infer<typeof contactSchema>) {
  return prisma.message.create({ data })
}
