const express = require("express");

const router = express.Router();
const User = require("../models/User");

//login---get
router.get("/login", function (req, res) {
  res.render("login", {
    title: "Login",
    msg: req.flash("success_msg"),
  });
});

//register---get
router.get("/register", function (req, res) {
  res.render("register", {
    title: "Register",
  });
});

//signing-up
router.post("/signingup", function (req, res) {
  // console.log(req.body);
  User.create(
    {
      email: req.body.email,
      password: req.body.pass,
    },
    function (err, data) {
      if (err) {
        console.log("err in creating user..", err);
        return;
      }
      // console.log(data);
      req.flash("success_msg", "Successfully registered you can now login");
      res.redirect("/user/login");
    }
  );
});

router.post("/loging", function (req, res) {
  const { email, pass } = req.body;
  User.findOne(
    {
      email: email,
      password: pass,
    },
    function (err, data) {
      if (err) {
        console.log("err", err);
      }
      if (data == null) {
      } else {
        res.redirect(`/home?email=${email}`);
      }
    }
  );
});

//logout to welcome page
router.get("/logout", function (req, res) {
  req.flash("logout_message", "You were Logged out!!");
  res.redirect("/");
});

module.exports = router;
