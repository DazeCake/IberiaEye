<template>
  <div class="flex">
    <div :class="isShow ? 'block' : 'hidden'"
      @click="isShow = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>
    <div class="nav-side"
      :class="isShow ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    >
      <div class="flex items-center justify-center mt-6 mb-5">
        <div class="flex items-center">
          <span class="mx-2 text-2xl font-semibold text-white">
            审判庭后台管理
          </span>
        </div>
      </div>
      <nav class="m-2">
        <router-link
            v-for="k in menu"
            class="flex items-center p-3 mt-2 duration-200 border-l-4 rounded-r-xl"
            :class="$route.name === k.id ? 'nav-active' : 'nav-inactive'"
            :to="'/' + k.id"
        >
          <span class="mx-4">{{k.name}}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { isShow } from "./showNav";
  const menu = ref([])
  menu.value = [{
    name: '控制台',
    id: 'Dashboard',
    icon: 'IconAccountBox'
  },{
    name: '设备管理',
    id: 'Device',
    icon: 'IconAccountBox'
  }, {
    name: '账号管理',
    id: 'Account',
    icon: 'IconAccountBox'
  }, {
    name: '日志管理',
    id: 'Log',
    icon: 'UserGroup'
  }, {
    name: '任务管理',
    id: 'Task',
    icon: 'Topic'
  }]
</script>
