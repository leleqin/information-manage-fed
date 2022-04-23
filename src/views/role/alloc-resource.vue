<template>
  <div>
    <el-card>
      <div v-for="menu in menusData" :key="menu.id">
        <el-checkbox
          v-model="menu.selected"
          @change="handleCheckAllChange(menu)"
          class="menu-style"
          >{{ menu.name }}</el-checkbox
        >
        <el-checkbox-group
          v-model="checkResources"
          @change="handleCheckedResourcesChange"
          class="sources-style"
        >
          <el-checkbox
            v-for="source in menu.resourceList"
            :key="source.id"
            :label="source.id"
            :checked="source.selected"
            class="source-style"
            >{{ source.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <div class="button-style">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onReset">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getRoleResources,
  allocateRoleResource,
} from "@/services/source/source";
export default {
  name: "AllocResource",
  created() {
    // 获取资源列表
    this.getRoleResources(-1);
    // 获取角色拥有的资源
    this.getRoleResources(this.$route.params.roleId);
  },
  data() {
    return {
      checkResources: [],
      menusData: [],
    };
  },
  methods: {
    async onSave() {
      const { data } = await allocateRoleResource({
        roleId: this.$route.params.roleId,
        resourceIdList: this.checkResources,
      });
      if (data.code === "000000") {
        this.$message.success("保存成功");
        this.$router.push({
          name: "role",
        });
      }
    },
    onReset() {
      this.checkResources = [];
    },
    async getRoleResources(roleId) {
      const { data } = await getRoleResources(roleId);
      if (data.code === "000000") {
        if (roleId === -1) {
          this.menusData = data.data;
        } else {
          data.data.forEach((menu) => {
            menu.resourceList?.forEach((resource) => {
              if (resource.selected) {
                this.checkResources = [...this.checkResources, resource.id];
              }
            });
          });
        }
      }
    },
    handleCheckAllChange(menu) {
      menu.selected = !!menu.selected;
      if (menu.selected) {
        menu.resourceList?.forEach((resource) => {
          let index = this.checkResources.indexOf(resource.id);
          if (index === -1) {
            this.checkResources = [...this.checkResources, resource.id];
          }
        });
      } else {
        menu.resourceList?.forEach((resource) => {
          let index = this.checkResources.indexOf(resource.id);
          if (index !== -1) {
            this.checkResources.splice(index, 1);
          }
        });
      }
    },
    handleCheckedResourcesChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped lang="scss">
.menu-style {
  height: 60px;
  width: 100%;
  line-height: 60px;
  padding-left: 20px;
  border: 1px solid #dcdfe6;
  background-color: #f2f6fc;
}

.sources-style {
  padding: 20px 20px;
  border: 1px solid #dcdfe6;

  .source-style {
    padding: 10px 0;
  }
}

.button-style {
  margin: 20px auto;
  text-align: center;
}
</style>
