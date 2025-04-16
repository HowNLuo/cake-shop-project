import type { DashboardStats } from '@/types/dashboard'
import api from '.'

export const getDashboardStats = async () => {
  const { data } = await api.get<DashboardStats>('/dashboard/stats')
  return data
}
