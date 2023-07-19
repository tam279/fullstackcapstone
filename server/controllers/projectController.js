// projectController.js

const mysql = require("mysql2/promise");
const db = require("../db/database");

// getProjects will get name, startDate,endDate, company, technicians, viewers, manager, tasks
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        name: true,
        startDate: true,
        endDate: true,
        company: {
          select: {
            name: true,
          },
        },
        technicians: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        viewers: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        manager: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        tasks: {
          select: {
            name: true,
            description: true,
            status: true,
            priorityLevel: true,
            startDate: true,
            endDate: true,
            technicians: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            comments: {
              select: {
                comment: true,
                timeStamp: true,
                User: {
                  // Changed from 'user' to 'User'
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching projects" });
  }
};

// CreateProject need name, startDate, endDate, deleted, manager, technicians, viewer, description, company
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      startDate,
      endDate,
      manager,
      technicians,
      viewer,
      description,
      company,
    } = req.body;
    const newProject = await prisma.project.create({
      data: {
        name,
        startDate,
        endDate,
        manager: { connect: { id: manager } },
        technicians: { connect: technicians.map((tech) => ({ id: tech })) },
        viewers: { connect: { id: viewer } },
        description,
        company: { connect: { id: company } },
        deleted: false,
      },
    });
    res.status(200).json(newProject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the project" });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  const id = req.params.id; // make sure to get the id from the params

  const {
    name,
    startDate,
    endDate,
    manager,
    technicians,
    viewer,
    description,
    company,
  } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: id, 
      },
      data: {
        name,
        startDate,
        endDate,
        manager: {
          connect: {
            id: manager,
          },
        },
        technicians: {
          set: technicians.map((techId) => ({
            id: techId,
          })),
        },
        viewers: {
          connect: {
            id: viewer,
          },
        },
        description,
        company: {
          connect: {
            id: company,
          },
        },
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the project" });
  }
};

// Delete (soft delete) Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await prisma.project.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
    res.status(200).json({ message: "Project successfully deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project" });
  }
};

// Get a specific Project
exports.getProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        name: true,
        startDate: true,
        endDate: true,
        company: {
          select: {
            name: true,
          },
        },
        technicians: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        viewers: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        manager: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        tasks: {
          select: {
            name: true,
            description: true,
            status: true,
            priorityLevel: true,
            startDate: true,
            endDate: true,
            technicians: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            comments: {
              select: {
                comment: true,
                timeStamp: true,
                User: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: "No project found with the provided ID" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the project" });
  }
};
