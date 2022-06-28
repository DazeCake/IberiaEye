<template>
  <div>
    <div class="login-box">
      <h1>登陆</h1>
      <el-form ref="loginFromRef" :model="loginFrom" status-icon :rules="rules" label-width="50px" class="loginFrom">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginFrom.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFrom.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button @click="">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '../types/login'
import { adminLogin } from '../http/api'

import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' },
      ],
    }

    const login = () => {
      data.loginFromRef?.validate((valid) => {
        if (valid) {
          // console.log('验证通过')
          adminLogin(data.loginFrom).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            router.push('/console')
          })
        }
      })
    }

    return {
      ...toRefs(data),
      rules,
      login,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  .loginFrom {
    width: 100%;
  }
}
</style>
