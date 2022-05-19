import request from "@/utils/request";

// 获取章节信息
export const getSectionAndLesson = (params) => {
  return request.get("/boss/course/section/getSectionAndLesson", {
    params,
  });
};

// 保存或更新章节
export const saveOrUpdateSection = (data) => {
  return request.post("/boss/course/section/saveOrUpdateSection", data);
};
