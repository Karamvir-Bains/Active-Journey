const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  const metrics = [
    {
      name: "water-cups",
      title: "Cups of water",
      property: "input",
      unit: "cups",
      journal_order: 4,
    },{
      name: "sleep-hours",
      title: "Sleep",
      property: "input",
      unit: "hours",
      journal_order: 2,
    },{
      name: "activity",
      title: "Exercise",
      property: "input",
      unit: "mins",
      journal_order: 1,
    },{
      name: "energy",
      title: "Energy",
      property: "scale",
      journal_order: 7,
    },{
      name: "mood",
      title: "Mood",
      property: "scale",
      journal_order: 6,
    },{
      name: "stress",
      title: "Stress",
      property: "scale",
      journal_order: 5,
    },{
      name: "sleep-quality",
      title: "Sleep Quality",
      property: "scale",
      journal_order: 3,
    },{
      name: "social",
      title: "Social Interactions",
      property: "scale",
      journal_order: 10,
    },{
      name: "nutrition",
      title: "Quality of Nutrition",
      property: "scale",
      journal_order: 8,
    },{
      name: "alcohol-drinks",
      title: "Alcohol Consumption",
      property: "input",
      unit: "drinks",
      journal_order: 9,
    }
  ];

  for (let metric of metrics) {
    await prisma.Metric.create({
      data: {
        name: metric.name,
        title: metric.title,
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