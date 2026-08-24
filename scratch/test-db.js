const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Testing SQLite database tables...");

  // Test Customer
  const customer = await prisma.customer.create({
    data: {
      name: "Test User",
      phone: "9876543210",
      email: "test@example.com",
    },
  });
  console.log("Created Customer:", customer);

  // Test Package
  const pkg = await prisma.package.upsert({
    where: { id: "fundamental" },
    update: { name: "Fundamental", price: 50000 },
    create: { id: "fundamental", name: "Fundamental", price: 50000 },
  });
  console.log("Upserted Package:", pkg);

  // Test Order
  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      packageId: pkg.id,
      status: "interested",
      amount: 59000,
    },
  });
  console.log("Created Order:", order);

  // Verify counts
  const customers = await prisma.customer.findMany();
  const packages = await prisma.package.findMany();
  const orders = await prisma.order.findMany();

  console.log("\n--- Database Verification ---");
  console.log("Customers count:", customers.length);
  console.log("Packages count:", packages.length);
  console.log("Orders count:", orders.length);
  console.log("Latest Order:", orders[orders.length - 1]);

  // Cleanup test order & customer
  await prisma.order.delete({ where: { id: order.id } });
  await prisma.customer.delete({ where: { id: customer.id } });
  console.log("\nCleanup successful!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
