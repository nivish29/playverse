-- AlterTable
ALTER TABLE "VideoData" ADD COLUMN     "timeStamp" TEXT[] DEFAULT ARRAY['0:00']::TEXT[];
