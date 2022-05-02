<template>
  <div class="upload-course-image">
    <el-form-item :label="title">
      <!-- 进度条 -->
      <el-progress
        v-if="isUploading"
        type="circle"
        :percentage="percentage"
        :width="178"
        :status="percentage === 100 ? 'success' : null"
      ></el-progress>
      <!-- 上传图片 -->
      <el-upload
        v-else
        class="avatar-uploader"
        action="http://eduboss.lagou.com/boss/course/upload"
        :show-file-list="false"
        :http-request="handleUploadImage"
        :before-upload="beforeUpload"
      >
        <img v-if="value" :src="value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
import { uploadImage } from "@/services/course/course";

export default {
  name: "UploadCourseImage",
  props: {
    value: {
      type: String,
    },
    title: {
      type: String,
    },
    // 限制上传图片的大小
    // 默认 2M
    limit: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      // 保存上传状态
      isUploading: false,
      // 上传百分比
      percentage: 0,
    };
  },
  methods: {
    // 图片上传
    async handleUploadImage(options) {
      // 开启上传状态
      this.isUploading = true;

      // 使用 FormData 对象处理
      const fd = new FormData();
      // 第一个参数，取决于接口文档名
      fd.append("file", options.file);
      // 发送上传请求
      const { data } = await uploadImage(fd, (event) => {
        this.percentage = Math.floor((event.loaded / event.total) * 100);
      });
      if (data.code === "000000") {
        this.$emit("input", data.data.name);
        this.isUploading = false;
        // 上传成功后,设置进度条归零
        this.percentage = 0;
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < this.limit;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 " + this.limit + "MB!");
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
