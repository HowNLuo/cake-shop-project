import { useApiCall } from '@/composable/use-api-call'
import { updateProduct } from '@/api/product'
import type { UpdateProductPayload } from '@/types/product'
import { useProductStore } from '@/stores/productStore'

export const useUpdateProduct = () => {
  const productStore = useProductStore()

  const { fetch, loading, error } = useApiCall(
    async (id: number, payload: UpdateProductPayload) => {
      const { data } = await updateProduct(id, payload)

      const index = productStore.products.findIndex((p) => p.id === id)
      if (index !== -1) {
        productStore.products[index] = data
      }
      return data
    },
  )

  return {
    fetch,
    loading,
    error,
  }
}
