//模型
// class Model {
//   constructor() {
//     // The state of the model, an array of todo objects, prepopulated with some data
//     // this.todos = [
//     //   { id: 1, text: "Run a marathon change1", complete: true },
//     //   { id: 2, text: "Plant a garden", complete: false },
//     // ];
//     this.todos = JSON.parse(localStorage.getItem("todos")) || [];
//   }

//   bindTodoListChanged(callback) {
//     this.onTodoListChanged = callback;
//   }

//   //   update() {
//   //     localStorage.setItem("todos", JSON.stringify(this.todos));
//   //   }

//   _commit(todos) {
//     //在模型中的每个方法之后，你将调用 onTodoListChanged 回调。通知controller
//     localStorage.setItem("todos", JSON.stringify(todos));
//     this.onTodoListChanged(todos);
//   }

//   // Append a todo to the todos array
//   addTodo(todoText) {
//     const todo = {
//       id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
//       text: todoText,
//       complete: false,
//     };
//     console.log(this.todos);
//     this.todos.push(todo);
//     this._commit(this.todos);
//   }
//   //   addTodo(todo) {
//   //     this.todos = [...this.todos, todo];
//   //     this.update();
//   //     this.onTodoListChanged(this.todos);
//   //   }

//   // Map through all todos, and replace the text of the todo with the specified id
//   editTodo(id, updatedText) {
//     this.todos = this.todos.map((todo) =>
//       todo.id === id
//         ? { id: todo.id, text: updatedText, complete: todo.complete }
//         : todo
//     );
//     this._commit(this.todos);
//   }

//   // Filter a todo out of the array by id
//   deleteTodo(id) {
//     this.todos = this.todos.filter((todo) => todo.id !== id);
//     this._commit(this.todos);
//   }

//   // Flip the complete boolean on the specified todo
//   toggleTodo(id) {
//     const toggletodo = {
//       id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
//       text: this.todos.find((item) => item.id === id).text,
//       complete: !this.todos.find((item) => item.id === id).complete,
//     };
//     console.log(toggletodo);
//     this.todos = this.todos.filter((todo) => todo.id !== id);
//     this.todos.push(toggletodo);
//     this._commit(this.todos);
//   }
//   clearall() {
//     this.todos = [];
//     this._commit(this.todos);
//   }
// }

// //视图
// class View {
//   constructor() {
//     this.addinput = document.querySelector("#add_list");
//     this.itemlists = document.querySelectorAll(".content ol");
//     this.clearbutton = document.querySelector("#clearbutton");
//     this._temporaryTodoText = "";
//     this._initLocalListeners();
//   }

//   // Create an element with an optional CSS class
//   createElement(tag, className) {
//     const element = document.createElement(tag);
//     if (className) element.classList.add(className);
//     return element;
//   }

//   // Retrieve an element from the DOM
//   getElement(selector) {
//     const element = document.querySelector(selector);

//     return element;
//   }

//   // 视图
//   get todoText() {
//     return document.querySelector("#add_list").value;
//   }

//   resetInput() {
//     document.querySelector("#add_list").value = "";
//   }

//   displayTodos(data) {
//     var todolist = document.querySelector("#todolist");
//     var donelist = document.querySelector("#donelist");
//     var todocount = document.querySelector("#todocount");
//     var donecount = document.querySelector("#donecount");
//     // 渲染前先清空ol
//     var todo = 0;
//     var done = 0;
//     todolist.innerHTML = "";
//     donelist.innerHTML = "";
//     var todoli = "";
//     var doneli = "";
//     // console.log(data);
//     // var data = getdata();
//     for (let i = data.length - 1; i >= 0; i--) {
//       if (data[i].complete === false) {
//         // console.log(data[i].text);
//         todoli +=
//           "<li id =" +
//           data[i].id +
//           "><input type = 'checkbox' class = 'box'> <p contenteditable = true>" +
//           data[i].text +
//           "</p><input type = 'text' class='change' style = 'display:none' ><a href = 'javascript:;' ></a></li>";
//         todo++;
//       } else {
//         // console.log(data[i].text);
//         doneli +=
//           "<li id =" +
//           data[i].id +
//           " ><input type = 'checkbox' class = 'box' checked = 'checked '> <p contenteditable = true>" +
//           data[i].text +
//           "</p><input type = 'text' class='change' style = 'display:none' ><a href = 'javascript:;' ></a></li>";
//         done++;
//       }
//     }
//     todolist.innerHTML = todoli;
//     donelist.innerHTML = doneli;
//     todocount.innerHTML = todo;
//     donecount.innerHTML = done;
//   }

//   // 视图
//   //   bindEvents(controller) {
//   // this.addinput.addEventListener("keyup", controller.handleAddTodo);
//   //   必须要先渲染才有li
//   // qsa没有adl方法
//   // this.itemlists.forEach((item) =>
//   //   item.addEventListener("click", controller.handleClick)
//   // );
//   //   }

//   _initLocalListeners() {
//     this.itemlists.forEach((item) => {
//       item.addEventListener("input", (event) => {
//         // console.log(event.target.tagName);
//         if (event.target.tagName === "P") {
//           this._temporaryTodoText = event.target.innerText;
//           //   console.log(this._temporaryTodoText);
//         }
//       });
//     });
//   }

//   bindAddTodo(handler) {
//     //   this.form.addEventListener('submit', controller.handleAddTodo)
//     this.addinput.addEventListener("keyup", (event) => {
//       if (event.keyCode === 13) {
//         event.preventDefault();
//         if (this.todoText) {
//           handler(this.todoText);
//           this.resetInput();
//         }
//       }
//     });
//   }

//   bindClick(handler) {
//     this.itemlists.forEach((item) => {
//       item.addEventListener("click", (event) => {
//         const id = parseInt(event.target.parentElement.id);
//         const eventname = event.target.tagName;
//         handler(id, eventname);
//       });
//     });
//   }

//   bindClearAll(handler) {
//     this.clearbutton.addEventListener("click", () => {
//       handler();
//     });
//   }

//   bindEditTodo(handler) {
//     this.itemlists.forEach((item) => {
//       item.addEventListener("focusout", (event) => {
//         if (this._temporaryTodoText) {
//           const id = parseInt(event.target.parentElement.id);
//           handler(id, this._temporaryTodoText);
//           this._temporaryTodoText = "";
//         }
//       });
//     });
//   }
// }

// class Controller {
//   constructor(model, view) {
//     this.model = model;
//     this.view = view;

//     // bind
//     this.model.bindTodoListChanged(this.onTodoListChanged);
//     // this.view.bindEvents(this);
//     this.view.bindAddTodo(this.handleAddTodo);
//     this.view.bindClick(this.handleClick);
//     this.view.bindEditTodo(this.handleEditTodo);
//     this.view.bindClearAll(this.handleClearAll);
//     // 当你在 contenteditable 元素输入时，input 事件会被触发，
//     // 离开contenteditable元素时，focusout 会触发。

//     // 先渲染才有ol 下的 li
//     // Display initial todos
//     this.onTodoListChanged(this.model.todos);
//   }

//   onTodoListChanged = (todos) => {
//     this.view.displayTodos(todos);
//   };

//   // 控制器
//   // Handle submit event for adding a todo
//   //   handleAddTodo = (event) => {
//   //     if (event.keyCode === 13) {
//   //       event.preventDefault();
//   //       //   console.log("in13");
//   //       if (this.view.todoText) {
//   //         const todo = {
//   //           id:
//   //             this.model.todos.length > 0
//   //               ? this.model.todos[this.model.todos.length - 1].id + 1
//   //               : 1,
//   //           text: this.view.todoText,
//   //           complete: false,
//   //         };
//   //         this.model.addTodo(todo);
//   //         this.view.resetInput();
//   //       }
//   //     }
//   //   };

//   handleAddTodo = (todoText) => {
//     this.model.addTodo(todoText);
//   };

//   // 控制器
//   // Handle click event for deleting a todo
//   handleClick = (id, eventname) => {
//     if (eventname === "A") {
//       this.model.deleteTodo(id);
//     } else if (eventname === "INPUT") {
//       this.model.toggleTodo(id);
//     }
//   };

//   handleEditTodo = (id, todoText) => {
//     this.model.editTodo(id, todoText);
//   };

//   handleClearAll = () => {
//     this.model.clearall();
//   };
// }
// //   handleClick = (event) => {
// //     console.log(event.target.tagName);
// //     // console.log(event.target.parentElement.id);
// //     const id = parseInt(event.target.parentElement.id);
// //     if (event.target.tagName === "A") {
// //       this.model.deleteTodo(id);
// //     } else if (event.target.tagName === "INPUT") {
// //       this.model.toggleTodo(id);
// //     }
// //   };
// // }
import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";
const app = new Controller(new Model(), new View());
