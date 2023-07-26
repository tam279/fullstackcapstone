const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Set up cascading deletes for comments referenced by files
  await prisma.$executeRaw(
    'ALTER TABLE "File" ADD CONSTRAINT "file_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE'
  );

  await prisma.$executeRaw('DELETE FROM "File"');
  await prisma.$executeRaw('DELETE FROM "Comment"');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
