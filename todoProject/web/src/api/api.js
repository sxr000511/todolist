// import axios from "axios"; //导入axios模块

// // 1.左侧获得
// export const getTodoList = params => {
//   //封装一个函数，名为getTodoList
//   return axios.get(`/todo/list`, {
//     // 请求路径 ‘/todo/list’
//     params: params
//   });
// };
// // 2.左侧添加
// export const addTodo = params => {
//   return axios.post(`/todo/addTodo`, params).then(res => res.data);
// };

// // 3. 右侧获得
// export const getTodo = params => {
//   return axios.get(`/todo/listId`, {
//     params: params
//   });
// };
// // 4.右侧添加
// //新增一个请求新增代办单的接口函数
// export const addRecord = params => {
//   return axios.post(`/todo/addRecord`, params).then(res => res.data);
// };

// export const editTodo = params => {
//   return axios.post(`/todo/editTodo`, params).then(res => res.data);
// };
// export const editRecord = params => {
//   return axios.post(`/todo/editRecord`, params).then(res => res.data);
// };

import axios from "axios"; //导入axios模块

const http = axios.create({
  baseURL: "http://localhost:3000/"
});

// 1.左侧获得
export async function getTodoList(params) {
  //封装一个函数，名为getTodoList
  const res = await http.get(`/todo/list`, {
    // 请求路径 ‘/todo/list’
    params: params
  });
  return res;
}

// 2.左侧添加
export async function addTodo(params) {
  // return http.post(`/todo/addTodo`, params).then(res => res.data);
  const res = await http.post(`/todo/addTodo`, {
    // 请求路径 ‘/todo/list’
    params: params
  });
  return res.data;
}

// 3. 右侧获得
export async function getTodo(params) {
  // return http.get(`/todo/listId`, {
  //   params: params
  // });
  const res = await http.get(`/todo/listId/${params._id}`);
  // console.log(res)
  return res;
}

// 4.右侧添加
//新增一个请求新增代办单的接口函数
export async function addRecord(params) {
  // return http.post(`/todo/addRecord`, params).then(res => res.data);
  // console.log(params);
  const res = await http.post(`/todo/addRecord/${params._id}`, params);

  // console.log(res);
  return res.data;
}

export async function editTodo(params) {
  // return http.post(`/todo/editTodo`, params).then(res => res.data);
  const res = await http.post(`/todo/editTodo`, params);
  return res.data;
}
export async function editRecord(params) {
  // return http.post(`/todo/editRecord`, params).then(res => res.data);
  const res = await http.post(`/todo/editRecord`, params);
  return res.data;
}
