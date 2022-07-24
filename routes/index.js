const express = require("express");

const router = express.Router();

const Habit = require("../models/Habit");
const User = require("../models/user");

router.get("/", function (req, res) {
  res.render("welcome", {
    title: "Welcome",
  });
});

router.get("/home", function (req, res) {
  User.findOne({ email: req.query.email }).then((user) => {
    // i am finding all the habit irrespective of a particular user as its not necessary(ATQ)....
    // all the habits in db will be shown in home....
    Habit.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(user);

      var days = [];
      days.push(getD(0));
      days.push(getD(1));
      days.push(getD(2));
      days.push(getD(3));
      days.push(getD(4));
      days.push(getD(5));
      days.push(getD(6));
      res.render("home", {
        title: "Home",
        habit: data,
        user: user,
        days: days,
      });
    });
  });
});

function getD(n) {
  let d = new Date();
  d.setDate(d.getDate() + n);
  var newDate = d.toLocaleDateString("pt-br").split("/").reverse().join("-");
  var day;
  switch (d.getDay()) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }
  return { date: newDate, day };
}

router.post("/add-habit", function (req, res) {
  // console.log("req.body contains...", req.body);

  Habit.create(
    {
      habit: req.body.habit,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log("Data", data);
      res.redirect("back");
    }
  );
});
router.post("/view", function (req, res) {
  User.findOne({ email: req.query.email })
    .then((user) => {
      user.view = user.view === "daily" ? "weekly" : "daily";
      user
        .save()
        .then((user) => {
          return res.redirect("back");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log("Error changing view!");
      return;
    });
});
router.get("/status", function (req, res) {
  let id = req.query.id;
  let day = req.query.day;
  Habit.findById(id, function (err, habit) {
    if (err) {
      console.log(err);
    }
    console.log(habit);

    if (habit.no_action) {
      habit.no_action = false;
      habit.done = true;
      habit.not_done = false;
    } else if (habit.done) {
      habit.done = false;
      habit.no_action = false;
      habit.not_done = true;
    } else {
      habit.done = false;
      habit.no_action = true;
      habit.not_done = false;
    }

    habit.save();

    res.redirect("back");
  });
});
router.get("/fav", function (req, res) {
  // console.log(req.query);
  let id = req.query.id;
  Habit.findById(id, function (err, habit) {
    if (err) {
      console.log("err in favouriting", err);
      return;
    }
    if (!habit.favourite) {
      habit.favourite = true;
    } else {
      habit.favourite = false;
    }
    habit.save();
    res.redirect("back");
  });
});

router.get("/remove", function (req, res) {
  console.log(req.query);
  let id = req.query.id;
  Habit.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("back");
  });
});

module.exports = router;
