const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title name"],
  },
  name: {
    type: String,
    required: [true, "Please provide artist name"],
  },
  song: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  duration: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Song", songSchema);
