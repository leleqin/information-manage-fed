<template>
  <div class="create-or-edit">
    <!-- 页头 -->
    <el-page-header @back="goBack" :content="title"> </el-page-header>
    <el-card>
      <!-- 步骤条 -->
      <el-steps :active="currentActive" align-center finish-status="success">
        <el-step
          v-for="item in stepData"
          :key="item.id"
          :title="item.stepName"
          @click.native="changeStep(item.id)"
        ></el-step>
      </el-steps>
      <el-divider></el-divider>
      <!-- 步骤 view -->
      <el-form ref="courseFormData" :model="courseFormData" label-width="120px">
        <!-- 基本信息 -->
        <div class="base-info" v-show="currentActive === 0">
          <el-form-item label="名称">
            <el-input
              v-model="courseFormData.courseName"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              v-model="courseFormData.brief"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input
              v-model="courseFormData.teacherDTO.teacherName"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input
              v-model="courseFormData.teacherDTO.position"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input
              v-model="courseFormData.teacherDTO.description"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="courseFormData.previewFirstField"
              maxlength="20"
              show-word-limit
              style="width: 49%; min-width: 300px; margin-right: 19px"
            ></el-input>
            <el-input
              v-model="courseFormData.previewSecondField"
              maxlength="20"
              show-word-limit
              style="width: 49%; min-width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="courseFormData.sortNum"
              controls-position="right"
              :min="1"
            >
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input-number>
          </el-form-item>
        </div>
        <!-- 上传图片 -->
        <div class="upload-image" v-show="currentActive === 1">
          <upload-course-image
            v-model="courseFormData.courseListImg"
            title="课程封面"
          ></upload-course-image>
          <upload-course-image
            v-model="courseFormData.courseImgUrl"
            title="解锁封面"
          ></upload-course-image>
        </div>
        <!-- 销售信息 -->
        <div class="sales-info" v-show="currentActive === 2">
          <el-form-item label="售卖价格">
            <el-input v-model="courseFormData.discounts" type="number" min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="courseFormData.price" type="number" min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="courseFormData.sales" type="number" min="0">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              v-model="courseFormData.discountsTag"
              maxlength="4"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
        <!-- 秒杀活动 -->
        <div class="seckill-info" v-show="currentActive === 3">
          <el-form-item label="显示秒杀活动">
            <el-switch
              v-model="courseFormData.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
            ></el-switch>
          </el-form-item>
          <div v-show="courseFormData.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="courseFormData.activityCourseDTO.beginTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="courseFormData.activityCourseDTO.endTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input
                v-model="courseFormData.activityCourseDTO.amount"
                type="number"
                min="0"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input
                v-model="courseFormData.activityCourseDTO.stock"
                type="number"
                min="0"
              >
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 课程详情 -->
        <div class="base-info" v-show="currentActive === 4">
          <text-editor v-model="courseFormData.courseDescriptionMarkDown" />
          <el-form-item label="是否上架">
            <el-switch
              v-model="courseFormData.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </div>
      </el-form>
      <!-- 下一步 -->
      <el-button
        style="margin-top: 12px"
        @click="onNext"
        v-show="currentActive !== stepData.length - 1"
        >下一步</el-button
      >
      <!-- 保存 -->
      <el-button
        style="margin-top: 12px"
        @click="onSave"
        v-show="currentActive === stepData.length - 1"
        >保存</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { saveOrUpdateCourse, getCourseById } from "@/services/course/course";

import UploadCourseImage from "./UploadCourseImage.vue";
import TextEditor from "@/components/TextEditor";

// 步骤信息
let stepData = [
  { id: 0, stepName: "基本信息" },
  { id: 1, stepName: "上传图片" },
  { id: 2, stepName: "销售信息" },
  { id: 3, stepName: "秒杀活动" },
  { id: 4, stepName: "课程详情" },
];

export default {
  name: "CreateOrEdit",
  components: { UploadCourseImage, TextEditor },
  props: {
    // 页头名
    title: {
      type: String,
      default: "",
    },
    editCourseId: {
      type: Number,
      default: -1,
    },
  },
  created() {
    // 获取编辑的课程信息
    if (this.editCourseId != -1) {
      this.getCourseInfo();
    }
  },
  data() {
    return {
      // 当前步骤
      currentActive: 0,
      // 步骤信息
      stepData,
      // 课程信息
      // 添加信息不需要id
      courseFormData: {
        // id: 0,
        // 课程名
        courseName: "",
        // 课程简介
        brief: "",
        // 授课老师信息
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: "",
          teacherHeadPicUrl: "",
          position: "",
          description: "",
        },
        // 课程详情
        courseDescriptionMarkDown: "",
        // 售卖价格 原价
        price: 0,
        // 课程折扣价
        discounts: 0,
        // 原价标签
        priceTag: "",
        // 折扣标签
        discountsTag: "",
        isNew: true,
        isNewDes: "",
        // 课程封面
        courseListImg: "",
        // 解锁封面
        courseImgUrl: "",
        // 课程排序
        sortNum: 0,
        // 课程预览第一个字段
        previewFirstField: "",
        // 课程预览第二个字段
        previewSecondField: "",
        // 上架状态，0 草稿，1 上架
        status: 1,
        // 显示销量
        sales: 0,
        // 课程是否做秒杀
        activityCourse: false,
        // 秒杀信息
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: "",
          endTime: "",
          amount: 0,
          stock: 0,
        },
        autoOnlineTime: "",
      },
    };
  },
  methods: {
    // 获取编辑的课程信息
    async getCourseInfo() {
      const { data } = await getCourseById({ courseId: this.editCourseId });
      if (data.code === "000000") {
        this.courseFormData = data.data;
        if (!this.courseFormData.activityCourseDTO) {
          this.courseFormData.activityCourseDTO = {};
        }
      }
    },
    goBack() {
      this.$router.push({ name: "course" });
    },
    async onSave() {
      const { data } = await saveOrUpdateCourse(this.courseFormData);
      if (data.code === "000000") {
        this.$message.success("课程新建成功");
        this.$router.push({ name: "course" });
      }
    },
    onNext() {
      this.currentActive++;
    },
    // 点击步骤条修改当前步骤
    changeStep(active) {
      if (active > this.currentActive && this.currentActive === -1) {
        this.$message("点击下一步，到达");
        return;
      }
      this.currentActive = active;
    },
  },
};
</script>

<style scoped lang="scss">
.el-page-header {
  padding-bottom: 30px;
}
// 鼠标换成小手的样子
.el-step {
  cursor: pointer;
}
</style>
