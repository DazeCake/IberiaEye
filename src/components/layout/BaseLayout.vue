<template>
  <div class="flex h-screen font-roboto">
    <SideNav />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Header from './Header.vue'
import SideNav from './SideNav.vue'
</script>
