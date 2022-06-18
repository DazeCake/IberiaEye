<template>
  <div class="divider text-xl text-info">运行日志</div>
  <div class="flex flex-wrap flex-row justify-between">
    <Console :data="logs" :next="next" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { GetLogs } from '../plugins/axios'
import Console from '../components/Element/Console.vue'
const page = ref(1)
const logs = ref([])
const getLogs = async () => {
  await GetLogs(page.value, 100).then((res) => {
    logs.value = res.data
  })
}
getLogs()
const next = (first) => {
  first === 1 ? (page.value = 1) : page.value++
  getLogs()
}
</script>
