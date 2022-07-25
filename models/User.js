const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  view: {
    type: String,
    default: "daily",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
