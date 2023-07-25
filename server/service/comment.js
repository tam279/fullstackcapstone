const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createComment(req, res) {
  const taskId = req.params.taskId;
  const { comment: commentText, userId } = req.body;
  const filesData = [];
  // Store the files data
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      filesData.push({
        name: file.originalname,
        data: file.buffer,
      });
    }
  }
  // Your comment creation logic here...
  try {
    const comment = await prisma.comment.create({
      data: {
        comment: commentText,
        taskId: taskId,
        userId: userId,
        files: {
          create: filesData.map((fileData) => ({
            name: fileData.name,
            data: fileData.data,
          })),
        },
        timeStamp: new Date(), // Use the current timestamp
      },
    });
    console.log("Comment created:", comment);

    // You can handle the received data here and send a response if needed
    res.json({ message: "Received data successfully!" });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment" });
  }
}

module.exports = {
  createComment,
};
