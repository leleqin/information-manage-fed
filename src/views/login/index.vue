<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="100px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="dispalyLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 接口已封装到 services 里，不需要在此文件中引用
// import request from "@/utils/request";
// import qs from "qs";

// 通过解构的方式，对文件里的接口方法，按需引用
import { login } from "@/services/user/user";

export default {
  name: "LoginIndex",
  data() {
    return {
      form: {
        phone: "18201288771",
        password: "111111",
      },
      dispalyLoading: false,
      // rules 是写在 data 里的
      rules: {
        phone: [
          { required: true, message: "请输入电话号", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      // 判断数据是否合法，再发送请求
      try {
        await this.$refs.form.validate();
        // 多次点击 loading 避免重复请求
        this.dispalyLoading = true;

        // 将接口封装到 services 里，便于后期维护
        const { data } = await login(this.form);
        this.dispalyLoading = false;
        if (data.state === 1) {
          // 通过 router 跳转页面
          this.$router.push({ name: "home" });
          // Element UI 的 message 提示框
          this.$message.success("登录成功");
        } else {
          this.$message.error("登录失败");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  align-items: center;
  justify-content: center;

  .el-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
