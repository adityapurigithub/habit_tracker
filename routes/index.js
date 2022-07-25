const express = require("express");

//using the express router
const router = express.Router();

//required models
const Habit = require("../models/Habit");
const User = require("../models/User");

//welcome page
router.get("/", function (req, res) {
  res.render("welcome", {
    title: "Welcome",
    msg: req.flash("logout_message"),
  });
});

//home page
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
        remove_msg: req.flash("remove_msg"),
        fav_msg: req.flash("fav_msg"),
        add_habit: req.flash("add_habit"),
      });
    });
  });
});

//function to define the date str
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

//adding the new  habit
router.post("/add-habit", function (req, res) {
  // console.log("req.body contains...", req.body);

  //adding a habit and updating the status
  let status = [],
    tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, 10);
  status.push({ date: localISOTime, complete: "none" });
  Habit.create(
    {
      habit: req.body.habit,
      status: status,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      // console.log("Data", data);
      req.flash("add_habit", "Habit Added");

      res.redirect("back");
    }
  );
});

//changing the user view from daily to weekly
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
//status tells that whether a habit is completed or not
router.get("/status", function (req, res) {
  let id = req.query.id;
  let d = req.query.date;

  //finding the habit
  Habit.findById(id, function (err, habit) {
    if (err) {
      console.log(err);
    } else {
      let status = habit.status;
      let found = false;
      status.find(function (item, index) {
        if (item.day === d) {
          if (item.complete === "yes") {
            item.complete = "no";
          } else if (item.complete === "no") {
            item.complete = "none";
          } else if (item.complete === "none") {
            item.complete = "yes";
          }
          found = true;
        }
      });
      //add the habit if not found
      if (!found) {
        status.push({ day: d, complete: "yes" });
      }
      habit.status = status;
      //saving the habit
      habit
        .save()
        .then((habit) => {
          console.log(habit);
          res.redirect("back");
        })
        .catch((err) => console.log(err));
    }
  });
});

// favouriting a habit
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
      req.flash("fav_msg", "Added to Favrorites..");
    } else {
      habit.favourite = false;
      req.flash("fav_msg", "Removed from Favrorites..");
    }
    habit.save();

    res.redirect("back");
  });
});

//for deleting a habit
router.get("/remove", function (req, res) {
  console.log(req.query);
  let id = req.query.id;
  Habit.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    req.flash("remove_msg", "Habit Removed");
    res.redirect("back");
  });
});

module.exports = router;
