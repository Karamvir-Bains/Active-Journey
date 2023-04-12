// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {  
  if (req.method === 'PUT') {
    const id = Number(req.query.id);
    const updateLayout = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        layout: JSON.stringify(req.body.layout),
      },
    });
    return await res.status(200).json(updateLayout);
  } else {
    return await res.status(405).json({
      message: "access is restricted"
    });
  }
}