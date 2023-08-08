// passport.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("./../prisma/prisma");
var MagicLinkStrategy = require("passport-magic-link").Strategy;
require("dotenv").config();
const nodemailer = require("nodemailer");

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
            const token = jwt.sign(
              {
                sub: user.email,
                id: user.id,
                role: user.role,
              },
              "your-secret-key"
            );
            user.token = token;
            delete user.password;
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

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Set to true if using a secure connection (e.g., SSL/TLS)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS,
  },
});

passport.use(
  new MagicLinkStrategy(
    {
      secret: "keyboard cat",
      userFields: ["email"],
      tokenField: "token",
      verifyUserAfterToken: true,
      session: false,
    },
    async function send(user, token) {
      var link = `${process.env.FRONTEND_URL}/login?token=` + token;
      var mailOptions = {
        from: "noreply@vitra-services.com", // Update with a suitable from email address
        to: user.email,
        subject: "Password Reset for VITRA SERVICES",
        text:
          "Hello!\r\n\r\nYou have requested a password reset for your VITRA SERVICES account. Click the link below to reset your password:\r\n\r\n" +
          link +
          "\r\n\r\nIf you did not request this reset, please ignore this email.\r\n\r\nBest regards,\r\nVITRA SERVICES Team",
        html:
          '<h3>Hello!</h3><p>You have requested a password reset for your VITRA SERVICES account. Click the link below to reset your password:</p><p><a href="' +
          link +
          '">Reset Password</a></p><p>If you did not request this reset, please ignore this email.</p><p>Best regards,<br>VITRA SERVICES Team</p>',
      };

      return transporter.sendMail(mailOptions);
    },
    async function verify(user) {
      try {
        // Use Prisma to find the user by email
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (existingUser) {
          const token = jwt.sign({ sub: user.email }, "your-secret-key");
          existingUser.token = token;
          delete existingUser.password;
          delete existingUser.deleted;
        }
        // If the user exists, resolve with the existing user data
        return existingUser;
      } catch (error) {
        throw error; // Reject with any error that occurs during the process
      }
    }
  )
);

module.exports = passport;
