const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.users.create({
    data: {
      email: 'jane@jane.com',
      first_name: 'Jane',
      last_name: 'Doe',
      password: '12345',
      layout: '{"lg":[{"w":8,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":true},{"w":4,"h":2,"x":8,"y":0,"i":"calendar","moved":false,"static":true},{"w":3,"h":2,"x":3,"y":2,"i":"dailyWater","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":2,"i":"activityGoal","moved":false,"static":false},{"w":3,"h":2,"x":6,"y":4,"i":"a","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":4,"i":"b","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":4,"i":"c","moved":false,"static":false},{"w":3,"h":2,"x":9,"y":4,"i":"d","moved":false,"static":false},{"w":6,"h":2,"x":6,"y":2,"i":"e","moved":false,"static":false}],"sm":[{"w":6,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":2,"i":"calendar","moved":false,"static":true},{"w":3,"h":2,"x":0,"y":4,"i":"dailyWater","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":4,"i":"activityGoal","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":6,"i":"a","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":6,"i":"b","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":8,"i":"c","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":10,"i":"d","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":12,"i":"e","moved":false,"static":false}]}',
    },
  });

  const properties = await prisma.properties.create({
    data: {
      id: 1,
      property: "Input",
    },
  });

  const metrics = await prisma.metrics.create({
    data: {
      id: 1,
      property_id: 1,
      name: "Water",
      unit: "cups",
    },
  });



  const userMetricData = await prisma.user_metric_data.create({
    data: {
      id: 1,
      user_id: 1,
      metric_id: 1,
      date: "2022-03-30T15:23:00.000Z",
      metric_value: 25,
    },
  });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
