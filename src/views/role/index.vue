<template>
  <div class="resource">
    <!-- 筛选部分 -->
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="sort">
          <span>筛选搜索</span>
          <div>
            <el-button size="small" @click="onReset">重置</el-button>
            <el-button
              size="small"
              type="primary"
              @click="onSearch"
              :disabled="isLoading"
              >搜索查询查询</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="输入搜索：" prop="name">
          <el-input v-model="searchName" placeholder="角色名称"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加角色 -->
    <el-card>
      <el-button size="small" @click="onAdd">添加角色</el-button>
    </el-card>
    <!-- 资源列表 -->
    <el-card>
      <el-table
        v-loading="isLoading"
        :data="rolesData"
        border
        style="width: 100%"
      >
        <el-table-column align="center" width="100px" prop="id" label="编号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="角色名称">
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述">
        </el-table-column>
        <el-table-column align="center" prop="createdTime" label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="150px"
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >分配菜单</el-button
            >
            <el-button type="text" size="small" @click="handleDelete(scope.row)"
              >分配资源</el-button
            >
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加和编辑dialog -->
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
    >
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
      <!-- <create-or-eidt
        @updateData="updateDialog"
        @dialogClose="handleCloseDialog"
        :editId="editId"
        :isEdit="isEdit"
      ></create-or-eidt> -->
    </el-dialog>
  </div>
</template>

<script>
// import CreateOrEidt from "./components/CreateOrEdit";
import {
  getRolePages,
  deleteRole,
  saveOrUpdateRole,
} from "@/services/role/role";

export default {
  name: "RoleIndex",
  // components: {
  //   CreateOrEidt,
  // },
  created() {
    // 获取角色列表
    this.getRoleList();
  },
  data() {
    return {
      searchName: "",
      rolesData: [],
      isLoading: false,
      dialogVisible: false,
      isEdit: false,
      editId: "",
      roleForm: {
        name: "",
        code: "",
        description: "",
      },
    };
  },
  methods: {
    async getRoleList() {
      this.isLoading = true;
      const { data } = await getRolePages({ name: this.searchName });
      if (data.code === "000000") {
        this.rolesData = data.data.records;
      }
      this.isLoading = false;
    },
    onSearch() {
      this.getRoleList();
    },
    onReset() {
      this.searchName = "";
    },
    onAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
    },
    handleEdit(rowData) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.roleForm = rowData;
      // this.editId = rowData.id;
    },
    async handleDelete(rowData) {
      const { data } = await deleteRole(rowData.id);
      if (data.code === "000000") {
        this.$message.success("删除成功");
        this.getRoleList();
      }
    },
    // handleCloseDialog() {
    //   this.dialogVisible = false;
    // },
    // updateDialog() {
    //   this.dialogVisible = false;
    //   this.getRoleList();
    // },
    async handleConfirm() {
      const { data } = await saveOrUpdateRole(this.roleForm);
      if (data.code === "000000") {
        this.$message.success(this.roleForm.id ? "修改成功" : "添加成功");
        this.roleForm = {};
      }
      this.dialogVisible = false;
      this.getRoleList();
    },
    handleCancel() {
      this.dialogVisible = false;
      this.roleForm = {};
    },
  },
  filters: {
    formatDate(date) {
      date = new Date(date);
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
  },
};
</script>

<style scoped lang="scss">
.sort {
  display: flex;
  align-content: space-between;

  div {
    float: right;
    width: 100%;
  }
}
</style>
