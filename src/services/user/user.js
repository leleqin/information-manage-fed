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
