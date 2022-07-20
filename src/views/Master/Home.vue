<template>
  <div class="divider text-xl text-info mt-0">运行日志</div>
  <div class="flex flex-wrap flex-row justify-between">
    <Console :data="logs" :next="next" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { GetLogs } from '../../plugins/axios'
import Console from '../../components/Element/Console.vue'
import { createToast } from 'mosha-vue-toastify'
const page = ref(1)
const logs = ref([])
const getLogs = async () => {
  await GetLogs(page.value, 100).then((res) => {
    logs.value = res.data
  })
  createToast('读取日志成功', {
    showIcon: true,
    type: 'success',
    transition: 'bounce',
  })
}
getLogs()
const next = (first) => {
  first === 1 ? (page.value = 1) : page.value++
  getLogs()
}
</script>
