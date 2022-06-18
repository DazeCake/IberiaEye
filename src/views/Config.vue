<template>
  <HeadTitle title="远控信息配置"/>
  <div class="flex flex-col text-info text-lg mt-2">
    <div class="w-full lg:w-1/2">
      <label class="block ml-1">后端地址 / IP</label>
      <input type="text" v-model="url" placeholder="https://ark.com" class="qbz-input mb-2">
    </div>
  </div>
  <button class="btn btn-info text-base-100 w-full lg:w-1/2 mt-2" @click="save">保存配置</button>
</template>
<script setup>
  import HeadTitle from '../components/Card/HeadTitle.vue'
  import {ref} from "vue";
  import {configStore} from "../store/config";
  import {storeToRefs} from "pinia/dist/pinia";
  import {createToast} from "mosha-vue-toastify";
  const url = ref('')
  const _config = configStore()
  const {config} = storeToRefs(_config)
  url.value = config.value.url
  const save = () => {
    if (url.value){
      _config.setUrl(url.value)
      createToast('保存成功', {
        showIcon: true,
        type: 'success',
        transition: 'bounce',
      })
    }
  }
</script>