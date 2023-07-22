const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCommentsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Get tasks of the project
    const tasks = await prisma.task.findMany({
      where: { projectId: projectId, deleted: false },
    });

    // Get comments for each task
    const commentsPromises = tasks.map((task) =>
      prisma.comment.findMany({
        where: { taskId: task.id, deleted: false },
        include: { User: true, files: true }, // Note the 'User' field is capitalized as per your schema
      })
    );

    const comments = await Promise.all(commentsPromises);

    // Flatten the comments array
    const flattenedComments = comments.flat();

    res.status(200).json(flattenedComments);
  } catch (err) {
    console.error(`Error getting comments for project ${projectId}: `, err);
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
