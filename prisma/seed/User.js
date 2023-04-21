const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const layoutConfig = {
  lg: [
    { w: 8, h: 2, x: 0, y: 0, i: 'overview', moved: false, static: false },
    { w: 4, h: 2, x: 8, y: 0, i: 'calendar', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 2, i: 'dailyWater', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 2, i: 'activityGoal', moved: false, static: false },
    { w: 3, h: 2, x: 6, y: 2, i: 'stress', moved: false, static: false },
    { w: 3, h: 2, x: 9, y: 2, i: 'mood', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 4, i: 'sleep', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 4, i: 'social', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 6, i: 'alcohol', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 6, i: 'nutrition', moved: false, static: false }
  ],
  sm: [
    { w: 1, h: 2, x: 0, y: 2, i: 'overview', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 0, i: 'calendar', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 4, i: 'dailyWater', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 6, i: 'activityGoal', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 8, i: 'stress', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 10, i: 'mood', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 12, i: 'sleep', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 14, i: 'social', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 16, i: 'alcohol', moved: false, static: false },
    { w: 1, h: 3, x: 0, y: 18, i: 'nutrition', moved: false, static: false }
  ],
  xl: [
    { w: 8, h: 2, x: 0, y: 0, i: 'overview', moved: false, static: false },
    { w: 4, h: 2, x: 8, y: 0, i: 'calendar', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 2, i: 'dailyWater', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 2, i: 'activityGoal', moved: false, static: false },
    { w: 3, h: 2, x: 6, y: 2, i: 'stress', moved: false, static: false },
    { w: 3, h: 2, x: 9, y: 2, i: 'mood', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 4, i: 'sleep', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 4, i: 'social', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 6, i: 'alcohol', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 6, i: 'nutrition', moved: false, static: false }
  ],
  md: [
    { w: 6, h: 2, x: 0, y: 0, i: 'overview', moved: false, static: false },
    { w: 4, h: 2, x: 2, y: 2, i: 'calendar', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 4, i: 'dailyWater', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 4, i: 'activityGoal', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 6, i: 'stress', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 6, i: 'mood', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 8, i: 'sleep', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 10, i: 'social', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 12, i: 'alcohol', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 14, i: 'nutrition', moved: false, static: false }
  ]
}

async function seed () {
  const users = [
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@jane.com',
      password: '12345',
      layout: JSON.stringify(layoutConfig),
      dark_mode: 'light',
      background: null
    },
    {
      first_name: 'Bluey',
      last_name: 'Heeler',
      email: 'bluey@heeler.aus',
      password: '54321',
      layout: JSON.stringify(layoutConfig),
      dark_mode: 'light',
      background: null
    }
  ]

  for (let user of users) {
    await prisma.User.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        layout: user.layout
      }
    })
  }
}

seed()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect
  })
