<template>
  <div class="bg-[#fffaf3] min-h-screen font-sans text-[#2c2c2c] pt-[72px] flex flex-col">
    <!-- Global Header -->
    <Header />
    <!-- Page Content -->
    <div class="flex-1">
      <RouterView />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
  <Alert />
  <Message />
  <Loading />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
</script>
