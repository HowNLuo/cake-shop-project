import axios from 'axios'
import { useAlertStore } from '@/stores/alertStore'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status

    if (status === 401) {
      router.push('/signin')
    } else if (status === 403) {
      showAlert('你沒有權限執行這個操作')
    } else if (status === 500) {
      showAlert('伺服器發生錯誤，請稍後再試')
    } else {
      showAlert(err?.response?.data?.message || err.message || 'Something went wrong.')
    }

    return Promise.reject(err)
  },
)

const showAlert = (message: string) => {
  const alert = useAlertStore()
  alert.show({
    title: 'API Error',
    content: message,
    type: 'error',
    confirmText: 'OK',
  })
}

export default api
