import axios from "axios"; //导入axios模块

// 1.左侧获得
export const getTodoList = params => {
  //封装一个函数，名为getTodoList
  return axios.get(`/todo/list`, {
    // 请求路径 ‘/todo/list’
    params: params
  });
};
// 2.左侧添加
export const addTodo = params => {
  return axios.post(`/todo/addTodo`, params).then(res => res.data);
};

// 3. 右侧获得
export const getTodo = params => {
  return axios.get(`/todo/listId`, {
    params: params
  });
};
// 4.右侧添加
//新增一个请求新增代办单的接口函数
export const addRecord = params => {
  return axios.post(`/todo/addRecord`, params).then(res => res.data);
};

export const editTodo = params => {
  return axios.post(`/todo/editTodo`, params).then(res => res.data);
};
export const editRecord = params => {
  return axios.post(`/todo/editRecord`, params).then(res => res.data);
};
