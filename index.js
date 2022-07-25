// const port = 8000;
const port = process.env.PORT || 8000;

//requiring all basic libraries..
const express = require("express");
const path = require("path");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

//connecting to db
const db = require("./config/mongoose");

//setting up the view engine..
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static("assets"));

app.use(expressEjsLayouts);

//parser used for encoding the form body
app.use(express.urlencoded());

//using express session for flash message..
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 2000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

//routers...
app.use("/", require("./routes"));
app.use("/user", require("./routes/user"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Running on port", port);
});
