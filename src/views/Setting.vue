<template>
  <HeadTitle title="远控信息配置" />
  <Tabs :title="title" class="my-2" />
  <router-view class="mt-4" />
</template>

<script setup>
import HeadTitle from '../components/Card/HeadTitle.vue'
import Tabs from '../components/Tabs.vue'
import { reactive, ref } from 'vue'
const title = reactive([
  {
    name: '基础设置',
    to: '/base',
    on: false,
    disabled: false,
  },
  {
    name: '不基础配置',
    to: '/seo',
    on: false,
    disabled: false,
  },
  {
    name: '其他配置',
    to: '/other',
    on: false,
    disabled: false,
  },
])
</script>
