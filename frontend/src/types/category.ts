export interface Category extends CreateCategoryPayload {
  id: number
}

export interface CreateCategoryPayload {
  name: string
  description: string
  imageName: string
}

export interface UpdateCategoryPayload {
  name: string
  description: string
  imageName: string
}
