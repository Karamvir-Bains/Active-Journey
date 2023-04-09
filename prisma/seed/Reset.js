const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {

  await prisma.User.deleteMany({});
  await prisma.User_metric_data.deleteMany({});
  await prisma.Metric.deleteMany({}); 

}


reset().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect;
});