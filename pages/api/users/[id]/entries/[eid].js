// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'PUT' || req.method === 'POST') {
    const id = Number(req.query.id);
    const eid = Number(req.query.eid);
    const entries = await prisma.User_metric_data.findMany({
      where: {
        id: eid,
        user_id: id,
      },
      include: {
        metrics: true,
      }
    });
    return await res.status(200).json(entries);
  } else {
    return await res.status(405).json({
      message: "Access is restricted"
    })
  }
}