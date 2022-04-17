<template>
  <div class="resource">
    <!-- 筛选部分 -->
    <el-card>
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="资源名称">
          <el-input v-model="searchFrom.user" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="searchFrom.user" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select v-model="searchFrom.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSearch">查询</el-button>
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
      <el-table :data="sourcesData" border style="width: 100%">
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
  </div>
</template>

<script>
import { getResourcePages } from "@/services/source/source";

export default {
  name: "ResourceIndex",
  created() {
    // 获取资源列表
    this.getResourceData();
  },
  data() {
    return {
      searchFrom: {},
      sourcesData: [],
    };
  },
  methods: {
    async getResourceData() {
      const { data } = await getResourcePages({});
      if (data.code === "000000") {
        this.sourcesData = data.data.records;
      }
    },
    onSearch() {},
    onReset() {},
    onAdd() {},
    onSort() {},
    handleEdit(rowData) {
      console.log(rowData);
    },
    handleDelete(rowData) {
      console.log(rowData);
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
