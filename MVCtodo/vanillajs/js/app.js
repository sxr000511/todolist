/*global app, $on */

// (function( window, undefined ) {})(window);
// 匿名函数自执行，避免函数体内外变量的冲突
// 后面的圆括号中的window为实参,接受window对象(window对象是全局环境下的),而function后面的圆括号中的window为局部变量,不是全局的window对象.
(function () {
  "use strict";

  /**
   * Sets up a brand new Todo list.
   *
   * @param {string} name The name of your new to do list.
   */
  // MVC (model, views, controller)
  function Todo(name) {
    this.storage = new app.Store(name);
    this.model = new app.Model(this.storage);
    this.template = new app.Template();
    this.view = new app.View(this.template);
    this.controller = new app.Controller(this.model, this.view);
  }

  var todo = new Todo("todos-vanillajs");

  function setView() {
    // conroller下的setview 用来 加载/初始化 view
    todo.controller.setView(document.location.hash);
  }
  $on(window, "load", setView);
  $on(window, "hashchange", setView);
})();
