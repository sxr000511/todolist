# ver2

在 ver1 的基础上，

把 storage， view ，helper 拉出来成立单独的 js 文件

# ver3 用 MVC 方法，es6 重构了头都 list，并且修改了 css

M ： model 数据处理
V ： views 展示
C： 连接 MV

1. 事件监听在 view 里，数据处理在 model 里，controller 负责通过回调将二者相连，
   并且 model 修改完后传给 controller，controller 再调用方法让 view 页面 refresh

```
  // model-》control-》view
  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos);
  };
  // view-》control-》model
  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

```

初始化时传入 model 和 view 到 controller 里

2. 使用箭头函数可以绑定 this 到上下文，如果用 function 需要 self = this？

3. es6： 三元运算，array 方法，module export 和 import
4. 双击修改改用 html5 的属性完成，监听 input 和 blurout 事件 ，把 editvalue 保存到 view 里传给 conroller 再传给 model
