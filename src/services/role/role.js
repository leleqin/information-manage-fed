import request from "@/utils/request";

// 获取角色列表
export const getRolePages = (data) => {
  return request({
    method: "POST",
    url: "/boss/role/getRolePages",
    data,
  });
};

// 删除角色
export const deleteRole = (id) => {
  return request({
    method: "DELETE",
    url: `/boss/role/${id}`,
  });
};

// 获取角色
export const getRole = (id) => {
  return request({
    method: "GET",
    url: `/boss/role/${id}`,
  });
};

// 保存或更新角色
export const saveOrUpdateRole = (data) => {
  return request({
    method: "POST",
    url: "/boss/role/saveOrUpdate",
    data,
  });
};
