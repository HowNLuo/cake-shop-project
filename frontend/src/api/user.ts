import type { UpdateUserPayload, User } from '@/types/user'
import api from '.'

export const getUsers = () => {
  return api.get<User[]>('/users')
}

export const updateUser = (id: number, payload: UpdateUserPayload) => {
  return api.put<User>(`/users/${id}`, payload)
}
