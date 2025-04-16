import type { LoginPayload, RegisterPayload } from '@/types/auth'
import api from '.'

export const register = (payload: RegisterPayload) => {
  return api.post('/auth/register', payload)
}

export const login = (payload: LoginPayload) => {
  return api.post('/auth/login', payload)
}
