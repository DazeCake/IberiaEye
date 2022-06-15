<template>
  <header class="flex items-center justify-between px-6 py-3 bg-white border-b-4 border-indigo-600">
    <div class="flex items-center lg:hidden">
      <button class="text-gray-500" @click="isShow = true">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="lg:hidden">
      <span class="text-info mx-2 text-xl font-bold">{{$route.meta['title'] || '审判庭云控管理'}}</span>
    </div>
    <div class="text-sm breadcrumbs lg:inline hidden">
      <ul>
        <li><a>审判庭</a></li>
        <li><a>{{$route.meta['title']}}</a></li>
      </ul>
    </div>
    <div class="relative h-8">
      <button class="btn btn-circle overflow-hidden border-none bg-white btn-sm" @click="dropdownOpen = !dropdownOpen">
        <img alt="head" src="https://q1.qlogo.cn/g?b=qq&nk=10003653&s=640"/>
      </button>
      <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
      ></div>
      <transition
          enter-active-class="transition duration-50 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"

          leave-active-class="transition duration-50 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
      >
        <div v-show="dropdownOpen" class="absolute right-0 z-10">
          <ul class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-40 shadow-xl rounded-md">
            <li>
              <router-link to="/login" class="router-link-active router-link-exact-active h-10" aria-current="page">登录</router-link>
              <router-link to="/login" @click="logout" class="router-link-active router-link-exact-active h-10" aria-current="page">安全退出</router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
  import { ref } from "vue";
  const dropdownOpen = ref(false);
  import { isShow } from "./showNav";
  import {userStore} from "../../store/user";
  import {createToast} from "mosha-vue-toastify";
  const user = userStore()
  const logout = () => {
    user.logout()
    createToast('退出成功',{
      showIcon: true,
      type: 'success',
      transition: 'bounce',
    })
  }
</script>