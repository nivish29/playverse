// routes/upload.route.js
import express from "express"
import uploadFileToS3 from "../controller/upload.controller.js";
const router = express.Router();
router.post('/', uploadFileToS3);
export default router;