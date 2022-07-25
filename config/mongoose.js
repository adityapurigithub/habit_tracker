const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/user_habit_tracker");
  console.log("Db Connected");
}
