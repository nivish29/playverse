// routes/upload.route.js
import express from "express"
import uploadFileToS3 from "../controller/upload.controller.js";
import multer from 'multer';
const router = express.Router();
// upload.route.js
const upload = multer();
router.post('/', upload.single('file'), uploadFileToS3);

export default router;