(function (window) {
  window.adddate = function (fmt) {
    var mydate = new Date();
    var o = {
      "M+": mydate.getMonth() + 1, //月份
      "d+": mydate.getDate(), //日
      "h+": mydate.getHours(), //小时
      "m+": mydate.getMinutes(), //分
      "s+": mydate.getSeconds(), //秒
      "q+": Math.floor((mydate.getMonth() + 3) / 3), //季度
      S: mydate.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (mydate.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  };
})(window);
