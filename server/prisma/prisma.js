const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testdb() {
  console.log(
    await prisma.uSER.findMany({
      include: {
        PROJECT_MANAGER_BRIDGE: true,
        PROJECT_TECHNICIAN_BRIDGE: true,
        VIEWER_BRIDGE: true,
      },
    })
  );
}

module.exports = { prisma, testdb };
