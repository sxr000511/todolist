/////////////////////////////////////////////////
var add = document.querySelector("#add_list");
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
renderview();

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
      time: adddate("yyyy-MM-dd hh:mm"),
    });
    // localstorage存储字符串形式，先把数组转化成json字符串
    savedata(local);
    // 渲染数据
    renderview();
    // 清空输入框
    this.value = "";
  } else if (event.keyCode == "13" && this.value === "") {
    alert("不能为空！");
    return;
  }
});

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
      changedata("status", data, id, tostatus);
    }
  });
});

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
    change.addEventListener("focusout", function (event) {
      if (this.value === kvalue) {
        renderview();
      } else {
        var id = event.target.parentNode.querySelector("a").getAttribute("id");
        var todotitle = this.value.trim();
        changedata("content", data, id, todotitle);
      }
    });
  });
});

// 6.清空localstorage函数
clearbutton.addEventListener("click", function () {
  localStorage.clear();
  renderview();
});
