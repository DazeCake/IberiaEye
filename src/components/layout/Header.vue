<template>
  <div class="navbar bg-base-100 shadow-lg" :class="{ 'rounded-lg': isLarge }">
    <div class="navbar-start">
      <div class="btn btn-circle bg-base-100 text-gray-600 border-0 hover:bg-gray-100" @click="isShow = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
    </div>
    <div class="navbar-center text-info font-bold">
      <div class="text-lg breadcrumbs lg:inline hidden">
        <ul>
          <li><a>审判庭</a></li>
          <li>
            <a>{{ $route.meta['title'] }}</a>
          </li>
        </ul>
      </div>
      <div class="lg:hidden text-xl">
        {{ $route.meta['title'] }}
      </div>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" alt="avatar" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li v-if="!user.isLogin"><a @click="$router.push('/user/login')">登录</a></li>
          <li v-else><a @click="logout">退出</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isShow } from './showNav'
import { isLarge } from '../../plugins/common'
import { userStore } from '../../store/user'
import { createToast } from 'mosha-vue-toastify'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia/dist/pinia'
const _user = userStore()
const { user } = storeToRefs(_user)
const logout = () => {
  _user.logout()
  createToast('退出成功', {
    showIcon: true,
    type: 'success',
    transition: 'bounce',
  })
  const router = useRouter()
  router.push('/')
}
</script>
