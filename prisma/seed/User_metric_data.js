const prisma = new PrismaClient();

async function createMockEntry(id, max, min, date) {
  // generate random value within range of metric
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  await prisma.User_metric_data.create({
    data: {
      date,
      metric_value: value,
      goal_value: 9,
      user_id: 1,
      metric_id: id
    },
  });
}

// Get the current date and time in the local timezone
const today = new Date();

// Adjust the date to the UTC timezone
const utcTimestamp = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

async function seed() {
  for (let i = 180; i >= 0; i--) {
    // Add the number of days to the UTC timestamp
    const date = new Date(utcTimestamp.getTime() - i * 24 * 60 * 60 * 1000);

    const metrics = [
      { metric_id: 1 },
      { metric_id: 2 },
      { metric_id: 3 },
      { metric_id: 4 },
      { metric_id: 5 },
      { metric_id: 6 },
      { metric_id: 7 }
    ];

    for (let metric of metrics) {
      if (metric.metric_id === 1) {
        await createMockEntry(1, 2000, 1500, date);
      }

      if (metric.metric_id === 2) {
        await createMockEntry(2, 9, 7, date);
      }

      if (metric.metric_id === 3) {
        await createMockEntry(3, 60, 30, date);
      }

      if (metric.metric_id === 4) {
        await createMockEntry(4, 10, 5, date);
      }

      if (metric.metric_id === 5) {
        await createMockEntry(5, 10, 5, date);
      }

      if (metric.metric_id === 6) {
        await createMockEntry(6, 7, 3, date);
      }

      if (metric.metric_id === 7) {
        await createMockEntry(7, 10, 5, date);
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