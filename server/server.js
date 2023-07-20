const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const userController = require("./controllers/userController");
const companyController = require("./controllers/companyController");
const projectController = require("./controllers/projectController");
const taskController = require("./controllers/taskController");
const activityController = require("./controllers/activityController");

const commentController = require("./controllers/commentController");

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // This sets 'uploads/' as the destination folder for the uploaded files.

const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const helmet = require("helmet");

// Set the limit option to a larger value
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//DEV ONLY CORS remove localhost from deployment
//use cors middleware to only allow our front end to use this api
// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://capdep-1vfm28xyt-azriee.vercel.app",
      "https://capdep.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: true,
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

//auth
//auth dependencies
const auth = require("./auth/api-auth");
const passport = require("./auth/passport");
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
// To the user information:
app.get("/api/users", userController.getUsers);
app.post("/api/users", userController.createUser);
app.put("/api/user/:id", userController.updateUser);
app.delete("/api/user/:id", userController.deleteUser);

// The Companies API routes:
app.get("/api/companies", companyController.getCompanies);
app.post("/api/companies", companyController.createCompany);
app.put("/api/company/:id", companyController.updateCompany);
app.delete("/api/company/:id", companyController.deleteCompany);

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

// app.post('/api/createComments', upload.single('file'), commentController.createComment);

// projects
// app.get("/api/projects",passport.authenticate("jwt", { session: false }), projectController.getProjects);
app.get("/api/projects", projectController.getProjects);
app.post("/api/projects", projectController.createProject);
app.put("/api/project/:id", projectController.updateProject);
app.delete("/api/project/:id", projectController.deleteProject);
app.get("/api/project/:id", projectController.getProject);

app.get("/api/project/:projectId/tasks", taskController.getTasks);
app.post("/api/project/:projectId/tasks", taskController.createTask); // Creating a new task doesn't require a task ID
app.put("/api/project/:projectId/task/:taskId", taskController.updateTask); // Use :taskId instead of :id for clarity
app.delete("/api/project/:projectId/task/:taskId", taskController.deleteTask); // Use :taskId instead of :id for clarity
app.get("/api/project/:projectId/task/:taskId", taskController.getTask); // To get a specific task of a project

// User activity routes
app.get("/api/userActivity", activityController.getUserActivity);
app.post("/api/createUserActivity", activityController.createUserActivity);
app.get(
  "/api/userActivity/:projectId",
  activityController.getUserActivityByProjectId
);

// Comment routes
app.get("/api/comments", commentController.getComments);
app.get("/api/comments/task", commentController.getCommentsByTaskId);
app.post("/api/comments", commentController.createComment);
// app.put(
//   "/api/comments/:id/file",
//   upload.single("file"),
//   commentController.updateComment
// );
app.delete("/api/comments/:id", commentController.deleteComment);
// app.put(
//   "/api/comments/:id",
//   upload.single("file"),
//   commentController.updateComment
// );

//email service
const { sendEmail } = require("./service/mail");

app.get("/api/sendmail", (req, res) => {
  sendEmail();
  const message = "Email attempted.";
  res.json({ message }); // Send the response as JSON
});
//email end

//upload feature
const { createFileEntry, getFileById } = require("./service/file-feature/file");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB in bytes
  },
});

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
    console.error('Error creating file entry:', error);
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
(async () => {
  const result = await prisma.project.findMany();
  // console.log(result);
})();
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
