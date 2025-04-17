<template>
  <div class="min-h-screen bg-[#FCF8F3] flex items-start justify-center px-4 pt-36">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold text-brown-800 mb-6">Sign In</h1>
      <form @submit.prevent="handleSignIn" class="space-y-4">
        <input
          v-model="formData.email"
          type="email"
          placeholder="Email"
          class="w-full border rounded px-3 py-2 focus:outline-none"
        />
        <input
          v-model="formData.password"
          type="password"
          placeholder="Password"
          class="w-full border rounded px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          class="w-full bg-[#936d52] text-white py-2 rounded hover:bg-[#7e5b44] transition"
        >
          Sign In
        </button>
      </form>
      <div class="mt-4 text-center text-sm">
        <span>Don’t have an account?</span>
        <router-link to="/signup" class="text-[#936d52] font-medium hover:underline ml-1">
          Sign Up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginHandler } from '@/composable/handler/loginHandler'
import { useAlertStore } from '@/stores/alertStore'
import type { LoginPayload } from '@/types/auth'

const alert = useAlertStore()

const formData = ref<LoginPayload>({
  email: '',
  password: '',
})

const { handleLogin } = useLoginHandler()

const handleSignIn = async () => {
  if (!formData.value.email || !formData.value.password) {
    alert.show({
      title: 'Missing Fields',
      content: 'Please fill in all fields.',
      type: 'warning',
      confirmText: 'OK',
    })
    return
  }

  await handleLogin(formData.value)
}
</script>
