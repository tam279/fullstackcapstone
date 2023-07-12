const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Configure Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = { email: "test@email.com", password: "$2b$10$lpB6FxNA2Lm33TVyI5pEuuQVMulZjyyrN4Yx8Mm9ySrAD374GdOtm" };

        if (!user) {
          return done(null, false);
        }

        console.log(await bcrypt.hash(password, 10));

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return console.error(err);
          }

          if (isMatch) {
            console.log("good password");
            const token = jwt.sign({ sub: user.id }, "your-secret-key"); // Replace with your own secret key

            const authenticatedUser = {
              user,
              token,
            };

            return done(null, authenticatedUser);
            console.log("Password is correct");
          } else {
            console.log("bad password");
            return done(null, false);
            console.log("Password is incorrect");
          }
        });
      } catch (error) {
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
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });

      if (!user) {
        console.log("no user found");
        return done(null, false);
      }

      console.log("user is authed");
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Export the Passport.js instance
module.exports = passport;
