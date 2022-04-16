<template>
  <div>
    <create-or-edit :menu-id="this.$route.params.id"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from "./components/CreateOrEdit";

export default {
  name: "EditMenu",
  components: { CreateOrEdit },
};
</script>

<style scoped lang="scss"></style>
