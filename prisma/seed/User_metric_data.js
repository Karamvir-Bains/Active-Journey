const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createMockEntry(id, max, min, date) {
  // assign random value to entry
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
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

    const metrics = [
      { metric_id: 1 },
      { metric_id: 2 },
      { metric_id: 3 },
      { metric_id: 4 },
      { metric_id: 5 },
      { metric_id: 6 }
    ];

    for (let metric of metrics) {
      if (metric.metric_id === 1) {
        await createMockEntry(1, 2500, 1500, date);
      }

      if (metric.metric_id === 2) {
        await createMockEntry(2, 10, 6, date);
      }

      if (metric.metric_id === 3) {
        await createMockEntry(3, 60, 15, date);
      }

      if (metric.metric_id === 4) {
        await createMockEntry(4, 10, 1, date);
      }

      if (metric.metric_id === 5) {
        await createMockEntry(5, 3, 1, date);
      }

      if (metric.metric_id === 6) {
        await createMockEntry(6, 10, 1, date);
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