import api from '.'
import type { CreateProductPayload, Product, UpdateProductPayload } from '@/types/product'

export const getProducts = () => {
  return api.get<Product[]>('/products')
}

export const getProduct = (id: number) => {
  return api.get<Product>(`/products/${id}`)
}

export const createProduct = (payload: CreateProductPayload) => {
  return api.post<Product>('/products', payload)
}

export const updateProduct = (id: number, payload: UpdateProductPayload) => {
  return api.put<Product>(`/products/${id}`, payload)
}

export const deleteProduct = (id: number) => {
  return api.delete(`/products/${id}`)
}
