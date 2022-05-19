<template>
  <div class="manager-course">
    <div class="header">
      <el-page-header @back="goBack" :content="courseName"> </el-page-header>
      <el-button
        class="add-section"
        type="primary"
        icon="el-icon-plus"
        @click="addSection"
      >
        添加阶段
      </el-button>
    </div>
    <el-card>
      <!-- element UI Tree 树形控件 -->
      <el-tree
        :data="sectionsData"
        :props="defaultProps"
        draggable
        :allow-drop="handelDrop"
        @node-drop="handelNodeDrop"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button size="small" @click="handelEditSection(data)">
              编辑
            </el-button>
            <el-button type="primary" size="small" @click="() => append(data)">
              添加课时</el-button
            >
            <el-button size="small" @click="() => remove(node, data)">
              已隐藏
            </el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
    <!-- 添加和编辑section dialog -->
    <el-dialog
      title="章节信息"
      :visible.sync="sectionDialogVisible"
      width="50%"
      :before-close="handleCloseSectionDialog"
      :destroy-on-close="true"
    >
      <create-or-edit-section
        v-if="sectionDialogVisible"
        @dialogClose="handleCloseSectionDialog"
        :sectionData="sectionData"
        :courseName="courseName"
        :courseId="courseId"
      ></create-or-edit-section>
    </el-dialog>
  </div>
</template>

<script>
import { getSectionAndLesson } from "@/services/course/sections";
import { getCourseById } from "@/services/course/course";

import CreateOrEditSection from "./components/CreateOrEditSection.vue";

export default {
  name: "ManagerCourse",
  components: {
    CreateOrEditSection,
  },
  created() {
    // 获取课程 section
    this.getSections();
    // 获取课程 info
    this.getCourse();
  },
  data() {
    return {
      // 是否显示添加/编辑 section dialog
      sectionDialogVisible: false,
      // 单个章节信息
      sectionData: null,
      // 课程名
      courseName: "",
      // 课程id
      courseId: 0,
      // Sections
      sectionsData: [],
      // 控件渲染配置
      defaultProps: {
        children: "lessonDTOS",
        // 根据数据类型 判断显示的 label
        label: (data) => {
          return data.sectionName || data.theme;
        },
      },
    };
  },
  methods: {
    // 关闭添加/编辑 section dialog
    handleCloseSectionDialog() {
      this.sectionDialogVisible = false;
      this.sectionData = null;
      this.getSections();
    },
    // 添加章节
    addSection() {
      this.sectionDialogVisible = true;
    },
    // 编辑章节
    handelEditSection(rowData) {
      this.sectionDialogVisible = true;
      this.sectionData = rowData;
    },
    // 拖拽排序完成后的处理函数
    handelNodeDrop(draggingNode, dropNode, type, event) {
      // 需要根据拖动的顺序, 来发送请求,对章节和课时进行排序
      console.log(draggingNode);
      console.log(dropNode);
      console.log(type);
      console.log(event);
    },
    // 判断拖拽是否可以被释放
    handelDrop(draggingNode, dropNode, type) {
      // - 规则1： 只能同级移动，type 不能为 'inner'
      // - 规则2： 课时不能移动到其他章节中
      return (
        type !== "inner" &&
        draggingNode.data.sectionId === dropNode.data.sectionId
      );
    },
    // 获取课程 section
    async getSections() {
      this.courseId = this.$route.params.courseId;
      const { data } = await getSectionAndLesson({
        courseId: this.courseId,
      });
      if (data.code === "000000") {
        this.sectionsData = data.data;
      }
      console.log(data);
    },
    // 获取课程 info
    async getCourse() {
      const { data } = await getCourseById({
        courseId: this.courseId,
      });
      if (data.code === "000000") {
        this.courseName = data.data.courseName;
      }
    },
    goBack() {
      this.$router.push({
        name: "course",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
}
</style>
