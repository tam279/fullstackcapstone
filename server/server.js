const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const userController = require("./controllers/userController");
const projectController = require("./controllers/projectController");
const taskController = require("./controllers/taskController");
const commentController = require("./controllers/commentController");

const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
//use cors middleware
app.use(
  cors({
    origin: "http://localhost:3000", // replace this with your React application URL
    credentials: true, // this enables cookies to be sent with requests from the client
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // add 'OPTIONS' to this array
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: "mysecret", // replace this with your own secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/api/users", userController.getUsers);
app.post("/api/createUser", userController.createUser);
app.get("/api/project/:projectId/technicians", userController.getProjectTechnicians);


// This is
// app.get("/api/user/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await userController.getUserByEmail(email);
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.put("/api/updateUser/:email", userController.updateUser);
app.delete("/api/deleteUser/:email", userController.deleteUser);
app.put("/api/deactivateUser/:email", userController.deactivateUser);
app.get("/api/loginMethods", userController.getLoginMethods);
app.put("/api/activateUser/:email", userController.activateUser);
app.put("/api/activateCompany/:id", userController.activateCompany);
app.put("/api/deactivateCompany/:id", userController.deactivateCompany);

app.get("/api/companies", userController.getCompanies);
app.post("/api/createCompany", userController.createCompany);
// Update company
app.put("/api/updateCompany/:id", userController.updateCompany);

// Delete company
app.delete("/api/deleteCompany/:id", userController.deleteCompany);

// Project routes
app.get("/api/projects", projectController.getProjects);
app.post("/api/createProject", projectController.createProject);
app.put("/api/updateProject/:id", projectController.updateProject);
app.delete("/api/deleteProject/:id", projectController.deleteProject);
app.get("/api/project/:id", projectController.getProject);


// Task routes
app.get("/api/tasks", taskController.getTasks);
app.post("/api/createTasks", taskController.createTask);
app.put("/api/updateTasks/:id", taskController.updateTask);
app.delete("/api/deleteTasks/:id", taskController.deleteTask);
app.get("/api/tasks/:id", taskController.getTask);



app.get("/api/roles", userController.getRoles);

// User activity routes
app.get("/api/userActivity", userController.getUserActivity);
app.post("/api/createUserActivity", userController.createUserActivity);
app.get("/api/userActivity/:projectId", userController.getUserActivityByProjectId);

// Comment routes
app.get("/api/comments", commentController.getComments);
app.post("/api/comments", commentController.createComment);
app.put("/api/comments/:id", commentController.updateComment);
app.delete("/api/comments/:id", commentController.deleteComment);

//auth
//auth dependencies
const auth = require("./auth/api-auth");
const passport = require("./auth/passport");
app.use(passport.initialize());
//auth ddependencies end
//passport authenticate skips next middleware if auth failed and sends unauthorized message to the client
//auth endpoints
//login endpoint that returns a jwt token and user object, it returns unauthorized message to client if auth failed
app.post(
  //endpoint link
  "/api/login",
  //passport middleware
  passport.authenticate("local", { session: false }),
  //hande business logic after authentication
  auth.handleLogin
);
//jwt sample endpoint request but include bearer jwt token to pass auth utherwise it will return aunautorized to the client
app.get(
  "/api/authed",
  passport.authenticate("jwt", { session: false }),
  auth.handleJWT
);
//auth end

//email service
const { sendEmail } = require("./service/mail");

app.get("/api/sendmail", (req, res) => {
  sendEmail();
  const message = "Email attempted.";
  res.json({ message }); // Send the response as JSON
});
//email end

//prisma test
const { prisma, testdb } = require("./prisma/prisma");
app.get("/prismatest", async (req, res) => {
  testdb();
  res.send(
    await prisma.uSER.findMany({
      include: {
        PROJECT_MANAGER_BRIDGE: true,
        PROJECT_TECHNICIAN_BRIDGE: true,
        VIEWER_BRIDGE: true,
      },
    })
  );
});
//end prisma

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  console.log(req.url); // Log the requested URL
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
