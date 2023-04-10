const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {

  const metrics = [
    {
      name: "Water",
      unit: "mL"
    },
    {
      name: "Sleep",
      unit: "hr"
    },
    {
      name: "Exercise",
      unit: "mins"
    },
    {
      name: "Energy",
      unit: "scale"
    },
    {
      name: "Mood",
      unit: "scale"
    },
    {
      name: "Stress",
      unit: "scale"
    }]

  for (let metric of metrics) {

    await prisma.Metric.create({
      data: {
        name: metric.name,
        unit: metric.unit
      },
    });
  }
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });