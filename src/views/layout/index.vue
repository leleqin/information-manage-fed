<template>
  <el-container>
    <el-aside class="aside-translate" width="initial">
      <!-- 侧边栏组件 -->
      <app-aside :is-collapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header
          :is-collapse="isCollapse"
          @is-collapse="isCollapse = $event"
        ></app-header>
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
  data() {
    return {
      isCollapse: false,
    };
  },
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
  height: 100vh;
  background-color: #f8f9fb;
}

.el-main {
  background-color: #e9eef3;
}

.el-header {
  background-color: #f8f9fb;
}
</style>
