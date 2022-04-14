import request from "@/utils/request";

// 获取所有菜单并按层级展示
export const getMenuNodeList = (id = -1) => {
  return request({
    method: "GET",
    url: "/boss/menu/getMenuNodeList",
    params: {
      id,
    },
  });
};

// 保存或新增菜单
export const saveOrUpdate = (data) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data,
  });
};
