const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("./../prisma/prisma");

// Configure Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Query the user based on the provided email
        const user = await prisma.user.findUnique({ where: { EMAIL: email } });
        console.log(user);
        if (!user) {
          // User not found, authentication failed
          return done(null, false);
        }

        console.log(bcrypt.hashSync(password, 10));
        // Verify the password
        bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
          if (err) {
            // Handle error
            return console.error(err);
          }

          if (isMatch) {
            // Authentication successful, pass the user to the next middleware
            // Generate JWT token
            const token = jwt.sign({ sub: user.EMAIL }, "your-secret-key"); // Replace with your own secret key

            // Add the token to the user
            user.token = token;

            // Pass the user to the next middleware
            return done(null, user);
          } else {
            // Passwords do not match
            // Invalid password, authentication failed
            return done(null, false);
          }
        });
      } catch (error) {
        // Handle any errors that occurred during authentication
        return done(error);
      }
    }
  )
);

// Configure JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-secret-key", // Replace with your own secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      console.log(payload.sub);
      // Query the user based on the payload information from the JWT token
      const user = await prisma.user.findUnique({
        where: { EMAIL: payload.sub },
      });

      if (!user) {
        // User not found, authentication failed
        return done(null, false);
      }
      // Pass the user to the next middleware
      return done(null, user);
    } catch (error) {
      // Handle any errors that occurred during authentication
      return done(error);
    }
  })
);

// Export the Passport.js instance
module.exports = passport;