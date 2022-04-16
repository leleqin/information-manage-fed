import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

// 引入 component
// import LayoutIndex from "@/views/layout/index";

Vue.use(VueRouter);

// 路由规则
const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/login/index"),
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/views/layout/index"),
    // 判断是否需要经过身份验证后才能访问
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/index"),
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/role/index"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/menu/index"),
      },
      // 添加菜单
      {
        path: "/menu/create",
        name: "createMenu",
        component: () =>
          import(/* webpackChunkName: "create-menu" */ "@/views/menu/create"),
      },
      // 编辑菜单
      {
        path: "/menu/edit",
        name: "editMenu",
        component: () =>
          import(/* webpackChunkName: "edit-menu" */ "@/views/menu/edit"),
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(/* webpackChunkName: "resource" */ "@/views/resource/index"),
      },
      {
        path: "/course",
        name: "course",
        component: () =>
          import(/* webpackChunkName: "course" */ "@/views/course/index"),
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/index"),
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: "advert" */ "@/views/advert/index"),
      },
      {
        path: "/adverts-pace",
        name: "adverts-pace",
        component: () =>
          import(
            /* webpackChunkName: "adverts-pace" */ "@/views/advert-space/index"
          ),
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () =>
      import(/* webpackChunkName: 'error-page' */ "@/views/error-page/index"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份认证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 通过 store 的 user 判断是否有登录信息
    if (!store.state.user) {
      // 未登录跳转到登录页
      return next({
        name: "login",
        // 登录成功后跳转到之前想要进入的页面
        query: {
          // 将本次路由的 fullPath 传递给 login 页面
          redirect: to.fullPath,
        },
      });
    }
    next();
  } else {
    next();
  }
});

export default router;
