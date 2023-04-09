// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT' || req.method === 'POST') {
    const id = Number(req.query.id);
    const today = new Date();
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
    return await res.status(200).json(entries);
  } else {
    return await res.status(405).json({
      message: "Access is restricted"
    })
  }
}