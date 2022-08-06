// const dotenv = require("dotenv");
const mongoose = require("mongoose");

// dotenv.config();
const database =
  "mongodb+srv://adityamongodb:VmdABIqMyJVKok0C@cluster0.tcqarqs.mongodb.net/?retryWrites=true&w=majority";
// console.log(database);

const db = mongoose
  .connect(database)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
//////////////////////////////////////////////////////////////////////////
// const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/user_habit_tracker");

//   console.log("Db Connected");
// }
