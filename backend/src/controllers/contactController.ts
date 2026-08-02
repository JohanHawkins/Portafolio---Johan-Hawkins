import type { Request, Response, NextFunction } from 'express'
import { contactSchema } from '../validators/contactValidator'
import { createMessage } from '../services/contactService'
import { sendContactEmail } from '../services/emailService'

export async function postContact(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSchema.parse(req.body)
    await createMessage(data)
    try {
      await sendContactEmail(data)
    } catch (emailErr) {
      console.error('Error al enviar el correo de contacto:', emailErr)
    }
    res.status(201).json({ message: 'Mensaje enviado correctamente' })
  } catch (err) {
    next(err)
  }
}
