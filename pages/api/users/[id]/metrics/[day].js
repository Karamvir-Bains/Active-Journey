// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../../lib/prisma';

export default async function handler(req, res) {
  // (Format is MM-DD-YYYY)
  const date_id = req.query.day;
  const user_id = Number(req.query.id);
  let theDate = new Date(date_id);
  let theDateStr = theDate.toISOString();

  if (req.method === 'GET') {
    const id = Number(req.query.id);
    const eid = Number(req.query.eid);
    const entries = await prisma.User_metric_data.findMany({
      where: {
        user_id: id,
        date: {
          lte: theDateStr,
          gte: new Date(new Date().setDate(theDate.getDate() - 30)),
        }
      },
      include: {
        metrics: true,
      },
      orderBy: [
        {
          date: 'desc'
        }
      ],
    });
    return await res.status(200).json(entries);
  } else {
    return await res.status(405).json({
      message: "Access is restricted"
    })
  }
}