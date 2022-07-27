<template>
  <div class="bg-gray-100 h-screen space-y-6">
    <!-- 标题 -->
    <van-nav-bar :title="account.name" />
    <!-- 账号状态 -->
    <div class="mt-6">
      <van-swipe-cell>
        <van-cell-group inset>
          <van-row>
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
        <template #right class="align-middle">
          <div class="align-middle">
            <van-button icon="setting-o" />
          </div>
        </template>
      </van-swipe-cell>
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
                <template #right>
                  <van-button square text="删除" type="danger" class="delete-button" size="mini" @click="delTask" />
                </template>
              </van-swipe-cell>
            </van-cell>
          </van-list>
        </van-cell-group>
      </van-swipe-cell>
    </div>
    <van-tabbar route>
      <van-tabbar-item to="/user/log" name="log" icon="notes-o">日志</van-tabbar-item>
      <van-tabbar-item to="/user/home" name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/user/setting" name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>

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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getUserInfo, updateUserInfo } from '../../api/api'
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
const showAddTask = ref(false)
const showSaveTask = ref(false)
const level = ref('')
const num = ref(99)
const task: any = ref('')

const getUser = () => {
  getUserInfo().then((res) => {
    account.setAll(res.data.data)
    expireTime.value = dayjs(account.expireTime, 'YYYY-MM-DD[T]HH:mm:ss')
    getDays()
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

const showAddTaskPopup = () => {
  showAddTask.value = true
}

const showSaveTaskPopup = () => {
  showSaveTask.value = true
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

onMounted(() => {
  getUser()
})
</script>

<style scoped></style>
