// api-auth.js

const handleLogin = (req, res) => {
  const { user } = req;
  const { token } = user;
  const { token: _, ...userData } = user;
  res.status(200).json({
    message: "Login successful",
    user: userData,
    token: token,
  });
};

const handleJWT = (req, res) => {
  res.json({
    message: "Protected resource accessed by user: " + req.user.email,
    user: req.user,
  });
};

module.exports = {
  handleLogin,
  handleJWT,
};
