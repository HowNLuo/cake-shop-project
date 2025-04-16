<template>
  <footer
    v-if="!isAdmin"
    class="bg-[#fdf5ee] border-t border-[#f5e7dd] py-10 mt-16 text-center text-[#5c4a42]"
  >
    <div class="max-w-4xl mx-auto px-4">
      <p class="text-lg font-semibold">Made with love, one slice at a time.</p>
      <p class="text-sm mt-2">© 2025 Delicious Cakes. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)
</script>
