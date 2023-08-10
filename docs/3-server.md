# Backend (server)

This is written in JavaScript using [Express library](https://expressjs.com/).

- Run for development using [nodemon](https://nodemon.io/): `npm start`
- Build for deployment: `npm run startbuild`
- Run deployment server: `npm run startdep`

Additional libraries used:

1. [bcrypt](https://www.npmjs.com/package/bcrypt)
2. [prisma](https://www.prisma.io/)
3. [nodemailer](https://nodemailer.com/about/)
4. [passport](https://www.passportjs.org/)
5. [multer](https://www.npmjs.com/package/multer)

## Auth Process (passport)

Passwords are bcrypt hashed with salt 10 and are stored in the database.

### Login

LocalStrategy with email and password. Prisma fetches the user with email and using bcrypt, compare the hashed password with the password provided. When the credentials are verified, A [JWT](https://jwt.io/) is generated with the email, id, and role are added to the token claims and then sent to the front end.

### New User

The admin can create a user account and provide a temporary password that will be sent to the user via email.

### Forgot Password

On the login page the user can request to reset their password via entering their email. An email will be sent to them containing a magic link which uses [JWT](https://jwt.io/). Upon opening the link they will be sent to the website prompting them for a new password.

## API endpoints

They reside in the `server/server.js`, [Express](https://expressjs.com/) is setup with json and secure requests require JWT as the bearer token before the request is processesd.

In the `server/controllers` the reqeust and response are processes for:

- comments
- companies
- projects
- tasks
- users

## Prisma

The database is managed by [Prisma](https://www.prisma.io/).

Inside the prisma folder the `server/prisma/prisma.schema` has the models that are persisted in the databse. [Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema) 

The `server/prisma/prisma.js` initializes the prisma client for the auth, controllers, services that need access to the database.

## Service folder

Here resides the code for these services:

- file uploads
- new user
- reset password
- contact email
- email configuration

## Files

Files are stored in the database as bytes and the limit is currently set to 10MB to prevent slowing down the database.