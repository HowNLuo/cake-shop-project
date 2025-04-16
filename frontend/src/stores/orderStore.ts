import { defineStore } from 'pinia'
import type { Order, CreateOrderPayload } from '@/types/order'
import { getOrders, getOrder, createOrder, deleteOrder, getOrdersByUserId } from '@/api/order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as Order[],
  }),

  actions: {
    async getOrders() {
      const { data } = await getOrders()
      this.orders = data
      return data
    },

    async getOrder(id: number) {
      const cached = this.orders.find((order) => order.id === id)
      if (cached) return cached

      const { data } = await getOrder(id)
      return data
    },

    async createOrder(payload: CreateOrderPayload) {
      const { data } = await createOrder(payload)
      this.orders.push(data)
      return data
    },

    async deleteOrder(id: number) {
      await deleteOrder(id)
      this.orders = this.orders.filter((order) => order.id !== id)
    },

    async getOrdersByUserId(userId: number) {
      const { data } = await getOrdersByUserId(userId)
      return data
    },
  },
})
