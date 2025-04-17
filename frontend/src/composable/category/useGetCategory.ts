import { useCategoryStore } from '@/stores/categoryStore'
import { useGetCategories } from './useGetCategories'
import { useApiCall } from '../use-api-call'

export const useGetCategory = () => {
  const categoryStore = useCategoryStore()
  const { fetch: getCategories } = useGetCategories()

  const { fetch, loading, error } = useApiCall(async (id: number) => {
    if (!categoryStore.categories.length) await getCategories()

    return categoryStore.categories.find((category) => category.id === id)
  })

  return { fetch, loading, error }
}
