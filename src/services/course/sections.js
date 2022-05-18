import request from "@/utils/request";

// 获取章节信息
export const getSectionAndLesson = (params) => {
  return request.get("/boss/course/section/getSectionAndLesson", {
    params,
  });
};
