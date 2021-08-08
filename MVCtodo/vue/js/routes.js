/*global app, Router */
// director。JS 实现 路由
// directorjs用于小型同构界面
(function (app, Router) {
  "use strict";

  var router = new Router();
  // APP.visibility来自app，router 来自 director.js
  //   router的计时注册
  ["all", "active", "completed"].forEach(function (visibility) {
    router.on(visibility, function () {
      app.visibility = visibility;
    });
  });
  // configure配置
  // notfound：当路由方法router.dispatch()被调用时，没有匹配到任何路由时触发的方法
  router.configure({
    notfound: function () {
      window.location.hash = "";
      app.visibility = "all";
    },
  });

  router.init();
})(app, Router);
