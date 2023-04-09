const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
      { metric_id: 5 }
    ];

    for (let metric of metrics) {
      //print out fake data for each metric  

      if (metric.metric_id === 1) {
        const water_value = Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500;
        await prisma.User_metric_data.create({
          data: {
            date,
            metric_value: water_value,
            user_id: 1,
            metric_id: 1
          },
        });
      }

      if (metric.metric_id === 2) {
        const sleep_value = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        await prisma.User_metric_data.create({
          data: {
            date,
            metric_value: sleep_value,
            user_id: 1,
            metric_id: 2
          },
        });
      }

      if (metric.metric_id === 3) {
        const exercise_value = Math.floor(Math.random() * (60 - 15 + 1)) + 15;
        await prisma.User_metric_data.create({
          data: {
            date,
            metric_value: exercise_value,
            user_id: 1,
            metric_id: 3
          },
        });
      }

      if (metric.metric_id === 4) {
        const energy_value = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        await prisma.User_metric_data.create({
          data: {
            date,
            metric_value: energy_value,
            user_id: 1,
            metric_id: 4
          },
        });
      }

      if (metric.metric_id === 5) {
        const mood_value = Math.floor(Math.random() * (3)) + 1;
        await prisma.User_metric_data.create({
          data: {
            date,
            metric_value: mood_value,
            user_id: 1,
            metric_id: 5
          },
        });
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