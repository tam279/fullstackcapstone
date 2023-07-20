const { prisma } = require("../../prisma/prisma");

async function createFileEntry(name, data) {
  try {
    const newFile = await prisma.file.create({
      data: {
        name,
        data,
      },
    });

    return newFile;
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error creating file entry:", error);
    throw error;
  }
}

async function getFileById(fileId) {
  try {
    const file = await prisma.file.findFirst({
      where: { id: fileId },
    });

    return file;
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error fetching file by ID:", error);
    throw error;
  }
}

async function getAllFiles() {
  try {
    const files = await prisma.file.findMany();
    return files;
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error fetching all files:", error);
    throw error;
  }
}

module.exports = { createFileEntry, getFileById, getAllFiles };
