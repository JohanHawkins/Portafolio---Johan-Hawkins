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
    mutate(data, {
      onSuccess: () => form.reset(),
    })
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Contacto"
          subtitle="Envíame un mensaje y te responderé lo antes posible"
        />

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
          <div>
            <label htmlFor="name" className="sr-only">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Nombre"
              className="w-full px-4 py-3 rounded-lg bg-surface-50 border border-surface-100 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 rounded-lg bg-surface-50 border border-surface-100 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Mensaje</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Mensaje"
              className="w-full px-4 py-3 rounded-lg bg-surface-50 border border-surface-100 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Enviando...' : 'Enviar mensaje'}
          </Button>

          {isSuccess && (
            <p className="text-sm text-center text-emerald-400 font-medium">
              Mensaje enviado correctamente. Gracias por contactarme.
            </p>
          )}
          {isError && (
            <p className="text-sm text-center text-red-400 font-medium">
              Error al enviar el mensaje. Intenta de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
