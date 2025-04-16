import type { UpdateUserPayload, User } from '@/types/user'
import api from '.'

export const getUserList = () => {
  return api.get<User[]>('/users')
}

export const getUser = (id: number) => {
  return api.get<User>(`/users/${id}`)
}

export const updateUser = (id: number, payload: UpdateUserPayload) => {
  return api.put<User>(`/users/${id}`, payload)
}
