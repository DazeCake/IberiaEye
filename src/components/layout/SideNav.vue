<template>
  <div class="flex" v-if="user.isLogin">
    <div
      :class="isShow ? 'block' : 'hidden'"
      @click="isShow = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>
    <div class="nav-side" :class="isShow ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'">
      <div class="flex items-center justify-center mt-6 mb-5">
        <div class="flex items-center">
          <span class="mx-2 text-2xl font-semibold text-white">
            审判庭{{ user.isAdmin ? '后台管理' : '个人中心' }}
          </span>
        </div>
      </div>
      <nav class="m-2">
        <router-link
          v-for="k in menu"
          class="flex items-center p-3 mt-2 duration-200 border-l-4 rounded-r-xl"
          :class="$route.path === k.id ? 'nav-active' : 'nav-inactive'"
          :to="k.id"
          @click="isShow = false"
        >
          <span class="mx-4">{{ k.name }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { isShow } from './showNav'
import { userStore } from '../../store/user'
import { storeToRefs } from 'pinia/dist/pinia'
const menu = ref([])

const _user = userStore()
const { user } = storeToRefs(_user)

watch(
  () => user.value.isAdmin,
  (data) => {
    if (data === true) {
      menu.value = [
        {
          name: '控制台',
          id: '',
          icon: 'IconAccountBox',
        },
        {
          name: '设备管理',
          id: 'Device',
          icon: 'IconAccountBox',
        },
        {
          name: '账号管理',
          id: 'Account',
          icon: 'IconAccountBox',
        },
        {
          name: 'CDK管理',
          id: 'CDK',
          icon: 'CDK',
        },
        {
          name: '日志管理',
          id: 'Log',
          icon: 'Log',
        },
        {
          name: '任务管理',
          id: 'Task',
          icon: 'Task',
        },
        {
          name: '基础配置',
          id: 'Config',
          icon: 'Config',
        },
      ]
    }
  }
)
if (user.value.isAdmin) {
  menu.value = [
    {
      name: '控制台',
      id: '/master/home',
    },
    {
      name: '设备管理',
      id: '/master/Device',
    },
    {
      name: '账号管理',
      id: '/master/Account',
    },
    {
      name: 'CDK管理',
      id: '/master/CDK',
      icon: 'CDK',
    },
    {
      name: '日志管理',
      id: 'Log',
      icon: 'Log',
    },
    {
      name: '任务管理',
      id: 'Task',
      icon: 'Task',
    },
  ]
}
</script>
