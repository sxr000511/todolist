/*global Vue, todoStorage */

(function (exports) {
  "use strict";

  var filters = {
    all: function (todos) {
      return todos;
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed;
      });
    },
  };

  exports.app = new Vue({
    // the root element that will be compiled
    el: ".todoapp",

    // app initial state
    data: {
      todos: todoStorage.fetch(),
      newTodo: "",
      editedTodo: null,
      visibility: "all",
    },

    // watch todos change for localStorage persistence
    // 监听器，如果todos改变，调用下面的方法
    watch: {
      todos: {
        deep: true,
        // 为了发现对象内部值的变化，可以在选项参数中指定 deep: true
        handler: todoStorage.save,
      },
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos);
      },
      remaining: function () {
        return filters.active(this.todos).length;
      },
      allDone: {
        // 计算属性的getter 和 setter
        get: function () {
          // 返回true or false
          return this.remaining === 0;
        },
        // setter 在alldone 改变的时候 去改变了 todos 的completed属性
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value;
          });
        },
      },
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      pluralize: function (word, count) {
        return word + (count === 1 ? "" : "s");
      },

      addTodo: function () {
        var value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        // TODO: Use a proper UUID instead of `Date.now()`.
        this.todos.push({ id: Date.now(), title: value, completed: false });
        this.newTodo = "";
      },

      removeTodo: function (todo) {
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      },

      editTodo: function (todo) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
      },

      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
          this.removeTodo(todo);
        }
      },

      cancelEdit: function (todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
      },

      removeCompleted: function () {
        this.todos = filters.active(this.todos);
      },
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
      "todo-focus": function (el, binding) {
        //   el
        // 绑定了该指令的元素.
        // 可以直接操作DOM元素.
        // binding ( 属性 )
        if (binding.value) {
          el.focus();
        }
      },
    },
  });
})(window);
