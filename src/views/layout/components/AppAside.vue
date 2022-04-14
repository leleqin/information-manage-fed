<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    router
    :collapse="isCollapse"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/role">
        <i class="el-icon-location"></i>
        角色列表
      </el-menu-item>
      <el-menu-item index="/menu">
        <i class="el-icon-location"></i>
        菜单列表
      </el-menu-item>
      <el-menu-item index="/resource">
        <i class="el-icon-location"></i>
        资源列表
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/course">
      <i class="el-icon-menu"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-document"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>广告管理</span>
      </template>
      <el-menu-item index="/advert">
        <i class="el-icon-location"></i>
        广告列表
      </el-menu-item>
      <el-menu-item index="/adverts-pace">
        <i class="el-icon-location"></i>
        广告位列表
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  props: ["isCollapse"],
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
  height: 100%;
  border-right: 0;
}
</style>
