<template>
  <div class="max-w-xl mx-auto px-6 pb-16">
    <!-- Back Button -->
    <div class="mb-4">
      <button
        @click="router.push('/products')"
        class="text-[#e29396] font-semibold hover:underline"
      >
        ← Back to products
      </button>
    </div>
    <h2 class="text-2xl font-bold mb-6 mt-10">Product Details</h2>

    <div class="bg-white rounded-xl shadow p-6 text-center">
      <img
        :src="`/src/assets/images/products/${product?.imageName}`"
        :alt="product?.name"
        loading="lazy"
        class="w-40 h-40 mx-auto mb-6 object-cover"
      />
      <h3 class="text-2xl font-bold">{{ product?.name }}</h3>
      <p class="text-xl font-semibold text-[#444] mt-1 mb-4">${{ product?.price.toFixed(2) }}</p>

      <h4 class="text-lg font-semibold mb-1">Description</h4>
      <p class="text-sm text-gray-600 mb-6 leading-relaxed">{{ product?.description }}</p>

      <h4 class="text-lg font-semibold mb-1">Ingredients</h4>
      <div class="grid grid-cols-2 gap-2 text-left mb-6">
        <div
          v-for="(item, index) in (product?.ingredients || '').split(',')"
          :key="index"
          class="flex items-start gap-2 bg-[#f9f9f9] rounded-lg px-3 py-2 shadow-sm"
        >
          <span class="text-sm text-gray-700 font-medium">{{ item.trim() }}</span>
        </div>
      </div>

      <div v-if="user?.role !== 'Admin'" class="flex justify-center items-center gap-4 mb-6">
        <button @click="decrease" class="bg-[#f8f6f0] w-10 h-10 rounded text-xl font-bold">
          −
        </button>
        <input
          type="number"
          min="1"
          max="99"
          v-model.number="quantity"
          @input="onInputQuantity"
          class="w-16 text-center border border-gray-300 rounded px-2 py-1 font-semibold"
        />
        <button @click="increase" class="bg-[#f8f6f0] w-10 h-10 rounded text-xl font-bold">
          ＋
        </button>
      </div>

      <div v-if="user?.role !== 'Admin'">
        <button
          class="bg-[#e29396] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#d87f83]"
          @click="addToCart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useMessageStore } from '@/stores/messageStore'
import { useProductStore } from '@/stores/productStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const message = useMessageStore()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const cartStore = useCartStore()
const id = +route.params.id

const product = computed(() => products.value.find((p) => p.id === id))

const quantity = ref(1)

const increase = () => {
  if (quantity.value < 99) quantity.value++
}

const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

const onInputQuantity = () => {
  if (quantity.value > 99) quantity.value = 99
  if (quantity.value < 1) quantity.value = 1
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      imageName: product.value.imageName,
      quantity: quantity.value,
    })
    message.show('Item added to cart successfully!', 'success')
  }
}

onMounted(() => {
  if (!products.value.length) {
    productStore.getProducts()
  }
})
</script>
