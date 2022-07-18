<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-col :span="12">
          <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical"
            default-active="1"
            text-color="#fff"
          >
            <h2>菜单</h2>
            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{ i.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="20">
              <h2 class="console-title">控制台</h2>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" class="btn-logout">登出</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const list = router.getRoutes().filter((v) => v.meta.isUser)
    console.log(list)
    return { list }
  },
})
</script>

<style lang="scss" scoped>
.el-aside {
  .el-menu {
    height: 100vh;
    width: 100vh;
    padding: 0;
    margin: 0;
  }
}
.el-header {
  background-color: #545c64;
}
.el-main {
  background-color: #fff;
}
.console-title {
  text-align: center;
  color: #fff;
  padding-top: 10px;
}
.btn-logout {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
