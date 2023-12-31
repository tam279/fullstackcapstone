/**
 * This is a Node.js server that uses Express to handle API routes for user, company, project, task,
 * and comment management, as well as authentication and file uploading/downloading.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information about the request such as the request method, request headers, request body,
 * URL, and query parameters. It is used to access and manipulate the data sent by the client to the
 * server.
 * @param res - The `res` parameter is the response object in Express. It is used to send a response
 * back to the client. It has various methods and properties that can be used to customize the
 * response, such as `res.send()`, `res.json()`, `res.status()`, etc.
 */
// Required libraries and dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const helmet = require("helmet");

// Controller imports
const userController = require("./controllers/userController");
const companyController = require("./controllers/companyController");
const projectController = require("./controllers/projectController");
const taskController = require("./controllers/taskController");
const commentController = require("./controllers/commentController");


// Service imports
const comment = require("./service/comment");
const auth = require("./auth/api-auth");
const passport = require("./auth/passport");

// Set up express
const app = express();

// Multer configuration for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Set maximum upload size to 10MB
  },
});

// Set the limit option to a larger value
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// DEV ONLY CORS remove localhost from deployment
// use cors middleware to only allow our front end to use this api
// Enable CORS for all routes
let allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

// Checking if the array has only one item or is null,
// if it is, it will return the first item in the array or a default value
allowedOrigins =
  allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
  })
);

app.use(bodyParser.json());

// Session configuration
app.use(
  session({
    secret: "mysecret", // This should be an environment variable for production
    resave: false,
    saveUninitialized: false,
  })
);

// Serving favicon
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));

// Setting up the port
const PORT = process.env.PORT || 5000;

// Basic test route to ensure server is running
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
// Authentication setup
//auth dependencies
app.use(passport.initialize());
//auth ddependencies end
//passport authenticate skips all middleware after it if auth failed and sends unauthorized message to the client
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
//jwt sample endpoint request,need include bearer jwt token to pass auth utherwise it will return aunautorized to the client
app.get(
  "/api/authed",
  passport.authenticate("jwt", { session: false }),
  auth.handleJWT
);
//auth end
// Completed intergrating new APi wtih Prisma:
// User routes
app.get("/api/users", userController.getUsers);
app.post("/api/users", userController.createUser);
app.put("/api/user/:id", userController.updateUser);
app.delete("/api/user/:id", userController.deleteUser);
app.post("/changepassword", userController.changePassword);
app.get("/api/user/email/:email", userController.getUserByEmail);

// Forgot password route
app.post(
  "/forgotpassword",
  passport.authenticate("magiclink", {
    action: "requestToken",
    failureRedirect: "/login",
  }),
  function (req, res, next) {
    res.redirect("/login");
  }
);

// Email verification route
app.get(
  "/login/email/verify",
  passport.authenticate("magiclink", {
    session: false,
  }),
  async (req, res) => {
    // The user data is now available in req.user, so you can directly access it
    const user = req.user;

    // Check if the user exists
    if (user) {
      // Send the user data in the response as JSON
      res.json({ user });
    } else {
      // User not found or invalid token
      res.status(401).json({ error: "Invalid token or user not found." });
    }
  }
);

// Change password route
const changeUserPassword = require("./service/reset-password");
app.post("/newpassword", async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const updatedUser = await changeUserPassword(userId, newPassword);
    console.log("User's password updated:", updatedUser);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the password." });
  }
});

// Define the function to handle the /newpassword POST request
function handleNewPassword(req, res) {
  // Get the user ID and password from the request body
  const { userId, password } = req.body;

  // Log the data (you can handle the password update logic here)
  // console.log("User ID:", userId);
  // console.log("New Password:", password);

  // Respond with a success message or any other desired response
  res.status(200).json({ message: "Password updated successfully!" });
}

// The Companies API routes:
app.get("/api/companies", companyController.getCompanies);
app.post("/api/companies", companyController.createCompany);
app.put("/api/company/:id", companyController.updateCompany);
app.delete("/api/company/:id", companyController.deleteCompany);

// Projects routes
app.get(
  "/api/projects",
  passport.authenticate("jwt", { session: false }),
  projectController.getProjects
);
app.post("/api/projects", projectController.createProject);
app.put("/api/project/:id", projectController.updateProject);
app.delete("/api/project/:id", projectController.deleteProject);
app.get("/api/project/:id", projectController.getProject);

// Tasks routes
app.get("/api/project/:projectId/tasks", taskController.getTasks);
app.post("/api/project/:projectId/tasks", taskController.createTask);
app.put("/api/project/:projectId/task/:taskId", taskController.updateTask);
app.delete("/api/project/:projectId/task/:taskId", taskController.deleteTask);
app.get("/api/project/:projectId/task/:taskId", taskController.getTask);

// Comment routes
app.get("/api/tasks/:taskId/comments", commentController.getCommentsByTaskId);
app.delete("/api/comments/:commentId", commentController.deleteComment);
app.put("/api/comments/:commentId", commentController.updateComment);

// Contact mail route
const { sendContactEmail } = require("./service/contact-mail");
app.post("/contact", (req, res) => {
  const formData = req.body;

  // Specify the recipient's email address for the contact form submission
  const recipientEmail = process.env.CONTACT_EMAIL; // Replace with the recipient's email address
  // Call the sendContactEmail function with the form data and recipient's email
  sendContactEmail(formData, recipientEmail);

  // Respond to the client
  res.status(200).json({ message: "Form data received successfully." });
});

//upload feature
const { createFileEntry, getFileById } = require("./service/file-feature/file");

app.put(
  "/api/tasks/:taskId/comments/:commentId",
  upload.single("file"), // multer middleware to handle file uploading
  commentController.updateComment
);

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  // Access the file data (bytes) as a Buffer: req.file.buffer
  const fileDataBytes = req.file.buffer;

  // Access the original filename as a string: req.file.originalname
  const filename = req.file.originalname;

  try {
    // Create a new file entry in the database using the createFileEntry function
    const newFile = await createFileEntry(filename, fileDataBytes);

    return res.json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("Error creating file entry:", error);
    return res.status(500).json({ error: "Error uploading the file" });
  }
});
//download

app.get("/download/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    // Fetch the file data from the database by its ID
    const file = await getFileById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Convert the file data (Bytes) from the database to a Buffer
    const fileData = Buffer.from(file.data);

    // Set response headers for file download
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);

    // Send the Buffer data as the response body
    res.send(fileData);
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
//upload feature end

//comment feature

app.post("/api/tasks/:taskId/comments", upload.any(), comment.createComment);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  // console.log(req.url); // Log the requested URL
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
