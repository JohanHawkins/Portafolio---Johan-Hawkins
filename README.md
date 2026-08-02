# Portafolio Web — Johan Hawkins

Portafolio personal como SPA (Single Page Application) sin autenticación. Presenta las habilidades, los proyectos desarrollados y un formulario de contacto.

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Axios, React Query, Framer Motion, react-icons |
| Backend | Node.js, Express, TypeScript, Prisma ORM, Zod |
| Base de datos | PostgreSQL (local → Supabase en producción) |
| Testing | Vitest, Supertest (backend) |
| Herramientas | Sharp (optimización de imágenes a WebP) |

## Características

- SPA con secciones: Inicio, Sobre mí, Habilidades, Proyectos y Contacto.
- Diseño responsive dark-mode (mobile-first).
- Iconos 3D de tecnologías con efecto tilt y reflejo.
- **Interacción Habilidades ↔ Proyectos**: al hacer clic en una o varias tecnologías, las habilidades no seleccionadas se retraen a una pila animada (Stacked Cards, clicables para ampliar el filtro) y en Proyectos se muestran en grilla solo los proyectos asociados.
- Flujo horizontal `Habilidad → Proyectos` por cada habilidad seleccionada.
- Carrusel de imágenes por proyecto (autoplay, flechas, dots) con lazy loading.
- Formulario de contacto con validación Zod en backend (400 con detalles), rate limiting y middleware global de errores.
- Estados de loading / error / empty en frontend.
- SEO: meta tags, Open Graph, Twitter Cards, canonical, JSON-LD (Person) y título dinámico según el filtro activo.
- Imágenes en WebP optimizadas (~50–75% más ligeras) y animaciones de scroll reveal (framer-motion).
- Tests de la API con Vitest + Supertest.

## Estructura del proyecto

```
.
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Modelos Project, Skill, Message
│   │   └── seed.ts              # Datos iniciales (skills y proyectos)
│   ├── src/
│   │   ├── app.ts               # Aplicación Express (rutas + middlewares)
│   │   ├── config/              # Configuración (puerto, DB)
│   │   ├── controllers/         # Lógica de los endpoints
│   │   ├── middleware/          # errorHandler, rateLimiter
│   │   ├── routes/              # Definición de rutas
│   │   ├── services/            # Acceso a datos con Prisma
│   │   ├── types/               # Tipos compartidos
│   │   ├── validators/          # Esquemas Zod
│   │   └── index.ts             # Punto de entrada del servidor
│   ├── tests/                   # Tests (vitest + supertest)
│   └── vitest.config.ts         # Configuración de Vitest
├── frontend/
│   ├── scripts/
│   │   └── optimize-images.mjs  # Convierte imágenes a WebP con sharp
│   └── src/
│       ├── components/
│       │   ├── layout/          # Navbar, Hero, Footer
│       │   ├── sections/        # About, Skills, Projects, Contact, SkillFlow, ProjectCard, SkillIconCard
│       │   ├── seo/             # SeoManager (title/meta dinámicos)
│       │   └── ui/              # Button, Card, Tag, ImageCarousel, StackedPile, TechIcon3D, SectionTitle, Reveal
│       ├── context/             # SelectionContext (selección de habilidades)
│       ├── data/                # techIcons, skillProjectRelations
│       ├── hooks/               # useSkills, useProjects, useContactForm, useSEO
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
#    VITE_SITE_URL=http://localhost:5173
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
| `npm test` | Ejecutar los tests con Vitest |
| `npm run lint` | Lint (requiere ESLint instalado) |

### Frontend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Typecheck + build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run optimize:images` | Convierte las imágenes de `public/projects` a WebP (sharp) |
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
| `VITE_SITE_URL` | URL pública del sitio (para SEO/Open Graph; por defecto `http://localhost:5173`) |

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/projects` | Lista los proyectos |
| `GET` | `/api/skills` | Lista las habilidades |
| `POST` | `/api/contact` | Envía un mensaje (validado con Zod, 400 con detalles; rate limiting → 429) |

## Tests

Ejecuta los tests del backend con:

```bash
cd backend
npm test
```

Cubren el esquema de validación de contacto (`contactSchema`), el `rateLimiter` (límite, 429 y reinicio de ventana) y los endpoints `GET /api/projects`, `GET /api/skills` y `POST /api/contact` (200/201, 400 y 500) con los servicios mockeados.

## Datos de ejemplo (seed)

El seed carga **16 habilidades** (frontend, backend, database, tools) y **3 proyectos**:

- **StockAdmin**: sistema de gestión de inventario con roles, CRUD de productos y categorías, movimientos de stock y estadísticas (Angular, Node.js, Express, PostgreSQL).
- **Drogs+**: sistema de gestión para droguería con inventario, POS, historial de ventas, clientes y reportes, incluye facturación electrónica (Python, Tkinter, pandas, openpyxl).
- **Portafolio**: este mismo portafolio web (React, TypeScript, Express, PostgreSQL).

## Deploy (pendiente)

- Frontend → Vercel (definir `VITE_API_URL` y `VITE_SITE_URL`).
- Backend → Render (con base de datos PostgreSQL).
- Configurar variables de entorno en producción.
