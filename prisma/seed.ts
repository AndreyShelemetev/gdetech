import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "andrey.shelemetev@gmail.com").toLowerCase().trim();

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "admin", status: "active" },
    create: {
      email: adminEmail,
      displayName: "Admin",
      role: "admin",
      status: "active",
    },
  });

  await prisma.authIdentity.upsert({
    where: {
      provider_providerUserId: {
        provider: "email",
        providerUserId: adminEmail,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      provider: "email",
      providerUserId: adminEmail,
      email: adminEmail,
    },
  });

  console.log(`Seeded admin user: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
