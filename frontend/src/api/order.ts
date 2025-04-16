import api from '.'
import type { Order, CreateOrderPayload } from '@/types/order'

export const getOrders = () => {
  return api.get<Order[]>('/orders')
}

export const getOrder = (id: number) => {
  return api.get<Order>(`/orders/${id}`)
}

export const createOrder = (payload: CreateOrderPayload) => {
  return api.post<Order>('/orders', payload)
}

export const deleteOrder = (id: number) => {
  return api.delete(`/orders/${id}`)
}

export const getOrdersByUserId = (userId: number) => {
  return api.get<Order[]>(`/orders/user/${userId}`)
}
