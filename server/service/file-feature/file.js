/**
 * This JavaScript code exports three functions for creating, fetching, and fetching all file entries
 * from a database using Prisma.
 * @param name - The name of the file entry that you want to create. It is a string value.
 * @param data - The `data` parameter in the `createFileEntry` function represents the content or data
 * of the file that you want to create. It can be any type of data, such as a string, JSON object, or
 * binary data.
 * @returns The module exports an object with three functions: `createFileEntry`, `getFileById`, and
 * `getAllFiles`.
 */
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
