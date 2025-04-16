import { defineStore } from 'pinia'
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@/types/category'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} from '@/api/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async getCategories() {
      const { data } = await getCategories()
      this.categories = data
      return data
    },
    async getCategory(id: number) {
      const cached = this.categories.find((category) => category.id === id)
      if (cached) return cached

      const { data } = await getCategory(id)
      return data
    },
    async createCategory(payload: CreateCategoryPayload) {
      const { data } = await createCategory(payload)
      this.categories.push(data)
      return data
    },
    async updateCategory(id: number, payload: UpdateCategoryPayload) {
      const { data } = await updateCategory(id, payload)
      const index = this.categories.findIndex((c) => c.id === id)
      if (index !== -1) this.categories[index] = data
      return data
    },
    async deleteCategory(id: number) {
      await deleteCategory(id)
      this.categories = this.categories.filter((category) => category.id !== id)
    },
  },
})
