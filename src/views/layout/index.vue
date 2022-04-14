<template>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入侧边栏组件
import AppAside from "./components/AppAside";
import AppHeader from "./components/AppHeader";

export default {
  name: "LayoutIndex",
  components: {
    AppAside,
    AppHeader,
  },
};
</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;
}

.el-aside {
  background-color: aqua;
}

.el-main {
  background-color: rgb(209, 238, 240);
}
</style>
