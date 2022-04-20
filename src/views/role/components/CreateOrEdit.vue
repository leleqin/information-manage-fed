<template>
  <div>
    <el-form
      ref="roleForm"
      :inline="true"
      :model="roleForm"
      class="demo-form-inline"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="资源编码" prop="code">
        <el-input v-model="roleForm.code" placeholder="资源编码"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="roleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRole, saveOrUpdateRole } from "@/services/role/role";

export default {
  name: "CreateOrEidt",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    editId: {
      type: [String, Number],
      default: null,
    },
  },
  created() {
    if (this.isEdit) {
      this.getRole();
    }
  },
  data() {
    return {
      roleForm: {
        name: "",
        code: "",
        description: "",
      },
    };
  },
  methods: {
    async getRole() {
      const { data } = await getRole(this.editId);
      if (data.code === "000000") {
        this.roleForm = data.data;
      }
    },
    async handleConfirm() {
      const { data } = await saveOrUpdateRole(this.roleForm);
      if (data.code === "000000") {
        this.$message.success(this.roleForm.id ? "修改成功" : "添加成功");
        this.$emit("updateData");
        this.roleForm = {};
      }
    },
    handleCancel() {
      this.$emit("dialogClose");
      this.roleForm = {};
    },
  },
};
</script>

<style scoped lang="scss"></style>
