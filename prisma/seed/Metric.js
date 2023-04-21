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
      property: "scale",
    },{
      name: "Stress",
      property: "scale",
    },{
      name: "Sleep Quality",
      property: "scale",
    },
    {
      name: "Social Interactions",
      property: "scale"
    }, {
      name: "Quality of Nutrition",
      property: "scale"
    }
  ];

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
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });