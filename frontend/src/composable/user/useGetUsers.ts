

import { useApiCall } from '@/composable/use-api-call'
import { getUsers } from '@/api/user'
import { useUserStore } from '@/stores/userStore'

export const useGetUsers = () => {
  const userStore = useUserStore()

  const { fetch, loading, error } = useApiCall(async () => {
    const { data } = await getUsers()
    userStore.users = data
    return data
  })

  return { fetch, loading, error }
}
