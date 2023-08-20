const jwt = require("jsonwebtoken");
const User = require("../model/user");
exports.isAuthenticated = async (req, res, next) => {
  const { UserToken } = req.cookies;
  if (!UserToken) {
    return res.status(401).json({
      message: "Please login to continue",
    });
  }
  const decoded = jwt.verify(UserToken, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
};
