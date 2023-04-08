// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const id = Number(req.query.id);
    console.log(req.body.layout);
    const updateLayout = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        layout: JSON.stringify(req.body.layout),
      },
    });
    return await res.json(updateLayout);
}