import axios from "axios";

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
  return config;
});

export default request;
