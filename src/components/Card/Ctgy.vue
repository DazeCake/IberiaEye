<template>
  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <img class="rounded-t-lg" :src=" + data['Bg'] + '.png'" alt="" />
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold text-white">{{data['Title']}}</h5>
      <p class="mb-3 font-normal text-gray-300">
        设备名&emsp;：8848钛金手机<br>
        添加时间：昨天
      </p>
      <button class="btn btn-info btn-block">设备设置 →</button>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    data: Object
  })
</script>