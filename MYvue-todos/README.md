前端路由

# 数据结构分析

# 接口分析

1. 待办事项列表
   api: /todo/list (get)
2. 新增待办事项
   api: /todo/addTodo (post)
3. 单个待办事项查询
   api: /todo/listId (get) ， params : {id : xxx} //传 id

4. 修改 待办事项标题，删除，锁定待办事项
   api: /todo/editTodo (post) ，
   params: {
   id: String,  
    titie: String,
   isDelete: Boolean,
   locked: Boolean
   }
5. 新增 待办单项
   api: /todo/addRecord (post)
6. 修改,删除，完成待办单项
   api: /todo/editRecord (post)
   params: {
   text: String,
   isDelete: Boolean,
   checked: Boolean
   }

# 组件分析

接入型？一个容器组件,它里面包含了其他的组件，它本身只承担一个布局容器的作用，比如说 basin 的管理系统的右侧 mainbody
展示型？能接收数据，展示出来，但是无法与用用户进行交互
交互型？比如各类加强版的表单组件，通常强调复用

分析得到：
app.vue // 最外层根组件 接入型
layouts.vue // 布局组件 接入型 接入其他组件
todos.vue // 左侧列表 交互型组件
lists.vue // 右侧内容 交互型组件
item.vue // 待办单项组件 交互型组件

# style-》less

# steps

1. layouts.vue
   1. 进阶：控制 menu 是否收缩，是靠 vuex 的 menuOpen 进行类绑定
2. menus.vue
   1. 把 menus 作为 components 引入到 layouts 里
   2. menus 里，v-for 渲染 a 标签，包括 icon 和 text，count
   3. 样式： 由 vuex 传来的 todolist 数据，进行 class 绑定
3. todo.vue
   layouts 的右侧内容，由上面的 header 部分和下面的 list 部分组成
4. item.vue 待办单项组件
   todo 的子组件，给 item 的 props 传参，显示交互
   这儿 v-for 用 index 不知道行不行

# mock + axios

mockjs:
http://mockjs.com/examples.html
axios:
https://segmentfault.com/a/1190000008470355

## 利用 mockjs 模拟 2 个接口，一个菜单列表数据，一个新增菜单

关系是这样的：
mockjs 模拟服务端，通过组件配置两个 axios 请求路径，返回设计的数据
indexjs 用于方便外部调用 mockjs
apijs 包装 axios 请求方法，get/post
在组件（比如 menusvue 里）调用 apijs 的方法就可以请求到 mock 生成的随机数据了

### menu 里的 mock 数据

1. src/mock/data/todoList.js 里放模拟数据
2. src/mock/mock.js 模拟 ajax 请求的接口, 生成并返回模拟数据
   使用 mockadapter， promise 模拟异步请求阻塞
3. src/mock/index.js 暴露接口，方便导出（自动在找到 index）
4. 在 mainjs 里引入 mock
5. src/api/api.js 里封装一个使用 axios 的 api 接口，通过调用函数名直接实现 get/post 请求，不用写很长配参
6. 调用接口
   1. src/components/menus.vue 里 ，引入 apijs，
      在 created 生命周期函数里调用 api.js 的方法，get/post 请求发出

### todo 里的 mock 数据

1. mockjs 里，思路同上，也是分为新增 item 和查找 item
2. 在 apijs 里添加 api 接口

# menu

## menu 嵌套路由

https://router.vuejs.org/zh/guide/essentials/nested-routes.html
匹配成功渲染到外面路由的 routerview 下

## watch 监听 menu 里的 todoId，跳转路由

编程式导航
https://router.vuejs.org/zh/guide/essentials/navigation.html
$vm-nextTick:
https://cn.vuejs.org/v2/api/#vm-nextTick

## menu 过程

1. 点击时，触发事件改变 todoid，watch 监听到后跳转 router，这样右侧 list 会渲染成对应的 data
2. 新增时，调用 api 封装的 post—add 请求，返回 data 后，在 dom 更新后(见 vm-nextTick)，获得新的 todoList，触发 1 的 watch，更新右侧界面
3. computed：计算属性 todoList，通过 vuex 的 getters 获得数据 todolist
4. created： 在生命周期函数 created 里自动获得第一个 item 的 id，初始化右侧界面

# todovue

todo 嵌套 item
todovue 由三部分组成

1. 上面的 header，主要显示
2. 中间的 input 和 其右侧的 btn
3. 下面的 todolist，v-for 循环渲染 item 子组件，并且向子组件传参
4. 监听路由变化，因为
   1. 增加删除修改都会调用 api 接口改变路由，监听到路由变化后 init，重新获得数据 data，data 改变，dom 改变，重新渲染 dom
   2. 如果左侧点击了 menu，也会改变路由，也需要 refresh

## todovue 调用查询接口

1. watch 方法监听路由对象属性`this.$route.params.id`，判断是否点击了左侧的 menu，从而导致右侧 list 是否要刷新数据(定义 method:init()->api)
   https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7
2. created 里也调用 init()

```
记得先判断有没有
 todo ? todo.count = todo ? todo.record.filter((data) => {
        return data.checked === false;
      }).length : null : false;
```

## todovue 调用添加接口

1. enter 绑定 method
2. method 调用 api 传参，返回一个 promise， 写 then...

# item

子组件，由父组件传入 item（内容），id，init(),locked
依需求绑定 style class ，
事件绑定后，当调用 api 修改完 mock 数据后，调用 init() 方法刷新

# vuex 共享数据

需要整个 app 共享数据完成点击，缩放等功能
vuex 共享的数据是：
todoList: [], //指我们的待办事项列表数据
menuOpen: false //移动端的时候菜单是否开启【移动端响应式】

1.  src/vuex/store.js 创建 vuex 实例，
    完成 src/vuex/getters.js， 获得 todolist
2.  ==actions.js==
    获得 mock 数据，调用修改 menuopen 方法

    1. commit 的对象解构：
       https://segmentfault.com/a/1190000022018995
       https://www.jianshu.com/p/8c3599dda094
    2. actions 处理异步流程
       https://vuex.vuejs.org/zh/guide/actions.html

3.  mainjs 里引入 store

==关注==

```javascript
export const getTodo = ({
  //定义一个名字为getTodo的事件
  commit,
}) => {
  return new Promise((resolve) => {
    /**
     *调用 getTodo这个函数的时候
     会调用getTodoList这个ajax请求函数，
     函数返回值后，在调用store.js里面的EDITTODE方法，并且把值传给它。
     */
    getTodoList().then((res) => {
      commit("EDITTODE", res.data.todos);
      resolve();
    });
  });
};
```

## 引入 vuex 后 修改样式

1. menu 的响应式布局：
   click-》menu 收缩 or 扩展
2. ==修改 menus：==【needtolearn】
   把原来用 api 接口的数据替换成 vuex 提供
   1. 新增 menu item
   2. menu item 的锁定删除
      控制 isupdate(IN VUEX)
3. 修改 todo
   东西比较多
   1. init()方法里：从 vuex 获得 menu item 的 id，然后到 api 接口里获得 mock 数据，
      解构赋值后，赋值给 vue 实例的 data

```

init() {
const ID = this.$route.params.id;
getTodo({ id: ID }).then(res => {
let { id, title, count, isDelete, locked, record
} = res.data.todo;
this.items = record;
this.todo = {
id: id,
title: title,
count: count,
locked: locked,
isDelete: isDelete
};
});
},

```

2. 更新
   ==注意 this 的指向==
   edittodo 返回 promise 对象，调用 then 方法，重新在原来的 this 里重新获得数据，vue 渲染新的 dom

```

updateTodo() {
let \_this = this;
console.log(this.todo);
editTodo({
todo: this.todo,
}).then((data) => {
// \_this.init();
\_this.$store.dispatch("getTodo");
});
},

```

```

```
