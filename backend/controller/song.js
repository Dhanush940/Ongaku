const express = require("express");
const path = require("path");
const User = require("../model/user");
const Song = require("../model/song");
const Playlist = require("../model/playlist");
const router = express.Router();
const cloudinary = require("cloudinary");
const { isAuthenticated } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-song", isAuthenticated, async (req, res, next) => {
  try {
    const { title, name, song, image } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const myCloudImages = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "spotifySongImages",
    });
    const myCloudSongs = await cloudinary.v2.uploader.upload(req.body.song, {
      folder: "spotifySongs",
      resource_type: "auto",
    });
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
    return res.status(200).json({ success: true, songs });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteSong/:id", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    let Image = `spotifySongImages/${deletedSong.image.split("/")[8]}`;
    Image = Image.substring(0, Image.lastIndexOf("."));
    let song = `spotifySongs/${deletedSong.song.split("/")[8]}`;
    song = song.substring(0, song.lastIndexOf("."));
    await cloudinary.v2.uploader.destroy(Image);
    await cloudinary.v2.uploader.destroy(song, { resource_type: "video" });

    const playlists = await Playlist.find();

    playlists.map(async (x, index) => {
      x.playlistSongs = x.playlistSongs.filter((y) => y._id !== req.params.id);
      await playlists[index].save();
    });
    return res.status(200).json({ success: true, deletedSong, playlists });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
