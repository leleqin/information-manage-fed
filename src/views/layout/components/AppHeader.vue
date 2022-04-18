<template>
  <div class="app-header">
    <div class="header-left">
      <i
        :class="{
          'el-icon-s-unfold': isCollapse,
          'el-icon-s-fold': !isCollapse,
        }"
        @click="handleCollapse"
      ></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          :src="
            userInfo.portrait ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item @click.native="userLogout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from "@/services/user/user";
export default {
  name: "AppHeader",
  props: ["isCollapse"],
  created() {
    this.loadUserInfo();
  },
  data() {
    return {
      // 用户信息
      userInfo: {
        portrait: null,
        userName: "",
      },
    };
  },
  methods: {
    // 加载用户信息
    async loadUserInfo() {
      const { data } = await getUserInfo();
      this.userInfo.portrait = data.content.portrait;
      this.userInfo.userName = data.content.userName;
    },
    userLogout() {
      // await logout();
      // 清空 store 登录信息
      this.$store.commit("setUser", null);
      // 跳转到登录页
      this.$router.push({ name: "login" });
    },
    // 折叠导航
    handleCollapse() {
      this.$emit("is-collapse", !this.isCollapse);
    },
  },
};
</script>

<style scoped lang="scss">
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    i {
      padding-right: 15px;
      font-size: 20px;
    }
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
