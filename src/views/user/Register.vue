<template>
  <div class="bg-gray-800">
    <van-icon name="arrow-left" color="#bdc3c7" size="32px" class="m-3" @click="back" />
  </div>
  <div class="flex flex-col space-y-3 duration-1000 items-center text-center bg-gray-800 h-screen">
    <!-- 标题 -->
    <div class="space-y-1 mb-3">
      <h1 class="text-2xl font-semibold text-white">
        <span>注册</span>
      </h1>
    </div>
    <van-divider />
    <van-cell-group inset>
      <van-field v-model="account.name" label="昵称" placeholder="请输入昵称" left-icon="smile-comment" />
      <van-field v-model="account.account" label="账号" placeholder="请输入游戏账号" left-icon="contact" />
      <van-field
        v-model="account.password"
        label="密码"
        placeholder="请输入游戏密码"
        type="password"
        left-icon="lock"
        clearable
      />
      <van-field
        v-model="rePassword"
        label="重复密码"
        placeholder="请再次输入游戏密码"
        type="password"
        left-icon="lock"
        clearable
      />
      <van-field v-model="cdk" label="CDK" placeholder="请输入CDK" left-icon="vip-card" clearable />
      <van-radio-group v-model="account.server" direction="horizontal" class="m-2 flex flex-auto place-content-center">
        <van-radio :name="0">官服</van-radio>
        <van-radio :name="1">B服</van-radio>
      </van-radio-group>
    </van-cell-group>
    <div class="absolute bottom-24">
      <van-button type="default" class="w-32 shadow-lg" color="#0396ff" @click="register">注册</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userRegister } from '../../api/api'
import { AccountImpl } from '../../types/account'

const router = useRouter()
const account = reactive(new AccountImpl())
const rePassword = ref('')
const cdk = ref('')

const register = () => {
  if (account.password !== rePassword.value) {
    Toast.fail('密码不一致')
    return
  } else if (cdk.value == '' || account.name == '' || account.account == '' || account.password == '') {
    Toast.fail('请填写完整信息')
    return
  }
  userRegister(account, cdk.value).then((res) => {
    if (res.data.code != 200) {
      Toast.fail(res.data.msg)
    } else {
      Toast.success('注册成功')
      router.push('/user/login')
    }
  })
}

const back = () => {
  router.push('/')
}
</script>

<style scoped></style>
