import { useApiCall } from '@/composable/use-api-call'
import { deleteProduct } from '@/api/product'
import { useProductStore } from '@/stores/productStore'

export const useDeleteProduct = () => {
  const productStore = useProductStore()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    await deleteProduct(id)
    productStore.products = productStore.products.filter((p) => p.id !== id)
  })

  return { fetch, loading, error }
}
