const sendJWTToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  };
  res.status(statusCode).cookie("UserToken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendJWTToken;
