<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">日志查询</el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="4"><el-input v-model="key" placeholder="请输入关键字" clearable /></el-col>
      <el-col :span="4"><el-button type="primary" @click="search">搜索</el-button></el-col>
    </el-row>
  </div>
  <el-table :data="list" :row-class-name="tableRowClassName" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-row :gutter="20">
          <el-col :span="1"></el-col>
          <el-col :span="11">
            <p>ID: {{ props.row.id }}</p>
            <p>任务类型: {{ props.row.taskType }}</p>
            <p>用户: {{ props.row.name }}</p>
            <p>详细信息: {{ props.row.detail }}</p>
          </el-col>
          <el-col :span="12"><img :src="props.row.imageUrl" width="300" class="screenshots" /></el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column label="等级" prop="level" />
    <el-table-column label="标题" prop="title" />
    <el-table-column label="日期" prop="time" />
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-count="page_count" @update:current-page="updatePage" />
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import { InitData, ListInter } from '../types/log'
import { getLog, searchLog } from '../http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    onMounted(() => {
      getLog({
        current: 1,
        size: 10,
      }).then((res) => {
        data.list = res.data
      })
    })

    const search = () => {
      searchLog({
        current: data.current_page,
        size: 10,
        key: data.key,
      }).then((res) => {
        data.list = res.data
      })
    }

    const tableRowClassName = ({ row }: { row: ListInter }) => {
      if (row.level === 'WARN') {
        return 'warning-row'
      } else if (row.level === 'ERROR') {
        return 'error-row'
      }
      return ''
    }

    const updatePage = (page: number) => {
      data.current_page = page
      search()
    }

    return {
      ...toRefs(data),
      search,
      tableRowClassName,
      updatePage,
    }
  },
})
</script>

<style lang="scss">
.el-table {
  .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
  .error-row {
    --el-table-tr-bg-color: var(--el-color-error-light-9);
  }
}
</style>
