// passport.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("./../prisma/prisma");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return console.error(err);
          }
          if (isMatch) {
            const token = jwt.sign({ sub: user.email }, "your-secret-key");
            user.token = token;
            delete user.password;
            delete user.id;
            delete user.deleted;
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-secret-key",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: payload.sub },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
