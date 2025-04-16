<template>
  <div v-if="alert.visible" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center relative">
      <!-- Icon -->
      <div class="text-4xl mb-4">{{ icon }}</div>

      <!-- Title -->
      <h3 class="text-xl font-bold mb-2">{{ alert.title }}</h3>

      <!-- Content -->
      <p class="text-sm text-gray-600 mb-6 whitespace-pre-line">{{ alert.content }}</p>

      <!-- Buttons -->
      <div class="flex justify-center gap-4">
        <button
          v-if="alert.type === 'confirm'"
          @click="(alert.onCancel?.(), alert.close())"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          {{ alert.cancelText || 'No' }}
        </button>
        <button
          @click="handleConfirm"
          :class="`${confirmButtonClass} text-white px-4 py-2 rounded`"
        >
          {{ alert.confirmText || 'Yes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore'
import { computed } from 'vue'

const alert = useAlertStore()

const icon = computed(() => {
  switch (alert.type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'confirm':
      return '❓'
    default:
      return ''
  }
})

const confirmButtonClass = computed(() => {
  switch (alert.type) {
    case 'error':
      return 'bg-red-500 hover:bg-red-600'
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600'
    case 'success':
      return 'bg-green-500 hover:bg-green-600'
    default:
      return 'bg-blue-500 hover:bg-blue-600'
  }
})

const handleConfirm = () => {
  alert.onConfirm?.()
  alert.close()
}
</script>
