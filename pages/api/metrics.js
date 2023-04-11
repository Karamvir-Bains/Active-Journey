// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/prisma';

export default async function handler(req, res) {  
  const id = Number(req.query.id);
  const metrics = await prisma.metric.findMany({
  });
  return await res.status(200).json(metrics);
}