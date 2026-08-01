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

const projects = [
  {
    title: 'StockAdmin',
    description:
      'Sistema de gestión de inventario con roles (Admin/Empleado), CRUD de productos y categorías, movimientos de stock con validación y estadísticas. Backend API REST con PostgreSQL. Cuentas de prueba: admin@admin.com / empleado@empleado.com (123456).',
    image: '/projects/stockadmin/V1.jpg',
    images: [
      '/projects/stockadmin/V1.jpg',
      '/projects/stockadmin/V2.jpg',
      '/projects/stockadmin/V3.jpg',
      '/projects/stockadmin/V4.jpg',
    ],
    tags: ['Angular', 'Node.js', 'Express', 'PostgreSQL'],
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Drogs+',
    description:
      'Sistema de gestión para droguería (escritorio, moneda COP): inventario con alertas de vencimiento, POS con búsqueda instantánea, historial de ventas con filtros y exportación (Excel/TXT/PDF), clientes y reportes. Incluye facturación electrónica (PDF + XML DIAN).',
    image: '/projects/trydrog1/V1.jpg',
    images: [
      '/projects/trydrog1/V1.jpg',
      '/projects/trydrog1/V2.jpg',
      '/projects/trydrog1/V3.jpg',
      '/projects/trydrog1/V4.jpg',
    ],
    tags: ['Python', 'Tkinter', 'pandas', 'openpyxl'],
    githubUrl: null,
    liveUrl: null,
  },
]

async function main() {
  await prisma.skill.deleteMany()
  await prisma.skill.createMany({ data: skills })

  await prisma.project.deleteMany()
  await prisma.project.createMany({ data: projects })

  console.log(
    `Seed completado: ${skills.length} habilidades y ${projects.length} proyectos`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
