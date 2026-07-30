import { useMutation } from '@tanstack/react-query'
import { sendContactMessage } from '../services/api'
import type { ContactForm } from '../types/message'

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactForm) => sendContactMessage(data),
  })
}
