import type { Request, Response, NextFunction } from 'express'
import { contactSchema } from '../validators/contactValidator'
import { createMessage } from '../services/contactService'

export async function postContact(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSchema.parse(req.body)
    await createMessage(data)
    res.status(201).json({ message: 'Mensaje enviado correctamente' })
  } catch (err) {
    next(err)
  }
}
