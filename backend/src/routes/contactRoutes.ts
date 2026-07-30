import { Router } from 'express'
import { postContact } from '../controllers/contactController'
import { rateLimiter } from '../middleware/rateLimiter'

const router = Router()

router.post('/', rateLimiter(), postContact)

export default router
