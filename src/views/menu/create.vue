<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input v-model="form.href"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="选择上级菜单">
        <el-option label="无上级菜单" :value="-1"></el-option>
        <el-option
          v-for="item in parentList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="前端图标">
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true"></el-radio>
        <el-radio :label="false"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.orderNum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { saveOrUpdate, getMenuNodeList } from "@/services/menu/menu";
export default {
  name: "CreateMenu",
  created() {
    this.getParentList();
  },
  data() {
    return {
      form: {
        parentId: -1,
        name: "",
        href: "",
        icon: "",
        orderNum: 0,
        description: "",
        shown: true,
      },
      parentList: [],
    };
  },
  methods: {
    async onSubmit() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          saveOrUpdate(this.form)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "提交成功!",
                });
                this.$router.push({
                  name: "menu",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
    // 获取上级菜单列表
    async getParentList() {
      const { data } = await getMenuNodeList(this.form.parentId);
      if (data.code === "000000") {
        this.parentList = data.data;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
