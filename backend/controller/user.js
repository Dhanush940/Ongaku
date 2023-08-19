const express = require("express");
const User = require("../model/user");
const router = express.Router();
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendJWTToken = require("../utils/sendJWTToken");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

//Crete User
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "spotUserImages",
    });

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
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "10m",
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

//Login User
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

//Logout User
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("UserToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Load User
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

//Forgot Password
router.post("/forgotPassword", async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    // console.log(fullName, email);
    const user = await User.find({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    const password = generateRandomPassword();
    await User.updateOne(
      { email: email },
      { $set: { resetPasswordToken: password } }
    );
    const resetToken = createActivationToken({ email, fullName });

    // const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
    const resetUrl = `https://ongaaku.netlify.app/resetPassword/${resetToken}`;
    // console.log(jwt.verify(token, process.env.ACTIVATION_SECRET));

    await sendMail({
      email: email,
      subject: "Reset your password",
      message: `Hello ${fullName}, please click on the link to reset your password: ${resetUrl} . You have 10 mins to reset your password with this link after which time will be expired. Temporary password to reset your password:(${password}) `,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:-${email} and follow the steps!`,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, 400));
  }
});

//Reset Password
router.post("/resetPassword", async (req, res, next) => {
  try {
    const { password, token, generatedPassword } = req.body;
    // console.log(password, generatedPassword);
    const decryptEmail = jwt.verify(token, process.env.ACTIVATION_SECRET);
    // console.log(decryptEmail);
    const user = await User.findOne({ email: decryptEmail.email });
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    // console.log(user);
    // console.log(user.resetPasswordToken, generatedPassword);
    if (user.resetPasswordToken !== generatedPassword) {
      res
        .status(400)
        .json({ success: false, message: "Generated Password doesn't match" });
      return;
    }
    user.password = password;
    user.resetPasswordToken = "";
    user.save();
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
    // console.log("done");
  } catch (err) {
    console.log(err.message);
    if ((err.message = "jwt expired")) {
      return res.status(400).json({ success: false, message: "Time expired" });
    }

    // return next(new ErrorHandler(err.message, 400));
  }
});

function generateRandomPassword() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
module.exports = router;
