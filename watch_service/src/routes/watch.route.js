import express from "express"
import watchVideo from "../controller/watch.controller.js";

const router = express.Router();

router.get('/', watchVideo);

export default router;