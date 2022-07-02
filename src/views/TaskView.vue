<template>
  <div class="task-title">
    <el-row :gutter="20">
      <el-col :span="10">任务管理</el-col>
      <el-col :span="10"></el-col>
      <el-col :span="2">
        <el-button type="primary" @click="showAddRogueDialog = true">新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
  </div>
  <el-row>
    <el-col :span="8">
      <span>待处理任务 总计 {{ freeTaskList.length == null ? 0 : freeTaskList.length }}</span>
      <el-table :data="freeTaskList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="taskType" label="类型" />
      </el-table>
    </el-col>
    <el-col :span="8">
      <span>处理中任务 总计 {{ lockTaskList.length == null ? 0 : lockTaskList.length }}</span>
      <el-table :data="lockTaskList" style="width: 100%">
        <el-table-column prop="task.id" label="ID" width="50" />
        <el-table-column prop="task.name" label="名称" width="100" />
        <el-table-column prop="deviceToken" label="设备" />
        <el-table-column prop="task.taskType" label="类型" />
      </el-table>
    </el-col>
    <el-col :span="8">
      <span>冷却中任务 总计 {{ freezeTaskList.length == null ? 0 : freezeTaskList.length }}</span>
      <el-table :data="freezeTaskList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="time" label="冻结至" width="180" />
      </el-table>
    </el-col>
  </el-row>
  <el-dialog v-model="showAddRogueDialog" title="新增肉鸽任务" width="30%">
    <el-row :gutter="20">
      <el-col :span="8"><span>名称</span></el-col>
      <el-col :span="16">
        <el-input v-model="newRogue.name" placeholder="输入昵称" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>账号</span></el-col>
      <el-col :span="16">
        <el-input v-model="newRogue.account" placeholder="输入账号" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>密码</span></el-col>
      <el-col :span="16">
        <el-input v-model="newRogue.password" placeholder="输入密码" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>服务器</span></el-col>
      <el-col :span="16">
        <el-radio-group v-model="newRogue.server">
          <el-radio label="0">官服</el-radio>
          <el-radio label="1">B服</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>干员</span></el-col>
      <el-col :span="5">
        <el-input v-model="newRogue.config.rogue.operator.index" placeholder="第n个" />
      </el-col>
      <el-col :span="5">
        <el-input v-model="newRogue.config.rogue.operator.num" placeholder="开n次" />
      </el-col>
      <el-col :span="5">
        <el-input v-model="newRogue.config.rogue.operator.skill" placeholder="n技能" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>跳过</span></el-col>
      <el-checkbox v-model="newRogue.config.rogue.skip.beast" label="驯兽小屋" size="large" />
      <el-checkbox v-model="newRogue.config.rogue.skip.coin" label="投币" size="large" />
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>等级与原石锭数</span></el-col>
      <el-col :span="8">
        <el-input v-model="newRogue.config.rogue.level" placeholder="等级" />
      </el-col>
      <el-col :span="8">
        <el-input v-model="newRogue.config.rogue.coin" placeholder="原石锭" />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAddRogueDialog = false">取消</el-button>
        <el-button type="primary" @click="addRogueTask">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, ref } from 'vue'
import { InitData } from '../types/task'
import { showFreeTaskList, showLockTaskList, showFreezeTaskList, tempAddTask } from '../http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const showAddRogueDialog = ref(false)

    const refresh = () => {
      showFreeTaskList().then((res) => {
        data.freeTaskList = res.data
      })
      showLockTaskList().then((res) => {
        data.lockTaskList = []
        for (let lockTask in res.data) {
          data.lockTaskList.push({
            deviceToken: lockTask,
            task: res.data[lockTask].account,
            time: res.data[lockTask].time,
          })
        }
      })
      showFreezeTaskList().then((res) => {
        data.freezeTaskList = []
        for (let freezeTask in res.data) {
          data.freezeTaskList.push({
            id: freezeTask,
            time: res.data[freezeTask],
          })
        }
      })
    }

    onMounted(() => {
      refresh()
    })

    const addRogueTask = () => {
      tempAddTask(data.newRogue).then((res) => {
        refresh()
      })
    }

    return {
      ...toRefs(data),
      showAddRogueDialog,
      refresh,
      addRogueTask,
    }
  },
})
</script>

<style scoped></style>
