# Introduction

This project it has 3 main parts:

- Client, which contains the ReactJS code that runs the front end.
- Server, which contains the Express for Node.js backend.
- Database, we currently use CockroachDB through [Prisma](https://www.prisma.io/) and access it remotely with [Prisma studio](https://www.prisma.io/studio). 

## Running the development environment

The environment variables must be setup for the backend, create a .env file in the server directory:

- DATABASE_URL, this will be the connection to the database that will be used by [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-node-cockroachdb).
- EMAIL, this is the email for the smtp (gmail).
- EMAILPASS, this is the password for the smtp (gmail).
- CONTACT_EMAIL, this is email where the contact us form will be sent to.
- ALLOWED_ORIGINS, this are the urls allowed for [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). By default our front end url is http://localhost:3000 to add more separate by comma without any spaces or trailing forwardslash.
- FRONTEND_URL, this is the url that will be sent to new users by email.




You will need [Node v18.12.0 LTS](https://nodejs.org/en/download)

For both the client and server you will need to:

- go to the server/client directory
- install the dependencies `npm i `
- for the server only `npx prisma generate`
- start the runtime `npm start`