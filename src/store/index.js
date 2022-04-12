import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem("user")),
  },
  getters: {},
  mutations: {
    setUser(context, payload) {
      context.user = JSON.parse(payload);
      // 将数据存在本地 localStorage 里，避免刷新还需再次登录
      window.localStorage.setItem("user", payload);
    },
  },
  actions: {},
  modules: {},
});
