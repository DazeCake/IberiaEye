<template>
  <div>日志列表</div>
  <el-table :data="list" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2"><img :src="props.row.imageUrl" width="300" alt="" /></p>
          <p m="t-0 b-2">ID: {{ props.row.id }}</p>
          <p m="t-0 b-2">任务类型: {{ props.row.taskType }}</p>
          <p m="t-0 b-2">用户: {{ props.row.name }}</p>
          <p m="t-0 b-2">详细信息: {{ props.row.detail }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="等级" prop="level" />
    <el-table-column label="标题" prop="title" />
    <el-table-column label="日期" prop="time" />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import { InitData } from '../types/log'
import { getLog } from '../http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    onMounted(() => {
      const defaultQuery = {
        current: 1,
        size: 10,
      }
      getLog(defaultQuery).then((res) => {
        data.list = res.data
      })
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss" scoped></style>
