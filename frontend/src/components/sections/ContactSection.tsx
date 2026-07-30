import { useContactForm } from '../../hooks/useContactForm'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

export default function ContactSection() {
  const { mutate, isPending, isSuccess, isError } = useContactForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    mutate(data)
  }

  return (
    <section id="contact">
      <SectionTitle title="Contacto" subtitle="Envíame un mensaje" />
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input name="email" type="email" placeholder="Correo" required />
        <textarea name="message" placeholder="Mensaje" required />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Enviando...' : 'Enviar'}
        </Button>
        {isSuccess && <p>Mensaje enviado correctamente</p>}
        {isError && <p>Error al enviar el mensaje</p>}
      </form>
    </section>
  )
}
