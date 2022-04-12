import axios from "axios";
import store from "@/store";

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

export default request;
