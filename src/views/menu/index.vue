<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="createMenu">添加菜单</el-button>
      </div>
      列表内容
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MenuIndex",
  methods: {
    createMenu() {
      console.log("create menu");
      this.$router.push({
        name: "createMenu",
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
