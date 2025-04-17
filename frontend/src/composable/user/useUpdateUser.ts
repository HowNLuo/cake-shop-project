import { useApiCall } from '@/composable/use-api-call'
import { updateUser } from '@/api/user'
import { useUserStore } from '@/stores/userStore'
import type { UpdateUserPayload } from '@/types/user'

export const useUpdateUser = () => {
  const userStore = useUserStore()

  const { fetch, loading, error } = useApiCall(async (id: number, payload: UpdateUserPayload) => {
    const { data } = await updateUser(id, payload)

    const index = userStore.users.findIndex((u) => u.id === id)
    if (index !== -1) {
      userStore.users[index] = data
    }
    return data
  })

  return { fetch, loading, error }
}
