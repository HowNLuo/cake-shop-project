<template>
  <div class="p-8">
    <h2 class="text-3xl font-bold mb-6">Order Management</h2>
    <div class="bg-white rounded-lg shadow">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4">Order ID</th>
            <th class="py-3 px-4">Order Date</th>
            <th class="py-3 px-4">Customer</th>
            <th class="py-3 px-4">Total</th>
            <th class="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orderStore.orders" :key="order.id">
            <tr @click="toggleOrderDetail(order.id)" class="hover:bg-gray-50 cursor-pointer">
              <td class="py-3 px-4 border-b">#{{ order.id }}</td>
              <td class="py-3 px-4 border-b">{{ formatDate(order.createdAt) }}</td>
              <td class="py-3 px-4 border-b">{{ order.fullName }}</td>
              <td class="py-3 px-4 border-b">${{ order.total.toFixed(2) }}</td>
              <td class="py-3 px-4 border-b">
                <span
                  :class="[
                    'px-2 py-1 rounded text-sm font-medium',
                    order.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Processing'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700',
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
            </tr>
            <tr v-if="expandedOrderIds.includes(order.id)">
              <td colspan="5" class="bg-gray-50 px-4 py-4">
                <div class="bg-white rounded-lg shadow-md p-4">
                  <h4 class="font-semibold text-gray-800 text-base border-b pb-2 mb-3">
                    Order Items
                  </h4>
                  <ul class="text-sm divide-y divide-gray-100">
                    <li
                      v-for="item in order.items"
                      :key="item.id"
                      class="grid grid-cols-[1fr_auto-auto] items-center py-2 gap-x-4"
                    >
                      <span class="text-gray-800">{{ item.productName }}</span>
                      <span class="text-right text-gray-600">Qty: {{ item.quantity }}</span>
                      <span class="text-right text-gray-800 font-medium"
                        >${{ (item.price * item.quantity).toFixed(2) }}</span
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { useGetOrders } from '@/composable/order/useGetOrders'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const { fetch: getOrders } = useGetOrders()

const expandedOrderIds = ref<number[]>([])

const toggleOrderDetail = (id: number) => {
  if (expandedOrderIds.value.includes(id)) {
    expandedOrderIds.value = expandedOrderIds.value.filter((i) => i !== id)
  } else {
    expandedOrderIds.value.push(id)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  if (!orders.value.length) getOrders()
})
</script>
