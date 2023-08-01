// activityController.js

const { prisma } = require("../prisma/prisma");

exports.getUserActivityByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;

    const activities = await prisma.activity.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: {
        timestamp: "desc",
      },
      include: {
        user: true,
      },
    });

    if (activities.length === 0) {
      return res.status(404).send({
        message: `No user activities found for project with id: ${projectId}`,
      });
    }

    res.status(200).send(activities);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send({
      error: `Failed to fetch user activities for project with id: ${projectId}, error: ${error.message}`,
    });
  }
};

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
