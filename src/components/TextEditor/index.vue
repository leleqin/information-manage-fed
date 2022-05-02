<template>
  <div class="text-editor">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        mode="simple"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="textContent"
        mode="simple"
        @onCreated="onCreated"
        @onChange="onChange"
      />
    </div>
  </div>
</template>

<script>
// 富文本编辑器
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: "TextEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  components: { Editor, Toolbar },
  created() {
    this.textContent = this.value;
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      textContent: "",
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.textContent);
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
  },
};
</script>

<style scoped lang="scss"></style>
