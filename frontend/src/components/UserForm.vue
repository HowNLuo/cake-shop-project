<template>
  <Dialog title="Edit User" closable @close="$emit('close')">
    <template #default>
      <div v-if="formData.name">
        <div class="mb-2">
          <label class="block text-sm font-medium">Name</label>
          <input v-model="formData.name" class="border w-full px-2 py-1 rounded" />
        </div>
        <div class="mb-2">
          <label class="block text-sm font-medium">Email</label>
          <input v-model="formData.email" class="border w-full px-2 py-1 rounded" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end mt-4">
        <button @click="$emit('close')" class="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button
          @click="handleSave"
          :disabled="!isFormValid"
          class="px-4 py-2 rounded text-white"
          :class="isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'"
        >
          Save
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { UpdateUserPayload } from '@/types/user'
import { useMessageStore } from '@/stores/messageStore'
import { useUpdateUser } from '@/composable/user/useUpdateUser'

const message = useMessageStore()
const userStore = useUserStore()
const { fetch: updateUser } = useUpdateUser()

const props = defineProps<{
  userId?: number
}>()
const emits = defineEmits(['close'])

const formData = ref<UpdateUserPayload>({
  name: '',
  email: '',
})

const isFormValid = computed(() => {
  const f = formData.value
  return f.name && f.email
})

const handleSave = async () => {
  if (!formData.value.name || !formData.value.email) {
    message.show('Please fill in all fields.', 'error')
    return
  }
  if (props.userId) {
    await updateUser(props.userId, formData.value)
    message.show('User updated successfully', 'success')
  }
  emits('close')
}

onMounted(async () => {
  if (props.userId) {
    const user = userStore.users.find((u) => u.id === props.userId)
    if (user) {
      const { name, email } = user
      formData.value = { name, email }
    }
  }
})
</script>
