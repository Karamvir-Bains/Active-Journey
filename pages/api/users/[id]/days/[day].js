// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../../lib/prisma';
import { format } from 'date-fns';

export default async function handler(req, res) {
  // (Format is MM-DD-YYYY)
  const date_id = req.query.day;
  const user_id = Number(req.query.id);
  let theDate = new Date(date_id);
  let theDateStr = theDate.toISOString();
  
  const days = await prisma.User_metric_data.groupBy({
    by: ['date'],
    where: {
      user_id: user_id,
    },
    having: {
      date: {
        lte: theDateStr,
        gte: new Date(new Date().setDate(theDate.getDate() - 30)),
      }
    }
  })

  const entries = await prisma.User_metric_data.findMany({
    where: {
      user_id: user_id
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
      "user_id": user_id,
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
}