// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) { 
  const id = Number(req.query.id); 
  if (req.method === 'PUT') {
    
    const updateDarkMode = await prisma.user.update({
      data: {
        "dark_mode": JSON.stringify(req.body.dark_mode),
      },
      where: {
        id: id,
      },
      
    });
    return await res.status(200).json(updateDarkMode);
  } else {
    return await res.status(405).json({
      message: "access is restricted"
    });
  }
}