// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const userController = require('./controllers/userController');
const projectController = require('./controllers/projectController');
const taskController = require('./controllers/taskController');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const corsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*', //or restrict to certain domains if you wish
    preflightContinue: false
};




const app = express();
//use cors middleware
app.use(cors(corsOptions));
//enable pre-flight
app.options('*', cors(corsOptions));
app.use(
    cors({
        origin: ['http://localhost:3000'], // replace this with your React application URL
        methods: ['GET', 'POST', 'PUT'],
        credentials: true,
    })
);

app.use(bodyParser.json());

app.use(
    session({
        secret: 'mysecret', // replace this with your own secret
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'http://localhost:3000'], // replace this with your React application URL
        },
    })
);

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.get('/api/users', userController.getUsers);
app.post('/api/createUser', userController.createUser);

app.put('/api/updateUser/:email', userController.updateUser);
app.delete('/api/deleteUser/:email', userController.deleteUser);
app.put('/api/deactivateUser/:email', userController.deactivateUser);
app.get('/api/loginMethods', userController.getLoginMethods);

app.get('/api/companies', userController.getCompanies);
app.post('/api/createCompany', userController.createCompany);
// Update company
app.put('/api/updateCompany/:id', userController.updateCompany);

// Delete company
app.delete('/api/deleteCompany/:id', userController.deleteCompany);


// Project routes
app.get('/api/projects', projectController.getProjects);
app.post('/api/createProject', projectController.createProject);
app.put('/api/updateProject/:id', projectController.updateProject);
app.delete('/api/deleteProject/:id', projectController.deleteProject);
app.get('/api/project/:id', projectController.getProject);

// Task routes
app.get('/api/tasks', taskController.getTasks);
app.post('/api/tasks', taskController.createTask);
app.put('/api/tasks/:id', taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);

app.get('/api/roles', userController.getRoles);


// User activity routes
app.get('/api/userActivity', userController.getUserActivity);
app.post('/api/createUserActivity', userController.createUserActivity);


app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    console.log(req.url);  // Log the requested URL
    next(error);
});


app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: err.message || 'Internal Server Error',
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
