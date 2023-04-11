const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  const metrics = [
    {
      name: "Water",
      property: "input",
      unit: "mL",
    },{
      name: "Sleep",
      property: "input",
      unit: "hr",
    },{
      name: "Exercise",
      property: "input",
      unit: "mins",
    },{
      name: "Energy",
      property: "scale",
    },{
      name: "Mood",
      unit: "scale"
    },{
      name: "Stress",
      unit: "scale"
    },{
      name: "Sleep Quality",
      unit: "scale"
    }]

  for (let metric of metrics) {
    await prisma.Metric.create({
      data: {
        name: metric.name,
        property: metric.property,
        unit: metric.unit || "",
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