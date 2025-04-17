import { useApiCall } from '@/composable/use-api-call'
import { createProduct } from '@/api/product'
import { useProductStore } from '@/stores/productStore'
import type { CreateProductPayload } from '@/types/product'

export const useCreateProduct = () => {
  const productStore = useProductStore()

  const { fetch, loading, error } = useApiCall(async (payload: CreateProductPayload) => {
    const { data } = await createProduct(payload)
    productStore.products.push(data)
    return data
  })

  return { fetch, loading, error }
}
