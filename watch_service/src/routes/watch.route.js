import express from "express"
import watchVideo from "../controller/watch.controller.js";
import getAllVideos from "../controller/home.controller.js";

const router = express.Router();

router.get('/', watchVideo);
router.get('/home', getAllVideos);

export default router;