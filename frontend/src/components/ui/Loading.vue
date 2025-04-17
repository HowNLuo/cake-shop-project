<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-50"
  >
    <div class="relative w-14 h-14">
      <div class="absolute inset-0 rounded-full border-4 border-gray-300 opacity-50" />
      <div class="absolute inset-0 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loadingStore'
const { isLoading: show } = storeToRefs(useLoadingStore())
</script>
