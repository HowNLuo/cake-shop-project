<template>
  <transition-group
    name="fade"
    tag="div"
    class="fixed top-20 left-1/2 transform -translate-x-1/2 space-y-2 z-[9999]"
  >
    <div
      v-for="msg in store.messages"
      :key="msg.id"
      :class="['px-6 py-3 rounded shadow text-white text-sm', getTypeClass(msg.type)]"
      role="alert"
    >
      {{ msg.text }}
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/messageStore'

const store = useMessageStore()

const getTypeClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-400 text-black'
    default:
      return 'bg-gray-500'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
