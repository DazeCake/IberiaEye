<template>
  <div
    class="flex flex-col space-y-3 duration-1000 items-center text-center"
    :class="show ? 'translate-y-0 ease-out' : '-translate-y-8 ease-in'"
  >
    <h1
      class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-600 to-purple-600 mt-5 sm:leading-none lg:mt-0 lg:text-4xl xl:text-5xl"
    >
      <span class="text-2xl lg:text-3xl xl:text-4xl">深海猎人出品</span><br />伊比利亚审判庭
    </h1>
    <p class="text-lg text-gray-900 mb-4">基于图色识别提供高性能游戏托管服务</p>
    <div class="w-full md:w-1/4 space-x-3 flex">
      <button class="btn w-1/2 btn-info shadow-lg" @click="$router.push('/user/login')">登录平台</button>
      <button class="btn w-1/2 btn-primary shadow-lg text-white animate-bounce hover:animate-none">注册账号</button>
    </div>
  </div>
  <div class="container mx-auto flex flex-col items-center pb-6 mb-4 mt-5 md:mt-0 md:p-10 md:px-12">
    <h1 class="text-4xl font-semibold leading-none text-center">泰拉人都在用</h1>
  </div>
  <div class="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
    <div class="flex flex-col items-center md:mx-12 lg:mx-0">
      <div class="relative text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          class="absolute top-0 left-0 w-8 h-8 text-gray-300"
        >
          <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
          <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
        </svg>
        <p class="px-8 md:px-10 py-1 text-lg italic">
          肉鸽，过于干燥，日常，太过无聊<br />无鳞，离群的同胞，我呼唤你，带你归巢<br />首先，注册账号，登录，托管，然后睡觉
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          class="absolute bottom-0 right-0 w-8 h-8 text-gray-300"
        >
          <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
          <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
        </svg>
      </div>
      <span class="w-12 h-1 my-2 rounded-lg bg-violet-600"></span>
      <p>大群意志</p>
    </div>
    <div class="flex flex-col items-center max-w-lg mx-12 lg:mx-0">
      <div class="relative text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="absolute top-0 left-0 w-8 h-8 text-gray-300"
        >
          <path fill="currentColor" d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
          <path fill="currentColor" d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
        </svg>
        <p class="px-10 py-1 text-lg italic">此处省略1000字小作文</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="absolute bottom-0 right-0 w-8 h-8 text-gray-300"
        >
          <path fill="currentColor" d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
          <path fill="currentColor" d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
        </svg>
      </div>
      <span class="w-12 h-1 my-2 rounded-lg bg-violet-600"></span>
      <p>Kal'tsit</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const show = ref(false)
setTimeout(() => {
  show.value = true
}, 100)
</script>
