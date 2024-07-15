// home.controller.js

import { PrismaClient } from "@prisma/client";


const getVideoById = async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params; //
  try {
    console.log(req.params.id);
    // const allData =
    //   await prisma.$queryRaw`SELECT * FROM "VideoData" WHERE "id"=req.params.id`;
    const allData = await prisma.$queryRaw`
        SELECT * FROM "VideoData" WHERE "id" = ${parseInt(id, 10)}
      `;
    console.log(allData);
    return res.status(200).send(allData);
  } catch (error) {
    console.log("Error fetching data:", error);
    return res.status(400).send();
  }
};

export default getVideoById;
