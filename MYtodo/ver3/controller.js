export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // bind
    this.model.bindTodoListChanged(this.onTodoListChanged);
    // this.view.bindEvents(this);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindClick(this.handleClick);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindClearAll(this.handleClearAll);
    // 当你在 contenteditable 元素输入时，input 事件会被触发，
    // 离开contenteditable元素时，focusout 会触发。

    // 先渲染才有ol 下的 li
    // Display initial todos
    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos);
  };

  // 控制器
  // Handle submit event for adding a todo
  //   handleAddTodo = (event) => {
  //     if (event.keyCode === 13) {
  //       event.preventDefault();
  //       //   console.log("in13");
  //       if (this.view.todoText) {
  //         const todo = {
  //           id:
  //             this.model.todos.length > 0
  //               ? this.model.todos[this.model.todos.length - 1].id + 1
  //               : 1,
  //           text: this.view.todoText,
  //           complete: false,
  //         };
  //         this.model.addTodo(todo);
  //         this.view.resetInput();
  //       }
  //     }
  //   };

  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  // 控制器
  // Handle click event for deleting a todo
  handleClick = (id, eventname) => {
    if (eventname === "A") {
      this.model.deleteTodo(id);
    } else if (eventname === "INPUT") {
      this.model.toggleTodo(id);
    }
  };

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };

  handleClearAll = () => {
    this.model.clearall();
  };
}
//   handleClick = (event) => {
//     console.log(event.target.tagName);
//     // console.log(event.target.parentElement.id);
//     const id = parseInt(event.target.parentElement.id);
//     if (event.target.tagName === "A") {
//       this.model.deleteTodo(id);
//     } else if (event.target.tagName === "INPUT") {
//       this.model.toggleTodo(id);
//     }
//   };
// }
