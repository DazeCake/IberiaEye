<template>
  <div>
    <div class="register-box">
      <h1>注册</h1>
      <el-form :model="account" status-icon label-width="50px" class="registerFrom">
        <el-row :gutter="20">
          <el-col :span="8"><span>昵称</span></el-col>
          <el-col :span="16">
            <el-input v-model="account.name" placeholder="请输入昵称" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>账号</span></el-col>
          <el-col :span="16">
            <el-input v-model="account.account" placeholder="请输入方舟账号" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>密码</span></el-col>
          <el-col :span="16">
            <el-input v-model="account.password" placeholder="请输入方舟密码" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>重复密码</span></el-col>
          <el-col :span="16">
            <el-input v-model="repassword" placeholder="请再次输入密码" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>服务器</span></el-col>
          <el-col :span="16">
            <el-radio-group v-model="account.server">
              <el-radio label="0">官服</el-radio>
              <el-radio label="1">B服</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>CDK</span></el-col>
          <el-col :span="16">
            <el-input v-model="cdk" autocomplete="off" />
          </el-col>
        </el-row>
        <el-form-item class="register-btn">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="login">返回登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '../types/register'
import { createUser } from '../http/api'

import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()

    const login = () => {
      router.push('/user_login')
    }

    const register = () => {
      if (data.account.password !== data.repassword) {
        alert('两次密码不一致')
        return
      }
      if (data.account.server == -1) {
        alert('请选择服务器')
        return
      }
      createUser(data.cdk, data.account).then((res) => {
        router.push('/user_login')
      })
    }

    return {
      ...toRefs(data),
      login,
      register,
    }
  },
})
</script>

<style lang="scss" scoped>
.register-box {
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  .registerFrom {
    width: 100%;
    .register-btn {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
