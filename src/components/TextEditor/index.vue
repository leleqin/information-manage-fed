<template>
  <div class="text-editor">
    <div style="border: 1px solid #ccc; height: 600px">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        mode="simple"
      />
      <Editor
        style="height: 300px; overflow-y: hidden"
        v-model="textContent"
        mode="simple"
        :defaultConfig="editorConfig"
        @onCreated="onCreated"
        @onChange="onChange"
      />
    </div>
  </div>
</template>

<script>
import { uploadImage } from "@/services/course/course";
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
      loading: false,
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            server: "http://eduboss.lagou.com/boss/course/upload",
            async customUpload(file, insertFn) {
              // file 即选中的文件
              const fd = new FormData();
              fd.append("file", file);
              // 自己实现上传，并得到图片 url alt href
              const { data } = await uploadImage(fd, (event) => {
                console.log(event);
              });
              // 最后插入图片
              if (data.code === "000000") {
                insertFn(data.data.name, data.data.name, data.data.name);
              }
            },
          },
        },
      },
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
  // 由于传入的值，是异步获取的，但是组件里是同步的
  // 需要监听 value 的变化，来初始化 Editor 的文本
  watch: {
    value() {
      if (!this.loading) {
        this.textContent = this.value;
        this.loading = true;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
