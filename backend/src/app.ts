import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler'
import projectRoutes from './routes/projectRoutes'
import skillRoutes from './routes/skillRoutes'
import contactRoutes from './routes/contactRoutes'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/contact', contactRoutes)

app.use(errorHandler)
