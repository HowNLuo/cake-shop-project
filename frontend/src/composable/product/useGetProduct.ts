import { useApiCall } from '@/composable/use-api-call'
import { useProductStore } from '@/stores/productStore'
import { useGetProducts } from './useGetProducts'

export const useGetProduct = () => {
  const productStore = useProductStore()
  const { fetch: getProducts } = useGetProducts()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    if (!productStore.products.length) await getProducts()

    return productStore.products.find((p) => p.id === id)
  })

  return { fetch, loading, error }
}
