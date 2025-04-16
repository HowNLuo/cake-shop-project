<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold flex items-center gap-2 mb-6">Shopping Cart</h1>
    <hr class="mb-6" />

    <div v-if="cartStore.items.length === 0" class="text-center text-gray-500">
      Your cart is empty. Please add some delicious cakes to your cart before checking out!
    </div>

    <div
      v-for="item in cartStore.items"
      :key="item.id"
      class="flex items-center justify-between p-4 border rounded-lg mb-4"
    >
      <div class="flex items-center gap-4">
        <img
          :src="`/src/assets/images/products/${item.imageName}`"
          :alt="item.name"
          class="w-16 h-16 object-cover rounded"
        />
        <div>
          <div class="font-semibold text-lg">{{ item.name }}</div>
          <div class="text-gray-600">${{ item.price.toFixed(2) }}</div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button @click="decreaseQuantity(item.id)" class="px-2 py-1 bg-gray-100 rounded">−</button>
        <span class="min-w-[32px] text-center font-semibold">{{ item.quantity }}</span>
        <button @click="increaseQuantity(item.id)" class="px-2 py-1 bg-gray-100 rounded">＋</button>
        <button
          @click="cartStore.removeFromCart(item.id)"
          class="text-sm text-gray-500 underline ml-4"
        >
          Remove
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center text-lg font-semibold mt-8">
      <span>Total:</span>
      <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
    </div>

    <div class="mt-6" v-if="cartStore.items.length > 0">
      <button
        class="bg-[#e29396] text-white font-bold w-full py-3 rounded-full hover:bg-[#d87f83]"
        @click="router.push('/checkout')"
      >
        Checkout
      </button>
    </div>

    <div class="mt-4">
      <button
        @click="router.push('/products')"
        class="text-sm text-[#e29396] underline hover:text-[#d87f83]"
      >
        ← Continue Shopping
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const increaseQuantity = (id: number) => {
  const item = cartStore.items.find((i) => i.id === id)
  if (item) item.quantity++
}

const decreaseQuantity = (id: number) => {
  const item = cartStore.items.find((i) => i.id === id)
  if (item && item.quantity > 1) item.quantity--
}
</script>
