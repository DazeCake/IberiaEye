<template>
  <div class="container text-gray-800">
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs">
        <colgroup>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col class="w-24">
        </colgroup>
        <thead class="bg-gray-300">
          <tr class="text-left">
            <th class="py-3 px-3 pr-5" v-for="k in header">{{ k }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-opacity-20 border-gray-300 bg-gray-50" v-for="k in data">
            <td class="p-3" v-for="key in id">
              <p v-if="Array.isArray(key)">{{ key[1](k[key[0]]) }}</p>
              <p v-else>{{ k[key] }}</p>
            </td>
            <td class="p-3">
              <button class="btn btn-xs btn-info">修改</button>
              <button class="btn btn-xs btn-info mx-3">不修改</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    header: Array,
    data: Array,
    id: Array,
    action: Array
  })
</script>