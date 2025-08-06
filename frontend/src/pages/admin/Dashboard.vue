<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white shadow rounded p-4 flex flex-col items-center">
        <img src="/images/dashboard/order.webp" class="w-10 h-10 mb-2" />
        <p class="text-gray-500">Today's Orders</p>
        <p class="text-xl font-bold">{{ stats.todayOrders }}</p>
      </div>
      <div class="bg-white shadow rounded p-4 flex flex-col items-center">
        <img src="/images/dashboard/coin.webp" class="w-10 h-10 mb-2" />
        <p class="text-gray-500">Monthly Revenue</p>
        <p class="text-xl font-bold">${{ stats.monthlyRevenue }}</p>
      </div>
      <div class="bg-white shadow rounded p-4 flex flex-col items-center">
        <img src="/images/dashboard/cake.webp" class="w-10 h-10 mb-2" />
        <p class="text-gray-500">Products</p>
        <p class="text-xl font-bold">{{ stats.productCount }}</p>
      </div>
      <div class="bg-white shadow rounded p-4 flex flex-col items-center">
        <img src="/images/dashboard/user.webp" class="w-10 h-10 mb-2" />
        <p class="text-gray-500">Total Users</p>
        <p class="text-xl font-bold">{{ stats.userCount }}</p>
      </div>
    </div>

    <!-- Orders and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Orders -->
      <div class="bg-white shadow rounded p-4 lg:col-span-2">
        <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2">Order Number</th>
              <th class="py-2">Customer</th>
              <th class="py-2">Amount</th>
              <th class="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in recentOrders" :key="index" class="border-b">
              <td class="py-2">#{{ order.orderNumber }}</td>
              <td class="py-2">{{ order.fullName }}</td>
              <td class="py-2">${{ order.total.toFixed(2) }}</td>
              <td class="py-2">
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
          </tbody>
        </table>
      </div>

      <!-- Management -->
      <div class="bg-white shadow rounded p-4">
        <h2 class="text-lg font-semibold mb-4">Management</h2>
        <div class="flex flex-col gap-5">
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded"
            @click="router.push('products-management')"
          >
            Product Management
          </button>
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded"
            @click="router.push('categories-management')"
          >
            Category Management
          </button>
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded"
            @click="router.push('orders-management')"
          >
            Order Management
          </button>
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded"
            @click="router.push('users-management')"
          >
            User Management
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { getDashboardStats } from '@/api/dashboard'
import type { Order } from '@/types/order'
import type { DashboardStats } from '@/types/dashboard'
import { useGetOrders } from '@/composable/order/useGetOrders'
import { storeToRefs } from 'pinia'

const router = useRouter()
const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const { fetch: getOrders } = useGetOrders()

const recentOrders = ref<Order[]>([])
const stats = ref<DashboardStats>({
  todayOrders: 0,
  monthlyRevenue: 0,
  productCount: 0,
  userCount: 0,
})

onMounted(async () => {
  if (!orders.value.length) await getOrders()
  console.log(orders.value)
  recentOrders.value = orders.value.slice(-5).reverse()
  const dashboardData = await getDashboardStats()
  stats.value = dashboardData
})
</script>
