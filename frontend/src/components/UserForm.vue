<template>
  <Dialog title="Edit User" closable @close="$emit('close')">
    <template #default>
      <div v-if="editingUser">
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
import type { UpdateUserPayload, User } from '@/types/user'
import { useMessageStore } from '@/stores/messageStore'

const message = useMessageStore()
const userStore = useUserStore()

const props = defineProps<{
  user?: User
}>()
const emits = defineEmits(['close'])

const formData = ref<UpdateUserPayload>({
  name: '',
  email: '',
})

const editingUser = ref<User | undefined>(undefined)

const isFormValid = computed(() => {
  const f = formData.value
  return f.name && f.email
})

const handleSave = async () => {
  if (!editingUser.value?.name || !editingUser.value?.email) {
    message.show('Please fill in all fields.', 'error')
    return
  }
  if (editingUser.value && props.user) {
    await userStore.updateUser(props.user.id, formData.value)
    message.show('User updated successfully', 'success')
  }
  emits('close')
}

onMounted(async () => {
  if (props.user) {
    const { name, email } = props.user
    formData.value = { name, email }
  }
})
</script>
