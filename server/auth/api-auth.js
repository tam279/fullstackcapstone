// api-auth.js

const handleLogin = (req, res) => {
  // Authentication successful
  // Access the user and token properties from the authentication process
  const {user} = req;
  // Access token
  const {token} = user;
  // Remove the token property from the user object
  const { token: _, ...userData } = user;
  // Return the token and user data to the client
  res.status(200).json({
    message: "Login successful",
    user: userData,
    token: token,
  });
};

const handleJWT = (req, res) => {
  // User is authenticated, proceed to the next middleware or route handler
  res.json({
    message: "Protected resource accessed by user: " + req.user.EMAIL,
    user: req.user,
  });
};

module.exports = {
  handleLogin,
  handleJWT,
};
