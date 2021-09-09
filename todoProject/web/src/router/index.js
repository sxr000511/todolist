import Vue from "vue"; // 导入Vue
import Router from "vue-router"; // 导入vue-router 库

import Layouts from "../components/layouts"; // 导入layouts.vue 组件
import todo from "../components/todo";
import login from "../components/login";

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

//全局注册Router组件，它会绑定到Vue实例里面。
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/todo/login",
      name: "Login",
      component: login,
      meta: { isPublic: true }
    },
    {
      path: "/todo",
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

// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log("log");
  if (!to.meta.isPublic && !localStorage.todouser) {
    return next("/todo/login");
  }
  next();
});

export default router;

// // 嵌套路由
// export default new Router({
//   routes: [
//     { path: "/login", name: "Login", component: login },
//     {
//       path: "/",
//       name: "Layouts",
//       component: Layouts,
//       children: [
//         {
//           // 当todo/id匹配成功，todo会被渲染到layouts 的routerview里
//           path: "/todo/:_id",
//           name: "todo",
//           component: todo,
//           props: true
//         }
//       ]
//     }
//   ]
// });
