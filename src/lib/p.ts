import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export function payload() {
  return getPayload({ config: payloadConfig })
}
