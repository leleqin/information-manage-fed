<template>
  <div class="create-or-edit-section">
    <el-form
      ref="section"
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="form.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称" prop="sectionName">
        <el-input v-model="form.sectionName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="章节排序" prop="orderNum">
        <el-input v-model="form.orderNum" type="number">
          <template slot="append">数字控制排序，数字越大越靠后</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdateSection } from "@/services/course/sections";

export default {
  name: "CreateOrEditSection",
  props: {
    sectionData: {
      type: [Object, null],
    },
    courseName: {
      type: String,
    },
    courseId: {
      type: [Number, String],
    },
  },
  created() {
    if (this.sectionData) {
      this.form = this.sectionData;
    }
    this.form.courseName = this.courseName;
    this.form.courseId = this.courseId;
  },
  data() {
    return {
      form: {
        courseId: 0,
        courseName: "",
        sectionName: "",
        orderNum: 0,
        description: "",
        status: 0,
      },
    };
  },
  methods: {
    async handleConfirm() {
      const { data } = await saveOrUpdateSection(this.form);
      if (data.code === "000000") {
        this.$message.success(this.sectionData ? "修改成功" : "添加成功");
      }
      this.$refs.section.resetFields();
      this.$emit("dialogClose");
    },
    handleCancel() {
      this.$refs.section.resetFields();
      this.$emit("dialogClose");
    },
  },
};
</script>

<style scoped lang="scss"></style>
