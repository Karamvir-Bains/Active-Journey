const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  const metrics = [
    {
      name: "Cups of water",
      property: "input",
      unit: "cups",
      journal_order: 4,
    },{
      name: "Sleep",
      property: "input",
      unit: "hours",
      journal_order: 2,
    },{
      name: "Exercise",
      property: "input",
      unit: "mins",
      journal_order: 1,
    },{
      name: "Energy",
      property: "scale",
      journal_order: 7,
    },{
      name: "Mood",
      property: "scale",
      journal_order: 6,
    },{
      name: "Stress",
      property: "scale",
      journal_order: 5,
    },{
      name: "Sleep Quality",
      property: "scale",
      journal_order: 3,
    },
    {
      name: "Social Interactions",
      property: "scale",
      journal_order: 10,
    }, {
      name: "Quality of Nutrition",
      property: "scale",
      journal_order: 8,
    },
    {
      name: "Alcohol Consumption",
      property: "input",
      unit: "drinks",
      journal_order: 9,
    }
  ];

  for (let metric of metrics) {
    await prisma.Metric.create({
      data: {
        name: metric.name,
        property: metric.property,
        unit: metric.unit || "",
        journal_order: metric.journal_order,
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