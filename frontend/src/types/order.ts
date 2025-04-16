export interface Order {
  id: number
  userId: number
  status: string
  total: number
  createdAt: string
  orderNumber: string
  email: string
  phoneNumber: string
  fullName: string
  address: string
  postalCode: string
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  quantity: number
  price: number
}

export interface CreateOrderPayload {
  userId: number
  status: string
  total: number
  email: string
  phoneNumber: string
  fullName: string
  address: string
  postalCode: string
  items: CreateOrderItemPayload[]
}

export interface CreateOrderItemPayload {
  productId: number
  quantity: number
  price: number
}
