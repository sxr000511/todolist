# Vanilla ES6 (ES2015) • [TodoMVC](http://todomvc.com)

> A port of the [Vanilla JS Example](http://todomvc.com/examples/vanillajs/), but translated into ES6, also known as ES2015.

# export 和 import

ES6 Module
google-closure-compiler 打包模块

# bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的*this 被指定为 bind() 的第一个参数*，而其余参数将作为新函数的参数，供调用时使用。

```
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
<!-- 这个boudgetx 里的this指向module -->
var boundGetX = retrieveX.bind();
boundGetX(); // 81

```

# class

以前对象模型是基于原型实现的，ES6 中引入 class 定义类更简单
对比：

```
<!-- 函数实现 -->
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}
<!-- class实现 -->
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
```

多了 construcuor，定义在原型上的 hello 没有 function 关键字
创建类方法一样

---

继承：

```
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```

注意 extends 关键字 ，和 super 构造方法

---

## 在 class 里用 bind 绑定 this

ES5:

```javascript
<!-- 原来 -->
// self 是controller ，顶部
    self.view.bind("itemEditCancel", function (item) {
        // self === controller
        // item。id 《== { id: self._itemId(this) }    self是view this 是某个li
      self.editItemCancel(item.id);
    });

  Controller.prototype.editItemCancel = function (id) {
    var self = this;
    self.model.read(id, function (data) {
        // self === controller
      self.view.render("editItemDone", { id: id, title: data[0].title });
    });
  };

    View.prototype.bind = function (event, handler) {
    var self = this;
    // self === view
    if (--) {--
    } else if (event === "itemEditCancel") {
        // self === view ，view有_binditemeditcancel方法
      self._bindItemEditCancel(handler);
    }
  };

    View.prototype._bindItemEditCancel = function (handler) {
        // self = view
    var self = this;
    $delegate(self.$todoList, "li .edit", "keyup", function (event) {
      if (event.keyCode === self.ESCAPE_KEY) {
        this.dataset.iscanceled = true;
        // console.log(this);
        // console.log(this.dataset);
        this.blur();
// this 应该是<LI>
// self是view
        handler({ id: self._itemId(this) });
      }
    });
  };
```

ES6:

```javascript
<!-- es6 -->
// controller -> constructer中：
view.bindEditItemCancel(this.editItemCancel.bind(this));

// view 中
bindEditItemCancel(handler) {
    $delegate(this.$todoList, 'li .edit', 'keyup', ({target, keyCode}) => {
        if (keyCode === ESCAPE_KEY) {
            target.dataset.iscanceled = true;
            target.blur();
            handler(_itemId(target));
        }
    });
}

// id === _itemID（target）
// this === conntroller
editItemCancel(id) {
this.store.find({id}, data => {
        const title = data[0].title;
        this.view.editItemDone(id, title);
    });
}
```

# 函数字面量 `${}`

对比： "" 和 + 被替换成 `${}`

```
<!-- vanilla JS -->
<!-- 先用对象选 -->
 removeItem: function () {
        self._removeItem(parameter);
      },
      <!-- 再具体定义子函数 -->
 View.prototype._removeItem = function (id) {
    var elem = qs('[data-id="' + id + '"]');

    if (elem) {
      this.$todoList.removeChild(elem);
    }
  };
<!-- ES6 -->
<!-- 直接写在class 里 -->
  	removeItem(id) {
		const elem = qs(`[data-id="${id}"]`);

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	}

```

# 箭头函数

## this

用箭头代替 function
不需要 self 再保存 this 的指向
因为箭头函数里 this 指向上一级，就是外部的 delegate，
而原来会指向 function

```javascript
<!-- 原来写法 -->
// 在view原型上挂载
// 需要self 保存 this
  View.prototype._bindItemEditCancel = function (handler) {
    var self = this;
    $delegate(self.$todoList, "li .edit", "keyup", function (event) {
      if (event.keyCode === self.ESCAPE_KEY) {
        this.dataset.iscanceled = true;
        // console.log(this);
        // console.log(this.dataset);
        this.blur();

        handler({ id: self._itemId(this) });
      }
    });
  };
// ES6写法
// 直接卸载class里
bindEditItemCancel(handler) {
    $delegate(this.$todoList, 'li .edit', 'keyup', ({target, keyCode}) => {
        if (keyCode === ESCAPE_KEY) {
            target.dataset.iscanceled = true;
            target.blur();

            handler(_itemId(target));
        }
    });
}

```

# const

# new file ：item.JS

存着诸如：

```javascript
/**
 * @typedef {!{id: number, completed: boolean, title: string}}
 */
export var Item;
```

向外暴露变量

# for of 循环一个数组

例如
let arr = ['China', 'America', 'Korea']
for (let o of arr) {
console.log(o) //China, America, Korea
}

```
  toggleAll(completed) {
    this.store.find({ completed: !completed }, (data) => {
      for (let { id } of data) {
        this.toggleCompleted(id, completed);
      }
    });

    this._filter();
  }

```
