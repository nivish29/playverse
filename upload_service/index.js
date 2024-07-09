import express from "express";
import uploadRouter from "./src/routes/upload.route.js";
import kafkaPublisherRouter from "./src/routes/kafkapublisher.route.js";
import findTextRouter from "./src/routes/findText.route.js";
import dotenv from "dotenv";
import cors from "cors";

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
app.use("/upload", uploadRouter);
app.use("/publish", kafkaPublisherRouter);
app.use('/timeStamp',findTextRouter)

app.get("/", (req, res) => {
  res.send("HHLD YouTube");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
