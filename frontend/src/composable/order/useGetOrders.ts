import { useApiCall } from '@/composable/use-api-call'
import { getOrders } from '@/api/order'
import { useOrderStore } from '@/stores/orderStore'

export const useGetOrders = () => {
  const orderStore = useOrderStore()

  const { fetch, loading, error } = useApiCall(async () => {
    const { data } = await getOrders()
    orderStore.orders = data
    return data
  })

  return {
    fetch,
    loading,
    error,
  }
}
