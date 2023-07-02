// server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const userController = require('./controllers/userController');
const bodyParser = require('body-parser');

const app = express();
// Configure CORS here
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true // enable set cookie
}));

app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Apply the Content Security Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'http://localhost:5000'],
            // other directives...
        },
    })
); app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// Apply the Content Security Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'http://localhost:5000'],
            // other directives...
        },
    })
);

// Serve the favicon.ico
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.get('/api/users', userController.getUsers);
app.post('/api/createUser', userController.createUser);


app.get('/api/companies', userController.getCompanies);
app.post('/api/createCompany', userController.createCompany);


app.get('/api/roles', userController.getRoles);
// Route not found error handler
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: err.message || 'Internal Server Error',
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
