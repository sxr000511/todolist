# Vanilla JavaScript TodoMVC Example

他这个把所有的 dom 元素都写死在 view 里和 index.html 绑定了，不好改
也许他有 mvc 模板我可以用

> JavaScript® (often shortened to JS) is a lightweight, interpreted, object-oriented language with first-class functions, most known as the scripting language for Web pages, but used in many non-browser environments as well such as node.js or Apache CouchDB.

> \_[JavaScript - developer.mozilla.org](http://developer.mozilla.org/en-US/docs/JavaScript)

# (function( window, undefined ) {})(window);

// 匿名函数自执行，避免函数体内外变量的冲突
// 后面的圆括号中的 window 为实参,接受 window 对象(window 对象是全局环境下的),而 function 后面的圆括号中的 window 为局部变量,不是全局的 window 对象.

# 对象的原型， 原型继承

new function(){} 构造对象 ，默认返回 this
创建的对象还从原型上获得了一个 constructor 属性，它指向函数本身

# call()、apply()

_里面调用外面的_
call()、apply() 都是用来重定义 this 这个对象的, 只是传入的参数列表形式不同。
apply(): _B.apply(A, arguments);即 A 对象应用 B 对象的方法。_ 传入[args array]
call(): _B.call(A, args1,args2);即 A 对象调用 B 对象的方法。_ 传入 arg1, arg2, arg3

```javascript
/*apply()方法*/
function.apply(thisObj[, argArray])
/*call()方法*/
function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
```

应用 实现继承

```javascript
function Animal(name) {
  this.name = name;
  this.showName = function () {
    alert(this.name);
  };
}

function Cat(name) {
  Animal.apply(this, [name]);
}

var cat = new Cat("咕咕");
cat.showName();

/*call的用法*/
Animal.call(this, name);
```

## 定义：

apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即 A 对象应用 B 对象的方法。

call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即 A 对象调用 B 对象的方法。

## 共同之处：

都“可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象”。

## 不同之处：

apply：最多只能有两个参数——新 this 对象和一个数组 argArray。如果给该方法传递多个参数，则把参数都写进这个数组里面，当然，即使只有一个参数，也要写进数组里。如果 argArray 不是一个有效的数组或 arguments 对象，那么将导致一个 TypeError。如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj，并且无法被传递任何参数。

call：它可以接受多个参数，第一个参数与 apply 一样，后面则是一串参数列表。这个方法主要用在 js 对象各方法相互调用的时候，使当前 this 实例指针保持一致，或者在特殊情况下需要改变 this 指针。如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

# 常用方法封装在 helpers.js 里

## 注意 focus 和 blur 只能捕获不能冒泡

```javascript
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
```

如果事件是 blur 或者 focus ，usecapture 为 true，
addeventlistener 第三个参数为 true，（focus/blur 事件） 事件*捕获原则，先父亲，再儿子*
_blur:当 focusable 元素失去焦点时，不支持冒泡；所以要设置成 true_
_focus:当 focusable 元素获得焦点时，不支持冒泡；所以要设置成 true_
_focusout:和 blur 一样，只是此事件支持冒泡；_
_focusin:和 focus 一样，只是此事件支持冒泡；_
如果第三个参数 false（默认），事件*冒泡，先儿子再父亲*

# view.JS 里 对外暴露 render 和 bind 两个函数

view js 内部还有以\_开头的一堆子函数，render 和 bind 调用这堆子函数来对外输出

# 稳健性

1.  parseInt(li.dataset.id, 10); 会把 10 指定出来
2.            // 参1：事件string 2：处理函数 3：冒泡 or 捕获
    target.addEventListener(type, callback, !!useCapture);

## !! 是什么

1. ！可将变量转换成 boolean 类型，null、undefined 和空字符串取反都为 true，其余都为 false。

```javascript
!null=true

!undefined=true

!''=true

!100=false

!'abc'=false
```

2. ！！常常用来做类型判断，在第一步!（变量）之后再做逻辑取反运算
   判断变量 a 为非空，未定义或者非空串才能执行方法体的内容。

```javascript
if (!!a) {
  //a有内容才执行的代码...
}
```

# this.dataset

html5 新增
// dataset.id 获得 data-开头的 data-id 属性，是 html5 新增的
this.dataset.iscanceled = true; 同理

# 为什么 bind 用了一堆 else if 而 render 是选择？

view 里 render 函数使用对象映射进行管理，而 bind 使用 ifelseif 进行管理
相比较，对象映射扩展性强，更优雅

# var self = this;

this 指向问题

# mvc 理解

MODEL <- ->CONTROLLER <--> VIEWS
controller.js 里很多代码都是这样的
外面是 controller 的方法，里面先调用 model 取出需要的数据，传递给 view 进行渲染

```javascript
Controller.prototype.showAll = function () {
  var self = this;
  // 从model里read出来，让view来渲染render
  self.model.read(function (data) {
    self.view.render("showEntries", data);
  });
};
```
