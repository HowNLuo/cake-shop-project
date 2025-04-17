import type { User } from '@/types/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userList', {
  state: (): { users: User[] } => ({
    users: [],
  }),
  actions: {},
})
