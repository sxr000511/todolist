# JavaScript TodoMVC Example with ELM architecture

用了 ELM(mvu)的 todolist

![MVU](https://cloud.githubusercontent.com/assets/194400/25773775/b6a4b850-327b-11e7-9857-79b6972b49c3.png)

Model - or "data model" is the place where all data is stored; often referred to as the application's state.

Update - how the app handles actions performed by people and updates the state, **usually organised as a switch** with various case statements corresponding to the different "actions" the user can take in your App.

View - what people using the app can see; a way to view the Model (in the case of the first tutorial below, the counter) as HTML rendered in a web browser.

## ELM

核心：

```javascript
/**
 * `mount` mounts the app in the "root" DOM Element.
 * @param {Object} model store of the application's state.
 * @param {Function} update how the application state is updated ("controller")
 * @param {Function} view function that renders HTML/DOM elements with model.
 * @param {String} root_element_id root DOM element in which the app is mounted
 * @param {Function} subscriptions any event listeners the application needs
 */
function mount(model, update, view, root_element_id, subscriptions) {
  // 原生js 获取根元素 赋值给ROOT
  var ROOT = document.getElementById(root_element_id); // root DOM element
  var store_name = "todos-elmish_" + root_element_id; // test-app !== app

  function render(mod, sig, root) {
    // DRY rendering code (invoked twice)
    // setItem() 作为 Storage 接口的方法，接受一个键名和值作为参数，将会把键名添加到存储中，如果键名已存在，则更新其对应的值。
    localStorage.setItem(store_name, JSON.stringify(mod)); // save the model!
    empty(root); // clear root element (container) before (re)rendering
    // mod :model sig :signal
    // view 在 todo-app js里，return 一个domtree
    root.appendChild(view(mod, sig)); // render view based on model & signal
  }

  function signal(action, data, model) {
    // signal function takes action
    return function callback() {
      // and returns callback
      model = JSON.parse(localStorage.getItem(store_name)); //|| model;
      var updatedModel = update(action, model, data); // update model for action
      render(updatedModel, signal, ROOT);
    };
  }

  model = JSON.parse(localStorage.getItem(store_name)) || model;
  // 把函数signal作为参数传给render
  render(model, signal, ROOT);
  if (subscriptions && typeof subscriptions === "function") {
    subscriptions(signal);
  }
}
```

VIEW 是具体实例的渲染函数，返回 dom tree（html）
UPDATE 是具体实例的 controller，返回新 model
在此基础上
ELM 的 render(model，signal，root)，接收

## 【hash router】 Routing 【重点学习】

'SHOW_ALL' the default view.
'SHOW_ACTIVE' item.done === false
'SHOW_COMPLETED' item.done === true

the content of the app changes in response to the hash portion of the**URL**implementing routing is a matter of **filtering the Todo List items in response to the hash**.

There 3 steps to implementing this:

1. Create an **Event Listener for the window.onhashchange** event which invokes signal('ROUTE').

2. Create **a 'ROUTE' case in the update function** which sets the model.hash value.

3. Based on the model.hash value defined above, **filter the model.todos**.

### 9.1 Routing Event Listener

```
window.onhashchange = function route () {
  signal('ROUTE')();
}
```

### 9.2 ROUTE case

在 update 里添加 ROUTE

```
case 'ROUTE':
  new_model.hash = (window && window.location && window.location.hash) ?
    window.location.hash : '#/';
  break;
```

### 9.3 Filter the model.todos based on model.hash

在 render_main 里（渲染时 filter）

```
.filter(function (item) {
    switch(model.hash) {
    case '#/active':
        return !item.done;
    case '#/completed':
        return item.done;
    default: // if hash doesn't match Active/Completed render ALL todos:
        return item;
    }
})
.map(function (item) {
    return render_item(item, model, signal)
```

filter 过滤返回符合 model.hash 的条目，传递给 map 函数调用 render_item 渲染
we will only see the todo items that match the hash in the URL. '#/active'
If the URL hash does not match either of these two filters, then simply "show everything".

AND...VIEWS LOGICAL
By using Array.filter followed by Array.map we render a subset of the model.todos without "mutating" the model.todos Array. In other words if the URL hash is '#/completed' the user only wants to see the "completed" items, we don't want to "lose" the todos that are not yet complete, we just want to "hide" them temporarily, if we were to apply this filter in the update function it would "lose" the other todos (i.e. destroy the data!) the best way to filter data non-destructively is in the view

## model Implementation

localstorage 里
key：todos-elmish_app
value：
todos，object array ， 存放事项，是对象数组
hash，存放 url 的 hash，项目里用这个 hash 来实现页面路由
clicked：状态 ，单击双击？
editing：状态 ，是否双击修改？
clicked_time：状态，点击时间

```
/**
 * initial_model is a simple JavaScript Object with two keys and no methods.
 * it is used both as the "initial" model when mounting the Todo List App
 * and as the "reset" state when all todos are deleted at once.
 */
var initial_model = {
  todos: [], // empty array which we will fill shortly
  hash: "#/" // the hash in the url (for routing)
}

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    model: initial_model
  }
}
```

todos 的对象结构如下

```
{
  todos: [
    { id: 1, title: "Learn Elm Architecture", done: true },
    { id: 2, title: "Build Todo List App",    done: false },
    { id: 3, title: "Win the Internet!",      done: false }
  ]
}

```

## 发射事件到 update 里 switch --》update 【重点学习】

整体由 update+ switch 选择不同的操作

```
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} new_model - the transformed model.
 */
function update(action, model) {
 switch (action) {                  // action (String) determines which case
   default:                         // if action unrecognised or undefined,
     return model;                  // return model unmodified
 }    // default? https://softwareengineering.stackexchange.com/a/201786/211301
}

```

充满了`var last = (typeof model.todos !== 'undefined' && model.todos.length > 0)? model.todos[model.todos.length - 1] : null;` 类似的判断
先判断操作数据是否存在
再进一步动作

用 case 判断处理方法，最后 return 一个 new model，
不同的方法里的 data，有不同的含义

### update -> add

```
function update(action, model, data) {
  var new_model = JSON.parse(JSON.stringify(model)) // "clone" the model
  switch(action) {                   // and an action (String) runs a switch
    case 'ADD':
      new_model.todos.push({
        id: model.todos.length + 1,
        title: data,
        done: false
      });
      break;
    default: // if action unrecognised or undefined,
      return model; // return model unmodified
  }   // see: https://softwareengineering.stackexchange.com/a/201786/211301
  return new_model;
}
```

### update -> toggle

```
  case 'TOGGLE':
      new_model.todos.forEach(function (item) { // takes 1ms on a "slow mobile"
        if(item.id === data) {    // this should only "match" one item.
          item.done = !item.done; // invert state of "done" e.g false >> true
        }
      });
      break;
```

## view

1.  Todo List items should be displayed as list items <li> in an unordered list <ul>.
2.  Each Todo List item <li> should contain a <div> with a class="view" which "wraps":

```
    <input class="toggle" type="checkbox"> - the "checkbox" that people can "Toggle" to change the "state" of the Todo item from "active" to "done" (which updates the model From: model.todos[id].done=false To: model.todos[id].done=true)
    <label> - the text content ("title") of the todo list item
    <button class="destroy"> - the button the person can click/tap to delete a Todo item.
```

**summary below：**

```
/**
 * `view` renders the entire Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing all other DOM elements.
 * @example
 * // returns <section class="todo-app"> DOM element with other DOM els nested:
 * var DOM = view(model);
 */
function view(model) {
  return (
    section(["class=todoapp"], [ // array of "child" elements
      header(["class=header"], [
        h1([], [
          text("todos")
        ]), // </h1>
        input([
          "id=new-todo",
          "class=new-todo",
          "placeholder=What needs to be done?",
          "autofocus"
        ], []) // <input> is "self-closing"
      ]), // </header>
      render_main(model),
      render_footer(model)
    ]) // <section>
  );
}
```

### view -> render-list

借助 elmish.js
最初的 render item
不含修改功能

```
/* if require is available, it means we are in Node.js Land i.e. testing! */
/* istanbul ignore next */
if (typeof require !== 'undefined' && this.window !== this) {
  var { a, button, div, empty, footer, input, h1, header, label, li, mount,
    route, section, span, strong, text, ul } = require('./elmish.js');
}

/**
 * `render_item` creates an DOM "tree" with a single Todo List Item
 * using the "elmish" DOM functions (`li`, `div`, `input`, `label` and `button`)
 * returns an `<li>` HTML element with a nested `<div>` which in turn has the:
 *   `<input type=checkbox>` which lets users to "Toggle" the status of the item
 *   `<label>` which displays the Todo item text (`title`) in a `<text>` node
 *   `<button class="destroy">` lets people "delete" a todo item.
 * see: https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/52
 * @param  {Object} item the todo item object
 * @return {Object} <li> DOM Tree which is nested in the <ul>.
 * @example
 * // returns <li> DOM element with <div>, <input>. <label> & <button> nested
 * var DOM = render_item({id: 1, title: "Build Todo List App", done: false});
 */
function render_item(item) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : ""
    ], [
      div(["class=view"], [
        input(["class=toggle", "type=checkbox",
          (item.done ? "checked=true" : "")], []),
        label([], [text(item.title)]),
        button(["class=destroy"])
      ]) // </div>
    ]) // </li>
  )
}
```

并且要记得 export

```
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    model: initial_model,
    update: update,
    render_item: render_item, // export so that we can unit test
  }
}
```

### render ->render-main

```
function render_main(model) {
  return (
    section(["class=main", "style=display: block;"], [
      input(["id=toggle-all", "class=toggle-all", "type=checkbox"], []),
      label(["for=toggle-all"], [ text("Mark all as complete") ]),
      ul(["class=todo-list"],
        model.todos.map(function (item) { return render_item(item) })
      ) // </ul>
    ]) // </section>
  )
}
```

### render -》 render footer

1.  render_footer returns a <footer> DOM element which can be rendered directly to the document or nested in another DOM element.
2.  `<footer> `contains:
    1. `<span class="todo-count">`which contains
       a text node with: "{count} item(s) left". `pseudocode: {model.todos.filter( (i) => { i.done==false })} item{model.todos.length > 1 ? 's' : '' } left`
    2. `<ul> containing 3 <li>` with the following links `(<a>)`:
       1. Show All: `<a href="#/" class="selected">All</a>`
          ` class="selected"` should only appear on the selected menu/navigation item. this should be "driven" by the model.hash property.
       2. Show Active: `<a href="#/active">Active</a>`
       3. Show Completed:` <a href="#/completed">Completed</a>`
3.  ` <button class="clear-completed" style="display: block;">` will Clear all Completed items. `sample code: new_model.todos = model.todos.filter(function(item) { return item.done === false })`

借助模板
包含三个 hash 用来做 router 跳转

```
/**
 * `render_footer` renders the `<footer class="footer">` of the Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing the <footer> element.
 * @example
 * // returns <footer> DOM element with other DOM elements nested:
 * var DOM = render_footer(model);
 */
function render_footer (model) {
  var count = model.todos.filter(
      function (i) { return i.done === false }
    ).length.toString();
  var left = (" item" + (model.todos.length > 1 ? 's' : '') + " left");

  return (
    footer(["class=footer", "style=display: block;"], [
      span(["class=todo-count", "id=count"], [
        strong(count),
        text(left)
      ]),
      ul(["class=filters"], [
        li([], [
          a(["href=#/", "class=selected"], [text("All")])
        ]),
        li([], [
          a(["href=#/active"], [text("Active")])
        ]),
        li([], [
          a(["href=#/completed"], [text("Completed")])
        ])
      ]), // </ul>
      button(["class=clear-completed", "style=display:block;"],
        [text("Clear completed")]
      )
    ])
  )
}
```

## function

### 1. No Todos, should hide #footer and #main

```
// Requirement #1 - No Todos, should hide #footer and #main
var display = "style=display:"
  + (model.todos.length > 0 ? + "block" : "none");
```

### 2. New Todo, should allow me to add todo items

### 3. Mark all as completed

### 4. Item (Toggle, Edit & Delete)

4.1 DELETE an Item
add an invocation of signal('DELETE' ...) to the render_item view rendering function.
`button(["class=destroy", signal('DELETE', item.id)])`

### 5. EDIT an Item

✓ should hide other controls when editing (718ms)
✓ should save edits on enter (1093ms)
✓ should save edits on blur (1256ms)
✓ should trim entered text (1163ms)
✓ should remove the item if an empty text string was entered (1033ms)
✓ should cancel edits on escape (1115ms)

包含了修改功能的 render -item
与上面做对比

```
function render_item (item, model, signal) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : "",
      model && model.editing && model.editing === item.id ? "class=editing" : ""
    ], [
      div(["class=view"], [
        input([
          item.done ? "checked=true" : "",
          "class=toggle",
          "type=checkbox",
          typeof signal === 'function' ? signal('TOGGLE', item.id) : ''
          ], []), // <input> does not have any nested elements
        label([ typeof signal === 'function' ? signal('EDIT', item.id) : '' ],
          [text(item.title)]),
        button(["class=destroy",
          typeof signal === 'function' ? signal('DELETE', item.id) : ''])
        ]
      ), // </div>
    ].concat(model && model.editing && model.editing === item.id ? [ // editing?
      input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
    ] : [])) // </li>
  )
}
```

注意几点

1. `model && model.editing && model.editing === item.id ? "class=editing" : ""`
   check for model && model.editing because if either of these two are undefined there's no need to keep checking.
   检查
2. `label([ typeof signal === 'function' ? signal('EDIT', item.id) : '' ],[text(item.title)]),`
   也是检查，为了稳健性

3. Append the `<input class="edit"> to the <li> `if in "editing mode":

用于根据 editing 状态【是否是双击修改】，动态生成 input 模块，
allow us to optionally render the element or nothing

```
].concat(model && model.editing && model.editing === item.id ? [ // editing?
  input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
] : [])) // </li>

```

如果如下写，会有 typeerror 报错，因为不能 return 一个空 div

```
model && model.editing && model.editing === item.id ? // editing?
  input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
  : div() // empty element.
```

### 5.2 Double-Click item <label> to Edit

update 里
The main "purpose" of this code is to detect if a <label> was clicked twice in the space of 300 milliseconds and apply the item.id to the model.editing property so that we know which <li> to render in "editing mode".

```
case 'EDIT':
  // this code is inspired by: https://stackoverflow.com/a/16033129/1148249
  // simplified as we are not altering the DOM!
  if (new_model.clicked && new_model.clicked === data &&
    Date.now() - 300 < new_model.click_time ) { // DOUBLE-CLICK < 300ms
      new_model.editing = data;
  }
  else { // first click
    new_model.clicked = data; // so we can check if same item clicked twice!
    new_model.click_time = Date.now(); // timer to detect double-click 300ms
    new_model.editing = false; // reset
  }
  break;
```

### 5.3 'SAVE' a Revised Todo Item Title after Editing it

update 中

```
case 'SAVE':
  var edit = document.getElementsByClassName('edit')[0];
  var value = edit.value;
  var id = parseInt(edit.id, 10);
  // End Editing
  new_model.clicked = false;
  new_model.editing = false;

  if (!value || value.length === 0) { // delete item if title is blank:
    return update('DELETE', new_model, id);
  }
  // update the value of the item.title that has been edited:
  new_model.todos = new_model.todos.map(function (item) {
    if (item.id === id && value && value.length > 0) {
      item.title = value.trim();
    }
    return item; // return all todo items.
  });
  break;
```

```
document.addEventListener('keyup', function handler (e) {
  console.log('e.keyCode:', e.keyCode, '| key:', e.key);

  switch(e.keyCode) {
    case ENTER_KEY:
      var editing = document.getElementsByClassName('editing');
      if (editing && editing.length > 0) {
        signal('SAVE')(); // invoke singal inner callback
      }

      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
    case ESCAPE_KEY:
      signal('CANCEL')();
      break;
  }
});

```

### 5.4 'SAVE' a Blank item.title deletes the item Implementation

```
if (!value || value.length === 0) { // delete item if title is blank:
  return update('DELETE', new_model, id);
}
```

### 5.5 'CANCEL' edit on [esc] Key Press

update 函数里

```
case 'CANCEL':
  new_model.clicked = false;
  new_model.editing = false;
  break;
```

### 6. Counter

首先在 render root 里添加 counter 模块

```
button(["class=clear-completed", "style=display:" + display_clear,
  signal('CLEAR_COMPLETED')
  ],
  [
    text("Clear completed ["),
    span(["id=completed-count"], [
      text(done)
    ]),
    text("]")
  ]
)
```

然后在 update 里添加

```
case 'CLEAR_COMPLETED':
  new_model.todos = new_model.todos.filter(function (item) {
    return !item.done; // only return items which are item.done = false
  });
  break;
```

### 8. Persistence > Save Todo List items to localStorage
