<template>
  <component is="layout">
    <router-view />
  </component>
</template>
<script setup>
  import { load } from './plugins/theme'
  import { isLarge } from './plugins/common'
  import {getCurrentInstance, onMounted} from "vue";
  import {userStore} from "./store/user";
  import {storeToRefs} from "pinia/dist/pinia";
  import {configStore} from "./store/config";
  import { createToast } from 'mosha-vue-toastify';
  import {useRouter} from "vue-router";
  load()
  const _user = userStore()
  const {user} = storeToRefs(_user)

  const _config = configStore()
  const {config} = storeToRefs(_config)

  const router = useRouter()
  if (!config.value.url) {
    createToast('请先配置服务器地址',{
      type: 'info',
      showIcon: true,
    })
    router.push('/Config')
  } else {
    const instance = getCurrentInstance()
    instance.appContext.config.globalProperties.$axios.defaults.baseURL = `http://${config.value.url}/`

    if (user.value.isLogin) {
      instance.appContext.config.globalProperties.$axios.defaults.headers['Authorization'] = "Bearer " + user.value.token
    }
  }
  onMounted(() => {
    isLarge.value = document.documentElement.clientWidth >= 1024
    window.onresize = () => {
      isLarge.value = document.documentElement.clientWidth >= 1024
    }
  })
</script>