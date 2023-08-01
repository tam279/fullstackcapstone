const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// async function testdb() {
//   console.log(
//     await prisma.user.findMany({
//       include: {
//         PROJECT_MANAGER_BRIDGE: true,
//         PROJECT_TECHNICIAN_BRIDGE: true,
//         VIEWER_BRIDGE: true,
//       },
//     })
//   );
// }

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
  // console.log(users);
}

getUsers();

// module.exports = { prisma, testdb };
module.exports = prisma;
