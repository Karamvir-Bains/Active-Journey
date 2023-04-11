const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createMetric(id, rangeVals, date) {
  const value = Math.floor(Math.random() * (rangeVals[0] + rangeVals[1] - rangeVals[2])) + 1500;
  await prisma.User_metric_data.create({
    data: {
      date,
      metric_value: value,
      user_id: 1,
      metric_id: id
    },
  });
}

async function seed() {

  for (let i = 0; i < 365; i++) {
    const date = new Date(new Date().getFullYear(), 0, i + 1);
    //const dayOfMonth = date.getDate();
    //const metric_value = Math.floor(Math.random() * 1000) + 1;
    //print out each date
    const metrics = [
      { metric_id: 1 },
      { metric_id: 2 },
      { metric_id: 3 },
      { metric_id: 4 },
      { metric_id: 5 },
      { metric_id: 6 }
    ];

    for (let metric of metrics) {
      //print out fake data for each metric  

      if (metric.metric_id === 1) {
        await createMetric(1, [2500, 1500, 1], date);
      }

      if (metric.metric_id === 2) {
        await createMetric(2, [10, 6, 1], date);
      }

      if (metric.metric_id === 3) {
        await createMetric(3, [60, 15, 1], date);
      }

      if (metric.metric_id === 4) {
        await createMetric(4, [10, 1, 1], date);
      }

      if (metric.metric_id === 5) {
        await createMetric(5, [3, 1, 1], date);
      }

      if (metric.metric_id === 6) {
        await createMetric(6, [10, 1, 1], date);
      }

    }
  }
};

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });