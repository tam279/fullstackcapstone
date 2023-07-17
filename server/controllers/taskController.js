// taskController.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\controllers\taskController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all tasks of a project
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

// Create a new task for a project
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

// Update task
exports.updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const { name, description, status, priorityLevel, startDate, endDate, technicians } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,  // Ensure the task ID matches
        projectId,  // Ensure the project ID matches
      },
      data: {
        name,
        description,
        status,
        priorityLevel,
        startDate,
        endDate,
        technicians: {
          connect: technicians.map((techId) => ({
            id: techId,
          })),
        },
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  }
};

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

exports.getTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const task = await prisma.task.findFirst({
      where: { 
        id: taskId,
        projectId,
        deleted: false,
      },
      include: { technicians: true }
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
