const jwt = require("jsonwebtoken");
const User = require("../model/user");
exports.isAuthenticated = async (req, res, next) => {
  const { UserToken } = req.cookies;
  // console.log(req.cookies);
  if (!UserToken) {
    return res.status(401).json({
      message: "Please login to continue",
    });
  }
  const decoded = jwt.verify(UserToken, process.env.JWT_SECRET_KEY);
  // console.log("decoded :" + decoded.toString);
  // for (let key in decoded)
  //   console.log(`Key is ${key} , Value is ${decoded[key]}`);
  req.user = await User.findById(decoded.id);
  next();
};
