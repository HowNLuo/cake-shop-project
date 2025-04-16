import { defineStore } from 'pinia'
import { getUser, getUserList, updateUser } from '@/api/user'
import type { UpdateUserPayload, User } from '@/types/user'

export const useUserStore = defineStore('userList', {
  state: (): { users: User[] } => ({
    users: [],
  }),
  actions: {
    async getUsers() {
      const { data } = await getUserList()
      this.users = data
      return data
    },
    async getUser(id: number) {
      const cached = this.users.find((user) => user.id === id)
      if (cached) return cached

      const { data } = await getUser(id)
      return data
    },
    async updateUser(id: number, payload: UpdateUserPayload) {
      const { data } = await updateUser(id, payload)
      const index = this.users.findIndex((u) => u.id === id)
      if (index !== -1) this.users[index] = data
    },
  },
})
