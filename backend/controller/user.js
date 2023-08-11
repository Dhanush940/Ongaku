const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendJWTToken = require("../utils/sendJWTToken");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    // console.log(req.body);
    // console.log("avatar:" + avatar);
    // console.log("name", name);
    const userEmail = await User.findOne({ email });
    // if (userEmail) {
    //   return res.status(400).json({
    //     message: "User already exists",
    //   });
    // }
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "spotUserImages",
    });
    // console.log(myCloud);
    const user = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };
    const activationToken = createActivationToken(user);

    // const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    const activationUrl = `https://ongaaku.netlify.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to actiave your account:${activationUrl} `,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:-${user.email} to activate your account!`,
      });
    } catch (err) {
      console.log(err);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return res.status(400).json({
          message: "Invalid Token.Please try again",
        });
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      res.status(201).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");
      // console.log("User with select password", user);

      if (!user) {
        res.status(400).json({
          success: false,
          message: "User doesn't exist in our databse",
        });
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        res
          .status(400)
          .json({ success: false, message: "Please provide correct password" });
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendJWTToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(400).json({ success: false, message: "User doesn't exist" });
        return next(new ErrorHandler("User doesn't exists", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
