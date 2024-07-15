import express from "express"
import watchVideo from "../controller/watch.controller.js";
import getAllVideos, { fullTextSearch } from "../controller/home.controller.js";
import getVideoById from "../controller/detail.controller.js";
import { deleteVideoById } from "../controller/home.controller.js";

const router = express.Router();

router.get('/', watchVideo);
router.get('/home', getAllVideos);
router.get('/search', fullTextSearch);
router.get('/video/:id', getVideoById);
router.delete('/video/:id', deleteVideoById);

export default router;