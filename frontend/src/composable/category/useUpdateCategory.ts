import { useApiCall } from '@/composable/use-api-call'
import { updateCategory } from '@/api/category'
import { useCategoryStore } from '@/stores/categoryStore'
import type { UpdateCategoryPayload } from '@/types/category'

export const useUpdateCategory = () => {
  const categoryStore = useCategoryStore()

  const { fetch, loading, error } = useApiCall(
    async (id: number, payload: UpdateCategoryPayload) => {
      const { data } = await updateCategory(id, payload)

      const index = categoryStore.categories.findIndex((c) => c.id === id)
      if (index !== -1) {
        categoryStore.categories[index] = data
      }
      return data
    },
  )

  return { fetch, loading, error }
}
