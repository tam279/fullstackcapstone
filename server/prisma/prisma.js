const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      company: {
        select: { name: true },
      },
      role: true,
      phoneNumber: true,
      jobTitle: true,
      deleted: true,
    },
  });

  return users; // You probably want to return the users here
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = { prisma, getUsers };
