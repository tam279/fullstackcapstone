const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pmsdatabase',
});

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const query = 'SELECT * FROM USER WHERE EMAIL = ?';
            const [results] = await db.query(query, [username]);

            if (!results || results.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const user = results[0];

            if (!bcrypt.compareSync(password, user.PASSWORD)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.USERID);
});

passport.deserializeUser(async function (id, done) {
    try {
        const query = 'SELECT * FROM USER WHERE USERID = ?';
        const [results] = await db.query(query, [id]);

        if (!results || results.length === 0) {
            return done(null, false);
        }

        const user = results[0];
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
