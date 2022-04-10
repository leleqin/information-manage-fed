import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 完整引入 Element 全局都可以使用
import ElementUI from "element-ui";

// 引入 Element 的主题文件
// import "element-ui/lib/theme-chalk/index.css"; // index.scss 中引过了，不再重复引用

// 引入自定义的全局样式文件
import "./styles/index.scss";

// 将 Element 注册为 Vue 插件
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
