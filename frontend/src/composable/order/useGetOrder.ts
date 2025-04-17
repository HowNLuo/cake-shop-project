import { useOrderStore } from '@/stores/orderStore'
import { useApiCall } from '../use-api-call'
import { useGetOrders } from './useGetOrders'

export const useGetOrder = () => {
  const orderStore = useOrderStore()
  const { fetch: getOrders } = useGetOrders()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    if (!orderStore.orders.length) await getOrders()

    return orderStore.orders.find((order) => order.id === id)
  })

  return { fetch, loading, error }
}
