import { useApiCall } from '@/composable/use-api-call'
import { useOrderStore } from '@/stores/orderStore'
import { useGetOrders } from './useGetOrders'

export const useGetOrdersById = () => {
  const orderStore = useOrderStore()
  const { fetch: getOrders } = useGetOrders()

  const { fetch, loading, error } = useApiCall(async (userId: number) => {
    if (!orderStore.orders.length) await getOrders()

    return orderStore.orders.filter((o) => o.userId === userId)
  })

  return { fetch, loading, error }
}
