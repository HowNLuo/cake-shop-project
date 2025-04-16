import type { CartItem } from '@/types/cart'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  actions: {
    addToCart(product: CartItem) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += product.quantity
      } else {
        this.items.push({ ...product })
      }
    },
    removeFromCart(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clearCart() {
      this.items = []
    },
  },
  getters: {
    totalQuantity: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  persist: true,
})
