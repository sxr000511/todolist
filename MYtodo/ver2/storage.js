// (function (window) {
//   function storage(name) {
//     this._dbName = name;
//     if (!localStorage.getItem(name)) {
//       var local = [];
//       localStorage.setItem(name, JSON.stringify(local));
//     }
//   }

//   storage.prototype.getdata = function () {
//     return JSON.parse(localStorage.getItem(this._dbName));
//   };

//   storage.prototype.savedata = function (data) {
//     localStorage.setItem(_dbName, JSON.stringify(data));
//   };

//   storage.prototype.deletedata = function (data, id) {
//     return data.splice(id, 1);
//   };

//   storage.prototype.changedata = function (data, id, tostatus) {
//     var todotitle = data[id].title;
//     var todotime = adddate("yyyy-MM-dd hh:mm");
//     data.splice(id, 1);
//     return data.push({ title: todotitle, done: tostatus, time: todotime });
//   };
// })(window);

function getdata() {
  var data = localStorage.getItem("todo");
  if (data !== null) {
    // json 字符串转换成 数组对象键值对形式
    return JSON.parse(data);
  }
  return [];
}

function savedata(data) {
  localStorage.setItem("todo", JSON.stringify(data));
}

function deletedata(data, id) {
  data.splice(id, 1);
  savedata(data);
  renderview();
}
function changedata(event, data, id, input) {
  var todotitle = data[id].title;
  var tododone = data[id].done;
  var todotime = adddate("yyyy-MM-dd hh:mm");
  // data[id].done = event.target.checked;
  // data[id].time = new Date().format("yyyy-MM-dd hh:mm");
  data.splice(id, 1);
  if (event === "status") {
    data.push({ title: todotitle, done: input, time: todotime });
  } else if (event === "content") {
    data.push({ title: input, done: tododone, time: todotime });
  }
  savedata(data);
  renderview();
}
