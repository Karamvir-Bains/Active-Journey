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
  } else {
    return await res.status(405).json({
      message: "incorrect request"
    });
  }
}