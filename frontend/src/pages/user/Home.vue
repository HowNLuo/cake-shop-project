<template>
  <div class="bg-[#fffaf3] min-h-screen font-sans text-[#2c2c2c] pt-[72px]">
    <!-- Hero Section -->
    <div class="text-center py-8">
      <h1 class="text-4xl font-extrabold mb-4">Delicious Cakes</h1>
      <button
        class="bg-[#e29396] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#d87f83]"
        aria-label="Browse all products"
        @click="router.push('/products')"
      >
        Shop Now
      </button>
    </div>

    <!-- Category Shortcuts -->
    <div class="flex justify-center gap-4 flex-wrap px-4 mb-10">
      <div
        v-for="category in categories"
        :key="category.id"
        class="text-center bg-white p-4 rounded-lg shadow w-32 cursor-pointer transition duration-200 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-[#e29396]"
        @click="router.push({ path: '/products', query: { category: category.name } })"
      >
        <img
          :src="`src/assets/images/categories/${category.imageName}`"
          :alt="category.name"
          class="w-24 h-26 object-cover mx-auto"
          loading="lazy"
        />
        <div class="mt-2 font-medium">{{ category.name }}</div>
      </div>
    </div>

    <!-- New Arrivals -->
    <div class="max-w-5xl mx-auto px-4 pb-12">
      <h2 class="text-2xl font-bold mb-4">New Arrivals</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="product in newArrivals"
          :key="product.id"
          class="bg-white rounded-lg p-4 shadow flex flex-col items-center cursor-pointer transition duration-200 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-[#e29396]"
          @click="router.push(`/products/${product.id}`)"
        >
          <img
            :src="`src/assets/images/products/${product.imageName}`"
            :alt="product.name"
            class="w-26 h-26 object-cover mx-auto rounded-xl"
            loading="lazy"
          />
          <div class="text-center mt-2">
            <div class="font-medium">{{ product.name }}</div>
            <div class="text-sm text-gray-600">${{ product.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const { products } = storeToRefs(productStore)
const { categories } = storeToRefs(categoryStore)

const sortedProducts = computed(() => {
  return [...products.value].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )
})

const newArrivals = computed(() => sortedProducts.value.slice(0, 6))

onMounted(() => {
  if (!products.value.length) {
    productStore.getProducts()
  }
  if (!categories.value.length) {
    categoryStore.getCategories()
  }
})
</script>
