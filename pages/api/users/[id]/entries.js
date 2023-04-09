// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../lib/prisma'
import { format } from 'date-fns';

export default async function handler(req, res) {
  if (req.method === 'PUT' || req.method === 'POST') {
    const id = Number(req.query.id);
    const today = new Date();
    const days = await prisma.User_metric_data.groupBy({
      by: ['date'],
      where: {
        user_id: id,
      }
    })
    const entries = await prisma.User_metric_data.findMany({
      where: {
        user_id: id,
        date: {
          lte: new Date(),
          gte: new Date(new Date().setDate(today.getDate() - (30 * 12)))
        }
      },
      include: {
        metrics: true,
      },
      orderBy: {
        date: "desc",
      }
    });

    const newObj = {};

    for (let day of Object.keys(days)) {
      const getDate = days[day]['date'];
      const formatDate = format(getDate, "MMMM d, yyyy");
      newObj[formatDate] = {
        "date": getDate,
        "user_id": days[day]['user_id'],
        "entries": [],
      }

      for (let item of entries) {
        if (String(getDate) == String(item['date'])) {
          const tempObj = {
            "id": item['id'],
            "metric_id": item['metrics']['id'],
            "metric": item['metrics']['name'],
            "metric_value": item['metric_value'],
            "metric_unit": item['metrics']['unit'],
          }
          newObj[formatDate]['entries'].push(tempObj);
        }
      }
    }

    return await res.status(200).json(newObj);
  } else {
    return await res.status(405).json({
      message: "Access is restricted"
    })
  }
}