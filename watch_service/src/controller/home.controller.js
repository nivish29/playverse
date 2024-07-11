//home.controlller.js

import { PrismaClient } from "@prisma/client";

const getAllVideos = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    console.log("starting");

    const allData = await prisma.$queryRaw`SELECT * FROM "VideoData" `;
    console.log(allData);
    return res.status(200).send(allData);
  } catch (error) {
    console.log("Error fetching data:", error);
    return res.status(400).send();
  }
};

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

export default getAllVideos;
