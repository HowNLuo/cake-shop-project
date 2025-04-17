<template>
  <div v-if="order" class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow mt-10">
    <h1 class="text-2xl font-bold mb-4">Checkout Confirmation</h1>
    <p class="text-lg font-semibold mb-1">Thank you for your order!</p>
    <p class="mb-6">Your order number is #{{ order.orderNumber }}</p>
    <p class="text-sm text-gray-500 mb-2">Order placed on {{ formatDateTime(order.createdAt) }}</p>

    <h2 class="text-lg font-bold mb-2">Order Summary</h2>
    <ul class="mb-4">
      <li
        v-for="item in order.items"
        :key="item.id"
        class="grid grid-cols-[1fr_auto-auto] text-sm py-1 gap-x-4"
      >
        <span>{{ item.productName }}</span>
        <span class="text-right whitespace-nowrap">Qty: {{ item.quantity }}</span>
        <span class="text-right">${{ (item.price * item.quantity).toFixed(2) }}</span>
      </li>
    </ul>
    <div class="flex justify-between font-semibold border-t pt-2">
      <span>Total</span>
      <span>${{ order.total.toFixed(2) }}</span>
    </div>

    <p class="mt-6 text-sm">
      Your order has been successfully placed. You will receive an email confirmation shortly.
    </p>
    <div class="mt-6 text-center">
      <button
        @click="router.push('/')"
        class="bg-[#e29396] text-white px-6 py-2 rounded-md hover:bg-[#d17e81] transition"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import type { Order } from '@/types/order'
import { getOrdersByUserId } from '@/api/order'
import { useGetOrder } from '@/composable/order/useGetOrder'

const route = useRoute()
const router = useRouter()
const order = ref<Order | null>()
const {fetch: getOrder} = useGetOrder()

const formatDateTime = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    order.value = await getOrder(id)
  }
})
</script>
