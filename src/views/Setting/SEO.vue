<template>
  <FloatInput title="站点关键词" :val="val"/>
</template>
<script setup>
  import FloatInput from "../../components/Element/FloatInput.vue";
  import {ref} from "vue";
  const val = ref({})
</script>