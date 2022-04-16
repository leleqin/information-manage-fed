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

// 获取所有菜单
export const getAll = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getAll",
  });
};

// 删除菜单
export const deleteMenu = (id) => {
  return request({
    method: "DELETE",
    url: `/boss/menu/${id}`,
  });
};

// 获取单个菜单的信息
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: "GET",
    url: "/boss/menu/getEditMenuInfo",
    params: {
      id,
    },
  });
};
