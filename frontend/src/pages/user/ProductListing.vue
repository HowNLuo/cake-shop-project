<template>
  <div class="bg-[#fffaf3] min-h-screen font-sans text-[#2c2c2c] pt-[72px]">
    <div class="max-w-7xl mx-auto px-6 pt-8 pb-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
      <!-- Sidebar -->
      <aside>
        <h2 class="text-3xl font-bold mb-6">Product Listing</h2>
        <div class="mb-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div>
          <h3 class="font-semibold mb-2" aria-label="Filter by category">Filter by</h3>
          <div class="space-y-2">
            <div>
              <label class="flex items-center gap-2">
                <input type="checkbox" value="all" v-model="selectedCategories" />
                All
              </label>
            </div>
            <div v-for="category in categories" :key="category.id">
              <label class="flex items-center gap-2">
                <input type="checkbox" :value="category.name" v-model="selectedCategories" />
                {{ category.name }}
              </label>
            </div>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <section>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-lg p-4 shadow flex flex-col items-center cursor-pointer transition duration-200 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-[#e29396]"
            @click="router.push(`/products/${product.id}`)"
          >
            <img
              :src="`/images/products/${product.imageName}`"
              :alt="product.name"
              loading="lazy"
              class="w-24 h-24 object-cover mb-2"
            />
            <div class="text-center">
              <div class="font-medium">{{ product.name }}</div>
              <div class="text-sm text-gray-600">${{ product.price.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { useGetCategories } from '@/composable/category/useGetCategories'
import { useGetProducts } from '@/composable/product/useGetProducts'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const { products } = storeToRefs(productStore)
const { categories } = storeToRefs(categoryStore)
const { fetch: getCategories } = useGetCategories()
const { fetch: getProducts } = useGetProducts()

const search = ref('')
const selectedCategories = ref<string[]>(['all'])

const initialCategory = route.query.category as string | undefined

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory =
      selectedCategories.value.includes('all') ||
      selectedCategories.value.includes(product.categoryName)
    return matchSearch && matchCategory
  })
})

onMounted(async () => {
  if (!products.value.length) getProducts()
  if (!categories.value.length) getCategories()

  if (initialCategory && categories.value.some((c) => c.name === initialCategory)) {
    selectedCategories.value = [initialCategory]
  }
})
</script>
