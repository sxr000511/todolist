const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  count: {
    type: Number,
  },
  // id: {
  //   type: Number,
  // },
  title: {
    type: String,
  },
  isDelete: {
    type: Boolean,
  },
  locked: {
    type: Boolean,
  },
  record: [{ text: String, isDelete: Boolean, checked: Boolean }],
});

module.exports = mongoose.model("Todo", schema);
