import { useApiCall } from '@/composable/use-api-call'
import { createCategory } from '@/api/category'
import { useCategoryStore } from '@/stores/categoryStore'
import type { CreateCategoryPayload } from '@/types/category'

export const useCreateCategory = () => {
  const categoryStore = useCategoryStore()

  const { fetch, loading, error } = useApiCall(async (payload: CreateCategoryPayload) => {
    const { data } = await createCategory(payload)
    categoryStore.categories.push(data)
    return data
  })

  return {
    fetch,
    loading,
    error,
  }
}
