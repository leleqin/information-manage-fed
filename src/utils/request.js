import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import qs from "qs";

// create 创建 axios 实例
const request = axios.create({
  timeout: 5000,
});

function getBaseURL(url) {
  if (url.startsWith("/boos")) {
    return "http://eduboss.lagounews.com";
  } else {
    return "http://edufront.lagounews.com";
  }
}

// 请求拦截
request.interceptors.request.use(function (config) {
  // 通过求情的 url 判断 baseUrl
  config.baseURL = getBaseURL(config.url);
  // 配置 header 的 access_token 统一配置
  const { user } = store.state;
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token;
  }
  return config;
});

function jumpToLogin() {
  router.push({
    name: "login",
    query: {
      // cuurentRoute 就是存储了当前路由信息的对象
      redirect: router.currentRoute.fullPath,
    },
  });
}

// 判断当前 token 是否正在刷新
let isRefreshToken = false;
// 存储因为 token 刷新挂起的请求
let requests = [];

// 响应拦截
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    if (error.response) {
      // 请求发送成功，响应接收完成，但是状态码为失败的情况
      const { status } = error.response;
      let errorMessage = "";
      // access_token 过期，刷新 token
      if (status === 401) {
        // 1. 没有 token 信息
        if (!store.state.user) {
          // 直接跳转到登录页
          jumpToLogin();
          return Promise.reject(error);
        }
        // 判断是否正在更新 token
        if (isRefreshToken) {
          // 将请求打包成函数放到请求队列中
          requests.push(() => {
            request(error.config);
          });
        }
        isRefreshToken = true;
        // 2. 有无效的 token
        return request({
          method: "POST",
          url: "/front/user/refresh_token",
          // 数据请求类型 application/x-www-form-urlencoded
          data: qs.stringify({ refreshtoken: store.state.user.refresh_token }),
        })
          .then((res) => {
            console.log(res);
            // 刷新 token 失败
            if (res.data.state !== 1) {
              // 清除无效的用户信息
              store.commit("setUser", null);
              // 跳转到登录页
              jumpToLogin();
              return Promise.reject(error);
            }
            // 刷新 token 成功 重新给 user 赋值
            store.commit("setUser", res.data.content);

            // 执行队列中的请求
            requests.forEach((callback) => callback());
            // 将队列清空
            requests = [];
            // 再次请求未成功接口
            return request(error.config);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            // 请求发送完毕，响应处理完毕
            isRefreshToken = false;
          });
      } else if (status === 403) {
        errorMessage = "没有权限，请联系管理员";
      } else if (status === 404) {
        errorMessage = "资源不存在";
      } else if (status >= 500) {
        errorMessage = "服务的请求错误，请联系管理员";
      }
      Message.error(errorMessage);
    } else if (error.request) {
      // 请求发送成功，但是未收到响应
      Message.error("请求超时，请重试");
    } else {
      // 意料之外的错误
      Message.error(error.message);
    }

    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
