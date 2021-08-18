# ver5 vue 组件抽离

先设计两个组件，

一个 item 组件，作为子组件，完成实际的 listitem 功能

1. 维护自身的 complete 修改、text 修改 -》》需要更新备忘，双向绑定
2. 向父组件发送 delete
3. 接收父亲的 todoitem 传入

一个 list：父组件，
v-for 循环生成 item 子组件

1. 监听子组件事件，删除即可

其实
【todo:再包装一层 toplist】

## 关键：传值

普通情况下，我们通过父组件把某一 data 通过 props 传给子组件，子组件获得 props 显示。
当子组件触发某一时间时，$emit 发送事件（携带参数也许），父组件@自定义事件监听，调用某些方法。
然而这里，我们要考虑“双向绑定”

1. 普通传值
   对于删除功能和改变状态功能来说，采用普通 emit+@写法的数据传递，（因为不仅仅是数据的改变，涉及到重新渲染 list）
2. “双向绑定”
   当修改 item.text 时，不需要重新渲染 list，采用.sync 修饰符

### .sync 修饰符

编译时的语法糖=。它会被扩展为一个自动更新父组件属性的 v-on 监听器。

```
<comp :foo.sync="bar"></comp>
```

会被扩展为

```
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：

```
this.$emit('update:foo', newValue)
```

vue 修饰符 sync 的功能是：当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。

如果我们不用.sync，我们想做上面的那个弹窗功能，我们也可以 props 传初始值，然后事件监听，实现起来也不算复杂。

## 坑：watch 深度监听（issue）

如果不深度：delete(普通) 可以触发 watch，但是.sync 不行
vue 没有办法监听对象内部变化，（受限制）
但是对 array 的 push，pop 等方法可以 watch
因此当我们用 sync 修改 todo.text 时，要加上 deep:true
（还有 immediate 方法，代表在 watch 绑定时就触发一次）

## 记得修改对应的 style
