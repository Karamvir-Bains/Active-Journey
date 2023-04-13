// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) { 
  const id = Number(req.query.id); 
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        layout: true,
        password: false,
      },
    });
    return await res.status(200).json(user);
  } else if (req.method === 'PUT') {
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