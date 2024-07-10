// findTextWorker.js
import { parentPort, workerData } from 'worker_threads';
import fs from 'fs-extra';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import multer from 'multer';

ffmpeg.setFfmpegPath(ffmpegPath);

const client = new AssemblyAI({
  apiKey: "515db9485eeb4f34bf774ae5822262c3",
});
const headers = {
  authorization: "515db9485eeb4f34bf774ae5822262c3",
};

const convertToMp3 = async (inputPath, outputPath) => {

    
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("mp3")
      .output(outputPath)
      .on("end", () => {
        console.log("Conversion finished");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error during conversion:", err);
        reject(err);
      })
      .save(outputPath);
  });
};

const run = async () => {
  const { videoPath } = workerData;
  const audioPath = 'audio.mp3';
  
  await convertToMp3(videoPath, audioPath);
  fs.unlink(videoPath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Video File has been successfully removed.`);
  });
  const audioData = await fs.readFile(audioPath);
  const uploadResponse = await axios.post(`https://api.assemblyai.com/v2/upload`, audioData, { headers });
  
  fs.unlink(audioPath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Audio File has been successfully removed.`);
  });

  const uploadUrl = uploadResponse.data.upload_url;
  console.log(uploadUrl);
  const config = {
    audio_url: uploadUrl,
  };

  const transcript = await client.transcripts.transcribe(config);
  console.log(transcript);
  
  const timeStamp = findTimestamp("any", transcript.words);
  console.log(timeStamp);
};

const findTimestamp = (text, words) => {
  const result = words.filter(word => word.text.toLowerCase() === text.toLowerCase());
  if (result.length > 0) {
    return result.map(word => ({ text: word.text, start: word.start, end: word.end }));
  } else {
    return `Text "${text}" not found.`;
  }
};

run().catch(err => {
  console.error("Error in worker thread:", err);
  parentPort.postMessage({ success: false, error: err });
});

parentPort.postMessage({ success: true });
