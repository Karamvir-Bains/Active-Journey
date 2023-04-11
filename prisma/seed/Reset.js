const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
  await prisma.User.deleteMany({});
  await prisma.Metric.deleteMany({});
  await prisma.User_metric_data.deleteMany({});  
}

reset().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect;
});