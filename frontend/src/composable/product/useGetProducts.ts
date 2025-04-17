import { useApiCall } from '@/composable/use-api-call'
import { getProducts } from '@/api/product'
import { useProductStore } from '@/stores/productStore'

export const useGetProducts = () => {
  const productStore = useProductStore()

  const { fetch, loading, error } = useApiCall(async () => {
    const { data } = await getProducts()
    productStore.products = data
    return data
  })

  return { fetch, loading, error }
}
