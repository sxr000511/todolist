// /////////////////////////////////
// 在事件监听函数绑定之前，一定要已经声明了时间格式化函数，事件处理函数是独立作用域
//////////////////////////////////时间函数//////////////////
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
/////////////////////////////////////////////////

/////////////////////////////////////////
// 函数声明
// //////////////////////////////////////

// 函数：获得localstorage
function getdata() {
  var data = localStorage.getItem("todo");
  if (data !== null) {
    // json 字符串转换成 数组对象键值对形式
    return JSON.parse(data);
  }
  return [];
}

// 函数：存储到localstorage
function savedata(data) {
  localStorage.setItem("todo", JSON.stringify(data));
}

// 函数：页面加载渲染
// 注意：函数声明作用域
// ////////////////////////////////////////////////////////////////////////////
// 原来的不好，又create 又innerhtml的，有点混乱
// 当for (let i = 0; i < data.length; i++) 时，可以从前端插入
// var li = document.createElement('li');
// li.innerHTML = "<input type = 'checkbox'><p>" + data[i].title + "</p>" + "<span>修改时间：" + data[i].time + "</span><a href = 'javascript:;' id=" + i + "></a>";
// todolist.insertBefore(li, todolist.childNodes[0]);
// ////////////////////////////////////////////////////////////////////////////
// 如果用字符串拼接方式，就从i = data.length-1  开始for循环，到0
// es6可以模板字符串
function loaddata() {
  var todolist = document.querySelector("#todolist");
  var donelist = document.querySelector("#donelist");
  // 渲染前先清空ol
  var todo = 0;
  var done = 0;
  todolist.innerHTML = "";
  donelist.innerHTML = "";
  var todoli = "";
  var doneli = "";
  var data = getdata();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].done === false) {
      // console.log(data[i].title);
      todoli +=
        "<li><input type = 'checkbox' class = 'box'> <p>" +
        data[i].title +
        "</p><input type = 'text' class='change' style = 'display:none' >" +
        "<span>修改时间：" +
        data[i].time +
        "</span><a href = 'javascript:;' id=" +
        i +
        "></a></li>";
      todo++;
    } else {
      doneli +=
        "<li><input type = 'checkbox'  class = 'box' checked = 'checked '><p>" +
        data[i].title +
        "</p><input type = 'text'  class='change' style = 'display:none' >" +
        "<span>修改时间：" +
        data[i].time +
        "</span><a href = 'javascript:;' id=" +
        i +
        "></a></li>";
      done++;
    }
  }
  todolist.innerHTML = todoli;
  donelist.innerHTML = doneli;
  todocount.innerHTML = todo;
  donecount.innerHTML = done;
}

function deletedata(data, id) {
  data.splice(id, 1);
  savedata(data);
  loaddata();
}

function changestatus(data, id, tostatus) {
  var todotitle = data[id].title;
  var todotime = new Date().format("yyyy-MM-dd hh:mm");
  // data[id].done = event.target.checked;
  // data[id].time = new Date().format("yyyy-MM-dd hh:mm");
  data.splice(id, 1);
  data.push({ title: todotitle, done: tostatus, time: todotime });
  savedata(data);
  loaddata();
}

/////////////////////////////////////////////////
var add = document.querySelector("#add_list");
var todolist = document.querySelector("#todolist");
var donelist = document.querySelector("#donelist");
var todocount = document.querySelector("#todocount");
var donecount = document.querySelector("#donecount");
var clearbutton = document.querySelector("#clearbutton");
/////////////////////////////////////////////////
// 【大坑】如果要获得的时content里的li，
// 此处itemlist放置的位置必须要在loaddata以后，因为如果在load之前，
// html里还没有挂载li元素，会获得空数组！！
// 而且，会导致与chrome console输出不同，
// 如果把loaddata放到select li 之后，chrome仍然能在console里打印li数组
var itemlist = document.querySelectorAll(".content ol");
/////////////////////////////////////////////////
// 1. 初始化加载数据从localstorage到页面中
loaddata();

// console.log(itemlist);

// 2. 监听输入框输入，保存数据
add.addEventListener("keyup", function (event) {
  if (event.keyCode == "13" && this.value) {
    // 按下回车，调用getdata函数读取本地localstorage里面的数据，
    // 返回的是对象数组
    var local = getdata();
    // 把新输入的数据追加后，再存到localstorage里
    // 数组push方法追加
    local.push({
      title: this.value.trim(),
      done: false,
      time: new Date().format("yyyy-MM-dd hh:mm"),
    });
    // localstorage存储字符串形式，先把数组转化成json字符串
    savedata(local);
    // 渲染数据
    loaddata();
    // 清空输入框
    this.value = "";
  } else if (event.keyCode == "13" && this.value === "") {
    alert("不能为空！");
    return;
  }
});

// // 3. todolist删除数据,利用事件委托，事件监听给外面的父元素ol
// todolist.addEventListener("click", function (event) {
//   //  console.log(event.target.className)
//   var data = getdata();
//   // event.target返回dom对象a，是触发事件的元素，即【元素节点】
//   // console.log(event.target.getAttribute('id'));
//   //   （1）当想要删除时
//   if (event.target.tagName === "A") {
//     //   getattribute获得自定义属性id
//     var id = event.target.getAttribute("id");
//     deletedata(data, id);
//   }
//   // （2）当想要改变状态为done时
//   else if (event.target.className === "box") {
//     var id = event.target.parentNode.querySelector("a").getAttribute("id");
//     // console.log(event.target);
//     // checked获得，不能用getattribute（用于自定义属性）,checked是固有属性
//     // console.log(event.target.checked);
//     // data[id]是对象，done 是键，把checked作为值给他
//     // var todotitle = data[id].title;
//     var tostatus = event.target.checked;
//     // var todotime = new Date().format("yyyy-MM-dd hh:mm");
//     // // data[id].done = event.target.checked;
//     // // data[id].time = new Date().format("yyyy-MM-dd hh:mm");
//     // data.splice(id, 1);
//     // data.push({ title: todotitle, done: tododone, time: todotime });
//     // savedata(data);
//     // loaddata();
//     changestatus(data, id, tostatus);
//   }
// });

// donelist.addEventListener("click", function (event) {
//   // console.log(event.target.tagName)
//   var data = getdata();
//   // event.target返回dom对象a
//   // console.log(event.target.getAttribute('id'));
//   if (event.target.tagName === "A") {
//     var id = event.target.getAttribute("id");
//     //   data.splice(id, 1);
//     //   savedata(data);
//     //   loaddata();
//     deletedata(data, id);
//   } else if (event.target.className === "box") {
//     var id = event.target.parentNode.querySelector("a").getAttribute("id");
//     //   var donetitle = data[id].title;
//     var tostatus = event.target.checked;
//     //   var donetime = new Date().format("yyyy-MM-dd hh:mm");
//     //   data.splice(id, 1);
//     //   data.push({ title: donetitle, done: donedone, time: donetime });
//     //   savedata(data);
//     //   loaddata();
//     changestatus(data, id, tostatus);
//   }
// });

// 4.获取todolist 和donelist ，同时绑定click事件
// 两个list内部逻辑相同
// 不能把clcik事件绑定到每个li上，因为li时初次渲染时获得的，
// 点击删除后，li没有再次添加addeventlistener事件
itemlist.forEach(function (item) {
  item.addEventListener("click", function (event) {
    var data = getdata();
    // event.target返回dom对象a，是触发事件的元素，即【元素节点】
    //   （1）当想要删除时
    if (event.target.tagName === "A") {
      //   getattribute获得自定义属性id
      var id = event.target.getAttribute("id");
      deletedata(data, id);
    }
    // （2）当想要改变状态为done时
    else if (event.target.className === "box") {
      var id = event.target.parentNode.querySelector("a").getAttribute("id");
      var tostatus = event.target.checked;
      changestatus(data, id, tostatus);
    }
  });
});

// 5.获取todolist 和donelist ，同时绑定click事件双击修改内容,以及失焦事件
itemlist.forEach(function (item) {
  item.addEventListener("dblclick", function (event) {
    if (event.target.tagName !== "LI") {
      return;
    }
    var data = getdata();
    //   获得之前一直隐藏的输入框
    var change = event.target.querySelector(".change");
    var kvalue = event.target.querySelector("p").innerHTML;
    //   使其显示
    change.style.display = "block";
    change.value = kvalue;
    // 聚焦
    change.focus();

    // keycode回车时会和focusout同时触发，
    // change.addEventListener('keyup', function (event) {
    //     // console.log('keyup');
    //     if (event.keyCode == '13' && this.value) {
    //         // console.log(event.target.parentNode.querySelector("a").getAttribute('id'));
    //         if (this.value === kvalue) {
    //             loaddata();
    //         } else {
    //             var id = event.target.parentNode.querySelector("a").getAttribute('id');
    //             // data[id].title = this.value.trim();
    //             // data[id].time = new Date().format("yyyy-MM-dd hh:mm");
    //             // savedata(data);
    //             // loaddata();

    //             var todotitle = this.value.trim();
    //             var tododone = data[id].done;
    //             var todotime = new Date().format("yyyy-MM-dd hh:mm");
    //             // data[id].done = event.target.checked;
    //             // data[id].time = new Date().format("yyyy-MM-dd hh:mm");
    //             data.splice(id, 1);
    //             data.push({ title: todotitle, done: tododone, time: todotime });
    //             savedata(data);
    //             loaddata();

    //         }
    //     }
    // })
    // Text失焦
    change.addEventListener("focusout", function (event) {
      // console.log("focusout");
      // console.log(event);
      if (this.value === kvalue) {
        loaddata();
      } else {
        var id = event.target.parentNode.querySelector("a").getAttribute("id");
        var todotitle = this.value.trim();
        var tododone = data[id].done;
        var todotime = new Date().format("yyyy-MM-dd hh:mm");
        data.splice(id, 1);
        data.push({ title: todotitle, done: tododone, time: todotime });
        savedata(data);
        loaddata();
      }
    });
  });
});
// 6.清空localstorage函数
clearbutton.addEventListener("click", function () {
  localStorage.clear();
  loaddata();
});
