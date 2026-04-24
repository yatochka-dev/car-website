export type ContactFormState = {
  message: string
  status: 'error' | 'idle' | 'success'
}

export const initialContactFormState: ContactFormState = {
  message: '',
  status: 'idle',
}
