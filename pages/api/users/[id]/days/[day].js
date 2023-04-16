// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../../lib/prisma';

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
    }, 
  });

  return await res.status(200).json(days);
}