export default class View {
  constructor() {
    this.addinput = document.querySelector("#add_list");
    this.itemlists = document.querySelectorAll(".content ol");
    this.clearbutton = document.querySelector("#clearbutton");
    this._temporaryTodoText = "";
    this._initLocalListeners();
  }

  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  // 视图
  get todoText() {
    return document.querySelector("#add_list").value;
  }

  resetInput() {
    document.querySelector("#add_list").value = "";
  }

  displayTodos(data) {
    var todolist = document.querySelector("#todolist");
    var donelist = document.querySelector("#donelist");
    var todocount = document.querySelector("#todocount");
    var donecount = document.querySelector("#donecount");
    // 渲染前先清空ol
    var todo = 0;
    var done = 0;
    todolist.innerHTML = "";
    donelist.innerHTML = "";
    var todoli = "";
    var doneli = "";
    // console.log(data);
    // var data = getdata();
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].complete === false) {
        // console.log(data[i].text);
        todoli +=
          "<li id =" +
          data[i].id +
          "><input type = 'checkbox' class = 'box'> <span contenteditable = true>" +
          data[i].text +
          "</span><a href = 'javascript:;' ></a></li>";
        todo++;
      } else {
        // console.log(data[i].text);
        doneli +=
          "<li id =" +
          data[i].id +
          " ><input type = 'checkbox' class = 'box' checked = 'checked '> <span contenteditable = true>" +
          data[i].text +
          "</span><a href = 'javascript:;' ></a></li>";
        done++;
      }
    }
    todolist.innerHTML = todoli;
    donelist.innerHTML = doneli;
    todocount.innerHTML = todo;
    donecount.innerHTML = done;
  }

  // 视图
  //   bindEvents(controller) {
  // this.addinput.addEventListener("keyup", controller.handleAddTodo);
  //   必须要先渲染才有li
  // qsa没有adl方法
  // this.itemlists.forEach((item) =>
  //   item.addEventListener("click", controller.handleClick)
  // );
  //   }

  _initLocalListeners() {
    this.itemlists.forEach((item) => {
      item.addEventListener("input", (event) => {
        // console.log(event.target.tagName);
        if (event.target.tagName === "SPAN") {
          this._temporaryTodoText = event.target.innerText;
          //   console.log(this._temporaryTodoText);
        }
      });
    });
  }

  bindAddTodo(handler) {
    //   this.form.addEventListener('submit', controller.handleAddTodo)
    this.addinput.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (this.todoText) {
          handler(this.todoText);
          this.resetInput();
        }
      }
    });
  }

  bindClick(handler) {
    this.itemlists.forEach((item) => {
      item.addEventListener("click", (event) => {
        const id = parseInt(event.target.parentElement.id);
        const eventname = event.target.tagName;
        handler(id, eventname);
      });
    });
  }

  bindClearAll(handler) {
    this.clearbutton.addEventListener("click", () => {
      handler();
    });
  }

  bindEditTodo(handler) {
    this.itemlists.forEach((item) => {
      item.addEventListener("focusout", (event) => {
        if (this._temporaryTodoText) {
          const id = parseInt(event.target.parentElement.id);
          handler(id, this._temporaryTodoText);
          this._temporaryTodoText = "";
        }
      });
    });
  }
}
