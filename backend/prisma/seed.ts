import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const skills = [
  { name: 'JavaScript', category: 'frontend', icon: 'javascript', order: 1 },
  { name: 'React', category: 'frontend', icon: 'react', order: 2 },
  { name: 'Angular', category: 'frontend', icon: 'angular', order: 3 },
  { name: 'HTML', category: 'frontend', icon: 'html5', order: 4 },
  { name: 'CSS', category: 'frontend', icon: 'css3', order: 5 },
  { name: 'PHP', category: 'backend', icon: 'php', order: 6 },
  { name: '.NET', category: 'backend', icon: 'dotnet', order: 7 },
  { name: 'Java', category: 'backend', icon: 'java', order: 8 },
  { name: 'Python', category: 'backend', icon: 'python', order: 9 },
]

async function main() {
  await prisma.skill.deleteMany()
  await prisma.skill.createMany({ data: skills })
  console.log(`Seed completado: ${skills.length} habilidades insertadas`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
