import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const skills = [
  { name: 'JavaScript', category: 'frontend', icon: 'javascript', order: 1 },
  { name: 'React', category: 'frontend', icon: 'react', order: 2 },
  { name: 'Angular', category: 'frontend', icon: 'angular', order: 3 },
  { name: 'HTML', category: 'frontend', icon: 'html5', order: 4 },
  { name: 'CSS', category: 'frontend', icon: 'css3', order: 5 },
  { name: 'TypeScript', category: 'frontend', icon: 'typescript', order: 6 },
  { name: 'PHP', category: 'backend', icon: 'php', order: 7 },
  { name: '.NET', category: 'backend', icon: 'dotnet', order: 8 },
  { name: 'Java', category: 'backend', icon: 'java', order: 9 },
  { name: 'Python', category: 'backend', icon: 'python', order: 10 },
  { name: 'Node.js', category: 'backend', icon: 'nodejs', order: 11 },
  { name: 'Express', category: 'backend', icon: 'express', order: 12 },
  { name: 'PostgreSQL', category: 'database', icon: 'postgresql', order: 13 },
  { name: 'Tkinter', category: 'tools', icon: 'tkinter', order: 14 },
  { name: 'pandas', category: 'tools', icon: 'pandas', order: 15 },
  { name: 'openpyxl', category: 'tools', icon: 'openpyxl', order: 16 },
]

const projects = [
  {
    title: 'StockAdmin',
    description:
      'Sistema de gestión de inventario con roles (Admin/Empleado), CRUD de productos y categorías, movimientos de stock con validación y estadísticas. Backend API REST con PostgreSQL. Cuentas de prueba: admin@admin.com / empleado@empleado.com (123456).',
    image: '/projects/stockadmin/V1.webp',
    images: [
      '/projects/stockadmin/V1.webp',
      '/projects/stockadmin/V2.webp',
      '/projects/stockadmin/V3.webp',
      '/projects/stockadmin/V4.webp',
      '/projects/stockadmin/V5.webp',
    ],
    tags: ['Angular', 'Node.js', 'Express', 'PostgreSQL'],
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Drogs+',
    description:
      'Sistema de gestión para droguería (escritorio, moneda COP): inventario con alertas de vencimiento, POS con búsqueda instantánea, historial de ventas con filtros y exportación (Excel/TXT/PDF), clientes y reportes. Incluye facturación electrónica (PDF + XML DIAN).',
    image: '/projects/drogs/V1.webp',
    images: [
      '/projects/drogs/V1.webp',
      '/projects/drogs/V2.webp',
      '/projects/drogs/V3.webp',
      '/projects/drogs/V4.webp',
    ],
    tags: ['Python', 'Tkinter', 'pandas', 'openpyxl'],
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Portafolio',
    description:
      'Portafolio web personal (SPA sin autenticación) con secciones, iconos 3D, carrusel de imágenes y filtro interactivo Habilidades ↔ Proyectos. Contacto con rate limiting, responsive dark-mode y backend Express + Prisma + PostgreSQL.',
    image: '/projects/portafolio/V1.webp',
    images: [
      '/projects/portafolio/V1.webp',
      '/projects/portafolio/V2.webp',
      '/projects/portafolio/V3.webp',
    ],
    tags: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
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
