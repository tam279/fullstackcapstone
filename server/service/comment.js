/**
 * The above JavaScript code defines a function called `createComment` that creates a comment with
 * associated files in a database using Prisma ORM.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
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
