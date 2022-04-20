<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        ref="menusData"
        :data="menusData"
        :props="menusDataProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkList"
      ></el-tree>
      <div class="button-style">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onReset">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getMenuNodeList,
  getRoleMenus,
  allocateRoleMenus,
} from "@/services/menu/menu";
export default {
  name: "AllocMenu",
  created() {
    // 获取菜单列表
    this.getMenus();
    // 获取用户拥有列表
    this.loadRoleMenus();
  },
  data() {
    return {
      menusData: [],
      menusDataProps: {
        children: "subMenuList",
        label: "name",
      },
      checkList: [],
    };
  },
  methods: {
    async onSave() {
      const { data } = await allocateRoleMenus({
        roleId: this.$route.params.roleId,
        menuIdList: this.$refs.menusData.getCheckedKeys(),
      });
      if (data.code === "000000") {
        this.$message.success("设置成功");
        this.$router.push({
          name: "role",
        });
      }
    },
    onReset() {
      this.$refs["menusData"].setCheckedKeys([]);
    },
    getMenusId(menus) {
      menus.forEach((menu) => {
        if (!menu.selected) {
          return;
        }
        if (menu.subMenuList) {
          return this.getMenusId(menu.subMenuList);
        }
        // 这个地方注意，如果用 push 会因为异步操作，数据频繁渲染导致页面无法显示
        this.checkList = [...this.checkList, menu.id];
      });
    },
    async loadRoleMenus() {
      const { data } = await getRoleMenus(this.$route.params.roleId);
      if (data.code === "000000") {
        // 将用户所拥有的菜单的叶子节点的 id 放到 checkList 中
        this.getMenusId(data.data);
      }
    },
    async getMenus() {
      const { data } = await getMenuNodeList();
      if (data.code === "000000") {
        this.menusData = data.data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.button-style {
  margin: 20px auto;
  text-align: center;
}
</style>
