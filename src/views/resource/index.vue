<template>
  <div class="resource">
    <!-- 筛选部分 -->
    <el-card>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="searchForm.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="searchForm.categoryId" placeholder="全部">
            <el-option
              v-for="source in sourcesSort"
              :key="source.id"
              :label="source.name"
              :value="source.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSearch" :disabled="isLoading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加和分类 -->
    <el-card>
      <el-button size="small" @click="onAdd">添加</el-button>
      <el-button size="small" @click="onSort">资源分类</el-button>
    </el-card>
    <!-- 资源列表 -->
    <el-card>
      <el-table
        v-loading="isLoading"
        :data="sourcesData"
        border
        style="width: 100%"
      >
        <el-table-column align="center" width="50px" prop="id" label="编号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="资源名称">
        </el-table-column>
        <el-table-column align="center" prop="url" label="资源路径">
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
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.current"
      :page-sizes="[10, 15, 20]"
      :page-size="searchForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="sourcesTotal"
    >
    </el-pagination>
    <!-- 添加和编辑dialog -->
    <el-dialog
      :title="isEdit ? '编辑资源' : '添加资源'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseDialog"
      :destroy-on-close="true"
    >
      <create-or-eidt
        @updateData="updateDialog"
        @dialogClose="handleCloseDialog"
        :sourcesSort="sourcesSort"
        :editSourcesData="editSourcesData"
      ></create-or-eidt>
    </el-dialog>
  </div>
</template>

<script>
import {
  getResourcePages,
  getResourceAll,
  deleteResource,
} from "@/services/source/source";
import CreateOrEidt from "./components/CreateOrEdit";

export default {
  name: "ResourceIndex",
  components: {
    CreateOrEidt,
  },
  created() {
    // 获取资源列表
    this.getResourceData();
    // 获取分类列表
    this.getResourceAll();
  },
  data() {
    return {
      searchForm: {
        name: "",
        url: "",
        categoryId: "",
        current: 1,
        size: 10,
      },
      sourcesData: [],
      sourcesSort: [],
      sourcesTotal: 0,
      isLoading: false,
      dialogVisible: false,
      isEdit: false,
      editSourcesData: null,
    };
  },
  methods: {
    async getResourceAll() {
      const { data } = await getResourceAll();
      if (data.code === "000000") {
        this.sourcesSort = data.data;
      }
    },
    async getResourceData() {
      this.isLoading = true;
      const { data } = await getResourcePages(this.searchForm);
      if (data.code === "000000") {
        this.sourcesData = data.data.records;
        this.sourcesTotal = data.data.total;
        this.isLoading = false;
      }
    },
    onSearch() {
      this.searchForm.current = 1;
      this.getResourceData();
    },
    onReset() {
      this.$refs.searchForm.resetFields();
    },
    onAdd() {
      this.isEdit = false;
      this.dialogVisible = true;
    },
    onSort() {},
    handleEdit(rowData) {
      this.editSourcesData = rowData;
      this.isEdit = true;
      this.dialogVisible = true;
    },
    async handleDelete(rowData) {
      const { data } = await deleteResource(rowData.id);
      if (data.code === "000000") {
        this.$message.success("删除成功");
        this.getResourceData();
      }
    },
    handleCurrentChange(value) {
      this.searchForm.current = value;
      this.getResourceData();
    },
    handleSizeChange(value) {
      this.searchForm.size = value;
      this.getResourceData();
    },
    handleCloseDialog() {
      this.dialogVisible = false;
      this.editSourcesData = null;
    },
    updateDialog() {
      this.dialogVisible = false;
      this.editSourcesData = null;
      this.getResourceData();
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

<style scoped lang="scss"></style>
