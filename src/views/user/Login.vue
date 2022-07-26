<template>
  <div class="bg-gray-800">
    <van-icon name="arrow-left" color="#bdc3c7" size="32px" class="m-3" @click="back" />
  </div>
  <div class="flex flex-col space-y-3 duration-1000 items-center text-center bg-gray-800 h-screen">
    <!-- 标题 -->
    <div class="space-y-1 mb-3">
      <h1 class="text-2xl font-semibold text-white">
        <span>登陆</span>
      </h1>
    </div>
    <van-divider />
    <van-cell-group inset>
      <van-field v-model="account" label="账号" placeholder="请输入账号" left-icon="contact" />
      <van-field v-model="password" label="密码" placeholder="请输入密码" type="password" left-icon="lock" clearable />
    </van-cell-group>
    <div class="absolute bottom-24">
      <van-button type="default" class="w-32 shadow-lg" color="#0396ff" @click="login">登陆</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'
import { userLogin } from '../../api/api'
import { useRouter } from 'vue-router'

const account = ref('')
const password = ref('')
const router = useRouter()

// 登陆
const login = () => {
  userLogin({
    username: account.value,
    password: password.value,
  }).then((res) => {
    console.log(res)
    if (res.data.code != 200) {
      Toast.fail(res.data.msg)
    } else {
      Toast.success('登陆成功')
      localStorage.setItem('token', res.data.token)
      router.push('/user/home')
    }
  })
}

const back = () => {
  router.push('/')
}
</script>

<style scoped></style>
