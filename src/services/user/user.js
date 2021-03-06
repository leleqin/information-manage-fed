import request from "@/utils/request";
import qs from "qs";

// 登录接口
export const login = (data) => {
  return request({
    method: "POST",
    url: "/front/user/login",
    // 使用 npm 的库的 qs
    data: qs.stringify(data),
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/front/user/getInfo",
    // header 的 access_token 在 axios 请求拦截中配置
  });
};

export const logout = () => {
  return request({
    method: "POST",
    url: "/front/user/logout",
  });
};

// 分页查询用户信息
export const getUserPages = (data) => {
  return request.post("/boss/user/getUserPages", data);
};

// 启用用户
export const enableUser = (userId) => {
  return request.get("/boss/user/enableUser", { params: { userId } });
};

// 禁用用户
export const forbidUser = (data) => {
  return request.post("/boss/user/forbidUser", data);
};
