const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sleep = { id: 2, min: 4, max: 10 };
const energy = { id: 4, min: 3, max: 10 };

async function createCorrelatedEntry(date) {
  let sleepValue = Math.floor(Math.random() * (sleep.max - sleep.min + 1)) + sleep.min;
  let energyValue = 0;

  if (sleepValue >= 7.5 && sleepValue <= 8) {
    energyValue = Math.floor(Math.random() * 2) + 9; // between 9-10

  } else if (sleepValue >= 7 && sleepValue < 7.5) {
    energyValue = Math.floor(Math.random() * 2) + 8; // between 8-9

  } else if (sleepValue > 8 && sleepValue < 9.5) {
    energyValue = Math.floor(Math.random() * 2) + 7; // between 7-8

  } else if (sleepValue >= 9.5) {
    energyValue = Math.floor(Math.random() * 2) + 5; // between 5-6

  } else {
    energyValue = Math.floor(Math.random() * (sleepValue - sleep.min + 1)) + 3; // proportional to sleepValue
    const randomAdjustment = Math.random() < 0.5 ? -1 : 1; // randomly add or subtract 1
    energyValue += randomAdjustment;
  }

  await createUserMetricData(date, sleep.id, sleepValue, 9, 1);
  await createUserMetricData(date, energy.id, energyValue, 9, 1);
}





async function createEntry(id, max, min, date) {
  // generate random value within range of metric
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  await createUserMetricData(date, id, value, 9, 1);
}

async function createUserMetricData(date, metric_id, metric_value, goal_value, user_id) {
  await prisma.User_metric_data.create({
    data: {
      date,
      metric_value,
      goal_value,
      user_id,
      metric_id
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

    // Water
    await createEntry(1, 2000, 1500, date);
    // Exercise
    await createEntry(3, 60, 30, date);
    // Mood
    await createEntry(5, 10, 5, date);
    // Stress
    await createEntry(6, 7, 3, date);
    // Sleep Quality
    await createEntry(7, 10, 5, date);
    // Social Interactions
    await createEntry(8, 10, 1, date);
    // Quality of Nutrition
    await createEntry(9, 9, 1, date);

    createCorrelatedEntry(date);
  }
};

seed()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });