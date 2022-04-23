import request from "@/utils/request";

// 按条件分页查询资源
export const getResourcePages = (data) => {
  return request({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data,
  });
};

// 获取资源分类列表
export const getCategoryResourceAll = () => {
  return request({
    method: "GET",
    url: "/boss/resource/category/getAll",
  });
};

// 新增资源
export const saveOrUpdateResource = (data) => {
  return request({
    method: "POST",
    url: "/boss/resource/saveOrUpdate",
    data,
  });
};

// 删除资源
export const deleteResource = (id) => {
  return request({
    method: "DELETE",
    url: `/boss/resource/${id}`,
  });
};

// 获取角色拥有的资源列表
export const getRoleResources = (roleId = -1) => {
  return request({
    method: "GET",
    url: "/boss/resource/getRoleResources",
    params: {
      roleId,
    },
  });
};

// 给角色分配资源
export const allocateRoleResource = (data) => {
  return request({
    method: "POST",
    url: "/boss/resource/allocateRoleResources",
    data,
  });
};
