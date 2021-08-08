# Vue.js TodoMVC Example

# [v-clock]

防止页面加载时出现 vuejs 的变量名而设计的

[v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

# v-model （input + v-model）

在给<input />元素添加 v-model 属性时，默认会把 value 作为元素的属性，然后把'input'事件作为实时传递 value 的触发事件

双向数据绑定

# v-on / @ 语法糖

.enter 是按键修饰符，还有.tab 等等

<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">

# v-show <---> v-if

条件渲染

# v-bind 动态绑定 attribute / props 到表达式

```
<!-- 绑定一个 attribute -->
<img v-bind:src="imageSrc">
```

```
<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">
```

# watch 监听器

```
// 监听器，如果todos改变，调用下面的方法
    watch: {
      todos: {
        deep: true,
		// 为了发现对象内部值的变化，可以在选项参数中指定 deep: true
        handler: todoStorage.save,
      },
    },
```

# 【html】<label for>

label 标签的 for 属性规定 label 与哪个表单元素绑定。

```
  <label for="female">Female</label>
  <input type="radio" name="sex" id="female" />
```

# v-for 渲染列表/对象

# v-on @ 动态绑定事件

表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

`<button v-on:click="doThis"></button>` 原生 DOM 事件
`<my-component @my-event="handleThis"></my-component>`自定义事件（子组件）

# v-text = {{}}

```
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

# 计算属性

computed 默认和 data 自动绑定，data 变 compued 变

## setter 和 getter

```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}

```

// ...
现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

# 自定义指令 custom directives

```
    directives: {
      "todo-focus": function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
```

局部自定义指令 v-todo-focus
