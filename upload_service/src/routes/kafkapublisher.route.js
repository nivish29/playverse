// routes/kafkapublisher.route.js

import express from "express"
import uploadFileToS3 from "../controller/upload.controller.js";
import multer from 'multer';
const upload = multer();


const router = express.Router();
router.post('/', upload.fields([{ name: 'chunk' }, { name: 'totalChunks' }, { name: 'chunkIndex' }]), uploadFileToS3);

export default router;
// //routes - kafkapublisher.route.js

// import express from "express"
// import sendMessageToKafka from "../controller/kafkapublisher.controller.js";

// const router = express.Router();
// router.post('/', sendMessageToKafka);

// export default router;