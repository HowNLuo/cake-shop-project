import { defineStore } from 'pinia'
import type { Order } from '@/types/order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as Order[],
  }),

  actions: {},
})
