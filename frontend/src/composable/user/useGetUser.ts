import { useApiCall } from '../use-api-call'
import { useUserStore } from '@/stores/userStore'
import { useGetUsers } from './useGetUsers'

export const useGetCategory = () => {
  const userStore = useUserStore()
  const { fetch: getUsers } = useGetUsers()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    if (!userStore.users.length) await getUsers()

    return userStore.users.find((user) => user.id === id)
  })

  return { fetch, loading, error }
}
