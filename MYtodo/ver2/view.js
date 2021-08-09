function renderview() {
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
