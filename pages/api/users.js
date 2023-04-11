// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/prisma';

export default async function handler(req, res) {  
  if (req.method === 'PUT' || req.method === 'POST') {
    const id = Number(req.query.id);
    const users = await prisma.user.findMany({
    });
    return await res.status(200).json(users);
  } else {
    return await res.status(405).json({
      message: "access is restricted"
    });
  }
}