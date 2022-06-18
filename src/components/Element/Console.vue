<template>
  <pre class="w-full max-h-96" ref="pre">
    <template v-if="!data.length">
      没有数据
      <span class="font-bold text-xl" @click="first(1)"><br>点击回到第一页</span>
    </template>
    <template v-else v-for="k in data">
      <span :class="k['level'] === 'INFO' ? 'text-green-500': k['level'] === 'WARN' ? 'text-orange-500' : 'text-red-500'"> <span>[{{k['level']}}] </span>
      {{ k['title'] + ' ' + k['time'] }}<br></span>
    </template>
    <span v-if="data.length" class="font-bold text-xl" @click="first"><br>点击加载更多...</span>
  </pre>
</template>
<div class=""></div>
<script setup>
  import {ref} from "vue";
  const props = defineProps({
    data: {
      type: Array
    },
    next: {
      type: Function
    }
  })
  const pre = ref(null)
  const first = (reset) => {
    props.next(reset)
    pre.value.scrollTop = 0
  }
</script>