import nodemailer from 'nodemailer'
import type { z } from 'zod'
import type { contactSchema } from '../validators/contactValidator'
import { config } from '../config'

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
})

export async function sendContactEmail(data: z.infer<typeof contactSchema>) {
  await transporter.sendMail({
    from: `"Portafolio Johan Hawkins" <${config.smtp.user}>`,
    to: config.smtp.recipient,
    replyTo: data.email,
    subject: `Nuevo mensaje de contacto de ${data.name}`,
    text: `Nombre: ${data.name}\nCorreo: ${data.email}\n\nMensaje:\n${data.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #f4f5f7; border-radius: 12px;">
        <h2 style="color: #1a1a2e; margin-top: 0;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Correo:</strong> ${data.email}</p>
        <div style="background: #ffffff; padding: 16px; border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
    `,
  })
}
