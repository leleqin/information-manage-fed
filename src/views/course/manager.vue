<template>
  <div class="manager-course">
    <el-page-header @back="goBack" :content="courseName"> </el-page-header>
    <el-card>
      <!-- element UI Tree 树形控件 -->
      <el-tree
        :data="sectionsData"
        :props="defaultProps"
        draggable
        :allow-drop="handelDrop"
        @node-drop="handelNodeDrop"
      ></el-tree>
    </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson } from "@/services/course/sections";
import { getCourseById } from "@/services/course/course";
export default {
  name: "ManagerCourse",
  created() {
    // 获取课程 section
    this.getSections();
    // 获取课程 info
    this.getCourse();
  },
  data() {
    return {
      // 课程名
      courseName: "",
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
    // 拖拽排序完成后的处理函数
    handelNodeDrop(draggingNode, dropNode, type, event) {
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
      const { data } = await getSectionAndLesson({
        courseId: this.$route.params.courseId,
      });
      if (data.code === "000000") {
        this.sectionsData = data.data;
      }
      console.log(data);
    },
    // 获取课程 info
    async getCourse() {
      const { data } = await getCourseById({
        courseId: this.$route.params.courseId,
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
.el-page-header {
  padding-bottom: 30px;
}
</style>
