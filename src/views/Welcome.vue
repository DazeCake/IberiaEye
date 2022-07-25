<template>
  <div class="flex flex-col space-y-3 duration-1000 items-center text-center bg-gray-800 h-screen">
    <!-- 标题 -->
    <div class="space-y-1 mt-6 mb-3">
      <h1 class="text-4xl mt-6 font-semibold text-white">
        <span>阿戈尔科技</span>
      </h1>
      <h3 class="text-gray-300">基于图色识别的高性能明日方舟托管服务</h3>
    </div>
    <!-- 引言 -->
    <div class="space-y-1 text-x1 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        class="absolute left-3 w-8 h-8 text-gray-300"
      >
        <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
        <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
      </svg>
      <h2>你有没有听见手机的悲鸣？</h2>
      <h2>你有没有感受到肝脏在分崩离析？</h2>
      <h2>你不曾注意埃及法老在狞笑！</h2>
      <h2>你是否想过.....</h2>
      <h2>长草不再是长草，搓玉不再是搓玉!</h2>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="absolute right-3 w-8 h-8 text-gray-300">
        <path fill="currentColor" d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
        <path fill="currentColor" d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
      </svg>
    </div>
    <!-- 展示 -->
    <!-- 按钮 -->
    <div class="space-x-3 space-y-9 mt-40">
      <van-button type="default" class="w-32 shadow-lg" color="#0396ff">登陆</van-button>
      <van-button type="primary" class="w-32 shadow-lg" color="linear-gradient(to right, #17ead9, #6078ea)">
        注册
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
