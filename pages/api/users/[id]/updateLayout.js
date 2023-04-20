// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) { 
  const id = Number(req.query.id);
  console.log(JSON.stringify(req.body.layout));
  if (req.method === 'PUT') {
    const updateLayout = await prisma.user.update({
      data: {
        layout: JSON.stringify(req.body.layout),
      },
      where: {
        id: id,
      },
      
    });
    return await res.status(200).json(updateLayout);
  } else {
    return await res.status(405).json({
      message: "access is restricted"
    });
  }
}