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
      <div class="bg-gray-100 h-full py-12">
        <van-cell-group inset>
          <van-cell center title="微信" :label="getStr('wx')" @click="setWXDialog">
            <template #right-icon>
              <van-switch
                v-model="account.notice.wxUID.enable"
                size="24"
                :disabled="isDisable('wx')"
                @click.stop="isDisable('wx') ? '' : updateUser()"
              />
            </template>
          </van-cell>
          <van-cell center title="邮件" :label="getStr('mail')" @click="setMailDialog">
            <template #right-icon>
              <van-switch
                v-model="account.notice.mail.enable"
                size="24"
                :disabled="isDisable('mail')"
                @click.stop="isDisable('mail') ? '' : updateUser()"
              />
            </template>
          </van-cell>
        </van-cell-group>
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
  <van-dialog v-model:show="showWXQR" title="请使用微信扫码二维码并关注" @confirm="refresh">
    <img :src="imgUrl" />
  </van-dialog>
  <van-dialog v-model:show="showMailSet" title="请输入邮箱" show-cancel-button @confirm="setMail">
    <van-cell-group inset>
      <van-field v-model="account.notice.mail.text" name="邮箱" label="邮箱" placeholder="邮箱" class="mt-6 mb-3" />
    </van-cell-group>
  </van-dialog>
</template>

<script setup lang="ts">
import { Dialog, Toast } from 'vant'
import { reactive, ref } from 'vue'
import { getUserInfo, getWechatQRCode, updateUserInfo, useCDK } from '../../api/api'
import { AccountImpl } from '../../types/account'

const VanDialog = Dialog.Component

const account = reactive(new AccountImpl())
const showNotice = ref(false)
const showCDK = ref(false)
const showWXQR = ref(false)
const showMailSet = ref(false)
const imgUrl = ref('')
const cdk = ref('')

const openNoticePopup = () => {
  getUserInfo().then((res) => {
    account.setAll(res.data.data)
    showNotice.value = true
  })
}

const refresh = () => {
  getUserInfo().then((res) => {
    account.setAll(res.data.data)
  })
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

const getStr = (name: string) => {
  if (name == 'wx') {
    return account.notice.wxUID.text != '' ? '' : '未绑定'
  } else if (name == 'mail') {
    return account.notice.mail.text != '' ? '' : '未绑定'
  }
}

const isDisable = (name: string) => {
  if (name == 'wx') {
    return account.notice.wxUID.text == '' ? true : false
  } else if (name == 'mail') {
    return account.notice.mail.text == '' ? true : false
  }
}

const setWXDialog = () => {
  Dialog.confirm({
    message: '确认要设置/修改微信通知？',
  })
    .then(() => {
      getWXQR()
    })
    .catch(() => {
      // on cancel
    })
}

const getWXQR = () => {
  getWechatQRCode().then((res) => {
    imgUrl.value = res.data.data
    showWXQR.value = true
  })
}

const setMailDialog = () => {
  Dialog.confirm({
    message: '确认要设置/修改邮件通知？',
  })
    .then(() => {
      showMailSet.value = true
    })
    .catch(() => {
      // on cancel
    })
}

const setMail = () => {
  if (account.notice.mail.text.length == 0) {
    Toast.fail('请输入邮箱')
    return
  }
  account.notice.mail.enable = true
  showMailSet.value = false
  updateUserInfo(account).then((res) => {
    if (res.data.code == 200) {
      Toast.success('设置成功')
    } else {
      Toast.fail(res.data.msg)
    }
  })
}

const updateUser = () => {
  updateUserInfo(account).then((res) => {
    if (res.data.code == 200) {
      Toast.success('修改成功')
    } else {
      Toast.fail(res.data.msg)
    }
  })
}
</script>

<style scoped></style>
