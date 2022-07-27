<template>
  <div class="bg-gray-100 h-screen">
    <van-nav-bar title="设置" />
    <div class="mt-6">
      <van-cell-group inset>
        <van-cell title="通知设置" is-link @click="openNoticePopup" />
        <van-cell title="CDK激活" is-link @click="openCDKPopup" />
      </van-cell-group>
    </div>
    <van-popup v-model:show="showNotice" closeable round position="bottom" :style="{ height: '30%' }">
      <div class="bg-gray-100 h-full">
        <van-empty
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          description="暂未启用"
        />
      </div>
    </van-popup>
    <van-popup v-model:show="showCDK" closeable round position="bottom" :style="{ height: '30%' }">
      <div class="bg-gray-100 h-full">
        <van-form @submit="activateCDK" class="py-12">
          <van-cell-group inset>
            <van-field v-model="cdk" placeholder="请输入CDK" />
          </van-cell-group>
          <div class="m-3 mt-6">
            <van-button round block type="primary" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-tabbar route>
      <van-tabbar-item to="/user/log" name="log" icon="notes-o">日志</van-tabbar-item>
      <van-tabbar-item to="/user/home" name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/user/setting" name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'
import { useCDK } from '../../api/api'

const showNotice = ref(false)
const showCDK = ref(false)
const cdk = ref('')

const openNoticePopup = () => {
  showNotice.value = true
}

const openCDKPopup = () => {
  showCDK.value = true
}

const activateCDK = () => {
  if (cdk.value.length != 32) {
    Toast.fail('请正确输入CDK')
    return
  }
  useCDK(cdk.value).then((res) => {
    if (res.data.code == 200) {
      Toast.success('激活成功')
    } else {
      Toast.fail(res.data.msg)
    }
  })
}
</script>

<style scoped></style>
