import express from "express"
//import uploadFileToS3 from "../controllers/upload.controller.js";
import multer from 'multer';
import multipartUploadFileToS3 from "../controller/multipartupload.controller.js";
const upload = multer();


const router = express.Router();
//router.post('/', upload.fields([{ name: 'chunk' }, { name: 'totalChunks' }, { name: 'chunkIndex' }]), uploadFileToS3);
router.post('/', multipartUploadFileToS3);
export default router;

// // routes/upload.route.js
// import express from "express"
// import uploadFileToS3 from "../controller/upload.controller.js";
// import multer from 'multer';
// const router = express.Router();
// // upload.route.js
// const upload = multer();
// router.post('/', upload.single('file'), uploadFileToS3);

// export default router;