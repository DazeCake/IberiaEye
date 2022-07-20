<template>
  <HeadTitle title="CDK列表" />
  <div class="py-3">
    <div class="flex mb-2 flex-wrap">
      <div class="flex items-center mr-4 flex-wrap">
        <div class="flex whitespace-nowrap items-center">
          <span>生成数量：</span>
          <input type="text" v-model="num" class="qbz-input mr-3" />
        </div>
        <div class="flex items-center">
          <span>CDK类型：</span>
          <Select :data="cdkType" :value="cdkSel" v-on:valSelect="onCDK" class="w-40" />
        </div>
        <button class="btn btn-info px-4 btn-sm ml-3" @click="create">生成</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeadTitle from '../../components/Card/HeadTitle.vue'
import Select from '../../components/Element/Select.vue'
import { ref } from 'vue'
import { createToast } from 'mosha-vue-toastify'
const cdkType = [
  { name: '奶盾', id: 1 },
  { name: '单挑盾', id: 2 },
  { name: '杰斯盾', id: 3 },
]
const cdkSel = ref({ id: 1, name: '奶盾' })
const onCDK = (val) => {
  cdkSel.value = val
}
const create = () => {
  createToast('生成中...', {
    type: 'info',
    duration: 1000,
    showIcon: true,
  })
}
</script>
