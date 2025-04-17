import { useApiCall } from '@/composable/use-api-call'
import { getCategories } from '@/api/category'
import { useCategoryStore } from '@/stores/categoryStore'

export const useGetCategories = () => {
  const categoryStore = useCategoryStore()

  const { fetch, loading, error } = useApiCall(async () => {
    const { data } = await getCategories()
    categoryStore.categories = data
    return data
  })

  return { fetch, loading, error }
}
