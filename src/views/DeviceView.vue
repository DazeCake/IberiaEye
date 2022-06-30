<template>
  <div class="device-title">
    <el-row :gutter="20">
      <el-col :span="10">设备管理</el-col>
      <el-col :span="10"></el-col>
      <el-col :span="2"><el-button type="primary" @click="showAddDeviceDialog = true">新增</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="refresh">刷新</el-button></el-col>
    </el-row>
  </div>
  <el-row>
    <el-col v-for="device in deviceList" :key="device" :span="8" :offset="device.id">
      <el-card :body-style="{ padding: '0px' }">
        <el-empty :image-size="100" />
        <div style="padding: 14px">
          <span>{{ device.deviceName }}</span>
          <p class="deviceToken">{{ device.deviceToken }}</p>
          <el-tag size="large" effect="dark" :hit="false" :color="getStatusColor(device.status)">
            {{ getStatus(device.status) }}
          </el-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="showAddDeviceDialog" title="新增设备" width="30%">
    <el-row :gutter="20">
      <el-col :span="8"><span>新增设备名称</span></el-col>
      <el-col :span="16"><el-input v-model="newDeviceName" placeholder="新增设备" /></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>到期时间</span></el-col>
      <el-col :span="16">
        <el-date-picker
          v-model="newExpireTime"
          type="date"
          placeholder="设备到期时间"
          format="YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
        />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAddDeviceDialog = false">取消</el-button>
        <el-button type="primary" @click="addNewDevice">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, ref, reactive } from 'vue'
import { InitData } from '../types/device'
import { getDevice, addDevice } from '../http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const showAddDeviceDialog = ref(false)

    const refresh = () => {
      getDevice().then((res) => {
        data.deviceList = res.data
        console.log(res.data)
      })
    }
    onMounted(() => {
      refresh()
    })

    const getStatus = (status: number) => {
      if (status == 0) {
        return '离线'
      } else if (status == 1) {
        return '空闲'
      } else if (status == 1001) {
        return '日常'
      } else if (status == 1002) {
        return '肉鸽'
      }
    }

    const getStatusColor = (status: number) => {
      if (status == 0) {
        return '#909399'
      } else if (status == 1) {
        return '#67C23A'
      } else if (status == 1001) {
        return '#409EFF'
      } else if (status == 1002) {
        return '#ea5514'
      }
    }

    const addNewDevice = () => {
      addDevice({
        id: 0,
        deviceName: data.newDeviceName,
        deviceToken: '',
        expireTime: data.newExpireTime,
        delete: 0,
      }).then((res) => {
        console.log(res)
        refresh()
      })
    }

    return {
      ...toRefs(data),
      showAddDeviceDialog,
      getStatus,
      getStatusColor,
      refresh,
      addNewDevice,
    }
  },
})
</script>

<style lang="scss">
.el-tag {
  width: 100%;
  border: 0px;
}
.device-title {
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 10px;
}
</style>
