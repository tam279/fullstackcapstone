/**
 * This JavaScript code exports a Prisma Client instance and a function to fetch user details from a
 * database.
 * @returns The `getUsers` function returns an array of user objects with selected fields. The selected
 * fields include `email`, `firstName`, `lastName`, `company` (including the `name` field), `role`,
 * `phoneNumber`, `jobTitle`, and `deleted` status.
 */
// Importing the Prisma Client to interact with the database.
const { PrismaClient } = require("@prisma/client");

// Initializing the Prisma Client.
const prisma = new PrismaClient();

// Function to get user details.
async function getUsers() {
  // Fetching users from the database with selected fields.
  const users = await prisma.user.findMany({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      // Including related company's name.
      company: {
        select: { name: true },
      },
      role: true,
      phoneNumber: true,
      jobTitle: true,
      deleted: true,
    },
  });

  // Return the fetched users.
  return users;
}
// Handling the SIGINT signal (e.g. Ctrl+C) for graceful shutdown.
process.on("SIGINT", async () => {
  // Disconnecting the Prisma Client before shutting down.
  await prisma.$disconnect();
  // Exit the process with a status code of 0 (success).
  process.exit(0);
});

// Handling the SIGTERM signal for graceful shutdown (e.g. termination by system).
process.on("SIGTERM", async () => {
  // Disconnecting the Prisma Client before shutting down.
  await prisma.$disconnect();
  // Exit the process with a status code of 0 (success).
  process.exit(0);
});

// Exporting the Prisma instance and getUsers function for use in other modules.
module.exports = { prisma, getUsers };
