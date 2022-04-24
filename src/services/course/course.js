import request from "@/utils/request";

// 分页查询课程信息
export const getQueryCourses = (data) => {
  return request.post("/boss/course/getQueryCourses", data);
};

// 课程上下架
export const changeStats = (params) => {
  return request.get("/boss/course/changeState", { params });
};
