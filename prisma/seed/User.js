const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const layoutConfig = {
  "lg":[
    {"w":8,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":true},
    {"w":4,"h":2,"x":8,"y":0,"i":"calendar","moved":false,"static":true},
    {"w":3,"h":2,"x":3,"y":2,"i":"dailyWater","moved":false,"static":false},
    {"w":3,"h":2,"x":0,"y":2,"i":"activityGoal","moved":false,"static":false},
    {"w":3,"h":2,"x":6,"y":4,"i":"a","moved":false,"static":false},
    {"w":3,"h":2,"x":3,"y":4,"i":"b","moved":false,"static":false},
    {"w":3,"h":2,"x":0,"y":4,"i":"c","moved":false,"static":false},
    {"w":3,"h":2,"x":9,"y":4,"i":"d","moved":false,"static":false},
    {"w":6,"h":2,"x":6,"y":2,"i":"e","moved":false,"static":false}
  ],
  "sm":[
    {"w":6,"h":2,"x":0,"y":0,"i":"overview","moved":false,"static":false},
    {"w":6,"h":2,"x":0,"y":2,"i":"calendar","moved":false,"static":true},
    {"w":3,"h":2,"x":0,"y":4,"i":"dailyWater","moved":false,"static":false},
    {"w":3,"h":2,"x":3,"y":4,"i":"activityGoal","moved":false,"static":false},
    {"w":3,"h":2,"x":0,"y":6,"i":"a","moved":false,"static":false},
    {"w":3,"h":2,"x":3,"y":6,"i":"b","moved":false,"static":false},
    {"w":6,"h":2,"x":0,"y":8,"i":"c","moved":false,"static":false},
    {"w":6,"h":2,"x":0,"y":10,"i":"d","moved":false,"static":false},
    {"w":6,"h":2,"x":0,"y":12,"i":"e","moved":false,"static":false}
  ]};

async function seed() {
  const user = await prisma.User.create({
    data: {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@jane.com',
      password: '12345',
      layout: JSON.stringify(layoutConfig)
    },
  })
}

seed().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect
})


