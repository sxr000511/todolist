/* if require is available, it means we are in Node.js Land i.e. testing! */
// 引入elmish框架
/* istanbul ignore next */
// 在浏览器中, window 对象同时也是全局对象：
if (typeof require !== "undefined" && this.window !== this) {
  var {
    a,
    button,
    div,
    empty,
    footer,
    input,
    h1,
    header,
    label,
    li,
    mount,
    route,
    section,
    span,
    strong,
    text,
    ul,
  } = require("./elmish.js");
}

var initial_model = {
  todos: [],
  hash: "#/",
};

// UPDATE 方法：根据每次传入的action不同，做出不同处理，是一个controller
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {String} data - the data we want to "apply" to the item.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} new_model - the transformed model.
 */
function update(action, model, data) {
  // console.log(arguments)
  // console.log(' - - - - - - - - - - - ');
  var new_model = JSON.parse(JSON.stringify(model)); // "clone" the model
  console.log(new_model);
  switch (action) {
    // add：添加
    case "ADD":
      // 首先进行判断，model下是否有数据，若有取出最后一个为last，若无last === null
      var last =
        typeof model.todos !== "undefined" && model.todos.length > 0
          ? model.todos[model.todos.length - 1]
          : null;
      // 新id
      var id = last ? last.id + 1 : 1;
      // 新value
      var input = document.getElementById("new-todo");
      // 先判断newmodel是否clone成功
      new_model.todos =
        new_model.todos && new_model.todos.length > 0 ? new_model.todos : [];
      // 在newmodel的todos里push进新数据
      new_model.todos.push({
        id: id,
        title: data || input.value.trim(),
        done: false,
      });
      break;
    // TOGGLE：改变状态
    case "TOGGLE":
      new_model.todos.forEach(function (item) {
        // takes 1ms on a "slow mobile"
        // 此时data存放的是某个id，signal-》update，再clone的model 里改变这个id 的status
        if (item.id === data) {
          // this should only "match" one item.
          item.done = !item.done; // invert state of "done" e.g false >> true
        }
      });
      // if all todos are done=true then "check" the "toggle-all" checkbox:
      // filter过滤，判断是否全部done了，改变model的all_done属性
      var all_done = new_model.todos.filter(function (item) {
        return item.done === false; // only care about items that are NOT done
      }).length;
      new_model.all_done = all_done === 0 ? true : false;
      break;
    // TOGGLE_ALL ：toggle改变全部，统一status
    case "TOGGLE_ALL":
      // 先false 后true正好改变toggle的属性
      new_model.all_done = new_model.all_done ? false : true;
      // foreach方法把所有的item的done属性改为和model一样
      new_model.todos.forEach(function (item) {
        // takes 1ms on a "slow mobile"
        item.done = new_model.all_done;
      });
      break;
    // DELETE：删除 ，传入的data是id
    // 利用filter，只讲item.id 与data（id）不同的object返回
    case "DELETE":
      // console.log('DELETE', data);
      new_model.todos = new_model.todos.filter(function (item) {
        return item.id !== data;
      });
      break;
    // EDIT： 修改 ， 不改变DOM
    // 通过时间戳判断是否是真双击了，从而改变model的editing 为 data or false
    case "EDIT":
      // this code is inspired by: https://stackoverflow.com/a/16033129/1148249
      // simplified as we are not altering the DOM!
      if (
        new_model.clicked &&
        new_model.clicked === data &&
        Date.now() - 300 < new_model.click_time
      ) {
        // DOUBLE-CLICK < 300ms
        new_model.editing = data;
        // console.log('DOUBLE-CLICK', "item.id=", data,
        //   "| model.editing=", model.editing,
        //   "| diff Date.now() - new_model.click_time: ",
        //   Date.now(), "-", new_model.click_time, "=",
        //   Date.now() - new_model.click_time);
      } else {
        // first click
        new_model.clicked = data; // so we can check if same item clicked twice!
        new_model.click_time = Date.now(); // timer to detect double-click 300ms
        new_model.editing = false; // reset
        // console.log('FIRST CLICK! data:', data);
      }
      break;
    // SAVE： 存储，存储完了，修改model的clicked 和 editing属性为false
    case "SAVE":
      var edit = document.getElementsByClassName("edit")[0];
      var value = edit.value;
      var id = parseInt(edit.id, 10);
      // End Editing
      new_model.clicked = false;
      new_model.editing = false;
      // 如果输入框为空代表删除，把id作为data传给update-》delete，然后return
      if (!value || value.length === 0) {
        // delete item if title is blank:
        return update("DELETE", new_model, id);
      }
      // 如果真是update，array.map方法，找到item相同的，修改这个item的title属性
      // update the value of the item.title that has been edited:
      new_model.todos = new_model.todos.map(function (item) {
        if (item.id === id && value && value.length > 0) {
          item.title = value.trim();
        }
        return item; // return all todo items.
      });
      break;
    // CANCEL： 删除
    case "CANCEL":
      new_model.clicked = false;
      new_model.editing = false;
      break;
    // 清除完成的，还是用array.filter，only return 没完成的
    case "CLEAR_COMPLETED":
      new_model.todos = new_model.todos.filter(function (item) {
        return !item.done; // only return items which are item.done = false
      });
      break;
    // ROUTE 路由，把当前的hash赋值给：model的hash
    case "ROUTE":
      new_model.hash = window.location.hash; // (window && window.location && window.location.hash) ? // : '#/';
      break;
    default:
      // if action unrecognised or undefined,
      return model; // return model unmodified
  } // see: https://softwareengineering.stackexchange.com/a/201786/211301

  // 方法处理结束return 新模型，改变都存在了newmodel里
  return new_model;
}

/**
 * `render_item` creates an DOM "tree" with a single Todo List Item
 * using the "elmish" DOM functions (`li`, `div`, `input`, `label` and `button`)
 * returns an `<li>` HTML element with a nested `<div>` which in turn has the:
 * + `<input type=checkbox>` which lets users to "Toggle" the status of the item
 * + `<label>` which displays the Todo item text (`title`) in a `<text>` node
 * + `<button class="destroy">` lets people "delete" a todo item.
 * see: https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/52
 * @param  {Object} item the todo item object
 * @param {Object} model - the App's (current) model (or "state").
 * @param {Function} singal - the Elm Architicture "dispacher" which will run
 * @return {Object} <li> DOM Tree which is nested in the <ul>.
 * @example
 * // returns <li> DOM element with <div>, <input>. <label> & <button> nested
 * var DOM = render_item({id: 1, title: "Build Todo List App", done: false});
 */
// item ：object对象
// model：
// 通过?::，来判断html标签的属性值
// 如果signal == function， div标签绑定
// signal function takes action [见elmish。JS] , 里面调用上面定义的update函数， 返回回调函数
function render_item(item, model, signal) {
  return li(
    [
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : "",
      model && model.editing && model.editing === item.id
        ? "class=editing"
        : "",
    ],
    [
      div(
        ["class=view"],
        [
          input(
            [
              item.done ? "checked=true" : "",
              "class=toggle",
              "type=checkbox",
              typeof signal === "function" ? signal("TOGGLE", item.id) : "",
            ],
            []
          ), // <input> does not have any nested elements
          label(
            [typeof signal === "function" ? signal("EDIT", item.id) : ""],
            [text(item.title)]
          ),
          button([
            "class=destroy",
            typeof signal === "function" ? signal("DELETE", item.id) : "",
          ]),
        ]
      ), // </div>
    ].concat(
      // 此处用concat连接数组，如果这个item的id 是 editing状态， 添加input标签，可以输入
      model && model.editing && model.editing === item.id
        ? [
            // editing?
            input([
              "class=edit",
              "id=" + item.id,
              "value=" + item.title,
              "autofocus",
            ]),
          ]
        : []
    ) // end concat()
  ); // </li>
}

/**
 * `render_main` renders the `<section class="main">` of the Todo List App
 * which contains all the "main" controls and the `<ul>` with the todo items.
 * @param {Object} model - the App's (current) model (or "state").
 * @param {Function} singal - the Elm Architicture "dispacher" which will run
 * @return {Object} <section> DOM Tree which containing the todo list <ul>, etc.
 */
function render_main(model, signal) {
  // Requirement #1 - No Todos, should hide #footer and #main
  // 用内容才render ，否则不显示
  var display =
    "style=display:" +
    (model.todos && model.todos.length > 0 ? "block" : "none");
  // console.log('display:', display);
  return section(
    ["class=main", "id=main", display],
    [
      // hide if no todo items.
      input(
        [
          "id=toggle-all",
          "type=checkbox",
          typeof signal === "function" ? signal("TOGGLE_ALL") : "",
          model.all_done ? "checked=checked" : "",
          "class=toggle-all",
        ],
        []
      ),
      label(["for=toggle-all"], [text("Mark all as complete")]),
      ul(
        ["class=todo-list"],
        model.todos && model.todos.length > 0
          ? model.todos
              .filter(function (item) {
                switch (model.hash) {
                  case "#/active":
                    return !item.done;
                  case "#/completed":
                    return item.done;
                  default:
                    // if hash doesn't match Active/Completed render ALL todos:
                    return item;
                }
              })
              .map(function (item) {
                return render_item(item, model, signal);
              })
          : null
      ), // </ul>
    ]
  ); // </section>
}

/**
 * `render_footer` renders the `<footer class="footer">` of the Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @param {Function} singal - the Elm Architicture "dispacher" which will run
 * @return {Object} <section> DOM Tree which containing the <footer> element.
 * @example
 * // returns <footer> DOM element with other DOM elements nested:
 * var DOM = render_footer(model);
 */

// 先判断有没有，再直接用?::返回 总数
// 定义了一堆变量，用来判断此时的显示状态
// 这一堆变量在生成html元素里用到
function render_footer(model, signal) {
  // count how many "active" (not yet done) items by filtering done === false:
  var done =
    model.todos && model.todos.length > 0
      ? model.todos.filter(function (i) {
          return i.done;
        }).length
      : 0;
  // console.log('done:', done);
  var count =
    model.todos && model.todos.length > 0
      ? model.todos.filter(function (i) {
          return !i.done;
        }).length
      : 0;
  // console.log('count:', count);
  // Requirement #1 - No Todos, should hide #footer and #main
  var display = count > 0 || done > 0 ? "block" : "none";
  // console.log('model:', model, 'count:', count, 'display:', display);

  // number of completed items:
  var done =
    model.todos && model.todos.length > 0 ? model.todos.length - count : 0;
  var display_clear = done > 0 ? "block;" : "none;";
  // console.log('display_clear:', display_clear);
  // pluarisation of number of items:
  var left = " item" + (count > 1 || count === 0 ? "s" : "") + " left";

  return footer(
    ["class=footer", "id=footer", "style=display:" + display],
    [
      span(["class=todo-count", "id=count"], [strong(count), text(left)]),
      ul(
        ["class=filters"],
        [
          li(
            [],
            [
              a(
                [
                  "href=#/",
                  "id=all",
                  "class=" + (model.hash === "#/" ? "selected" : ""),
                ],
                [text("All")]
              ),
            ]
          ),
          li(
            [],
            [
              a(
                [
                  "href=#/active",
                  "id=active",
                  "class=" + (model.hash === "#/active" ? "selected" : ""),
                ],
                [text("Active")]
              ),
            ]
          ),
          li(
            [],
            [
              a(
                [
                  "href=#/completed",
                  "id=completed",
                  "class=" + (model.hash === "#/completed" ? "selected" : ""),
                ],
                [text("Completed")]
              ),
            ]
          ),
        ]
      ), // </ul>
      button(
        [
          "class=clear-completed",
          "style=display:" + display_clear,
          typeof signal === "function" ? signal("CLEAR_COMPLETED") : "",
        ],
        [
          text("Clear completed ["),
          span(["id=completed-count"], [text(done)]),
          text("]"),
        ]
      ),
    ]
  );
}

/**
 * `view` renders the entire Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @param {Function} singal - the Elm Architicture "dispacher" which will run
 * @return {Object} <section> DOM Tree which containing all other DOM elements.
 * @example
 * // returns <section class="todo-app"> DOM element with other DOM els nested:
 * var DOM = view(model);
 */
function view(model, signal) {
  // section ([],[]) section : father  1st:father's attrs 2nd :childnodes
  // 此处 section 里展开的是头部， redermain 和 render footer 做尾部
  // header([],[]),h1,input同理
  return section(
    ["class=todoapp"],
    [
      // array of "child" elements
      header(
        ["class=header"],
        [
          h1([], [text("todos")]), // </h1>
          input(
            [
              "id=new-todo",
              "class=new-todo",
              "placeholder=What needs to be done?",
              "autofocus",
            ],
            []
          ), // <input> is "self-closing"
        ]
      ), // </header>
      // 借助于elmish，rendermain 和 render footer返回的都是dom tree
      // 渲染在html页面
      // 如果愿意也可以写一起
      render_main(model, signal),
      render_footer(model, signal),
    ]
  ); // <section>
}

// subscriptions  监听事件
/**
 * `subscriptions` let us "listen" for events such as "key press" or "click".
 * and respond according to a pre-defined update/action.
 * @param {Function} singal - the Elm Architicture "dispacher" which will run
 * both the "update" and "render" functions when invoked with singal(action)
 */
function subscriptions(signal) {
  var ENTER_KEY = 13; // add a new todo item when [Enter] key is pressed
  var ESCAPE_KEY = 27; // used for "escaping" when editing a Todo item

  document.addEventListener("keyup", function handler(e) {
    // console.log('e.keyCode:', e.keyCode, '| key:', e.key);

    switch (e.keyCode) {
      case ENTER_KEY:
        var editing = document.getElementsByClassName("editing");
        if (editing && editing.length > 0) {
          signal("SAVE")(); // invoke singal inner callback
        }

        var new_todo = document.getElementById("new-todo");
        if (new_todo.value.length > 0) {
          signal("ADD")(); // invoke singal inner callback
          new_todo.value = ""; // reset <input> so we can add another todo
          document.getElementById("new-todo").focus();
        }
        break;
      case ESCAPE_KEY:
        signal("CANCEL")();
        break;
    }
  });
  // window 路由改变-》》signal
  window.onhashchange = function route() {
    // console.log("signal('ROUTE')()");
    signal("ROUTE")();
  };
}

// 只有model, update，subscriptions，view 给了mount
/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    model: initial_model,
    update: update,
    render_item: render_item, // export so that we can unit test
    render_main: render_main, // export for unit testing
    render_footer: render_footer, // export for unit testing
    subscriptions: subscriptions,
    view: view,
  };
}
