import { login } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'
import type { LoginPayload } from '@/types/auth'
import { useRouter } from 'vue-router'

export const useLoginHandler = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const handleLogin = async (payload: LoginPayload) => {
    const { data } = await login(payload)

    localStorage.setItem('token', data.token)
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        lastLoginTime: data.lastLoginTime,
        createdAt: data.createdAt,
      }),
    )

    authStore.setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      lastLoginTime: data.lastLoginTime,
      createdAt: data.createdAt,
    })

    router.push(data.role === 'Admin' ? '/dashboard' : '/')
  }

  return { handleLogin }
}
