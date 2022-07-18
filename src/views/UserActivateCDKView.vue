<template>
  <div class="activate-box">
    <el-row :gutter="20">
      <el-col :span="8"><span>CDK</span></el-col>
      <el-col :span="16">
        <el-input v-model="cdk" autocomplete="off" />
      </el-col>
    </el-row>
    <el-button type="primary" @click="activate" class="activate-btn">激活</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { InitData } from '../types/cdk'
import { useCDK } from '../http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    const activate = () => {
      useCDK(data.cdk).then((res) => {
        alert(res.data.msg)
      })
    }
    return {
      ...toRefs(data),
      activate,
    }
  },
})
</script>

<style lang="scss" scoped>
.activate-box {
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  .activate-btn {
    margin: 0 auto;
  }
}
</style>
