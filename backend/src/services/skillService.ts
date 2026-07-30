import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllSkills() {
  return prisma.skill.findMany({ orderBy: { order: 'asc' } })
}
