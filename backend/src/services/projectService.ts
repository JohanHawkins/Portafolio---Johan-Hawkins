import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllProjects() {
  return prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
}
