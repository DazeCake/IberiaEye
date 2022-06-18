<template>
  <HeadTitle title="红色骰子概率" />
  <FloatInput title="极端值偏移概率" class="mt-4" :val="val" />
  <button class="btn btn-info btn-block mt-4" @click="save">保存</button>
</template>
<script setup>
import { reactive, ref } from 'vue'
import HeadTitle from '../../components/Card/HeadTitle.vue'
import FloatInput from '../../components/Element/FloatInput.vue'
const p = ref({})
const val = reactive({ value: 0.5 })

const save = () => {
  alert(val.value)
}
</script>
