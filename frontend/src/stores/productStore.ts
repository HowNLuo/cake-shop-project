import { defineStore } from 'pinia'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '@/api/product'
import type { CreateProductPayload, Product, UpdateProductPayload } from '@/types/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async getProducts() {
      const { data } = await getProducts()
      this.products = data
      return data
    },
    async getProduct(id: number) {
      const cached = this.products.find((product) => product.id === id)
      if (cached) return cached

      const { data } = await getProduct(id)
      return data
    },
    async createProduct(payload: CreateProductPayload) {
      const { data } = await createProduct(payload)
      this.products.push(data)
      return data
    },
    async updateProduct(id: number, payload: UpdateProductPayload) {
      const { data } = await updateProduct(id, payload)
      const index = this.products.findIndex((p) => p.id === id)
      if (index !== -1) this.products[index] = data
      return data
    },
    async deleteProduct(id: number) {
      await deleteProduct(id)
      this.products = this.products.filter((product) => product.id !== id)
    },
  },
})
