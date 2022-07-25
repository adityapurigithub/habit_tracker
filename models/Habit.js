const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: "false",
  },
  not_done: {
    type: Boolean,
    default: "false",
  },
  no_action: {
    type: Boolean,
    default: "true",
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  status: [
    {
      day: String,
      complete: String,
    },
  ],
});

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
