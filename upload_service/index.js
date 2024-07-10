import express from "express";
import uploadRouter from "./src/routes/upload.route.js";
import kafkaPublisherRouter from "./src/routes/kafkapublisher.route.js";
import findTextRouter from "./src/routes/findText.route.js";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    allowedHeaders: ["*"],
    origin: "*",
  })
);
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
    // return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use("/temp", upload.single("filename"), (req, res) => {
  // console.log(req.body);
  res.status(200).json("video saved in public folder");
  console.log(req.file);
});
app.use("/upload", uploadRouter);
app.use("/publish", kafkaPublisherRouter);
app.use("/timeStamp", findTextRouter);

app.get("/", (req, res) => {
  res.send("HHLD YouTube");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
