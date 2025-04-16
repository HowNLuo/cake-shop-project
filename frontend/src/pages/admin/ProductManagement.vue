<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Product Management</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="openAddDialog"
      >
        + Add Product
      </button>
    </div>
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full table-auto text-left">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-6 py-3 font-medium">ID</th>
            <th class="px-6 py-3 font-medium">Name</th>
            <th class="px-6 py-3 font-medium">Category</th>
            <th class="px-6 py-3 font-medium">Price</th>
            <th class="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t" v-for="product in products" :key="product.id">
            <td class="px-6 py-4">{{ product.id }}</td>
            <td class="px-6 py-4">{{ product.name }}</td>
            <td class="px-6 py-4">{{ product.categoryName }}</td>
            <td class="px-6 py-4">${{ product.price.toFixed(2) }}</td>
            <td class="px-6 py-4 space-x-2">
              <button
                class="border px-3 py-1 rounded hover:bg-gray-100"
                @click="openEditDialog(product)"
              >
                Edit
              </button>
              <button
                class="border px-3 py-1 rounded text-red-600 hover:bg-red-100"
                @click="handleDelete(product.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ProductForm
      v-if="showDialog"
      :mode="editingProduct ? 'edit' : 'add'"
      :product="editingProduct"
      @close="showDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useMessageStore } from '@/stores/messageStore'
import { useAlertStore } from '@/stores/alertStore'
import type { Product } from '@/types/product'

const message = useMessageStore()
const alert = useAlertStore()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const showDialog = ref(false)
const editingProduct = ref<Product | undefined>(undefined)

const openAddDialog = () => {
  editingProduct.value = undefined
  showDialog.value = true
}

const openEditDialog = (product: Product) => {
  editingProduct.value = { ...product }
  showDialog.value = true
}

const handleDelete = (id: number) => {
  alert.show({
    title: 'Delete Product',
    content: 'Are you sure you want to delete this product?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'confirm',
    onConfirm: async () => {
      await productStore.deleteProduct(id)
      message.show('Product deleted', 'success')
    },
  })
}

onMounted(() => {
  if (!products.value.length) {
    productStore.getProducts()
  }
})
</script>
