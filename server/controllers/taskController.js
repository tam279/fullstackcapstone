/* The code provided is a JavaScript file that contains the controller functions for managing tasks in
a project management website. */
// taskController.js .

const { prisma } = require("../prisma/prisma");

/* The `exports.getTasks` function is a controller function that retrieves all tasks of a project from
the database. */
exports.getTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId, deleted: false },
      include: { technicians: true },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving tasks" });
  }
};

/* The `exports.createTask` function is a controller function that is responsible for creating a new
task for a project in the database. */
exports.createTask = async (req, res) => {
  const { projectId } = req.params;
  const {
    name,
    description,
    status,
    priorityLevel,
    startDate,
    endDate,
    technicians,
    dependencies, // Extract the dependencies from req.body
  } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        name,
        description,
        status,
        priorityLevel,
        startDate,
        endDate,
        projectId,
        dependencies, // Add this line to include dependencies when creating a new task
        technicians: {
          connect: technicians.map((techId) => ({
            id: techId,
          })),
        },
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the task" });
  }
};

/* The `exports.updateTask` function is a controller function that is responsible for updating a
specific task in the database. */
exports.updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const {
    name,
    description,
    status,
    priorityLevel,
    startDate,
    endDate,
    technicians,
    dependencies, // Include the dependencies from req.body
  } = req.body;

  try {
    let updatedTaskData = {
      name,
      description,
      status,
      priorityLevel,
      startDate,
      endDate,
      dependencies, // Add this line to include dependencies in the data that will be updated
    };

    if (technicians) {
      updatedTaskData["technicians"] = {
        connect: technicians.map((techId) => ({
          id: techId,
        })),
      };
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        projectId,
      },
      data: updatedTaskData,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  }
};

/* The `exports.deleteTask` function is a controller function that is responsible for deleting a
specific task from the database. It takes in the `req` (request) and `res` (response) objects as
parameters. */
exports.deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    // Mark the task as deleted
    await prisma.task.update({
      where: {
        id: taskId,
        projectId,
      },
      data: { deleted: true },
    });

    res.status(200).send({ message: "Task marked as deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};

/* The `exports.getTask` function is a controller function that is responsible for retrieving a
specific task from the database. It takes in the `req` (request) and `res` (response) objects as
parameters. */
exports.getTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        projectId,
        deleted: false,
      },
      include: { technicians: true },
    });

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};
