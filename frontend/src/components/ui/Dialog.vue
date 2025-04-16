<template>
  <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    @click.self="closable && emit('close')"
  >
    <div
      :class="[
        dialogSizeClass,
        'bg-white rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col',
      ]"
    >
      <!-- Header -->
      <div class="flex justify-between items-center border-b px-4 py-3 shrink-0">
        <div class="text-lg font-semibold">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <button v-if="closable" @click="$emit('close')" class="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 overflow-y-auto" style="max-height: calc(90vh - 112px)">
        <slot />
      </div>

      <!-- Footer -->
      <div class="px-4 py-3 border-t bg-gray-50 text-right shrink-0">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: [String, null],
    default: null,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
})

const emit = defineEmits(['close'])

const dialogSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-80'
    case 'lg':
      return 'w-[600px]'
    case 'md':
    default:
      return 'w-[400px]'
  }
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closable) {
    emit('close')
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>
