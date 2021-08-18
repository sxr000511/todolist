import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

import Mock from "./mock"; // 引入mock模块
Mock.start();
// 引入vuex
import store from "./vuex/store"; //  引入vuex实例

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
