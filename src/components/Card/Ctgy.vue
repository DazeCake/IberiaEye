<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold text-white flex items-center justify-between">
        #{{ data['id'] + ' ' + data['deviceName'] }}
        <div class="badge badge-outline badge-lg" :class="_status(data['status'])">{{ status(data['status']) }}</div>
      </h5>
      <p class="mb-3 font-normal text-gray-300">
        <span class="text-orange-500">设备Token：</span><br />{{ data['deviceToken'] }}
      </p>
      <p class="mb-3 font-normal text-gray-300">
        <span class="text-orange-500">到期时间：</span><br />{{ data['expireTime'] }}
      </p>
      <button class="btn btn-info btn-block">设备设置 →</button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: Object,
})
const status = (tag) => {
  switch (tag) {
    case '0':
      return '离线'
    case '1':
      return '空闲'
    case '1001':
      return '日常'
    case '1002':
      return '肉鸽'
    default:
      return '未知'
  }
}
const _status = (tag) => {
  switch (tag) {
    case '0':
      return 'text-red-600'
    case '1':
      return 'text-green-500'
    case '1001':
      return 'text-info'
    case '1002':
      return 'text-orange-500'
    default:
      return 'text-white'
  }
}
</script>
