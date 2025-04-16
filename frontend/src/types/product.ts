export interface Product extends CreateProductPayload {
  id: number
  categoryName: string
  createdAt: string
}

export interface CreateProductPayload {
  name: string
  description: string
  ingredients: string
  price: number
  categoryId?: number
  imageName: string
}

export interface UpdateProductPayload {
  name: string
  description: string
  ingredients: string
  price: number
  categoryId?: number
  imageName: string
}
