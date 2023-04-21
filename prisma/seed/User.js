const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const layoutConfig = {
  lg: [
    { i: "overview", x: 0, y: 0, w: 8, h: 2, static: true},
    { i: "calendar", x: 9, y: 0, w: 4, h: 2, static: true},
    { i: "dailyWater", x: 0, y: 0, w: 3, h: 2, static: false},
    { i: "activityGoal", x: 3, y: 7, w: 3, h: 2, static: false},
    { i: "stress", x: 6, y: 7, w: 3, h: 2, static: false},
    { i: "mood", x: 9, y: 7, w: 3, h: 2, static: false},
    { i: "sleep", x: 0, y: 9, w: 3, h: 2, static: false},
    { i: "social", x: 3, y: 9, w: 3, h: 2, static: false},
    { i: "alcohol", x: 6, y: 9, w: 6, h: 2, static: false},
    { i: "nutrition", x: 0,  y: 11, w: 6, h: 2, static: false}
  ],
  sm: [
    { i: "calendar", x: 0, y: 0, w: 6, h: 2, static: true},
    { i: "overview", x: 3, y: 0, w: 6, h: 2, static: true},
    { i: "dailyWater", x: 0, y: 0, w: 3, h: 2, static: false},
    { i: "activityGoal", x: 4, y: 0, w: 3, h: 2, static: false},
    { i: "stress", x: 0, y: 0, w: 3, h: 2, static: false},
    { i: "mood", x: 3, y: 0, w: 3, h: 2, static: false},
    { i: "sleep", x: 0, y: 0, w: 6, h: 2, static: false},
    { i: "social", x: 3, y: 0, w: 6, h: 2, static: false},
    { i: "alcohol", x: 0, y: 0, w: 6, h: 2, static: false},
    { i: "nutrition", x: 0,  y: 0, w: 12, h: 3, static: false}
  ]
}

async function seed() {
  const users = [
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@jane.com',
      password: '12345',
      layout: JSON.stringify(layoutConfig),
      dark_mode: 'light',
      background: null,
    }, {
      first_name: 'Bluey',
      last_name: 'Heeler',
      email: 'bluey@heeler.aus',
      password: '54321',
      layout: JSON.stringify(layoutConfig),
      dark_mode: 'light',
      background: null,
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
}

seed()
  .catch(e => {
    console.log(e);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect();
  });