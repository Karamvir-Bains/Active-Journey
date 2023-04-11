import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    try {
      const date = req.query.date;
  
      // Start of day
      const gte = new Date(date);
      gte.setUTCHours(0, 0, 0, 0);
  
      // End of day
      const lt = new Date(date);
      lt.setUTCHours(23, 59, 59, 999);
  
      // Fetching metrics from the database that have user metric data within the specified date range
      const metrics = await prisma.metric.findMany({
        include: {
          user_metric_data: {
            where: { date: { gte,lt } }
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
    const metrics = req.body;
  
    async function updateMetrics(id, value) {
      const updateMetric = await prisma.user_metric_data.update({
        where: { id },
        data: { metric_value: value }
      });
    }
  
    try {
      for (const metric of metrics) {
        const id = metric.user_metric_data[0].id;
        const value = metric.user_metric_data[0].metric_value;
        await updateMetrics(id, value);
      }
      res.status(201).json({ message: "Metrics updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }
  
}
