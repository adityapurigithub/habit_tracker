const port = 8000;
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();

const db = require("./config/mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("assets"));

app.use(expressEjsLayouts);

app.use(express.urlencoded());

app.use("/", require("./routes"));
app.use("/user", require("./routes/user"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Running on port", port);
});
