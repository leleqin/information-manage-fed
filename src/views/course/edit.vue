<template>
  <div class="edit-course">
    <create-or-edit title="编辑课程"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from "./components/CreateOrEdit.vue";
export default {
  name: "EditCourse",
  components: {
    CreateOrEdit,
  },
};
</script>

<style scoped lang="scss"></style>
