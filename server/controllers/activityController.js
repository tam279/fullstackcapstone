// activityController.js

const { prisma } = require("../prisma/prisma");

// Get user activity for a specific project
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
        project: true,
      },
    });

    if (activities.length === 0) {
      return res.status(404).json({
        message: `No user activities found for project with id: ${projectId}`,
      });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      error: `Failed to fetch user activities for project with id: ${projectId}, error: ${error.message}`,
    });
  }
};


// Create a new user activity
exports.createUserActivity = async (req, res) => {
  try {
    const { userId, activity, projectId } = req.body;
    const newActivity = await prisma.activity.create({
      data: {
        activity,
        userId,
        projectId,
      },
    });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
