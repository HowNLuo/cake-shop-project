<template>
  <Dialog
    :title="props.mode === 'edit' ? 'Edit Category' : 'Add Category'"
    closable
    size="md"
    @close="$emit('close')"
  >
    <template #default>
      <div class="p-4 space-y-4">
        <label class="block mb-3" for="categoryName">Category Name</label>
        <input
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="categoryName"
          v-model="formData.name"
        />

        <label class="block mb-3" for="categoryDescription">Description</label>
        <textarea
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="categoryDescription"
          v-model="formData.description"
        ></textarea>

        <label class="block mb-3" for="categoryImageName">Image Name</label>
        <input
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="categoryImageName"
          v-model="formData.imageName"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-4">
        <button
          @click="$emit('close')"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold transition"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-4 py-2 rounded font-semibold transition text-white"
          :class="
            isFormValid ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-300 cursor-not-allowed'
          "
        >
          Submit
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { CreateCategoryPayload } from '@/types/category'
import { useMessageStore } from '@/stores/messageStore'
import { useCreateCategory } from '@/composable/category/useCreateCategory'
import { useUpdateCategory } from '@/composable/category/useUpdateCategory'
import { useGetCategory } from '@/composable/category/useGetCategory'

const message = useMessageStore()
const { fetch: createCategory } = useCreateCategory()
const { fetch: updateCategory } = useUpdateCategory()
const { fetch: getCategory } = useGetCategory()

const props = defineProps<{
  mode: 'add' | 'edit'
  categoryId?: number
}>()

const formData = ref<CreateCategoryPayload>({
  name: '',
  description: '',
  imageName: '',
})

const emit = defineEmits(['close'])

const isFormValid = computed(() => {
  const f = formData.value
  return f.name && f.description && f.imageName
})

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.description || !formData.value.imageName) {
    message.show('Please fill in all fields.', 'error')
    return
  }

  if (props.mode === 'edit') {
    await updateCategory(props.categoryId!, formData.value)
    message.show('Category updated successfully', 'success')
  } else {
    await createCategory(formData.value)
    message.show('Category created successfully', 'success')
  }
  emit('close')
}

onMounted(async () => {
  if (props.mode === 'edit' && props.categoryId) {
    const category = await getCategory(props.categoryId)
    if (category) {
      const { name, description, imageName } = category
      formData.value = { name, description, imageName }
    }
  }
})
</script>
