import api from '.'
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@/types/category'

export const getCategories = () => {
  return api.get<Category[]>('/categories')
}

export const getCategory = (id: number) => {
  return api.get<Category>(`/categories/${id}`)
}

export const createCategory = (payload: CreateCategoryPayload) => {
  return api.post<Category>('/categories', payload)
}

export const updateCategory = (id:number, payload: UpdateCategoryPayload) => {
  return api.put<Category>(`/categories/${id}`, payload)
}

export const deleteCategory = (id: number) => {
  return api.delete(`/categories/${id}`)
}
