<template>
  <div>
    <el-form
      ref="editSourcesData"
      :inline="true"
      :model="editSourcesData"
      class="demo-form-inline"
    >
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name" placeholder="资源名称"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" prop="url">
        <el-input v-model="form.url" placeholder="资源路径"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="全部">
          <el-option
            v-for="source in sourcesSort"
            :key="source.id"
            :label="source.name"
            v-model="source.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdateResource } from "@/services/source/source";

export default {
  name: "CreateOrEidt",
  props: {
    sourcesSort: {
      type: Array,
    },
    editSourcesData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    if (this.editSourcesData) {
      this.form = this.editSourcesData;
    }
  },
  data() {
    return {
      form: {
        name: "",
        url: "",
        categoryId: "",
        description: "",
      },
    };
  },
  methods: {
    async handleConfirm() {
      const { data } = await saveOrUpdateResource(this.editSourcesData);
      if (data.code === "000000") {
        this.$message.success(
          this.editSourcesData.id ? "修改成功" : "添加成功"
        );
      }
      this.$refs.editSourcesData.resetFields();
      this.$emit("updateData");
    },
    handleCancel() {
      this.$refs.editSourcesData.resetFields();
      this.$emit("dialogClose");
    },
  },
};
</script>

<style scoped lang="scss"></style>
