import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    try {
      const date = req.query.date;
  
      // Start of day 90 days ago in UTC
      const gte = new Date(new Date(date).toISOString().substr(0, 10) + "T00:00:00.000Z");
      gte.setUTCDate(gte.getUTCDate() - 90);
  
      // End of day in UTC
      const lt = new Date(new Date(date).toISOString().substr(0, 10) + "T23:59:59.999Z");
  
      const metrics = await prisma.metric.findMany({
        include: {
          user_metric_data: {
            where: { date: { gte, lt } }
          }
        }
      });
  
      // Sending the metrics as JSON response
      res.status(200).json({ metrics });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  if (req.method === "POST") {
    const userMetricData = req.body;

    const id = userMetricData.userMetricDataId;
    const value = userMetricData.newValue;
  
    try {
      await prisma.user_metric_data.update({
        where: { id },
        data: { metric_value: value }
      });
      
      res.status(201).json({ message: "Metrics updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }
}
