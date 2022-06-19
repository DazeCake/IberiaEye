<template>
  <div class="flex h-screen font-roboto">
    <SideNav />
    <div class="flex-1 flex flex-col overflow-hidden bg-gray-200">
      <div class="m-5" :class="{ 'm-0': !isLarge }">
        <Header />
      </div>
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto p-5">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Header from './Header.vue'
import SideNav from './SideNav.vue'
import { isLarge } from '../../plugins/common'
</script>
