import request from "@/utils/request";

// 分页查询课程信息
export const getQueryCourses = (data) => {
  return request.post("/boss/course/getQueryCourses", data);
};

// 课程上下架
export const changeStats = (params) => {
  return request.get("/boss/course/changeState", { params });
};

// 上传图片
export const uploadImage = (data, onUploadProgress) => {
  return request.post("/boss/course/upload", data, {
    onUploadProgress,
  });
};

// 保存或更新课程信息
export const saveOrUpdateCourse = (data) => {
  return request.post("/boss/course/saveOrUpdateCourse", data);
};

// 通过课程Id获取课程信息
export const getCourseById = (params) => {
  return request.get("/boss/course/getCourseById", { params });
};
