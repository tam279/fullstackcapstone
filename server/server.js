// server.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const userController = require('./controllers/userController'); // updated path


const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/api/roles', userController.getRoles);
app.get('/api/companies', userController.getCompanies);



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
