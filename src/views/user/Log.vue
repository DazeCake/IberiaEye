<template>
  <div>
    <van-nav-bar title="日志" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.id" :title="item.title" @click="showImg(item.imageUrl)" />
      </van-list>
    </van-pull-refresh>
    <van-tabbar route>
      <van-tabbar-item to="/user/log" name="log" icon="notes-o">日志</van-tabbar-item>
      <van-tabbar-item to="/user/home" name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/user/setting" name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ImagePreview, Toast } from 'vant'
import { ref } from 'vue'
import { getUserLog } from '../../api/api'


const list: any = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const current = ref(0)
const size = ref(20)

const onLoad = () => {
  if (finished.value) {
    return
  }
  current.value++
  getUserLog(current.value, size.value).then((res) => {
    if (res.data.data.length == 0) {
      finished.value = true
    } else {
      list.value = list.value.concat(res.data.data)
    }
  })
  loading.value = false
}

const onRefresh = () => {
  current.value = 0
  list.value = []
  finished.value = false
  onLoad()
  refreshing.value = false
  Toast.success('刷新成功')
}

const showImg = (url: string) => {
  // 检查url是否以jpeg或jpg结尾
  if (url.endsWith('.jpeg') || url.endsWith('.jpg')) {
    ImagePreview([url])
  } else {
    ImagePreview([url + '.jpeg'])
  }
}
</script>
<style scoped></style>
