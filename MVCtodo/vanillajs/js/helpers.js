/*global NodeList */
(function (window) {
  "use strict";

  // Get element(s) by CSS selector:
  window.qs = function (selector, scope) {
    //   懒运算 ，scope有就是scope 没有就是document
    return (scope || document).querySelector(selector);
  };
  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };
  // $on 添加事件监听
  // addEventListener wrapper:
  window.$on = function (target, type, callback, useCapture) {
    //   !!用来判断变量是否非空 ，空（null，undefined等）全变为false
    // 参1：事件string 2：处理函数 3：冒泡 or 捕获
    target.addEventListener(type, callback, !!useCapture);
  };
  // 给所有符合selector 的 element都绑定事件
  // Attach a handler to event for all elements that match the selector,
  // now or in the future, based on a root element
  window.$delegate = function (target, selector, type, handler) {
    //   dispatchevent 使addeventlistner的 callback
    function dispatchEvent(event) {
      var targetElement = event.target;
      //   获得，基于target的，符合selector的所有element
      var potentialElements = window.qsa(selector, target);
      //   hasmatch是一个boolean，call函数绑定indexof 的this 到potentialelements上
      //   这代码的意思就是看潜在元素里有没有符合selector的
      var hasMatch =
        Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
      // 如果有符合的，就给他们的父亲targetelement绑定event事件
      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }
    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    // blur 失去焦点事件 focus 获得焦点事件，二者任一才能使usecapture 为true
    // 这两种特殊情况下冒泡？捕获？
    var useCapture = type === "blur" || type === "focus";

    window.$on(target, type, dispatchEvent, useCapture);
  };

  // Find the element's parent with the given tag name:
  // $parent(qs('a'), 'div');
  window.$parent = function (element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };
  // 让nodelist 也有array的foreach方法
  // Allow for looping on nodes by chaining:
  // qsa('.foo').forEach(function () {})
  NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
