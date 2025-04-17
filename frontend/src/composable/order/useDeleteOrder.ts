import { useApiCall } from '@/composable/use-api-call'
import { deleteOrder } from '@/api/order'
import { useOrderStore } from '@/stores/orderStore'

export const useDeleteOrder = () => {
  const orderStore = useOrderStore()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    await deleteOrder(id)
    orderStore.orders = orderStore.orders.filter((order) => order.id !== id)
  })

  return { fetch, loading, error }
}
