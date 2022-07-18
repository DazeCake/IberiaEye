<template>
  <el-row :gutter="20">
    <el-col :span="8"><span>名称</span></el-col>
    <el-col :span="16">
      <el-input v-model="account.name" :placeholder="account.name" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><span>账号</span></el-col>
    <el-col :span="16">
      <el-input v-model="account.account" :placeholder="account.account" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><span>密码</span></el-col>
    <el-col :span="16">
      <el-input v-model="account.password" :placeholder="account.password" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><span>服务器</span></el-col>
    <el-col :span="16">
      <el-radio-group v-model="account.server">
        <el-radio label="0">官服</el-radio>
        <el-radio label="1">B服</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><span>战斗</span></el-col>
    <el-col :span="16">
      <el-form :model="$data" class="demo-dynamic">
        <el-form-item v-for="fightTask in account.config.daily.fight">
          <el-col :span="10"><el-input v-model="fightTask.level" /></el-col>
          <el-col :span="8"><el-input v-model="fightTask.num" /></el-col>
          <el-col :span="6"><el-button @click.prevent="removeOption(fightTask)">删除</el-button></el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="addOption">新建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><span>激活时间</span></el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.monday.enable">周一</el-checkbox>
      </span>
    </el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.tuesday.enable">周二</el-checkbox>
      </span>
    </el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.wednesday.enable">周三</el-checkbox>
      </span>
    </el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.thursday.enable">周四</el-checkbox>
      </span>
    </el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.friday.enable">周五</el-checkbox>
      </span>
    </el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.saturday.enable">周六</el-checkbox>
      </span>
    </el-col>
    <el-col :span="1">
      <span>
        <el-checkbox v-model="account.active.sunday.enable">周天</el-checkbox>
      </span>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><span>到期时间</span></el-col>
    <el-col :span="16">
      {{ account.expireTime }}
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, ref } from 'vue'
import { updateMyAccount, showMyAccount } from '../http/api'
import { InitData } from '../types/userAccount'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const refresh = () => {
      showMyAccount().then((res) => {
        data.account = res.data
      })
    }

    interface fightTask {
      num: number
      level: string
    }

    const removeOption = (item: fightTask) => {
      var newList: {
        num: number
        level: string
      }[] = []
      data.account.config.daily.fight.forEach((element) => {
        if (element !== item) {
          newList.push(element)
        }
      })
      data.account.config.daily.fight = newList
    }

    const addOption = () => {
      data.account.config.daily.fight.push({
        num: 99,
        level: '',
      })
    }

    onMounted(() => {
      refresh()
    })

    return {
      ...toRefs(data),
      refresh,
      removeOption,
      addOption,
    }
  },
})
</script>

<style scoped></style>
