const express = require("express");

const app = express();

app.use(express.json());

app.use(require("cors")());

// 引用web
require("./routes/web")(app);

// 引用数据库
require("./plugins/db.js")(app);

app.use("/", express.static(__dirname + "/web"));

app.listen("3000", () => {
  console.log("3000 is listening");
});
