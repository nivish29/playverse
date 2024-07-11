import { parentPort, workerData } from 'worker_threads';
import fs from 'fs-extra';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

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
  try {
    const { videoPath } = workerData;
    const audioPath = 'audio.mp3';
    
    await convertToMp3(videoPath, audioPath);
    await fs.unlink(videoPath);

    const audioData = await fs.readFile(audioPath);
    // const uploadResponse = await axios.post(`https://api.assemblyai.com/v2/upload`, audioData, { headers });

    await fs.unlink(audioPath);

    // const uploadUrl = uploadResponse.data.upload_url;
    const uploadUrl="https://cdn.assemblyai.com/upload/0c66d309-9b4e-49ee-b317-60f66f1e2d3e";
    console.log(uploadUrl);
    const config = {
      audio_url: uploadUrl,
    };

    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript);
    
    const timeStamp = findTimestamp("any", transcript.words);
    console.log(timeStamp);

    parentPort.postMessage({ success: true, data: timeStamp });
  } catch (err) {
    console.error("Error in worker thread:", err);
    parentPort.postMessage({ success: false, error: err });
  }
};

const findTimestamp = (text, words) => {
  const result = words.filter(word => word.text.toLowerCase() === text.toLowerCase());
  if (result.length > 0) {
    return result.map(word => formatTimestamp(word.start));
  } else {
    return `Text "${text}" not found.`;
  }
};

const formatTimestamp = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
};

run();
