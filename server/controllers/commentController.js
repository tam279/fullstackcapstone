const { prisma } = require("../prisma/prisma");

/* The `exports.getCommentsByTaskId` function is a controller function that handles the logic for
retrieving comments for a specific task. */
exports.getCommentsByTaskId = async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(400).send({ message: "TaskId is required" });
  }
  try {
    // Check if taskId is not null
    if (taskId !== null) {
      // Get comments of the task
      const comments = await prisma.comment.findMany({
        where: { taskId: taskId, deleted: false },
        include: {
          User: true,
          files: {
            select: {
              id: true,
              name: true,
              taskId: true,
              commentId: true,
              deleted: true,
            },
          },
        },
      });

      res.status(200).json(comments);
    } else {
      // Handle case where taskId is null
      // ...
    }
  } catch (err) {
    console.error(`Error getting comments for task ${taskId}: `, err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};

exports.createComment = async (req, res) => {
  const { comment, taskId, userId } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: comment,
        taskId: taskId,
        userId: userId,
        timeStamp: new Date(), // Automatically set the timestamp to the current date and time
        files: {
          create: req.file
            ? [
                {
                  name: req.file.originalname,
                  data: fs.readFileSync(req.file.path),
                  deleted: false,
                },
              ]
            : [],
        },
      },
    });

    // Remove the file from disk
    if (req.file) fs.unlinkSync(req.file.path);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: id },
      data: {
        comment: comment,
        files: req.file
          ? {
              create: {
                name: req.file.originalname,
                data: fs.readFileSync(req.file.path),
                deleted: false,
              },
            }
          : undefined,
      },
    });

    // Remove the file from disk
    if (req.file) fs.unlinkSync(req.file.path);

    res.status(200).json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await prisma.comment.update({
      where: { id: id },
      data: { deleted: true }, // Instead of deleting, we mark it as deleted
    });
    res.status(200).json(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};
