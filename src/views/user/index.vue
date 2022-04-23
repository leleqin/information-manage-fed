<template>
  <div class="user">
    <!-- 查询部分 -->
    <el-form
      ref="searchForm"
      :model="searchForm"
      label-position="top"
      label-width="100px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="searchForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="dateRange">
        <el-date-picker
          v-model="searchForm.dateRange"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" :disabled="isLoading">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <template>
      <el-table :data="userData" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="用户ID" width="150">
        </el-table-column>
        <el-table-column prop="portrait" label="头像" width="80">
          <el-avatar
            size="small"
            :src="
              userData.portrait ||
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          ></el-avatar>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="createTime" label="注册时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="ENABLE"
              inactive-value="DISABLE"
              @change="handelStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="allocRole(scope.row)"
              >分配角色</el-button
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
      :total="usersTotal"
    >
    </el-pagination>
    <!-- 分配角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="chooseRoles" multiple placeholder="请选择">
        <el-option
          v-for="role in roleData"
          :key="role.id"
          :label="role.name"
          :value="role.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocUserRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPages, enableUser, forbidUser } from "@/services/user/user";
import {
  getRolePages,
  allocateUserRoles,
  getUserRoles,
} from "@/services/role/role";

export default {
  name: "UserIndex",
  created() {
    // 获取用户列表
    this.getUsers();
    // 获取角色列表
    this.getRols();
  },
  data() {
    return {
      userData: [],
      roleData: [],
      searchForm: {
        phone: "",
        pageSize: 10,
        currentPage: 1,
        startCreateTime: "",
        endCreateTime: "",
        dateRange: [],
      },
      isLoading: false,
      usersTotal: 0,
      chooseRoles: [],
      dialogVisible: false,
      currentAllocUserId: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    async getRols() {
      const { data } = await getRolePages({});
      if (data.code === "000000") {
        this.roleData = data.data.records;
      }
    },
    async getUsers() {
      let { dateRange } = this.searchForm;
      if (dateRange) {
        this.searchForm.startCreateTime = dateRange[0];
        this.searchForm.endCreateTime = dateRange[1];
      } else {
        this.searchForm.startCreateTime = "";
        this.searchForm.endCreateTime = "";
      }
      this.isLoading = true;
      const { data } = await getUserPages(this.searchForm);
      if (data.code === "000000") {
        this.userData = data.data.records;
        this.usersTotal = data.data.total;
      }
      this.isLoading = false;
    },
    async handelStatus(data) {
      if (data.status === "ENABLE") {
        const { data: forbidData } = await forbidUser({ userId: data.id });
        console.log(forbidData);
      } else {
        const { data: enableData } = await enableUser({ userId: data.id });
        console.log(enableData);
      }
    },
    async allocRole(checkUser) {
      const { data } = await getUserRoles(checkUser.id);
      if (data.code === "000000") {
        data.data?.forEach((role) => {
          this.chooseRoles = [...this.chooseRoles, role.id];
        });
      }
      this.dialogVisible = true;
      this.currentAllocUserId = checkUser.id;
    },
    onSearch() {
      this.searchForm.currentPage = 1;
      this.getUsers();
    },
    handleCurrentChange(value) {
      this.searchForm.currentPage = value;
      this.getUsers();
    },
    handleSizeChange(value) {
      this.searchForm.pageSize = value;
      this.getUsers();
    },
    async allocUserRole() {
      const { data } = await allocateUserRoles({
        userId: this.currentAllocUserId,
        roleIdList: this.chooseRoles,
      });
      this.dialogVisible = false;
      this.chooseRoles = [];
      console.log(data);
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
.el-form {
  display: flex;
  align-content: center;
  justify-self: end;
  align-items: flex-end;

  .el-form-item {
    margin-right: 20px;
    padding: 0;

    .el-input {
      display: inline-block;
    }
  }
}
</style>
