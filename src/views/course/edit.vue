<template>
  <div class="edit-course">
    <create-or-edit
      title="编辑课程"
      :editCourseId="editCourseId"
    ></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from "./components/CreateOrEdit.vue";
export default {
  name: "EditCourse",
  components: {
    CreateOrEdit,
  },
  created() {
    this.editCourseId = this.$route.params.courseId;
  },
  data() {
    return {
      editCourseId: 0,
    };
  },
};
</script>

<style scoped lang="scss"></style>
