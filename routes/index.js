var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
const Todo = require("../models/todo");
var chatRecords = [];

function createTime() {
  let date_ob = new Date();
  let date = ("" + date_ob.getDate()).slice(-2);
  let month = ("" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let timestamp = year + "/" + month + "/" + date + " ";

  console.log(timestamp);
  console.log(typeof hours);
  if (hours == 0) {
    timestamp += "上午12:";
  } else if (hours < 11) {
    timestamp += "上午" + hour + ":";
  } else if (hours == 12) {
    timestamp += "下午12:";
  } else if (hours > 12) {
    timestamp += "下午" + (hours - 12) + ":";
  }

  timestamp +=
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  return timestamp;
}
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/chat", function (req, res, next) {

  let timestamp = createTime()

  console.log(timestamp);
  if (req.query.user == "" || req.query.say == "") {
    res.send(chatRecords);
    return;
  }

  chatRecords.push({
    user: req.query.user,
    say: req.query.say,
    time: timestamp,
  });

  res.send(chatRecords);
});

router.get("/chat/clear", function (req, res, next) {
  chatRecords = [];
  res.end();
});

router.get("/chat/save", async function (req, res, next) {
  let timestamp = createTime();

  await Todo.deleteMany({

  });

  await Todo.insertMany({
    chat: JSON.stringify(chatRecords)
  });

  res.send("ouo");
});

router.get("/chat/reload", async function (req, res, next) {
  let data = await Todo.find({});
  console.log(data);
  chatRecords = JSON.parse(data[0].chat);
  res.send(chatRecords);

});

module.exports = router;
