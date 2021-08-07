/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
  "use strict";

  /**
   * View that abstracts away the browser's DOM completely.
   * It has two simple entry points:
   *
   *   - bind(eventName, handler)
   *     Takes a todo application event and registers the handler
   *   - render(command, parameterObject)
   *     Renders the given command with the options
   */
  // 主要：bind  和  render，带_的都是子方法
  // qs 在helpers 里 代替queryselector
  //   给view再绑定属性
  function View(template) {
    this.template = template;

    this.ENTER_KEY = 13;
    this.ESCAPE_KEY = 27;

    this.$todoList = qs(".todo-list");
    this.$todoItemCounter = qs(".todo-count");
    this.$clearCompleted = qs(".clear-completed");
    this.$main = qs(".main");
    this.$footer = qs(".footer");
    this.$toggleAll = qs(".toggle-all");
    this.$newTodo = qs(".new-todo");
  }

  View.prototype._removeItem = function (id) {
    var elem = qs('[data-id="' + id + '"]');

    if (elem) {
      this.$todoList.removeChild(elem);
    }
  };

  View.prototype._clearCompletedButton = function (completedCount, visible) {
    this.$clearCompleted.innerHTML =
      this.template.clearCompletedButton(completedCount);
    this.$clearCompleted.style.display = visible ? "block" : "none";
  };

  View.prototype._setFilter = function (currentPage) {
    qs(".filters .selected").className = "";
    qs('.filters [href="#/' + currentPage + '"]').className = "selected";
  };

  View.prototype._elementComplete = function (id, completed) {
    var listItem = qs('[data-id="' + id + '"]');

    if (!listItem) {
      return;
    }

    listItem.className = completed ? "completed" : "";

    // In case it was toggled from an event and not by clicking the checkbox
    // 改变listitem里的input的checked 属性
    qs("input", listItem).checked = completed;
  };

  View.prototype._editItem = function (id, title) {
    var listItem = qs('[data-id="' + id + '"]');

    if (!listItem) {
      return;
    }

    listItem.className = listItem.className + " editing";

    var input = document.createElement("input");
    input.className = "edit";

    listItem.appendChild(input);
    input.focus();
    input.value = title;
  };

  View.prototype._editItemDone = function (id, title) {
    var listItem = qs('[data-id="' + id + '"]');

    if (!listItem) {
      return;
    }

    var input = qs("input.edit", listItem);
    listItem.removeChild(input);

    listItem.className = listItem.className.replace("editing", "");

    qsa("label", listItem).forEach(function (label) {
      label.textContent = title;
    });
  };

  //   主函数  render  渲染
  View.prototype.render = function (viewCmd, parameter) {
    var self = this;
    // 起到了一个switch的作用
    var viewCommands = {
      showEntries: function () {
        //  templateshow返回的是个domtree html元素
        self.$todoList.innerHTML = self.template.show(parameter);
      },
      removeItem: function () {
        self._removeItem(parameter);
      },
      updateElementCount: function () {
        self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
      },
      clearCompletedButton: function () {
        self._clearCompletedButton(parameter.completed, parameter.visible);
      },
      contentBlockVisibility: function () {
        self.$main.style.display = self.$footer.style.display =
          parameter.visible ? "block" : "none";
      },
      toggleAll: function () {
        self.$toggleAll.checked = parameter.checked;
      },
      setFilter: function () {
        self._setFilter(parameter);
      },
      clearNewTodo: function () {
        self.$newTodo.value = "";
      },
      elementComplete: function () {
        self._elementComplete(parameter.id, parameter.completed);
      },
      editItem: function () {
        self._editItem(parameter.id, parameter.title);
      },
      editItemDone: function () {
        self._editItemDone(parameter.id, parameter.title);
      },
    };
    // 根据外部传入的command ，通过viewcommands函数调用viewjs下的子方法
    viewCommands[viewCmd]();
  };

  View.prototype._itemId = function (element) {
    var li = $parent(element, "li");
    // 10 是 说li.dataset.id 第一个参数是十进制，parseint返回的结果总是十进制
    // dataset.id  获得data-开头的 data-id 属性，是html5新增的
    return parseInt(li.dataset.id, 10);
  };
  // 编辑结束函数
  View.prototype._bindItemEditDone = function (handler) {
    var self = this;
    // delegate定义在helpers.js
    // delegate 会给 target 下符合 selector的所有绑定blur事件，事件处理是funciton(){}
    $delegate(self.$todoList, "li .edit", "blur", function () {
      // 这儿的this 是target element ，即self.$TODOLIST，是函数内部
      //   self 绑定到view上
      if (!this.dataset.iscanceled) {
        handler({
          id: self._itemId(this),
          title: this.value,
        });
      }
    });

    $delegate(self.$todoList, "li .edit", "keypress", function (event) {
      if (event.keyCode === self.ENTER_KEY) {
        // Remove the cursor from the input when you hit enter just like if it
        // were a real form
        this.blur();
      }
    });
  };
  // 编辑取消函数
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
  // bind 绑定 事件 ，handler事件处理函数
  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === "newTodo") {
      // $on 把change事件 的 监听函数fun(),绑定到self.$newTodo上
      $on(self.$newTodo, "change", function () {
        handler(self.$newTodo.value);
      });
    } else if (event === "removeCompleted") {
      $on(self.$clearCompleted, "click", function () {
        handler();
      });
    } else if (event === "toggleAll") {
      $on(self.$toggleAll, "click", function () {
        handler({ completed: this.checked });
      });
    } else if (event === "itemEdit") {
      $delegate(self.$todoList, "li label", "dblclick", function () {
        handler({ id: self._itemId(this) });
      });
    } else if (event === "itemRemove") {
      $delegate(self.$todoList, ".destroy", "click", function () {
        handler({ id: self._itemId(this) });
      });
    } else if (event === "itemToggle") {
      $delegate(self.$todoList, ".toggle", "click", function () {
        handler({
          id: self._itemId(this),
          completed: this.checked,
        });
      });
    } else if (event === "itemEditDone") {
      self._bindItemEditDone(handler);
    } else if (event === "itemEditCancel") {
      self._bindItemEditCancel(handler);
    }
  };

  // Export to window
  window.app = window.app || {};
  window.app.View = View;
})(window);
