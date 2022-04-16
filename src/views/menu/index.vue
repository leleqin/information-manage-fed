<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="createMenu">添加菜单</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%, padding:0">
        <el-table-column align="center" prop="id" label="编号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="菜单名称">
        </el-table-column>
        <el-table-column align="center" prop="level" label="菜单级数">
        </el-table-column>
        <el-table-column align="center" prop="icon" label="前端图标">
        </el-table-column>
        <el-table-column align="center" prop="orderNum" label="排序">
        </el-table-column>
        <el-table-column align="center" prop="m" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="handleDelete(scope.row)" type="text" size="small"
              >删除</el-button
            > </template
          >>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAll, deleteMenu } from "@/services/menu/menu";
export default {
  name: "MenuIndex",
  created() {
    this.getAllMenus();
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          parentId: -1,
          name: "权限管理",
          href: "",
          icon: "lock",
          orderNum: 1,
          description: "管理系统角色、菜单、资源",
          level: 0,
        },
      ],
    };
  },
  methods: {
    createMenu() {
      console.log("create menu");
      this.$router.push({
        name: "createMenu",
      });
    },
    // 获取所有菜单
    async getAllMenus() {
      const { data } = await getAll();
      if (data.code === "000000") {
        this.tableData = data.data;
      } else {
        this.$message.error("获取数据失败");
      }
    },
    handleEdit(rowData) {
      console.log(rowData);
    },
    handleDelete(rowData) {
      this.$confirm("是否要删除该菜单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const response = await deleteMenu(rowData.id);
          if (response.status === 200) {
            this.$message.success("删除成功!");
            this.getAllMenus();
          }
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
  },
};
</script>

<style scoped lang="scss"></style>
