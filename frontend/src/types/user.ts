export interface User {
  id: number
  name: string
  email: string
  role: 'User' | 'Admin'
  createdAt: string
  lastLoginTime: string
}

export interface UpdateUserPayload {
  name: string
  email: string
}
