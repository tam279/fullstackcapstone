// companyController.js

const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const db = require("../db/database");

// getUsers will get email, firstname, lastname, company,role, phoneNumber, jobTitle, deleted
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserActivity = async (req, res) => {
  try {
    const activities = await prisma.activityLog.findMany({
      orderBy: {
        timestamp: "desc",
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUserActivity = async (req, res) => {
  try {
    const { userId, description, projectId } = req.body;
    const newActivity = await prisma.activityLog.create({
      data: {
        description,
        userId,
        projectId,
      },
    });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserActivityByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;

    const activities = await prisma.activityLog.findMany({
      where: {
        projectId: parseInt(projectId),
      },
      orderBy: {
        timestamp: "desc",
      },
      include: {
        user: true,
      },
    });

    if (activities.length === 0) {
      return res
        .status(404)
        .send({ message: "No user activities found for this project" });
    }

    res.status(200).send(activities);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send({ error: error.message });
  }
};
