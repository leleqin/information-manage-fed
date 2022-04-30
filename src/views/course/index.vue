<template>
  <div class="course">
    <!-- 查询部分 -->
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="searchForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="全部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :disabled="isLoading">查询</el-button>
      </el-form-item>
      <el-form-item style="margin-left: auto">
        <el-button
          @click="onCreate"
          :disabled="isLoading"
          type="primary"
          icon="el-icon-plus"
          >新建课程</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 列表部分 -->
    <template>
      <el-table :data="courseData" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="ID" width="150"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称"> </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
        </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.statusLoading"
              @change="handelStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handelEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" @click="allocRole(scope.row)"
              >课程管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页部分 -->
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="searchForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="coursesTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getQueryCourses, changeStats } from "@/services/course/course";
export default {
  name: "CourseIndex",
  created() {
    // 获取课程列表
    this.getCourses();
  },
  data() {
    return {
      courseData: [],
      isLoading: false,
      coursesTotal: 0,
      searchForm: {
        currentPage: 1,
        pageSize: 10,
        courseName: "",
        status: "",
      },
      // 查询的状态数据
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 1,
          label: "上架",
        },
        {
          value: 0,
          label: "下架",
        },
      ],
    };
  },
  methods: {
    // 编辑
    handelEdit(course) {
      console.dir(this.courseData[0]);
      console.log(course);
      this.$router.push({
        name: "editCourse",
        params: {
          courseId: course.id,
        },
      });
    },
    async getCourses() {
      const { data } = await getQueryCourses(this.searchForm);
      if (data.code === "000000") {
        // 给 data 添加一个 statusLoading 属性，判断是不是在发送消息中
        // 默认值为 false
        data.data.records.forEach((item) => {
          // 用于表示更改的状态
          item.statusLoading = false;
        });
        this.coursesTotal = data.data.total;
        this.courseData = data.data.records;
      }
    },
    onSearch() {
      this.searchForm.currentPage = 1;
      this.getCourses();
    },
    onCreate() {
      this.$router.push({ name: "createCourse" });
    },
    handleCurrentChange(value) {
      this.searchForm.currentPage = value;
      this.getCourses();
    },
    handleSizeChange(value) {
      this.searchForm.pageSize = value;
      this.getCourses();
    },
    async handelStatus(course) {
      course.statusLoading = true;
      const { data } = await changeStats({
        courseId: course.id,
        status: course.status,
      });
      if (data.code === "000000") {
        this.$message.success("设置成功");
        course.statusLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.el-form {
  display: flex;
  align-items: flex-end;
}
</style>
