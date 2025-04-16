import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alertStore'
import { register } from '@/api/auth'
import type { RegisterPayload } from '@/types/auth'

export const useRegisterHandler = () => {
  const router = useRouter()
  const alert = useAlertStore()

  const handleRegister = async (payload: RegisterPayload) => {

    await register(payload)

    alert.show({
      title: 'Registered',
      content: 'Sign up successful! Redirecting to login page.',
      type: 'success',
      confirmText: 'OK',
      onConfirm: () => {
        router.push('/signin')
      },
    })
  }

  return { handleRegister }
}
