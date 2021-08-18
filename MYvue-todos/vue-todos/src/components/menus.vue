<template>
  <div class="list-todos">
    <!-- 绑定class，当items循环中的id等于我们设置的选中todoId时候,就会加上active这个calss,这样样式就会发生变化。-->
    <!-- 1. 上面是vfor循环渲染标签 -->
    <a
      @click="goList(item.id)"
      class="list-todo list activeListClass"
      :class="{ active: item.id === todoId }"
      v-for="(item, index) in todoList"
      :key="index"
    >
      <span class="icon-lock" v-if="item.locked"></span>
      <span class="count-list" v-if="item.count > 0">{{ item.count }}</span>
      {{ item.title }}
    </a>
    <!-- 2.下面是添加item -->
    <a class="link-list-new" @click="addTodoList">
      <!--新增菜单-->
      <span class="icon-plus"> </span>
      新增
    </a>
  </div>
</template>
<script>
import { addTodo } from "../api/api"; // 引入我们 封装好的两个接口函数。

export default {
  name: "menus",
  data() {
    return {
      // items: [], // 菜单数据
      todoId: "", // 默认选中id
      todoNum: 0, // 新增一个状态来判断代办事项的数据
    };
  },
  // created生命周期函数
  // 调用请求菜单列表数据的接口
  // axios返回一个promise对象，promise.then 调用
  computed: {
    // todoList() {
    //   return this.$store.getters.getTodoList; // 返回vuex getters.js 定义的getTodoList数据
    // },
    todoList() {
      const number = this.$store.getters.getTodoList.length;
      if (this.$store.getters.getTodoList.length < this.todoNum) {
        this.goList(this.$store.getters.getTodoList[0].id);
      }
      this.todoNum = number;
      return this.$store.getters.getTodoList; // 返回vuex getters.js 定义的getTodoList数据
    },
  },
  created() {
    // getTodoList({}).then((res) => {
    //   // get
    //   const TODOS = res.data.todos; // 数据都会返回在res.data里面。
    //   this.items = TODOS; // 我的把菜单数据赋值给定义的this.items
    //   this.todoId = TODOS[0].id; // 把菜单数据的默认的第一个对象的id赋值给默认选中的id
    // });
    this.$store.dispatch("getTodo").then(() => {
      //调用vuex actions.js 里面的 getTodo函数
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      });
    });
  },
  watch: {
    todoId(id) {
      this.$router.push({ name: "todo", params: { id: id } });
      //监听到用户的点击todoId的变化在跳转路由
    },
  },
  methods: {
    goList(id) {
      // 点击菜单时候,替换选中id
      this.todoId = id;
      // 触发watch
    },
    addTodoList() {
      // // post
      // // 点击新增按钮时候
      // // 调用新增菜单的接口，在接口调用成功在请求数据
      // addTodo({}).then((data) => {
      //   getTodoList({}).then((res) => {
      //     const TODOS = res.data.todos;
      //     this.todoId = TODOS[TODOS.length - 1].id;
      //     this.items = TODOS;
      //   });
      // });
      //  addtodo in api.js，是包装好的post请求，apijs向axios发送post请求，获得数据后返回
      //调用vuex actions.js 里面的 getTodo函数
      addTodo({}).then((data) => {
        // vuex
        this.$store.dispatch("getTodo").then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id);
            }, 100);
            // 然后watch会被触发
          });
        });
      });
    },
  },
};
</script>
<style lang="less">
@import "../common/style/menu.less";
</style>