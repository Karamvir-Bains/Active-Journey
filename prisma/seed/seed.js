const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
  await prisma.User.deleteMany({});
  await prisma.User_metric_data.deleteMany({});
  await prisma.Metric.deleteMany({});
}

reset().catch(e => {

  console.log(e);
  process.exit(1);

}).finally(() => {

  prisma.$disconnect;

});

async function seed() {
  const users = [
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@jane.com',
      password: '12345',
      layout: '{"lg":[{"w":8,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":true},{"w":4,"h":2,"x":8,"y":0,"i":"calendar","moved":false,"static":true},{"w":3,"h":2,"x":3,"y":2,"i":"dailyWater","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":2,"i":"activityGoal","moved":false,"static":false},{"w":3,"h":2,"x":6,"y":4,"i":"a","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":4,"i":"b","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":4,"i":"c","moved":false,"static":false},{"w":3,"h":2,"x":9,"y":4,"i":"d","moved":false,"static":false},{"w":6,"h":2,"x":6,"y":2,"i":"e","moved":false,"static":false}],"sm":[{"w":6,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":2,"i":"calendar","moved":false,"static":true},{"w":3,"h":2,"x":0,"y":4,"i":"dailyWater","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":4,"i":"activityGoal","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":6,"i":"a","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":6,"i":"b","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":8,"i":"c","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":10,"i":"d","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":12,"i":"e","moved":false,"static":false}]}'
    }, 
    {
      first_name: 'Bluey',
      last_name: 'Heeler',
      email: 'bluey@heeler.aus',
      password: '54321',
      layout: '{"lg":[{"w":8,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":true},{"w":4,"h":2,"x":8,"y":0,"i":"calendar","moved":false,"static":true},{"w":3,"h":2,"x":3,"y":2,"i":"dailyWater","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":2,"i":"activityGoal","moved":false,"static":false},{"w":3,"h":2,"x":6,"y":4,"i":"a","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":4,"i":"b","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":4,"i":"c","moved":false,"static":false},{"w":3,"h":2,"x":9,"y":4,"i":"d","moved":false,"static":false},{"w":6,"h":2,"x":6,"y":2,"i":"e","moved":false,"static":false}],"sm":[{"w":6,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":2,"i":"calendar","moved":false,"static":true},{"w":3,"h":2,"x":0,"y":4,"i":"dailyWater","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":4,"i":"activityGoal","moved":false,"static":false},{"w":3,"h":2,"x":0,"y":6,"i":"a","moved":false,"static":false},{"w":3,"h":2,"x":3,"y":6,"i":"b","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":8,"i":"c","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":10,"i":"d","moved":false,"static":false},{"w":6,"h":2,"x":0,"y":12,"i":"e","moved":false,"static":false}]}'
    }
  ];
  
  for (let user of users) {
    await prisma.User.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        layout: user.layout
      },
    });
  }


/**
 * MEtrics
 */

  const metrics = [
    {
      name: "Water",
      property: "input",
      unit: "mL",
    },
    {
      name: "Sleep",
      property: "input",
      unit: "hr",
    },
    {
      name: "Exercise",
      property: "input",
      unit: "mins",
    },
    {
      name: "Energy",
      property: "scale",
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

  // END SEEDS

  for (let i = 0; i < 365; i++) {
    const date = new Date(new Date().getFullYear(), 0, i + 1);
    const metrics = [
      { metric_id: 1 },
      { metric_id: 2 },
      { metric_id: 3 },
      { metric_id: 4 }
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

    }
  }
}

seed().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect
})


