<template>
  <div class="flex flex-col max-w-md mx-auto rounded-md p-6 sm:p-10 bg-gray-50 shadow-2xl">
    <div class="mb-6 text-center">
      <h1 class="my-3 text-4xl font-bold text-info">Master 登录</h1>
    </div>
    <div class="space-y-8">
      <div class="space-y-4 text-info font-bold">
        <div>
          <label class="block mb-2">账号</label>
          <input type="text" v-model="account" placeholder="admin" class="qbz-input mb-2">
        </div>
        <div>
          <div class="flex justify-between mb-2">
            <label for="password">密码</label>
          </div>
          <input type="password" v-model="password" placeholder="请输入密码" class="qbz-input mb-2">
        </div>
      </div>
      <div class="space-y-2">
        <button @click="login" class="btn px-8 py-3 btn-block btn-info">登录</button>
        <p class="px-6 text-sm text-center text-gray-400">Powered by @skadiD</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {Login} from "../plugins/axios";
  import {getCurrentInstance, ref} from "vue";
  import { createToast } from 'mosha-vue-toastify';
  import {useRoute, useRouter} from "vue-router";
  import {userStore} from "../store/user";
  import {storeToRefs} from "pinia/dist/pinia";
  const account = ref('')
  const password = ref('')
  const router = useRouter()
  const route = useRoute()
  const user = userStore();
  const instance = getCurrentInstance();
  const login = () => {
    Login(account.value, password.value).then((resp) => {
      if (resp.code === 200) {
        createToast('欢迎回来，正在跳转', {
          showIcon: true,
          type: 'success',
          transition: 'bounce',
        })
        user.login(resp['data']['token'])
        instance.appContext.config.globalProperties.$axios.defaults.headers['Authorization'] = "Bearer " + resp['data']['token']
        router.push(route.query.redirect ? route.query.redirect : '/')
        return
      }
      createToast('错误的登录信息：' + resp['msg'], {
        showIcon: true,
        type: 'info',
        transition: 'bounce',
      })
    })
  }
</script>