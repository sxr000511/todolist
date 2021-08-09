export default class Model {
  constructor() {
    // The state of the model, an array of todo objects, prepopulated with some data
    // this.todos = [
    //   { id: 1, text: "Run a marathon change1", complete: true },
    //   { id: 2, text: "Plant a garden", complete: false },
    // ];
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  //   update() {
  //     localStorage.setItem("todos", JSON.stringify(this.todos));
  //   }

  _commit(todos) {
    //在模型中的每个方法之后，你将调用 onTodoListChanged 回调。通知controller
    localStorage.setItem("todos", JSON.stringify(todos));
    this.onTodoListChanged(todos);
  }

  // Append a todo to the todos array
  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };
    console.log(this.todos);
    this.todos.push(todo);
    this._commit(this.todos);
  }
  //   addTodo(todo) {
  //     this.todos = [...this.todos, todo];
  //     this.update();
  //     this.onTodoListChanged(this.todos);
  //   }

  // Map through all todos, and replace the text of the todo with the specified id
  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
    );
    this._commit(this.todos);
  }

  // Filter a todo out of the array by id
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this._commit(this.todos);
  }

  // Flip the complete boolean on the specified todo
  toggleTodo(id) {
    const toggletodo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: this.todos.find((item) => item.id === id).text,
      complete: !this.todos.find((item) => item.id === id).complete,
    };
    console.log(toggletodo);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.todos.push(toggletodo);
    this._commit(this.todos);
  }
  clearall() {
    this.todos = [];
    this._commit(this.todos);
  }
}
