<template>
  <div class="flex max-w-fit overflow-hidden rounded-r-lg shadow-md bg-gray-100">
    <div class="w-2 bg-info"></div>
    <div class="flex items-center p-2">
      <div class="mx-3">
        <p class="text-info text-lg mr-4">{{ title }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
})
</script>
