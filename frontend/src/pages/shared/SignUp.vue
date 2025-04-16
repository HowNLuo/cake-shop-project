<template>
  <div class="min-h-screen bg-[#FCF8F3] flex items-start justify-center px-4 pt-24">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold text-brown-800 mb-6">Sign Up</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="formData.name"
          type="text"
          placeholder="Name"
          class="w-full border rounded px-3 py-2 focus:outline-none"
        />
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
          Sign Up
        </button>
      </form>
      <div class="mt-4 text-center text-sm">
        <span>Already have an account?</span>
        <router-link to="/signin" class="text-[#936d52] font-medium hover:underline ml-1">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegisterHandler } from '@/services/auth/registerHandler'
import { useAlertStore } from '@/stores/alertStore'
import type { RegisterPayload } from '@/types/auth'
import { ref } from 'vue'

const alert = useAlertStore()

const formData = ref<RegisterPayload>({
  name: '',
  email: '',
  password: '',
})
const { handleRegister } = useRegisterHandler()

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.email || !formData.value.password) {
    alert.show({
      title: 'Missing Fields',
      content: 'Please fill in all fields.',
      type: 'warning',
      confirmText: 'OK',
    })
    return
  }

  handleRegister(formData.value)
}
</script>
