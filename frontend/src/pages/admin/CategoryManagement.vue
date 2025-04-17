<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Category Management</h1>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        @click="openAddDialog"
      >
        + Add Category
      </button>
    </div>
    <table class="min-w-full bg-white rounded shadow">
      <thead class="bg-gray-100">
        <tr class="text-left">
          <th class="py-3 px-4">ID</th>
          <th class="py-3 px-4">Name</th>
          <th class="py-3 px-4">Description</th>
          <th class="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="category in categories" :key="category.id">
          <td class="py-3 px-4">{{ category.id }}</td>
          <td class="py-3 px-4">{{ category.name }}</td>
          <td class="py-3 px-4">{{ category.description }}</td>
          <td class="py-3 px-4 space-x-2">
            <button
              class="border rounded px-3 py-1 hover:bg-gray-100"
              @click="openEditDialog(category.id)"
            >
              Edit
            </button>
            <button
              class="border rounded px-3 py-1 text-red-600 hover:bg-red-100"
              @click="handleDelete(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CategoryForm
    v-if="showDialog"
    :mode="selectedCategoryId ? 'edit' : 'add'"
    :category-id="selectedCategoryId"
    @close="showDialog = false"
  />
</template>

<script setup lang="ts">
import { useDeleteCategory } from '@/composable/category/useDeleteCategory'
import { useGetCategories } from '@/composable/category/useGetCategories'
import { useAlertStore } from '@/stores/alertStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useMessageStore } from '@/stores/messageStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const message = useMessageStore()
const alert = useAlertStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { fetch: getCategories } = useGetCategories()
const { fetch: deleteCategory } = useDeleteCategory()

const showDialog = ref(false)
const selectedCategoryId = ref<number | undefined>()

const openAddDialog = () => {
  selectedCategoryId.value = undefined
  showDialog.value = true
}

const openEditDialog = (categoryId: number) => {
  selectedCategoryId.value = categoryId
  showDialog.value = true
}

const handleDelete = (id: number) => {
  alert.show({
    title: 'Delete Categoru',
    content: 'Are you sure you want to delete this category?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'confirm',
    onConfirm: async () => {
      await deleteCategory(id)
      message.show('Category deleted', 'success')
    },
  })
}

onMounted(() => {
  if (!categories.value.length) getCategories()
})
</script>
