const express = require("express");
// const path = require("path");
const User = require("../model/user");
const Playlist = require("../model/playlist");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/createPlaylist", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const playlistDetails = {
      name: req.body.playlistName,
      userId: req.user._id,
    };
    const playlist = await Playlist.create(playlistDetails);
    res.status(200).json({ success: true, playlist });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getPlaylists", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const playlistNames = await Playlist.find({ userId: req.user._id });

    return res.status(200).json({ success: true, playlistNames });
  } catch (err) {
    console.log(err);
  }
});

router.delete(
  "/deletePlaylist/:id",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        res.status(400).json({ success: false, message: "User doesn't exist" });
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, deletedPlaylist });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/addSongs", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const { filteredSongs, playlist } = req.body;
    const findPlaylist = await Playlist.findById(playlist._id);
    let filteredPlaylist;
    findPlaylist.playlistSongs = [
      ...findPlaylist.playlistSongs,
      ...filteredSongs,
    ];

    const seen = new Set();
    filteredPlaylist = findPlaylist.playlistSongs.filter((obj) => {
      const propertyValue = obj["_id"];
      if (!seen.has(propertyValue)) {
        seen.add(propertyValue);
        return true;
      }
      return false;
    });
    findPlaylist.playlistSongs = filteredPlaylist;
    await findPlaylist.save();
    res.status(201).json({ success: true, data: filteredPlaylist });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/renamePlaylist", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const findPlaylist = await Playlist.findById(req.body.playlist._id);
    findPlaylist.name = req.body.name;
    await findPlaylist.save();
    res.status(200).json({ success: true, updatedPlaylist: findPlaylist });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Playlist with the name already exists",
    });
  }
});

router.patch(
  "/removeSongFromPlaylist",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        res.status(400).json({ success: false, message: "User doesn't exist" });
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      const findPlaylist = await Playlist.findById(req.body.playlistId);
      findPlaylist.playlistSongs = findPlaylist.playlistSongs.filter(
        (item) => item._id !== req.body.songToBeRemoved._id
      );
      await findPlaylist.save();
      res.status(200).json({ success: true, updatedPlaylist: findPlaylist });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        error: "Playlist with the name already exists",
      });
    }
  }
);
module.exports = router;
