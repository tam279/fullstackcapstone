/**
 * The above JavaScript code exports a function that changes a user's password by hashing the new
 * password and updating it in the database using Prisma.
 * @param userId - The ID of the user whose password needs to be changed.
 * @param newPassword - The `newPassword` parameter is the new password that you want to set for the
 * user.
 * @returns The function `changeUserPassword` returns the updated user object after changing the
 * password.
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function changeUserPassword(userId, newPassword) {
  try {
    // Find the user by their ID
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }
    // Hash the new password with salt 10
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);

    // Update the user's password
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }, // Store the hashed password in the database
    });

    return updatedUser;
  } catch (error) {
    // Handle errors if any
    console.error("Error changing user password:", error.message);
    throw error;
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
}

module.exports = changeUserPassword;
