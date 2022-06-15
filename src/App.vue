<template>
  <component is="layout">
    <router-view />
  </component>
</template>
<script setup>
  import { load } from './plugins/theme'
  import { isLarge } from './plugins/common'
  import {getCurrentInstance, onMounted, watch} from "vue";
  import {userStore} from "./store/user";
  import {storeToRefs} from "pinia/dist/pinia";
  load()
  const _user = userStore()
  const {user} = storeToRefs(_user)
  onMounted(() => {
    isLarge.value = document.documentElement.clientWidth >= 1024
    window.onresize = () => {
      isLarge.value = document.documentElement.clientWidth >= 1024
      console.log('resize', document.documentElement.clientWidth)
    }
  })
</script>