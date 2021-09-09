module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Todo = require("../../models/todo");
  const User = require("../../models/user");

  router.get("/list", async (req, res) => {
    //  config 指 前台传过来的值
    const Todos = await Todo.find();
    let mockTodo = Todos.map((todo) => {
      // 重组 Todos数组，变成我们想要的数据
      return {
        _id: todo._id,
        title: todo.title,
        count: todo.record.filter((data) => {
          if (data.checked === false) return true;
          return false;
        }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
        locked: todo.locked,
        isDelete: todo.isDelete,
      };
    }).filter((todo) => {
      if (todo.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
      return true;
    });

    res.send({
      todos: mockTodo, // 返回状态为200，并且返回todos数据
    });
  });

  router.post("/addTodo", async (req, res) => {
    const newone = await Todo.create({
      // id: Math.random(),
      title: "newList",
      isDelete: false,
      locked: false,
      record: [],
    });

    res.send({ todos: newone }); // 返回状态为200，并且返回todos数据});
  });

  router.get("/listId/:_id", async (req, res) => {
    let { _id } = req.params;
    // id 是传进来的值
    // todo 是根据id和现有的Todos数据匹配，找出id相等的数据，在进行返回
    // console.log(id);
    // let todo = await Todo.findOne({ _id: _id });
    let todo = await Todo.findById(_id);
    // todo.count (等待完成数目)等于 todo.record（代办事项列表下面未被选择的数据
    // 注意，否则报错
    todo
      ? (todo.count = todo
          ? todo.record.filter((data) => {
              return data.checked === false;
            }).length
          : null)
      : false;
    res.send({
      todo: todo,
    });
  });

  router.post("/addRecord/:_id", async (req, res) => {
    let { _id } = req.params;
    let { text } = req.body;
    //  let { id, text } = JSON.parse(config.data);
    // id 是传进来的值唯一待办项的id
    // text 用户新增输入的数据
    // console.log(text);
    let get = await Todo.findOne({ _id: _id });
    get.record.push({
      text: text,
      isDelete: false,
      checked: false,
    });
    // console.log(get);

    let result = await Todo.findOneAndUpdate(
      { _id: _id },
      { record: get.record }
    );

    res.send({
      success: true,
    });
  });

  router.post("/editTodo", async (req, res) => {
    let { todo } = req.body;
    let _id = todo._id;
    let get = await Todo.findOne({ _id: _id });

    get.title = todo.title;
    get.locked = todo.locked;
    get.isDelete = todo.isDelete;
    // console.log(get);
    let result = await Todo.findOneAndUpdate({ _id: _id }, get);

    res.send({
      success: true,
    });
  });

  router.post("/editRecord", async (req, res) => {
    let { _id, record, index } = req.body;
    let get = await Todo.findOne({ _id: _id });
    get.record[index] = record;
    let result = await Todo.findOneAndUpdate({ _id: _id }, get);
    res.send({
      success: true,
    });
  });

  router.post("/logIn", async (req, res) => {
    let { user, password } = req.body;
    let get = await User.findOne({ user: user });
    const isValid =
      get === {}
        ? false
        : require("bcrypt").compareSync(password, get.password);
    if (isValid) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false });
    }
  });

  app.use("/todo", router);
};
