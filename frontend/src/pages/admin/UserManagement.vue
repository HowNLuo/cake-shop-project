<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">User Management</h1>
    <table class="min-w-full text-left text-sm font-light">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 font-medium">ID</th>
          <th class="px-6 py-4 font-medium">Name</th>
          <th class="px-6 py-4 font-medium">Email</th>
          <th class="px-6 py-4 font-medium">Role</th>
          <th class="px-6 py-4 font-medium">Created At</th>
          <th class="px-6 py-4 font-medium">Last Login</th>
          <th class="px-6 py-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email" class="border-b">
          <td class="px-6 py-4">{{ user.id }}</td>
          <td class="px-6 py-4">
            {{ user.name }}
          </td>
          <td class="px-6 py-4">
            {{ user.email }}
          </td>
          <td class="px-6 py-4">
            {{ user.role }}
          </td>
          <td class="px-6 py-4">
            {{ formatDate(user.createdAt) }}
          </td>
          <td class="px-6 py-4">
            {{ formatDate(user.lastLoginTime) }}
          </td>
          <td class="px-6 py-4">
            <button
              class="border border-gray-300 rounded px-3 py-1 text-sm bg-white hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
              @click="openEditDialog(user.id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <UserForm v-if="showDialog" :user-id="selectedUserId" @close="showDialog = false" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useGetUsers } from '@/composable/user/useGetUsers'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const { fetch: getUsers } = useGetUsers()

const showDialog = ref(false)
const selectedUserId = ref<number | undefined>()

const openEditDialog = (userId: number) => {
  selectedUserId.value = userId
  showDialog.value = true
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  if (!users.value.length) getUsers()
})
</script>
