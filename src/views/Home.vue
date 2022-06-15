<template>
  <div class="divider text-xl text-info">运行状态</div>
  <div class="flex flex-wrap flex-row justify-between">

  </div>
</template>
<script setup>
  import {ref} from "vue";
  import Info from "../components/Card/Info.vue";
  import Server from "../components/Card/Server.vue";
  import {isLarge} from '../plugins/common'
  const arr = ref([])
</script>