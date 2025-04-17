import { useApiCall } from '@/composable/use-api-call'
import { deleteCategory } from '@/api/category'
import { useCategoryStore } from '@/stores/categoryStore'

export const useDeleteCategory = () => {
  const categoryStore = useCategoryStore()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    await deleteCategory(id)
    categoryStore.categories = categoryStore.categories.filter((c) => c.id !== id)
  })

  return { fetch, loading, error }
}
