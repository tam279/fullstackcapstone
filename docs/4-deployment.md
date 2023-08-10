# Deployment

## Frontend

[Vercel](https://vercel.com/) supports deployment of the React app.

### Configuration

- change the root directory to `client`
- select `18.x` as the Node.js version
- environment variable `REACT_APP_BACKEND_URL=backend.com` do not include trailing forward slash

## Backend

[Render](https://render.com/) supports the deployment of Express for Node.js

### Configuration

Environment Variables:

- DATABASE_URL, connection to the database
- EMAIL, smtp email account (gmail)
- EMAILPASS, smtp password
- CONTACT_EMAIL, email where contact us forms are submitted
- ALLOWED_ORIGINS, front end url without trailing forward slash
- FRONTEND_URL, login url that will be sent to new users via email

Build & Deploy

- Root Directory `server`
- Build Command `npm run startbuild`
- Start Command `npm run startdep`

## Database

[CockroachDB](https://www.cockroachlabs.com/), register for the serverless service.

With prisma the application can be connected with a different database that is [supported](https://www.prisma.io/docs/reference/database-reference/supported-databases) without the need to design another schema. It might need minor adjustment and set up the connection for the specific database. 