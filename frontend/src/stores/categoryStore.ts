import { defineStore } from 'pinia'
import type { Category } from '@/types/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
  }),
})
