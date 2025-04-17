import { ref } from 'vue'

export function useApiCall<T, P extends unknown[] = []>(fn: (...params: P) => Promise<T>) {
  const loading = ref(false)
  const error = ref<unknown | null>(null)

  const fetch = async (...params: P): Promise<T | null> => {
    loading.value = true
    error.value = null
    try {
      const result = await fn(...params)
      return result
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetch }
}
