<template>
  <div class="bg-gray-100 h-screen space-y-6">
    <!-- 标题 -->
    <van-nav-bar :title="account.name" />
    <!-- 账号状态 -->
    <div class="mt-6">
      <van-cell-group inset>
        <van-row @click="showAccountUpdatePopup">
          <van-col span="8">
            <van-circle
              class="m-3"
              v-model:current-rate="currentRate"
              v-model:rate="rate"
              :speed="100"
              :text="remainingDays"
              :color="color"
            />
          </van-col>
          <van-col span="16">
            <div class="m-3 mt-4 space-y-2">
              <h1>账号：{{ account.account }}</h1>
              <h1>到期时间：{{ expireTime.format('YYYY年MM月DD日') }}</h1>
              <h1>服务器：{{ getServer() }}</h1>
            </div>
          </van-col>
        </van-row>
      </van-cell-group>
    </div>
    <div>
      <van-swipe-cell>
        <van-cell-group inset>
          <div>
            <van-icon name="plus" class="m-3 float-left" size="20" @click="showAddTaskPopup" />
            <van-icon name="success" class="m-3 float-right" size="20" @click="showSaveTaskPopup" />
          </div>
          <van-list>
            <van-cell v-for="item in account.config.daily.fight">
              <van-swipe-cell @open="selectTask(item)">
                <van-row>
                  <van-col span="10">{{ item.level }}</van-col>
                  <van-col span="10"></van-col>
                  <van-col span="4">{{ item.num }}</van-col>
                </van-row>
                <template #left>
                  <van-button square text="置顶" type="primary" size="mini" @click="topTask" />
                </template>
                <template #right>
                  <van-button square text="删除" type="danger" size="mini" @click="delTask" />
                </template>
              </van-swipe-cell>
            </van-cell>
          </van-list>
        </van-cell-group>
      </van-swipe-cell>
      <div class="mt-6">
        <van-cell-group inset>
          <van-cell :title="status" label="当前状态" @click="showTaskOperationPopup" />
        </van-cell-group>
      </div>
    </div>
    <van-tabbar route>
      <van-tabbar-item to="/user/log" name="log" icon="notes-o">日志</van-tabbar-item>
      <van-tabbar-item to="/user/home" name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/user/setting" name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
    <van-popup v-model:show="showAccountUpdate" round position="bottom" :style="{ height: '30%' }">
      <div class="flex flex-col space-y-3 duration-1000 items-center text-center bg-gray-100 h-full py-6">
        <van-form @submit="updateConfig">
          <van-cell-group inset>
            <van-field v-model="accountValue" label="账号" placeholder="请输入游戏账号" />
            <van-field v-model="passwordValue" label="密码" type="password" placeholder="请输入游戏密码" />
            <van-radio-group
              v-model="serverValue"
              direction="horizontal"
              class="m-2 flex flex-auto place-content-center"
            >
              <van-radio :name="0">官服</van-radio>
              <van-radio :name="1">B服</van-radio>
            </van-radio-group>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-popup v-model:show="showAddTask" round position="bottom" :style="{ height: '30%' }">
      <div class="flex flex-col space-y-3 duration-1000 items-center text-center bg-gray-100 h-full py-6">
        <van-form @submit="addTask">
          <van-cell-group inset>
            <van-field v-model="level" label="关卡" placeholder="请输入关卡名" />
            <van-field label="次数">
              <template #input>
                <van-stepper v-model="num" />
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-popup v-model:show="showSaveTask" round position="bottom" :style="{ height: '30%' }">
      <div class="flex flex-col space-y-3 duration-1000 items-center text-center bg-gray-100 h-full py-6">
        <van-form @submit="saveTask">
          <h1 class="py-6">确定要保存了吗？</h1>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">保存</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-popup v-model:show="showTaskOperation" round position="bottom" :style="{ height: '30%' }">
      <div class="flex flex-col space-y-6 duration-1000 items-center text-center bg-gray-100 h-full py-12">
        <van-button icon="back-top" type="primary" round @click="insert">一键插队</van-button>
        <van-button icon="play" type="primary" round @click="start">立即作战</van-button>
        <van-button icon="stop" type="primary" round @click="halt">一键下线</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  getUserInfo,
  getUserStatus,
  haltTask,
  insertQueue,
  startNow,
  updateAccountAndPassword,
  updateUserInfo,
} from '../../api/api'
import { AccountImpl } from '../../types/account'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Toast } from 'vant'

dayjs.extend(customParseFormat)

const account = reactive(new AccountImpl())
const currentRate = ref(100)
const rate = ref(100)
const expireTime = ref(dayjs())
const remainingDays = ref('')
const color = ref('')
const showAccountUpdate = ref(false)
const showAddTask = ref(false)
const showSaveTask = ref(false)
const showTaskOperation = ref(false)
const level = ref('')
const num = ref(99)
const task: any = ref('')
const status = ref('')
const accountValue = ref('')
const passwordValue = ref('')
const serverValue = ref(0)

const getUser = () => {
  getUserInfo().then((res) => {
    account.setAll(res.data.data)
    expireTime.value = dayjs(account.expireTime, 'YYYY-MM-DD[T]HH:mm:ss')
    getDays()
    getStatus()
  })
}

const getDays = () => {
  const now = dayjs()
  expireTime.value = dayjs(account.expireTime, 'YYYY-MM-DD[T]HH:mm:ss')
  const diff = expireTime.value.diff(now, 'day')
  if (diff >= 30) {
    color.value = `#52c41a`
  } else {
    if (diff >= 20) {
      color.value = `#52c41a`
    } else if (diff >= 10) {
      color.value = `#faad14`
    } else {
      color.value = `#f5222d`
    }
    rate.value = (diff * 100) / 30
  }
  if (diff > 0) {
    remainingDays.value = `剩余${diff}天`
  } else {
    remainingDays.value = `已过期${-diff}天`
  }
}

const getServer = () => {
  if (account.server == 0) {
    return '官服'
  } else if (account.server == 1) {
    return 'B服'
  }
}

const showAccountUpdatePopup = () => {
  showAccountUpdate.value = true
}

const showAddTaskPopup = () => {
  showAddTask.value = true
}

const showSaveTaskPopup = () => {
  showSaveTask.value = true
}

const updateConfig = () => {
  updateAccountAndPassword({
    account: accountValue.value,
    password: passwordValue.value,
    server: serverValue.value,
  }).then((res) => {
    if (res.data.code == 200) {
      Toast.success('修改成功')
      getUser()
    } else {
      Toast.fail(res.data.msg)
    }
  })
}

const selectTask = (item: any) => {
  task.value = item
}

const addTask = () => {
  if (level.value == '') {
    Toast.fail('请输入关卡名')
    return
  }
  account.config.daily.fight.push({
    level: level.value,
    num: num.value,
  })
  showAddTask.value = false
  Toast.success('添加成功,记得保存哦')
}

const delTask = () => {
  account.config.daily.fight.splice(account.config.daily.fight.indexOf(task.value), 1)
  Toast.success('删除成功,记得保存哦')
}

const topTask = () => {
  account.config.daily.fight.splice(account.config.daily.fight.indexOf(task.value), 1)
  account.config.daily.fight.unshift(task.value)
  Toast.success('置顶成功,记得保存哦')
}

const saveTask = () => {
  updateUserInfo(account).then((res) => {
    if (res.data.code == 200) {
      Toast.success('保存成功')
      showSaveTask.value = false
    } else {
      Toast.fail('保存失败')
    }
  })
}

const halt = () => {
  haltTask().then((res) => {
    if (res.data.code == 200) {
      Toast.success('强制下线已发送')
      getStatus()
    } else {
      Toast.fail('强制下线失败')
    }
  })
}

const getStatus = () => {
  getUserStatus().then((res) => {
    if (res.data.code == 200) {
      status.value = res.data.data.msg
    }
  })
}

const showTaskOperationPopup = () => {
  showTaskOperation.value = true
}

const insert = () => {
  insertQueue().then((res) => {
    if (res.data.code == 200) {
      Toast.success('插队成功')
      showTaskOperation.value = false
    } else {
      Toast.fail('插队失败')
    }
  })
  showTaskOperation.value = false
}

const start = () => {
  startNow().then((res) => {
    if (res.data.code == 200) {
      Toast.success(res.data.msg)
      showTaskOperation.value = false
    } else {
      Toast.fail(res.data.msg)
    }
  })
}

onMounted(() => {
  getUser()
})
</script>

<style scoped></style>
