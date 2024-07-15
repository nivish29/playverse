//home.controlller.js

import { PrismaClient } from "@prisma/client";


const getAllVideos = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    console.log("starting");

    const { page, limit } = req.query;
    const parsedPage = parseInt(page, 10) || 1; // Default to the first page if not provided
    const parsedLimit = parseInt(limit, 10) || 2; // Default limit to 2 if not provided
    const offset = (parsedPage - 1) * parsedLimit;  // Calculate offset based on page number(basically skip these many data)

    const allData = await prisma.$queryRaw`
      SELECT * FROM "VideoData"
      LIMIT ${parsedLimit}
      OFFSET ${offset}
    `;
    console.log(allData);
    return res.status(200).send(allData);
  } catch (error) {
    console.log("Error fetching data:", error);
    return res.status(400).send();
  } finally {
    await prisma.$disconnect();
  }
};


// const getAllVideos = async (req, res) => {
//   const prisma = new PrismaClient();
//   try {
//     console.log("starting");

//     const allData = await prisma.$queryRaw`SELECT * FROM "VideoData" `;
//     console.log(allData);
//     return res.status(200).send(allData);
//   } catch (error) {
//     console.log("Error fetching data:", error);
//     return res.status(400).send();
//   }
// };

export const deleteVideoById = async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params; // Extract the video ID from the request parameters

  try {
    // Check if the video exists
    const existingVideo = await prisma.videoData.findUnique({
      where: { id: parseInt(id, 10) }, // Ensure the ID is an integer
    });

    if (!existingVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Delete the video
    await prisma.videoData.delete({
      where: { id: parseInt(id, 10) }, // Ensure the ID is an integer
    });

    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.log("Error deleting video:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fullTextSearch=async(req,res)=>{
  const prisma=new PrismaClient()
  console.log(req.query);
  const products= await prisma.videoData.findMany({
    where:{
      title:{
        search:req.query.q.toString()
      },
      description:{
        search:req.query.q.toString()
      },
      author:{
        search:req.query.q.toString()
      }
    }
  })
  res.json(products)
}

export default getAllVideos;
