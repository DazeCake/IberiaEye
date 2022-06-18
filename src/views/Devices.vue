<template>
  <div class="flex flex-row justify-between">
    <HeadTitle title="设备管理"/>
    <button class="btn btn-info mx-2">新增设备 +</button>
  </div>
  <div class="grid gap-2 my-4" :class="isLarge ? 'grid-cols-4' : 'grid-cols-1'">
    <Ctgy v-for="row of devices" :data="row" />
  </div>
</template>

<script setup>
  import HeadTitle from '../components/Card/HeadTitle.vue'
  import Ctgy from "../components/Card/Ctgy.vue";
  import {isLarge} from "../plugins/common";
  import {ref} from "vue";
  import {GetLoadDevices} from "../plugins/axios";
  const devices = ref([])
  GetLoadDevices().then(res => {
    devices.value = res.data
  })
</script>