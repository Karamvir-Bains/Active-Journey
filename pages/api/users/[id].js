// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {  
  if (req.method === 'GET') {
    const id = Number(req.query.id);
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
        dark_mode: true
      },
    });
    return await res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const id = Number(req.query.id);
    const updateUser = await prisma.user.update({
      data: {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "background": req.body.background,
      },
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
        dark_mode: true
      },
      
    });
    return await res.status(200).json(updateUser);
  } else {
    return await res.status(405).json({
      message: "incorrect request"
    });
  }
}