const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter playlist name!"],
    unique: true,
  },

  userId: {
    type: String,
  },
  playlistSongs: {
    type: Array,
  },
  //   avatar: {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);
