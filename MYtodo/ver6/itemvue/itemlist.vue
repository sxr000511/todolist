<template>
  <!-- 最外面必须有一层div -->
  <div class="itemlist">
    <div class="list">
      <span>未完成</span><span id="todocount">{{ todos.length }}</span>
    </div>
    <ul id="todolist">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{
          completed: !todo.complete,
        }"
      >
        <item
          v-bind:text.sync="todo.text"
          v-bind:complete="todo.complete"
          @delete="removeTodo(todo)"
          @eventtoggle="toggletodo(todo.id)"
        ></item>
      </li>
    </ul>

    <!-- donelist -->
    <!-- <div class="list">
        <span>已完成</span><span id="donecount">{{ comlist.length }}</span>
      </div> -->

    <!-- <ul id="donelist">
        <li v-for="todo in comlist" :key="todo.id">

          <item
            v-bind:text.sync="todo.text"
            v-bind:complete="todo.complete"
            @delete="removeTodo(todo)"
            @eventtoggle="toggletodo(todo.id)"
          ></item>
        </li>
      </ul>
    </div>
    <div id="clear">
      <button id="clearbutton" @click="clearall">
        <h3>全部清除</h3>
      </button>
    </div> -->
  </div>
</template>

<script>
import item from "./item";
// let id = 1;
export default {
  // data里的数据是动态绑定的
  data() {
    return {
      // todos: JSON.parse(localStorage.getItem("todos") || "[]"),
      // newtodo: "",
      // editedTodo: {},
    };
  },
  props: {
    todos: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    item: item,
  },
  watch: {
    // todos(newVal) {
    //   // 每次更新写入缓存
    //   console.log(newVal);
    //   localStorage.setItem("todos", JSON.stringify(newVal));
    // },
    // 必须要深度监听

    todos: {
      handler() {
        // console.log(newVal);
        // this.$emit("datachange", newVal);
        // localStorage.setItem("todos", JSON.stringify(newVal));
      },
      deep: true,
      // immediate: true,
    },
  },
  methods: {
    // addtodo() {
    //   // vmodel 双向绑定
    //   // 内容为空则不处理
    //   if (!this.newtodo) {
    //     return;
    //   }
    //   // 往备忘列表中新增一条
    //   this.todos.unshift({
    //     id: this.todos.length > 0 ? this.todos[0].id + 1 : 1, // id 自增
    //     text: this.newtodo,
    //     complete: false,
    //   });
    //   this.newtodo = "";
    // },
    toggletodo(index) {
      // 匹配 id 找出该备忘，然后移除
      //   const index = this.todos.find((item) => item.id === todo.id).id;
      console.log(index);
      const toggletodo = {
        id: this.todos.length > 0 ? this.todos[0].id + 1 : 1,
        text: this.todos.find((item) => item.id === index).text,
        complete: !this.todos.find((item) => item.id === index).complete,
      };
      //   console.log(toggletodo);
      this.todos = this.todos.filter((todo) => todo.id !== index);
      this.todos.unshift(toggletodo);
    },
    removeTodo(todo) {
      // 匹配 id 找出该备忘，然后移除
      const index = this.todos.findIndex((x) => x.id === todo.id);
      this.todos.splice(index, 1);
    },
    // editTodo(todo) {
    //   // 将待编辑的内容填充到修改的内容中
    //   // 使用 ... 解构，相当于使用 Object.assign，属于浅拷贝
    //   // 此处对象只有一层，浅拷贝足矣
    //   this.editedTodo = { ...todo };
    // },
    // doneEdit(todo) {
    //   // 将编辑中内容更新到列表中
    //   this.todos = this.todos.map((x) => {
    //     return todo.id == x.id ? { ...todo } : { ...x };
    //   });
    //   // 清空编辑对象
    //   this.editedTodo = {};
    // },
    // // 取消修改备忘
    // cancelEdit() {
    //   this.editedTodo = {};
    // },
  },
  // computed: {
  //   uncomlist() {
  //     return this.todos.filter((todo) => todo.complete === false);
  //   },

  //   comlist() {
  //     return this.todos.filter((todo) => todo.complete === true);
  //   },
  // },
};
</script>

<style>
div.app {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 1rem;
  color: #444;
  background-color: gainsboro;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  display: flex;
  justify-content: center;
  height: 10vh;
  line-height: 10vh;
  width: 100vw;
  background-color: lightgreen;
  font-size: 1.1rem;
}
header section {
  display: flex;
  width: 60%;
  justify-content: space-between;
}
header input {
  margin-top: 20px;
  width: 50%;
  height: 40%;
  text-align: center;
  vertical-align: middle;
  border-radius: 5px;
  box-shadow: 0 1px 0 black;
  font-size: 18px;
  text-indent: 10px;
  border: 1px solid #ccc;
  outline: 0;
  text-decoration: none;
}

div.content {
  width: 60%;
  display: flex;
  flex-direction: column;
}

div.list {
  position: relative;
  font-weight: bold;
}

#todocount,
#donecount {
  position: absolute;
  right: 0;
}

li {
  position: relative;
  /* display: flex; */
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 0 10px;
  height: 32px;
  box-shadow: 0 1px 0 black;
  line-height: 32px;
  background-color: burlywood;
  list-style: none;
}

ul li .box {
  position: absolute;
  top: 4px;
  left: 10px;
  width: 20px;
  line-height: 20px;
  height: 20px;
  cursor: pointer;
}

ul li a {
  position: absolute;
  top: 8px;
  right: 10px;
  display: inline-block;
  border: 1px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 32px;
  line-height: 10px;
  font-weight: bolder;
  cursor: pointer;
  background-color: gray;
}

ul li span {
  margin-left: 30px;
  color: green;
}

#clear {
  width: 60%;
  display: flex;
  justify-content: center;
}

#clearbutton {
  /* border-color: red; */
  border-radius: 5px;
  /* box-shadow: 0 1px 0 yellow; */
  cursor: pointer;
  box-shadow: none;
  border: 1px solid #ccc;
}

#clearbutton:hover {
  outline: 0;
  border: 2px solid lightgreen;
  background: #ccc;
}
</style>