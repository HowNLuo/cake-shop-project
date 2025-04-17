import { useApiCall } from '@/composable/use-api-call'
import { createOrder } from '@/api/order'
import { useOrderStore } from '@/stores/orderStore'
import type { CreateOrderPayload } from '@/types/order'
import { useGetOrders } from './useGetOrders'

export const useCreateOrder = () => {
  const orderStore = useOrderStore()
  const { fetch: getOrders } = useGetOrders()

  const { fetch, loading, error } = useApiCall(async (payload: CreateOrderPayload) => {
    const { data } = await createOrder(payload)

    if (!orderStore.orders.length) getOrders()
    orderStore.orders.push(data)

    return data
  })

  return { fetch, loading, error }
}
