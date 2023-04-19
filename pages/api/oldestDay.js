import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const id = 1;
  try {
    const oldestData = await prisma.user_metric_data.findMany({
      where: { id }
    });
    
    res.status(201).json({ date: oldestData[0].date});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}