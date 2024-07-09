import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs-extra";
import axios from "axios";
import speech from "@google-cloud/speech";
import { AssemblyAI } from "assemblyai";

import ffmpegPath from "ffmpeg-static";
import { resolve } from "dns";
ffmpeg.setFfmpegPath(ffmpegPath);

const client = new AssemblyAI({
  apiKey: "515db9485eeb4f34bf774ae5822262c3",
});
const headers = {
  authorization: "515db9485eeb4f34bf774ae5822262c3",
};
// const audioUrl =
//   "audio/audio.mp3"

// const config = {
//   audio_url: 'upload_service\audio\audio.mp3'
// }

export const convertToMp3 = async (req, res) => {
  const inputPath = "video.mp4";
  const outputPath = "audio.mp3";
  const GOOGLE_APPLICATION_CREDENTIALS = "testing";
  // Check if the input file exists
  if (!fs.existsSync(inputPath)) {
    return res.status(404).send("Video file not found");
  }

  // Convert the video to mp3
  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("mp3")
      .output(`audio/${outputPath}`)
      .on("end", () => {
        console.log("Conversion finished");
        res.status(200).send("successfully converted");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error during conversion:", err);
        reject("Error during conversion");
      })
      .save(outputPath);
  });

  await run();
};

const run = async () => {
  const path = "audio/audio.mp3";
  const audioData = await fs.readFile(path);
  // const uploadResponse = await axios.post(`https://api.assemblyai.com/v2/upload`, audioData, {
  //   headers,
  // });
  const uploadUrl =
    "https://cdn.assemblyai.com/upload/b40c84b2-ef1d-4179-be94-df3e1cf98ced";
  // const uploadUrl = uploadResponse.data.upload_url;
  console.log(uploadUrl);
  const config = {
    audio_url: uploadUrl, // You can also use a URL to an audio or video file on the web
  };
  const transcript = await client.transcripts.transcribe(config);
  console.log(transcript);
  const timeStamp=findTimestamp("any", transcript.words);
  console.log(timeStamp);
};

const findTimestamp = (text, words) => {
  const result = words.filter(
    (word) => word.text.toLowerCase() === text.toLowerCase()
  );

  if (result.length > 0) {
    return result.map((word) => ({
      text: word.text,
      start: word.start,
      end: word.end,
    }));
  } else {
    return `Text "${text}" not found.`;
  }
};
