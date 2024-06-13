const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function hashPasswords() {
  // Fetch all users
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Hash the current plaintext password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Update the user with the hashed password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  console.log("Passwords hashed successfully.");
}

hashPasswords()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
