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
      <thead>
        <tr class="text-left border-b">
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
              @click="openEditDialog(category)"
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
    :mode="selectedCategory ? 'edit' : 'add'"
    :category="selectedCategory"
    @close="showDialog = false"
  />
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useMessageStore } from '@/stores/messageStore'
import type { Category } from '@/types/category'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const message = useMessageStore()
const alert = useAlertStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const showDialog = ref(false)
const selectedCategory = ref<Category | undefined>(undefined)

const openAddDialog = () => {
  selectedCategory.value = undefined
  showDialog.value = true
}

const openEditDialog = (category: Category) => {
  selectedCategory.value = { ...category }
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
      await categoryStore.deleteCategory(id)
      message.show('Category deleted', 'success')
      await categoryStore.getCategories()
    },
  })
}

onMounted(() => {
  if (!categories.value.length) {
    categoryStore.getCategories()
  }
})
</script>
