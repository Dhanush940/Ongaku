const express = require("express");
const path = require("path");
const User = require("../model/user");
const Song = require("../model/song");
const router = express.Router();
const cloudinary = require("cloudinary");
const { isAuthenticated } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-song", isAuthenticated, async (req, res, next) => {
  try {
    // console.log(req.user);
    // console.log(req.body);
    const { title, name, song, image } = req.body;
    const user = await User.findById(req.user._id);
    // console.log(user);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const myCloudImages = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "spotifySongImages",
    });
    // console.log("MycloudImages:");
    // for (let key in myCloudImages)
    //   console.log(`Key is ${key} , Value is ${myCloudImages[key]}`);
    const myCloudSongs = await cloudinary.v2.uploader.upload(req.body.song, {
      folder: "spotifySongs",
      resource_type: "auto",
    });

    // console.log("MycloudSongs");
    // for (let key in myCloudSongs)
    //   console.log(`Key is ${key} , Value is ${myCloudSongs[key]}`);
    // console.log("MyCloudSong", JSON.stringify(myCloudSongs));
    console.log("Duration is :", typeof myCloudSongs.duration);
    //Number

    const songDetails = {
      title,
      name,
      song: myCloudSongs.url,
      image: myCloudImages.url,
      user,
      duration: Math.floor(myCloudSongs.duration),
    };
    await Song.create(songDetails);
    res.status(200).json({ success: true, message: "Song created" });
  } catch (err) {}
});

router.get("/getSongs", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const songs = await Song.find({ "user._id": req.user._id });
    // console.log(songs);
    return res.status(200).json({ success: true, songs });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
