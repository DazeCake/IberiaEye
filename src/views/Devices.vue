<template>
  <div class="flex flex-row justify-between">
    <HeadTitle title="设备管理" />
    <button class="btn btn-info mx-2">新增设备 +</button>
  </div>
  <div class="grid gap-2 my-4" :class="isLarge ? 'grid-cols-4' : 'grid-cols-1'">
    <Ctgy v-for="row of devices" :data="row" />
  </div>
  <button class="btn btn-block btn-info" @click="fresh">刷新（{{ times }} 秒后自动刷新）</button>
</template>

<script setup>
import HeadTitle from '../components/Card/HeadTitle.vue'
import Ctgy from '../components/Card/Ctgy.vue'
import { isLarge } from '../plugins/common'
import { ref } from 'vue'
import { GetLoadDevices } from '../plugins/axios'
const devices = ref([])
const times = ref(5)

const fresh = () => {
  times.value = 5
  GetLoadDevices().then((res) => {
    devices.value = res.data
  })
}
fresh()
setInterval(() => {
  if (times.value <= 0) {
    fresh()
  } else {
    times.value--
  }
}, 1000)
</script>
