import Vue from "vue"; // 导入Vue
import Router from "vue-router"; // 导入vue-router 库

import Layouts from "../components/layouts"; // 导入layouts.vue 组件
import todo from "../components/todo";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//全局注册Router组件，它会绑定到Vue实例里面。
Vue.use(Router);

// 嵌套路由
export default new Router({
  routes: [
    {
      path: "/",
      name: "Layouts",
      component: Layouts,
      children: [
        {
          // 当todo/id匹配成功，todo会被渲染到layouts 的routerview里
          path: "/todo/:_id",
          name: "todo",
          component: todo,
          props: true
        }
      ]
    }
  ]
});
