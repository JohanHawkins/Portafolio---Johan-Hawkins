# Portafolio Web — Johan Hawkins

Portafolio personal como SPA (Single Page Application) sin autenticación. Presenta las habilidades, los proyectos desarrollados y un formulario de contacto.

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Axios, React Query, Framer Motion, react-icons |
| Backend | Node.js, Express, TypeScript, Prisma ORM, Zod |
| Base de datos | PostgreSQL (local → Supabase en producción) |

## Características

- SPA con secciones: Inicio, Sobre mí, Habilidades, Proyectos y Contacto.
- Diseño responsive dark-mode (mobile-first).
- Iconos 3D de tecnologías con efecto tilt y reflejo.
- **Interacción Habilidades ↔ Proyectos**: al hacer clic en una o varias tecnologías, las tarjetas no asociadas se retraen a una pila animada en segundo plano (Stacked Cards) y las asociadas se resaltan en un flujo horizontal `Habilidad → Proyectos`. Las tarjetas apiladas son clicables para cambiar o ampliar el filtro.
- Carrusel de imágenes por proyecto (autoplay, flechas, dots).
- Formulario de contacto con validación Zod en backend y rate limiting.
- Estados de loading / error / empty en frontend y middleware global de errores en backend.

## Estructura del proyecto

```
.
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Modelos Project, Skill, Message
│   │   └── seed.ts              # Datos iniciales (skills y proyectos)
│   └── src/
│       ├── config/              # Configuración (puerto, DB)
│       ├── controllers/         # Lógica de los endpoints
│       ├── middleware/          # errorHandler, rateLimiter
│       ├── routes/              # Definición de rutas
│       ├── services/            # Acceso a datos con Prisma
│       ├── types/               # Tipos compartidos
│       ├── validators/          # Esquemas Zod
│       └── index.ts             # Punto de entrada del servidor
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/          # Navbar, Hero, Footer
│       │   ├── sections/        # About, Skills, Projects, Contact, SkillFlow, ProjectCard, SkillIconCard
│       │   └── ui/              # Button, Card, Tag, ImageCarousel, StackedPile, TechIcon3D, SectionTitle
│       ├── context/             # SelectionContext (selección de habilidades)
│       ├── data/                # techIcons, skillProjectRelations
│       ├── hooks/               # useSkills, useProjects, useContactForm
│       ├── services/            # Cliente Axios
│       ├── styles/              # Estilos globales Tailwind
│       └── types/               # Tipos de Project, Skill, Message
└── ideas.txt                    # Plan de tareas y progreso
```

## Requisitos previos

- Node.js >= 18
- PostgreSQL

## Configuración

### Backend

```bash
cd backend
npm install

# 1. Crear el archivo .env a partir del ejemplo
#    DATABASE_URL="postgresql://user:password@localhost:5432/portafolio"
#    PORT=4000
cp .env.example .env

# 2. Sincronizar el esquema con la base de datos
npx prisma db push

# 3. Cargar datos iniciales (habilidades y proyectos)
npm run seed

# 4. Iniciar en desarrollo
npm run dev
```

### Frontend

```bash
cd frontend
npm install

# 1. Crear el archivo .env a partir del ejemplo
#    VITE_API_URL=http://localhost:4000/api
cp .env.example .env

# 2. Iniciar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` y la API en `http://localhost:4000/api`.

## Scripts

### Backend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor con recarga automática (tsx watch) |
| `npm run build` | Compilar TypeScript |
| `npm start` | Ejecutar el build de producción |
| `npm run seed` | Poblar la base de datos |
| `npm run lint` | Lint (requiere ESLint instalado) |

### Frontend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Typecheck + build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | Lint (requiere ESLint instalado) |

## Variables de entorno

### Backend (`.env`)

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Cadena de conexión a PostgreSQL |
| `PORT` | Puerto del servidor (por defecto 4000) |

### Frontend (`.env`)

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API (por defecto `http://localhost:4000/api`) |

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/projects` | Lista los proyectos |
| `GET` | `/api/skills` | Lista las habilidades |
| `POST` | `/api/contact` | Envía un mensaje (validado con Zod y con rate limiting) |

## Datos de ejemplo (seed)

- **StockAdmin**: sistema de gestión de inventario con roles, CRUD de productos y categorías, movimientos de stock y estadísticas (Angular, Node.js, Express, PostgreSQL).
- **Drogs+**: sistema de gestión para droguería con inventario, POS, historial de ventas, clientes y reportes, incluye facturación electrónica (Python, Tkinter, pandas, openpyxl).

## Deploy (pendiente)

- Frontend → Vercel
- Backend → Render
- Configurar variables de entorno en producción
