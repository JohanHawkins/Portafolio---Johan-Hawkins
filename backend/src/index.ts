import express from 'express'
import cors from 'cors'
import { config } from './config'
import { errorHandler } from './middleware/errorHandler'
import projectRoutes from './routes/projectRoutes'
import skillRoutes from './routes/skillRoutes'
import contactRoutes from './routes/contactRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/contact', contactRoutes)

app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
