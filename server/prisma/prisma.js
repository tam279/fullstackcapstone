const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testdb() {
  console.log(await prisma.uSER.findMany());
}

module.exports = { prisma, testdb };
