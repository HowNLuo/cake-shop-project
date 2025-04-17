import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {},
})
